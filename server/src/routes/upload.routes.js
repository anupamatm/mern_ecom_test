import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

const router = Router();

router.post("/", requireAuth, requireAdmin, upload.array("images", 4), (req, res) => {
  const urls = req.files.map(f => `/uploads/${path.basename(f.path)}`);
  res.status(201).json({ urls });
});

export default router;
