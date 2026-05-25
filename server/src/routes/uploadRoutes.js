import express from "express";
import { upload } from "../config/cloudinary.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/single", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  return res.status(200).json({
    status: "success",
    data: { url: req.file.path },
  });
});

router.post("/multiple", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0)
    return res.status(400).json({ error: "No files uploaded" });
  const urls = req.files.map((f) => f.path);
  return res.status(200).json({
    status: "success",
    data: { urls },
  });
});

export default router;
