import express from "express";
import {
  requestWithdrawal,
  getWithdrawals,
  getBanks,
  handleWebhook,
  verifyAccount,
} from "../controllers/withdrawalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/webhook", handleWebhook);

router.use(authMiddleware);
router.use(roleMiddleware("SELLER"));

router.get("/", getWithdrawals);
router.post("/", requestWithdrawal);
router.get("/banks", getBanks);
router.post("/verify-account", verifyAccount);

export default router;
