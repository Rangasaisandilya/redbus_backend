import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendErrorResponse } from "../utils/responseUtil";
import { StatusCodes } from "http-status-codes";
import { env } from "../config/envConfig";
import { roles } from "../models/userModel";

export const authorize = (...allowedRoles: roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendErrorResponse(
        StatusCodes.UNAUTHORIZED,
        res,
        {},
        "unauthorized"
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, env.JWT_ACCESS) as JwtPayload["user"];
      if (!allowedRoles.includes(decoded.role)) {
        return sendErrorResponse(StatusCodes.FORBIDDEN, res, {}, "Forbidden");
      }

      (req as any).user = decoded; // Attach user info to request
      next();
    } catch (err) {
      return sendErrorResponse(
        StatusCodes.UNAUTHORIZED,
        res,
        {},
        "Invalid token"
      );
    }
  };
};
