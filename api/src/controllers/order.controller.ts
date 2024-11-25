import { Request, Response } from "express";
import Order from "../models/order.model";
import generateRandomString from "../utils/string.utils";
import orderProduct from "../models/order_products.model";
import sequelize from "../database/config";
import Product from "../models/product.model";

export const getOrders = async (req: Request, res: Response) => {
  const { customerName, orderDate, limit="10", page="1" } = req.query;
  const where: any = {};

  if (customerName) where.customerName = customerName;
  if (orderDate) where.orderDate = new Date(orderDate as string);
  
  const offset = (Number(page) - 1) * Number(limit);

  const  { count, rows: orders } = await Order.findAndCountAll({
    attributes: {
      exclude: ['productIds'],
    },
    where,
    limit: Number(limit),
    offset,
    include: [{
      model: orderProduct,
      as: 'orderProducts',
      attributes: [
        "id",
        "name",
        "price",
        "quantity",
        "product_id",
        [sequelize.literal('price * quantity'), 'total_price'],
      ],
      required: false,
    }],
    distinct: true
  })  

  res.status(200).json({
    status_code: 200,
    message: "Orders retrieved successfully",
    data: orders,
    meta: {
      total: count,
      current_page: Number(page),
      total_pages: Math.ceil(count / Number(limit)),
    },
  });
};

export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    let { customerName, products } = req.body;
    const productIds = products.map((val:any) => val.id);
    const order_id = generateRandomString(10);

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
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.query;
    const where:any = {};

    if(order_id) where.order_id = order_id;

    const findOrder = await Order.findOne({ where });
    if(!findOrder?.get('order_id')){
      res.status(404).json({
        status_code : 404,
        message: "Some Order not found"
      });
      return
    };

    const findOrderProduct = await orderProduct.findAll({ where });
    let totalPriceOrder:number = 0
    const products = findOrderProduct.map(( products ) => {
      const { name, price, quantity, product_id, id } = products.dataValues; 
      const totalPrice = Number(quantity) * Number(price);
      totalPriceOrder += totalPrice
      return {
        id,
        product_id,
        name,
        price,
        quantity,
        total_price: totalPrice,
      }
    });

    res.status(200).json({
      status_code : 200,
      message: 'successfully create orders',
      data: {
        order : {
          order_id: findOrder.get('order_id'),
          customerName: findOrder.get('customerName'),
          orderDate: findOrder.get('orderDate'),
          createdAt: findOrder.get('createdAt'),
          updatedAt: findOrder.get('updatedAt'),
          total_price: totalPriceOrder
        },
        products,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.query;

    if (!order_id) {
      res.status(400).json({
        status_code: 400,
        message: "order_id is required",
      });
      return;
    }

    const deletedOrderProducts = await orderProduct.destroy({
      where: { order_id },
    });

    const deletedOrder = await Order.destroy({
      where: { order_id },
    });

    if (!deletedOrder) {
      res.status(404).json({
        status_code: 404,
        message: "Order not found",
      });
      return;
    }

    res.status(200).json({
      status_code: 200,
      message: "Successfully deleted order and its related products",
      data: {
        deletedOrderProducts,
        deletedOrder,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};

export const updateOrderById = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.query;
    const { customerName, product } = req.body;

    const updatedOrderProduct = await orderProduct.update(
      {
        quantity : product.quantity
      },
      {
        where: { id : product.id, order_id } 
      }
    );

    if (updatedOrderProduct[0] === 0) {
      res.status(404).json({
        status_code: 404,
        message: "OrderProduct not found",
      });
      return;
    }

    res.status(200).json({
      status_code : 200,
      message: 'successfully update product in orders',
      data: {
        updatedOrderProduct: updatedOrderProduct[0],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}