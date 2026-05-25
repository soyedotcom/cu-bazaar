import express from "express";
import { upload } from "../config/cloudinary.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/single", upload.single("image"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    return res
      .status(200)
      .json({ status: "success", data: { url: req.file.path } });
  } catch (error) {
    console.log(error); // add this
    return res.status(500).json({ error: "Upload failed" });
  }
});

router.post("/multiple", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });
    const urls = req.files.map((f) => f.path);
    return res.status(200).json({ status: "success", data: { urls } });
  } catch (error) {
    console.log(error); // add this
    return res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
