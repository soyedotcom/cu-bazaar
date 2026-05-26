import { prisma } from "../config/database.js";

export const createOrderFromCart = async (userId) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: true,
    },
  });

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const order = await prisma.order.create({
    data: {
      userId,
      status: "PENDING",
    },
  });

  const orderItemsData = cartItems.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    sellerId: item.product.sellerId,
    quantity: item.quantity,
    price: item.product.price,
    selectedSize: item.selectedSize,
    selectedColor: item.selectedColor,
    paymentStatus: "PENDING",
    status: "PENDING",
  }));

  await prisma.orderItem.createMany({
    data: orderItemsData,
  });

  await prisma.cartItem.deleteMany({
    where: { userId },
  });

  return order;
};
