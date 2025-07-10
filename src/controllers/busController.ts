import { Request, Response } from "express";
import Bus from "../models/Bus";
import { sendResponse } from "../utils/response";
import { FilterQuery } from "mongoose";

export const addBus = async (req: Request, res: Response) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    sendResponse(res, 201, {
      status: true,
      message: "Bus added successfully",
      data: bus,
    });
  } catch (err) {
    sendResponse(res, 500, {
      status: false,
      message: "Internal server error",
      errors: [{ error: "Internal server error" }],
    });
  }
};

export const getAllBuses = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const search = (req.query.search as string) || "";
    const owner = (req.query.owner as string) || "";
    const driver = (req.query.driver as string) || "";

    const query: FilterQuery<any> = {}; // Search by license number or contact

    if (search) {
      query.$or = [
        { license_number: { $regex: search, $options: "i" } },
        { contact: { $regex: search, $options: "i" } },
      ];
    } // Filter by owner ID

    if (owner) {
      query.owner = owner;
    } // Filter by driver ID

    if (driver) {
      query.driver = driver;
    }

    const buses = await Bus.find(query)
      .populate("owner driver", "name email")
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Bus.countDocuments(query);
    sendResponse(res, 200, {
      status: true,
      message: "Bus Fetch successfully",
      data: buses,
      total:total
    });
  } catch (err) {
    sendResponse(res, 500, {
      status: false,
      message: "Internal server error",
      errors: [{ error: "Internal server error" }],
    });
  }
};

export const updateBus = async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    const bus = await Bus.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!bus) {
      sendResponse(res, 404, {
        status: false,
        message: "Bus not found",
      });
      return;
    }
    sendResponse(res, 200, {
      status: true,
      message: "Bus updated successfully",
      data: bus,
    });
  } catch (err) {
    sendResponse(res, 500, {
      status: false,
      message: "Internal server error",
      errors: [{ error: "Internal server error" }],
    });
  }
};
