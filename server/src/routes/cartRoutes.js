import express from "express";
import { addToCart, deleteCartItem, updateCartItem } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", addToCart);

router.put("/:id", updateCartItem);

router.get("/", showCart);

router.delete("/:id", deleteCartItem);

export default router;
