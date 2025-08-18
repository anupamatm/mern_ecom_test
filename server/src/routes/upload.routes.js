import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mern-ecom", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });
const router = Router();

// ✅ Upload route
router.post("/", requireAuth, requireAdmin, upload.array("images", 4), (req, res) => {
  const urls = req.files.map((f) => f.path || f.secure_url); // ensure proper Cloudinary URL
  res.status(201).json({ urls });
});

export default router;
