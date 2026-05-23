import express from "express";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getCartItems);

router.post("/", addToCart);

router.put("/:id", updateCartItem);

router.delete("/:id", deleteCartItem);

export default router;
