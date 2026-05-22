import { prisma } from "../config/database.js";

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const alreadyInWishlist = await prisma.wishlistItem.findFirst({
      where: {
        userId: req.user.id,
        productId: productId,
      },
    });

    if (alreadyInWishlist) {
      return res.status(400).json({ error: "Product is already in wishlist" });
    }

    const newWishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: req.user.id,
        productId,
      },
      include: { product: true },
    });

    return res
      .status(201)
      .json({ status: "success", data: { newWishlistItem } });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add product to wishlist" });
  }
};

const deleteWishlistItem = async (req, res) => {
  const wishlistItem = await prisma.wishlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!wishlistItem) {
    return res.status(404).json({ error: "Wishlist item not found" });
  }

  if (wishlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this wishlist item" });
  }

  await prisma.wishlistItem.deleteMany({
    where: { id: req.params.id },
  });

  return res
    .status(200)
    .json({ status: "success", message: "Wishlist item deleted successfully" });
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlistItems = await prisma.wishlistItem.findMany({
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
      data: { wishlistItems, length: wishlistItems.length },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load wishlist items" });
  }
};

export { addToWishlist, deleteWishlistItem, getWishlist };
