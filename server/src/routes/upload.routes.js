import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

// Configure Cloudinary with validation
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Cloudinary environment variables are not properly configured');
  console.log('Current Cloudinary Config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing',
    api_key: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing',
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ Set (hidden for security)' : '❌ Missing'
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dxhpjx4sy',
  api_key: process.env.CLOUDINARY_API_KEY || '494932552557698',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'gW40KubqAWKZJB53itq6iHNE5tE',
  secure: true // Use HTTPS
});

// Setup multer storage with Cloudinary
let storage;
try {
  storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      return {
        folder: 'mern-ecom',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        resource_type: 'auto',
        transformation: [
          { width: 800, height: 600, crop: 'limit', quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      };
    },
  });
} catch (error) {
  console.error('❌ Failed to initialize Cloudinary storage:', error);
  throw new Error('Failed to initialize file upload service');
}

// Configure multer with file size limits and better error handling
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    files: 4, // Max 4 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
    }
  }
});
const router = Router();

// ✅ Upload route
router.post("/", requireAuth, requireAdmin, (req, res, next) => {
  upload.array("images", 4)(req, res, function (err) {
    if (err) {
      console.error('Multer/Cloudinary upload error:', err);
      return res.status(400).json({ message: 'File upload failed', error: err.message });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files were uploaded' });
    }

    try {
      const urls = req.files.map((f) => f.path || f.secure_url);
      res.status(201).json({ urls });
    } catch (error) {
      console.error('Error processing upload:', error);
      res.status(500).json({ message: 'Error processing upload', error: error.message });
    }
  });
});

export default router;
