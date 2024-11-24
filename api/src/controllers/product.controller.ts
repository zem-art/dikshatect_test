import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();
  res.json(products);
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
