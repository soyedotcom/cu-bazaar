import express from "express";
import {
  addToWishlist,
  deleteWishlistItem,
  getWishlist,
} from "../controllers/WishlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getWishlist);

router.post("/", addToWishlist);

router.delete("/:id", deleteWishlistItem);

export default router;
