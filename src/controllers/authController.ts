import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, phone, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      sendResponse(res, 400, {
        status: false,
        message: "Email already exists",
        errors: [
          {
            msg: "Email already exists",
          },
        ],
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      phone,
      password: hashedPassword,
      name,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await user.save();
    sendResponse(res, 201, {
      status: true,
      message: "User registered successfully",
    });
  } catch (err) {
    sendResponse(res, 500, {
      status: false,
      message: "Internal server error",
      errors: [{ msg: "Internal server error", path: "server" }],
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      sendResponse(res, 401, {
        status: false,
        message: "Invalid email or password",
        errors: [{ email: "Invalid email or password" }],
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const { password: _, ...userWithoutPassword } = user.toObject();
    if (!isMatch) {
      sendResponse(res, 401, {
        status: false,
        message: "Invalid email or password",
        errors: [{ email: "Invalid email or password" }],
      });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "234567890asdfghjkl",
      {
        expiresIn: "1d",
      }
    );

    sendResponse(res, 200, {
      status: true,
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);

    sendResponse(res, 500, {
      status: false,
      message: "Internal server error",
      errors: [{ msg: "Internal server error", path: "server" }],
    });
  }
};
