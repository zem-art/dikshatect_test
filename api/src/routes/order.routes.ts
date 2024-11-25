import { Router } from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrderById } from "../controllers/order.controller";
import { validateCreateOrder, validateUpdateOrder } from "../middleware/order.middleware";

const router = Router();

router.get("/", getOrders);

router.get('/id', getOrder);

router.delete('/id', deleteOrder);

router.post('/id', validateUpdateOrder, updateOrderById);

router.post('/', validateCreateOrder, createOrder)


export default router;
