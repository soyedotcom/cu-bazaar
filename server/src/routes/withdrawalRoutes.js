import express from "express";
import {
  requestWithdrawal,
  getWithdrawals,
  getBanks,
  handleWebhook,
  verifyAccount,
  bankAvailability,
} from "../controllers/withdrawalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/withdrawals/webhook", handleWebhook);

router.use(authMiddleware);
router.use(roleMiddleware("SELLER"));

router.get("/", getWithdrawals);
router.post("/", requestWithdrawal);
router.get("/withdrawals/banks", getBanks);
router.post("/withdrawals/verify-account", protect, verifyAccount);
router.post("/withdrawals/bank-availability", protect, bankAvailability);

export default router;
