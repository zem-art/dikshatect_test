import { NextFunction, Request, Response } from "express";
import { body, query, validationResult } from "express-validator";

export const validateCreateOrder = [
  body("customerName").notEmpty().withMessage("Customer name is required"),
  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be an array with at least one item"),
  body("products.*.id").isInt().withMessage("Each product must have an ID"),
  body("products.*.quantity")
    .isInt({ gt: 0 })
    .withMessage("Each product must have a quantity greater than 0"),
  (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
  },
];

export const validateUpdateOrder = [
  query("order_id").notEmpty().withMessage('order_id is required'),
  body("id").notEmpty().withMessage('id of order_product is required'),
  body("product.id").isInt().withMessage("Sorry, id cannot be empty"),
  body("product.quantity").isInt().isInt({ gt: 0 }).withMessage("product must have quantity greater than 0"),
]
