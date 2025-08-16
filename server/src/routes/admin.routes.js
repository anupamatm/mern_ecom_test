import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { listOrders, updateOrderStatus } from "../controllers/admin.controller.js";
const router = Router();

router.get("/orders", requireAuth, requireAdmin, listOrders);
router.patch("/orders/:id/status", requireAuth, requireAdmin, updateOrderStatus);

export default router;
