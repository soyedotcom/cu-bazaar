import { prisma } from "../config/database.js";

const createSellerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shopName, description, logo } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { sellerProfile: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isSeller) {
      return res.status(400).json({ error: "User is already a seller" });
    }

    if (!shopName || !description) {
      return res
        .status(400)
        .json({ error: "Shop name and description required" });
    }

    const shopExists = await prisma.sellerProfile.findUnique({
      where: { shopName: shopName },
    });

    if (shopExists) {
      return res.status(400).json({ error: "Shop already exists" });
    }

    const newSellerProfile = await prisma.sellerProfile.create({
      data: {
        userId: userId,
        shopName: shopName,
        description: description,
        logo: logo,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        isSeller: true,
        role: "SELLER",
      },
    });

    return res.status(201).json({
      status: "success",
      data: { SellerProfile: newSellerProfile },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create seller profile" });
  }
};

const getSellerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const seller = await prisma.sellerProfile.findUnique({
      where: { userId: userId },
      include: {
        products: true,
        orders: true,
      },
    });

    if (!seller) {
      return res.status(404).json({ error: "Seller profile not found" });
    }

    return res
      .status(200)
      .json({ status: "success", data: { Seller: seller } });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load seller profile" });
  }
};

const updateSellerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shopName, description, logo } = req.body;

    const seller = await prisma.sellerProfile.findUnique({
      where: { userId: userId },
    });

    if (!seller) {
      return res.status(404).json({ error: "Seller profile not found" });
    }

    if (seller.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update profile" });
    }

    const shopExists = await prisma.sellerProfile.findUnique({
      where: { shopName: shopName },
    });

    if (shopExists) {
      return res.status(400).json({ error: "Shop already exists" });
    }

    const updatedSeller = await prisma.sellerProfile.update({
      where: { userId: userId },
      data: {
        shopName: shopName,
        description: description,
        logo: logo,
      },
    });

    return res
      .status(200)
      .json({ status: "success", data: { seller: updatedSeller } });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update seller profile" });
  }
};

const deleteSeller = async (req, res) => {
  try {
    const userId = req.user.id;
    const seller = await prisma.sellerProfile.findUnique({
      where: { userId: userId },
    });

    if (!seller) {
      return res.status(404).json({ error: "Seller profile not found" });
    }

    if (seller.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete profile" });
    }

    await prisma.sellerProfile.delete({ where: { userId: userId } });

    await prisma.user.update({
      where: { id: userId },
      data: {
        isSeller: false,
        role: "USER",
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Seller profile deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to delete seller profile" });
  }
};

const getProducts = async (req, res) => {};

const createProduct = async (req, res) => {};

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

const getSellerOrders = async (req, res) => {};

const getSellerTransactions = async (req, res) => {};

export {
  createSellerProfile,
  getSellerProfile,
  updateSellerProfile,
  deleteSeller,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerOrders,
  getSellerTransactions,
};
