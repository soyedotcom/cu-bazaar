import { prisma } from "../config/database.js";

const addToCart = async (req, res) => {
  const { productId, quantity, selectedSize, selectedColor } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const alreadyInCart = await prisma.cartItem.findFirst({
    where: {
      userId_productId_selectedSize_selectedColor: {
        userId: req.user.id,
        productId: productId,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
      },
    },
  });

  if (alreadyInCart) {
    const updated = await prisma.cartItem.update({
      where: { id: alreadyInCart.id },
      data: {
        quantity: alreadyInCart.quantity + quantity,
      },
    });

    return res.status(200).json({
      status: "success",
      data: { cartItem: updated },
    });
  }
  const newCartItem = await prisma.cartItem.create({
    data: {
      userId: req.user.id,
      productId,
      quantity,
      selectedSize,
      selectedColor,
    },
  });

  return res
    .status(201)
    .json({ status: "success", data: { cartItem: newCartItem } });
};

const deleteCartItem = async (req, res) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: req.params.id },
  });

  if (!cartItem) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  if (cartItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this cart item" });
  }

  await prisma.cartItem.deleteMany({
    where: { id: req.params.id, userId: req.user.id },
  });

  return res
    .status(200)
    .json({ status: "success", message: "Cart item deleted successfully" });
};

const updateCartItem = async (req, res) => {
  const { quantity, selectedSize, selectedColor } = req.body;

  const cartItem = await prisma.cartItem.findUnique({
    where: { id: req.params.id },
  });

  if (!cartItem) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  if (cartItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this cart item" });
  }

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: req.params.id },
    data: {
      quantity,
      selectedSize,
      selectedColor,
    },
  });

  return res.status(200).json({
    status: "success",
    data: { cartItem: updatedCartItem },
  });
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      status: "success",
      data: { cartItems, length: cartItems.length },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load cart items" });
  }
};

export { addToCart, deleteCartItem, updateCartItem, getCartItems };
