import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      status_code: 200,
      message: products.length ? "Products retrieved successfully" : "No products found",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status_code: 500,
      message: "Internal server error",
    });
  }
};

export const createProduct = async(req: Request, res: Response) => {
  const { name, price,  } = req.body

  if(!name || !price){
    res.status(400).json({message : "sorry incomplete argument"})
    return
  }

  const product = await Product.create({
    name,
    price,
  });

  res.json({
    status_code : 200,
    message: 'successfully create product',
    data: product,
  })
}
