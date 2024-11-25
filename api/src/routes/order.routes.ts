import { Router } from "express";
import { createOrder, deleteOrder, getOrder, getOrders } from "../controllers/order.controller";
import { validateCreateOrder } from "../middleware/order.middleware";

const router = Router();

router.get("/", getOrders);

router.get('/id', getOrder);

router.delete('/order_id', deleteOrder);

router.post('/', validateCreateOrder, createOrder)


export default router;
