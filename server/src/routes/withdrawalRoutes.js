import express from "express";
import {
  requestWithdrawal,
  getWithdrawals,
} from "../controllers/withdrawalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
router.use(roleMiddleware("SELLER"));

router.get("/", getWithdrawals);
router.post("/", requestWithdrawal);

export default router;
