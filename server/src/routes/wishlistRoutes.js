import express from "express";
import {
  addToWishlist,
  deleteWishlistItem,
} from "../controllers/WishlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", addToWishlist);

router.get("/", showWishlist);

router.delete("/", deleteWishlistItem);

export default router;
