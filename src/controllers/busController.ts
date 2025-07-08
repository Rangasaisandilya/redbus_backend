import { Request, Response } from "express";
import Bus from "../models/Bus";
import { sendResponse } from "../utils/response";

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

export const getAllBuses = async (_req: Request, res: Response) => {
  try {
    const buses = await Bus.find().populate("owner driver", "name email");
    sendResponse(res, 200, {
      status: true,
      message: "Bus Fetch successfully",
      data: buses,
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
