import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendErrorResponse } from "./responseUtil";

export const validatorFn = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendErrorResponse(400, res, errors.array(), "validation failed");
    return res
      .status(400)
      .json({ code: 400, status: "FAILURE", data: errors.array() });
  }
  next();
};
