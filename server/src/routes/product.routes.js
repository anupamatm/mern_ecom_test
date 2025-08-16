import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  createProduct, updateProduct, deleteProduct,
  getProduct, listProducts
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", requireAuth, requireAdmin, createProduct);
router.put("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

export default router;
