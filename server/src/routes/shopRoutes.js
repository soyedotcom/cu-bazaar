import express from "express";
import { loadProducts } from "../controllers/shopController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.use(authMiddleware);

router.get("/", loadProducts);

export default router;
