import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendResponse } from "../utils/response";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    sendResponse(res, 401, {
      status: true,
      message: "No token provided",
      errors: [{ error: "No token provided" }],
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "234567890asdfghjkl") as {
      id: string;
    };

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      sendResponse(res, 404, {
        status: true,
        message: "User not found",
        errors: [{ error: "User not found" }],
      });
      return;
    }

    req.user = user;
    // req.body.userId= user._id
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err });
    sendResponse(res, 401, {
      status: false,
      message: "Invalid token",
      errors: [{ error: "Invalid token" }],
    });
  }
};
