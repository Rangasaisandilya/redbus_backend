import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Schedules from "../models/Trips";
import { sendSuccessResponse } from "../utils/responseUtil";
import AppError from "../utils/AppError";
import mongoose from "mongoose";
import Routes from "../models/Routes";
import Trips from "../models/Trips";
import { ValidationError, validationResult } from "express-validator";


export const getAllTrips = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("get all schedules called")
    const schedulesResponse = await Schedules.find();

    if (!schedulesResponse.length) {
        throw new AppError(404, "No Trips data found")
    }
    if (!schedulesResponse) {
        throw new AppError(400, "unable to fetch trips data")
    }
    sendSuccessResponse(200, res, schedulesResponse, "Trips data fetched Successfully")

})

export const createNewTrip =catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    console.log("create new trip api started")

    const {routeId,busId,...rest}= req.body

    

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
        throw new AppError(400,'Invalid routeId or busId format')
    }

    
    const routeExists = await Routes.findById(routeId);
//     const busExists = await Bus.findById(bus_id);
//     if (!routeExists || !busExists) {
//          throw new AppError(400,'Route or Bus not found')
//     }


    const createTripResponse = await Trips.create(req.body)

    sendSuccessResponse(201,res,createTripResponse,"New Trip Created Successfully")


})


export const updateTrip =catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})

