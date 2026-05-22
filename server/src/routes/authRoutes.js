import express from "express";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.put("/update", (req, res) => {
  res.json("update products route is working");
});

router.delete("/delete", (req, res) => {
  res.json("delete products route is working");
});

export default router;
