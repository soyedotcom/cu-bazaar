import { prisma } from "../config/database.js";

const loadProducts = async (req, res) => {
  try {
    const {
      q,
      category,
      subcategory,
      section,
      page = 1,
      limit = 20,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const products = await prisma.product.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { name: { contains: q, mode: "insensitive" } },
                  { category: { contains: q, mode: "insensitive" } },
                  { subcategory: { contains: q, mode: "insensitive" } },
                  { section: { contains: q, mode: "insensitive" } },
                ],
              }
            : {},

          category ? { category } : {},
          subcategory ? { subcategory } : {},
          section ? { section } : {},
        ],
      },
      include: {
        seller: {
          select: {
            shopName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: Number(limit),
    });

    const total = await prisma.product.count({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { name: { contains: q, mode: "insensitive" } },
                  { category: { contains: q, mode: "insensitive" } },
                  { subcategory: { contains: q, mode: "insensitive" } },
                  { section: { contains: q, mode: "insensitive" } },
                ],
              }
            : {},

          category ? { category } : {},
          subcategory ? { subcategory } : {},
          section ? { section } : {},
        ],
      },
    });

    return res.json({
      status: "success",
      data: {
        products,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          hasMore: skip + products.length < total,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load products" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { seller: true },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    return res.status(200).json({ status: "success", data: { product } });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load product" });
  }
};

export { loadProducts, getProduct };
