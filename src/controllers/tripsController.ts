import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../utils/responseUtil";
import AppError from "../utils/AppError";
import mongoose from "mongoose";
import { ValidationError, validationResult } from "express-validator";
import catchAsync from "../utils/catchAsync";
import Trips from "../models/Trips";
import Routes from "../models/Routes";
import Bus from "../models/Bus";


export const getAllTrips = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("get all schedules called")
    const schedulesResponse = Trips.find();

    if (!schedulesResponse) {
        throw new AppError(404, "No Trips data found")
    }
    if (!schedulesResponse) {
        throw new AppError(400, "unable to fetch trips data")
    }
    sendSuccessResponse(200, res, schedulesResponse, "Trips data fetched Successfully")

})

export const createNewTrip = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("create new trip api started")

    const { routeId, busId, ...rest } = req.body
    const errorResult = validationResult(req);

    if (!errorResult.isEmpty()) {
        const formattedErrors = errorResult.array().map(err => {
            if ('param' in err) {
                return `${err.param}: ${err.msg}`;
            }
            return `Unknown field: ${err.msg}`;
        }).join(', ');

        return next(new AppError(400, formattedErrors));
    }


    if (!mongoose.Types.ObjectId.isValid(routeId) || !mongoose.Types.ObjectId.isValid(busId)) {
        throw new AppError(400, 'Invalid routeId or busId format')
    }


    const routeExists = await Routes.findById(routeId);
    const busExists = await Bus.findById(busId);
    if (!routeExists || !busExists) {
        throw new AppError(400, 'Route or Bus not found')
    }


    const createTripResponse = await Trips.create(req.body)

    sendSuccessResponse(201, res, createTripResponse, "New Trip Created Successfully")


})



export const updateTrip = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError(400, 'Invalid trip ID'));
    }

    // Optional: validate routeId and busId existence if provided
    if (updateData.routeId) {
        const routeExists = await Routes.findById(updateData.routeId);
        if (!routeExists) throw new AppError(404, 'Route not found');
    }

    if (updateData.busId) {
        const busExists = await Bus.findById(updateData.busId);
        if (!busExists) throw new AppError(404, 'Bus not found');
    }

    const updatedSchedule = await Trips.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!updatedSchedule) {
        throw new AppError(404, 'Trip not found');
    }

    sendSuccessResponse(200, res, updatedSchedule, "Trips updated Successfully")

});


