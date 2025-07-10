import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../utils/responseUtil";
import AppError from "../utils/AppError";
import mongoose from "mongoose";
import { ValidationError, validationResult } from "express-validator";
import catchAsync from "../utils/catchAsync";
import Trips from "../models/Trips";
import Routes from "../models/Routes";
import Bus from "../models/Bus";
import { ADMIN } from "../common/roles";
import { ObjectId } from 'mongoose';
import moment from "moment-timezone";
import { formatToIST } from "../utils/dateCoversion";
import { formatToISTString } from "../utils/formatToIST";


interface UserRequest extends Request {
    user?: UserPayload
}

interface PopulatedBus {
  _id: string;
  license_number: string;
  type: string;
  total_seats: number;
  total_sleepers: number;
  owner: {
    name: string;
    email: string;
    phone: string;
  };
  driver: {
    name: string;
    email: string;
    phone: string;
  };
  contact: string;
  is_ac: boolean;
}


interface TripWithBus {
  _id: ObjectId;
  routeId: ObjectId;
  departureTime: Date;
  arrivalTime: Date;
  availableSeats: number;
  availableSleepers: number;
  status: string;
  price: number;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  busId: {
    _id: ObjectId;
    license_number: string;
    type: string;
    total_seats: number;
    total_sleepers: number;
    contact: string;
    is_ac: boolean;
    owner: {
      name: string;
      email: string;
      phone: string;
    };
    driver: {
      name: string;
      email: string;
      phone: string;
    };
  };
}


interface UserPayload {
    id?: string;
    role?: string;
    email?: string;
}


export const getAllTrips = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("get all schedules called")
    const schedulesResponse = await Trips.find();

    if (!schedulesResponse) {
        throw new AppError(404, "No Trips data found")
    }
    if (!schedulesResponse) {
        throw new AppError(400, "unable to fetch trips data")
    }
    sendSuccessResponse(200, res, schedulesResponse, "Trips data fetched Successfully")

})

export const createNewTrip = catchAsync(async (req: UserRequest, res: Response, next: NextFunction) => {
    console.log("create new trip api started")

    const { routeId, busId } = req.body

    if (!mongoose.Types.ObjectId.isValid(routeId) || !mongoose.Types.ObjectId.isValid(busId)) {
        throw new AppError(400, 'Invalid routeId or busId format')
    }


    const routeExists = await Routes.findById(routeId);
    const busExists = await Bus.findById(busId);
    if (!routeExists || !busExists) {
        throw new AppError(400, 'Route or Bus not found')
    }

    if (req?.user?.role === ADMIN) {
        req.body.status = "approved"
    }

    req.body.createdBy = req.body.userId
    delete req.body.userId


    const createTripResponse = await Trips.create(req.body)

    sendSuccessResponse(201, res, createTripResponse, "New Trip Created Successfully")


})

export const updateTrip = catchAsync(async (req: UserRequest, res: Response, next: NextFunction) => {
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

export const searchTrips = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const from = (req.query.from as string)?.toLowerCase();
    const to = (req.query.to as string)?.toLowerCase();
    const date = req.query.date as string;

    //console.log(req.query)


    const route = await Routes.findOne({
        from: from,
        to: to,
    });


    if (!route) {
        throw new AppError(404, "Route not found")
    }

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const trips = await Trips.find({
        routeId: route._id,
        departureTime: { $gte: startOfDay, $lte: endOfDay },
        status: 'approved'
    }).select('-_id -routeId -createdAt -updatedAt -createdBy').
        populate({
            path: 'busId',
            populate: [
                { path: 'owner', select: '-_id name email phone' },
                { path: 'driver', select: '-_id name email phone' }
            ]
        }).populate({
            path:'routeId',
            populate:'distance estimatedDuration from to stops'
        }).lean();

        console.log(trips)

        const formattedTrips = (trips as unknown as TripWithBus[]).map(trip => {

        const { busId, arrivalTime,departureTime,routeId,...rest} = trip;

        // Destructure and rename fields from busId
        const {
            license_number,
            type,
            total_seats,
            total_sleepers,
            ...busRest
        } = busId;

    
        const bus = {
            ...busRest,
            busNumber: busId?.license_number, // renamed from license_number
            busType: busId?.type,// renamed from type
            capacity: busId?.total_seats + busId?.total_sleepers, // combined total
            amenities: ['WiFi', 'Charging Points', 'Entertainment', 'Water Bottle']
        };

        const route = {...routeId}


        return {
            ...rest,
            arrivalTime: arrivalTime,
            departureTime:departureTime,
            bus,
            route
        };

        return {
            ...rest,
            arrivalTime: formatToISTString(arrivalTime),
            departureTime: formatToISTString(departureTime),
            bus,
            route
        };
    });



    sendSuccessResponse(200, res, formattedTrips, "trips Fetched Successfully")


})


