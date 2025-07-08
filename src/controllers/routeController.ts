import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Routes from "../models/Routes";
import AppError from "../utils/AppError";
import { sendSuccessResponse } from "../utils/responseUtil";
import mongoose from "mongoose";

export const getAllRoutes = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("get all schedules called")
    const schedulesResponse = Routes.find();

    if (!schedulesResponse) {
        throw new AppError(404, "No Routes data found")
    }
    if (!schedulesResponse) {
        throw new AppError(400, "unable to fetch Routes data")
    }
    sendSuccessResponse(200, res, schedulesResponse, "Routes data fetched Successfully")


})


export const createRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newRoute = await Routes.create(req.body);
    sendSuccessResponse(201, res, newRoute, "Successfully created new route")
});


export const updateRoute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
     const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError(400, 'Invalid route ID'));
    }


    const updatedRoute = await Routes.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    if (!updatedRoute) {
        return next(new AppError(404, 'Route not found'));
    }

    sendSuccessResponse(200,res,updateRoute,"Successfully update route")

});

