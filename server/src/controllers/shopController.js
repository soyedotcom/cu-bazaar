import { prisma } from "../config/database.js";

const loadProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json({
    status: "success",
    data: { products },
  });
};

export { loadProducts };
