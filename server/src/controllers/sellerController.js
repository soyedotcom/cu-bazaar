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

    const shopExists = await prisma.sellerProfile.findUnique({
      where: { shopName: shopName },
    });

    if (shopExists && shopExists.userId !== userId) {
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

//SELLER PRODUCT PATHS
const getProducts = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const products = await prisma.product.findMany({
      where: {
        sellerId: sellerId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      status: "success",
      data: { products: products, amount: products.length },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load seller products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.user.isSeller) {
      return res
        .status(403)
        .json({ error: "Not authorized to create a product" });
    }

    const {
      name,
      image,
      description,
      price,
      features,
      measurements,
      materialsAndCare,
      category,
      subcategory,
      section,
      tags,
      variants,
    } = req.body;

    if (
      !name ||
      !image ||
      !description ||
      price == null ||
      !category ||
      !subcategory ||
      !section
    ) {
      return res.status(400).json({
        error:
          "Name, image, description, price, category, subcategory and section are required",
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        image,
        description,
        price: parseFloat(price),

        measurements,
        materialsAndCare,

        category,
        subcategory,
        section,

        features: features || [],
        tags: tags || [],
        variants,

        sellerId: userId,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        product: {
          id: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const {
      name,
      image,
      description,
      price,
      features,
      measurements,
      materialsAndCare,
      category,
      subcategory,
      section,
      tags,
      variants,
    } = req.body;

    if (
      !name ||
      !description ||
      price == null ||
      !category ||
      !subcategory ||
      !section
    ) {
      return res.status(400).json({
        error:
          "Name, description, price, category, subcategory and section are required",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    if (product.sellerId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this product" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        image,
        description,
        price: new Prisma.Decimal(price),

        measurements,
        materialsAndCare,

        category,
        subcategory,
        section,

        features: features || [],
        tags: tags || [],
        variants,

        sellerId: userId,
      },
    });

    return res.status(200).json({
      status: "success",
      data: { product: updatedProduct },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.sellerId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this product" });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete product" });
  }
};

const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const orders = await prisma.orderItem.findMany({
      where: {
        sellerId: sellerId,
      },

      include: {
        product: true,
        order: {
          include: {
            user: {
              select: { name: true, email: true, hall: true, room: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      status: "success",
      data: { orders, amount: orders.length },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load orders" });
  }
};

const getSellerTransactions = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const transactions = await prisma.orderItem.findMany({
      where: { sellerId, paymentStatus: "PAID" },
      include: { product: true, order: true },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ status: "success", data: { transactions } });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load transactions" });
  }
};

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
