import { Response } from "express";

export const sendErrorResponse = (
  statusCode: number,
  res: Response,
  error: any,
  errorMessage: any
): void => {
  const message = errorMessage || error?.message;
  res.status(statusCode).json({ success: false, error: message });
};

export const sendSuccessResponse = <T>(
  statusCode: number,
  res: Response,
  data: T,
  successMessage: string
): void => {
  res
    .status(statusCode)
    .json({ success: true, message: successMessage, response: data });
};
