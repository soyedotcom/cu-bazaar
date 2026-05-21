import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Products endpoint is working!");
});

export default router;
