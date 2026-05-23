import express from "express";
import {
  addToCart,
  deleteCartItem,
  updateCartItem,
  getCartItems,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getCartItems);

router.post("/", addToCart);

router.put("/:id", updateCartItem);

router.delete("/:id", deleteCartItem);

export default router;
