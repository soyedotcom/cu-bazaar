import express from "express";
import {
  addToWishlist,
  deleteWishlistItem,
  getWishlist,
} from "../controllers/WishlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", addToWishlist);

router.get("/", getWishlist);

router.delete("/", deleteWishlistItem);

export default router;
