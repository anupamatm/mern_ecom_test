import { Router } from "express";
import { requireAuth , requireAdmin} from "../middleware/auth.js";
import { createOrder, myOrders, adminOrders,updateOrderStatus } from "../controllers/order.controller.js";
const router = Router();

router.post("/", requireAuth, createOrder);
router.get("/mine", requireAuth, myOrders);

// Admin-only
router.get("/", requireAuth, requireAdmin, adminOrders); // GET /api/orders
router.put("/:id/status", requireAuth, requireAdmin, updateOrderStatus);

export default router;
