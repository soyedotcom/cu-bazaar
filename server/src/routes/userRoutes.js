import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
router.get("/", getUserProfile);
router.patch("/:id", updateUserProfile);
router.delete("/:id", deleteUser);

export default router;
