import { validationResult } from "express-validator";
import AppError from "../utils/AppError";
import { NextFunction } from "express";


export const handleValidationErrors = (req: Request, res: Response, next: NextFunction):any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400,errors.array())
  }
  next();
};
