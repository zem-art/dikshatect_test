import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll();
  res.json(products);
};

export const createProduct = async(req: Request, res: Response) => {
  const { uid } = req.body
  res.json({
    status_code : 200,
    message: 'successfully create product'
  })
}
