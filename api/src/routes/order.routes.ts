import { Router } from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrderByOrderId } from "../controllers/order.controller";
import { validateCreateOrder, validateUpdateOrder } from "../middleware/order.middleware";

const router = Router();

router.get("/", getOrders);

router.get('/id', getOrder);

router.delete('/id', deleteOrder);

router.post('/id', validateUpdateOrder, updateOrderByOrderId);

router.post('/', validateCreateOrder, createOrder)


export default router;
