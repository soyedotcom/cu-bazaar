import express from "express";
import {
  getOrders,
  createOrder,
  cancelOrderItem,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/orderMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getOrders);

router.post("/", createOrder);

router.delete("/:id", cancelOrderItem);

export default router;
