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

router.put("/", updateUserProfile);

router.delete("/", deleteUser);

export default router;
