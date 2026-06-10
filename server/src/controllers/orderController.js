import { prisma } from "../config/database.js";
import { korapay } from "../config/korapay.js";
import { calculateFees } from "../utils/fees.js";
import crypto from "crypto";

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0)
      return res.status(400).json({ error: "Cart is empty" });

    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    // create pending order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
        paymentStatus: "PENDING",
        items: {
          create: cartItems.map((item) => {
            const { platformFee, sellerAmount } = calculateFees(
              Number(item.product.price),
              item.quantity,
            );
            return {
              productId: item.productId,
              sellerId: item.product.sellerId,
              quantity: item.quantity,
              price: item.product.price,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor,
              platformFee,
              sellerAmount,
              paymentStatus: "PENDING",
              status: "PENDING",
            };
          }),
        },
      },
    });

    // initialize KoraPay payment
    const reference = `CUB-${order.id.slice(0, 8)}-${Date.now()}`;

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentReference: reference },
    });

    const paymentRes = await korapay.post("/charges/initialize", {
      reference,
      amount: totalAmount,
      currency: "NGN",
      customer: { email: user.email, name: user.name },
      notification_url: `${process.env.SERVER_URL}/orders/webhook`,
      merchant_bears_cost: false,
    });

    return res.status(201).json({
      status: "success",
      data: {
        orderId: order.id,
        checkoutUrl: paymentRes.data.data.checkout_url,
        reference,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-korapay-signature"];
    const hash = crypto
      .createHmac("sha256", process.env.KORA_ENCRYPTION_KEY)
      .update(req.body)
      .digest("hex");

    if (hash !== signature) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const payload = JSON.parse(req.body.toString());
    const { event, data } = payload;

    if (event === "charge.success") {
      const order = await prisma.order.findUnique({
        where: { paymentReference: data.reference },
        include: { items: true },
      });

      if (!order) return res.status(404).json({ error: "Order not found" });
      if (order.paymentStatus === "PAID")
        return res.status(200).json({ received: true });

      // mark order as paid
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          paidAt: new Date(),
          status: "PENDING",
        },
      });

      // update all order items
      await prisma.orderItem.updateMany({
        where: { orderId: order.id },
        data: { paymentStatus: "PAID" },
      });

      // credit each seller's pending balance
      for (const item of order.items) {
        await prisma.sellerProfile.update({
          where: { userId: item.sellerId },
          data: {
            pendingBalance: { increment: item.sellerAmount },
          },
        });

        await prisma.walletTransaction.create({
          data: {
            sellerId: item.sellerId,
            amount: item.sellerAmount,
            type: "CREDIT_PENDING",
            description: `Payment received for order ${order.id.slice(0, 8)}`,
            reference: data.reference,
          },
        });
      }

      // clear cart
      await prisma.cartItem.deleteMany({ where: { userId: order.userId } });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Webhook error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const verifyRes = await korapay.get(`/charges/${reference}`);
    const data = verifyRes.data.data;

    return res.status(200).json({
      status: "success",
      data: {
        status: data.status,
        amount: data.amount,
        reference: data.reference,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify payment" });
  }
};

const confirmDelivery = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const userId = req.user.id;

    const orderItem = await prisma.orderItem.findUnique({
      where: { id: parseInt(orderItemId) },
      include: { order: true },
    });

    if (!orderItem)
      return res.status(404).json({ error: "Order item not found" });

    const isBuyer = orderItem.order.userId === userId;
    const isSeller = orderItem.sellerId === userId;

    if (!isBuyer && !isSeller)
      return res.status(403).json({ error: "Not authorized" });

    const updateData = isBuyer
      ? { buyerConfirmed: true }
      : { sellerConfirmed: true };

    const updated = await prisma.orderItem.update({
      where: { id: parseInt(orderItemId) },
      data: updateData,
    });

    // release funds when both confirm
    if (updated.buyerConfirmed && updated.sellerConfirmed) {
      await prisma.orderItem.update({
        where: { id: parseInt(orderItemId) },
        data: { status: "DELIVERED", deliveredAt: new Date() },
      });

      // move from pending to available
      await prisma.sellerProfile.update({
        where: { userId: orderItem.sellerId },
        data: {
          pendingBalance: { decrement: orderItem.sellerAmount },
          availableBalance: { increment: orderItem.sellerAmount },
        },
      });

      await prisma.walletTransaction.create({
        data: {
          sellerId: orderItem.sellerId,
          amount: orderItem.sellerAmount,
          type: "RELEASE_FUNDS",
          description: `Funds released for order item ${orderItemId}`,
        },
      });
    }

    return res
      .status(200)
      .json({ status: "success", data: { orderItem: updated } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to confirm delivery" });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: { select: { name: true, image: true } },
            seller: { select: { shopName: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ status: "success", data: { orders } });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load orders" });
  }
};

const cancelOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const orderItem = await prisma.orderItem.findUnique({
      where: { id: parseInt(id) },
      include: { order: true },
    });

    if (!orderItem)
      return res.status(404).json({ error: "Order item not found" });
    if (orderItem.order.userId !== userId)
      return res.status(403).json({ error: "Not authorized" });
    if (orderItem.status !== "PENDING")
      return res
        .status(400)
        .json({ error: "Cannot cancel a non-pending order" });

    await prisma.orderItem.update({
      where: { id: parseInt(id) },
      data: { status: "CANCELLED" },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Order item cancelled" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to cancel order" });
  }
};

export {
  createOrder,
  handleWebhook,
  verifyPayment,
  confirmDelivery,
  getOrders,
  cancelOrderItem,
};
