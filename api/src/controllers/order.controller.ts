import { Request, Response } from "express";
import Order from "../models/order.model";
import { RequestHandler } from "express";

export const getOrders = async (req: Request, res: Response) => {
  const { customerName, orderDate } = req.query;
  const where: any = {};

  if (customerName) where.customerName = customerName;
  if (orderDate) where.orderDate = new Date(orderDate as string);

  const orders = await Order.findAll({ where });
  res.json(orders);
};

export const createOrder: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { customerName, productIds } = req.body;

    if (!productIds || productIds.length === 0) {
      res.status(400).json({ message: "Product ID not found" });
      return;
    }

    if(!customerName){
      res.status(400).json({ message: "Customer is Required" });
      return;
    }

    const order = await Order.create({
      customerName,
      orderDate: new Date(),
      productIds,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error(error); // Logging error untuk debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

