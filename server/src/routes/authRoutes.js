import express from "express";
import {
  signup,
  signin,
  signout,
  getMe,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/me", authMiddleware, getMe);

export default router;
