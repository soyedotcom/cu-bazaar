import { prisma } from "../config/database.js";

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderItems = await prisma.orderItem.findMany({
      where: {
        order: { userId: userId, status: "PAID" || "PENDING" },
      },
      include: {
        product: true,
        order: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      status: "success",
      data: { orderItems, amount: orderItems.length },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load orders" });
  }
};

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        error: "Cart is empty",
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        status: "PENDING",
      },
    });

    for (const item of cartItems) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          sellerId: item.product.sellerId,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,

          price: item.product.price.toNumber(),
          paymentStatus: "PURCHASED",
          status: "PENDING",
        },
      });
    }

    await prisma.cartItem.deleteMany({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create order" });
  }
};

const cancelOrderItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderItemId = Number(req.params.id);

    const orderItem = await prisma.orderItem.findUnique({
      where: { id: orderItemId },
    });

    if (!orderItem) {
      return res.status(404).json({ error: "Order Item not found" });
    }

    if (orderItem.order.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to cancel this order item" });
    }

    // await prisma.orderItem.delete({
    //   where: { id: Number(orderItemId) },
    // });

    const updatedOrder = await prisma.orderItem.update({
      where: {
        id: orderItemId,
      },

      data: {
        status: "CANCELLED",
      },
    });

    return res.status(200).json({
      status: "success",
      data: { orderItem: updatedOrder },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to cancel order item" });
  }
};

export { getOrders, createOrder, cancelOrderItem };
