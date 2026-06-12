import express from "express";
import {
  createSellerProfile,
  getSellerProfile,
  updateSellerProfile,
  deleteSeller,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerOrders,
  getSellerTransactions,
} from "../controllers/sellerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/become-a-seller", createSellerProfile);

//Seller only paths
router.use(roleMiddleware("SELLER"));
router.get("/dashboard", getSellerProfile);
router.patch("/dashboard", updateSellerProfile);
router.delete("/dashboard", deleteSeller);
router.get("/products", getProducts);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/orders", getSellerOrders);
router.get("/transactions", getSellerTransactions);

export default router;
