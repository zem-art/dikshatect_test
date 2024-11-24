import { Router } from "express";
import { createOrder, getOrders } from "../controllers/order.controller";
import { validateCreateOrder } from "../middleware/order.middleware";

const router = Router();

router.get("/", getOrders);

router.post('/', validateCreateOrder, createOrder)

export default router;
