import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("products route is working");
});

router.post("/add", (req, res) => {
  res.json("add products route is working");
});

router.put("/update", (req, res) => {
  res.json("update products route is working");
});

router.delete("/delete", (req, res) => {
  res.json("delete products route is working");
});

export default router;
