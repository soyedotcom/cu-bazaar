import express from "express";
import {
  createOrder,
  handleWebhook,
  verifyPayment,
  confirmDelivery,
  getOrders,
  cancelOrderItem,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook,
);

router.use(authMiddleware);
router.get("/", getOrders);
router.post("/", createOrder);
router.delete("/:id", cancelOrderItem);
router.get("/verify/:reference", verifyPayment);
router.patch("/confirm/:orderItemId", confirmDelivery);

export default router;
