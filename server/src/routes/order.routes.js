import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createOrder, myOrders } from "../controllers/order.controller.js";
const router = Router();

router.post("/", requireAuth, createOrder);
router.get("/mine", requireAuth, myOrders);

export default router;
