import { Request, Response } from "express";
import User from "../models/User";
import { FilterQuery } from "mongoose";
import { IUser } from "../types";
import { sendResponse } from "../utils/response";
interface GetUsersQuery {
  page?: string;
  limit?: string;
  search?: string;
  role?: string;
  isAvailable?: boolean; // "true" to filter available users
}
// export const getUserProfile = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err });
//   }
// };

export const getAllUsers = async (
  req: Request<{}, {}, {}, GetUsersQuery>,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const search = req.query.search || "";
    const role = req.query.role || "";
    const isAvailable = req.query.isAvailable;

    const query: FilterQuery<IUser> = {};

    // Search by username or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by role
    if (role) {
      query.role = role;
    }
    if (isAvailable) {
      query.isAvailable = true;
    }

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    sendResponse(res, 200, {
      status: true,
      message: "Users fetched successfully",
      data: users,
      total: total,
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    sendResponse(res, 500, {
      status: false,
      message: "Internal server error",
      errors: [{ error: "Internal server error" }],
    });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");
    if (!user) {
      sendResponse(res, 404, {
        status: false,
        message: "User not found",
        errors: [{ error: "User not found" }],
      });
      return;
    }
    sendResponse(res, 200, {
      status: true,
      message: "Users fetched successfully",
      data: user,
    });
  } catch (err) {
    sendResponse(res, 500, {
      status: false,
      message: "Internal server error",
      errors: [{ error: "Internal server error" }],
    });
  }
};
