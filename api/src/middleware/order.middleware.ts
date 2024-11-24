import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

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
