import express from "express";
import {
  loadProducts,
  getProduct,
  getShop,
} from "../controllers/shopController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.use(authMiddleware);

router.get("/", loadProducts);
router.get("/:id", getProduct);
router.get("/store/:shopName", getShop);

export default router;
