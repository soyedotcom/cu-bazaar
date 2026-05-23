import express from "express";
import { loadProducts, getProduct } from "../controllers/shopController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.use(authMiddleware);

router.get("/", loadProducts);
router.get("/:id", getProduct);

export default router;
