import { Request, Response } from "express";
import Order from "../models/order.model";
import generateRandomString from "../utils/string.utils";
import orderProduct from "../models/order_products.model";
import sequelize from "../database/migrations";
import Product from "../models/product.model";


export const getOrders = async (req: Request, res: Response) => {
  const { customerName, orderDate } = req.query;
  const where: any = {};

  if (customerName) where.customerName = customerName;
  if (orderDate) where.orderDate = new Date(orderDate as string);

  const orders = await Order.findAll({ where });
  res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    let { customerName, products } = req.body;
    const productIds = products.map((val:any) => val.id)

    const order_id = generateRandomString(10)

    const order = await Order.create({
      order_id,
      customerName,
      orderDate: new Date(),
      productIds,
    }, { transaction });

    const findProduct = await Product.findAll({
      where: { id: productIds },
      transaction,
    });

    if (findProduct.length !== findProduct.length) {
      res.status(404).json({
        status_code : 404,
        message: "Some products not found"
      });
      return
    }

    const dataOrderPoduct = findProduct.map(( product ) => ({
      order_id,
      product_id: product.get('id'),
      quantity: products.find((val:any) => val.id == product.get('id')).quantity || 0,
      name: product.get('name'),
      price: product.get('price'),
    }));

    await orderProduct.bulkCreate(dataOrderPoduct, { transaction });
    await transaction.commit();

    res.status(200).json({
      status_code : 200,
      message: 'successfully create orders',
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.body

    const findOrder = await Order.findOne({
      where : order_id
    })

    console.log(findOrder);

    res.status(200).json({
      status_code : 200,
      message: 'successfully create orders',
      // data: findOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}