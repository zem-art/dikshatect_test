import { Router } from "express";
import { createOrder, getOrder, getOrders } from "../controllers/order.controller";
import { validateCreateOrder } from "../middleware/order.middleware";

const router = Router();

router.get("/", getOrders);

router.get('/id', getOrder);

router.post('/', validateCreateOrder, createOrder)


export default router;
