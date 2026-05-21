import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Products endpoint is working!");
});

router.post("/add", (req, res) => {
  res.send("Add Product endpoint working!");
});

router.put("/update", (req, res) => {
  res.send("Update Product endpoint working!");
});

router.delete("/delete", (req, res) => {
  res.send("Delete Product endpoint working!");
});

export default router;
