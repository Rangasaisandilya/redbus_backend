import { body } from "express-validator";
import mongoose from "mongoose";


export const tripValidator = [
  body('routeId')
    .notEmpty().withMessage('route_id is required')
    .custom((value :any)=> mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid route Id provided'),

  body('busId')
    .notEmpty().withMessage('bus_id is required')
    .custom((value :any)=> mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid bus id provided'),

  body('departureTime')
    .notEmpty().withMessage('departure_time is required')
    .isISO8601().withMessage('Invalid departure_time'),

  body('arrivalTime')
    .notEmpty().withMessage('arrival_time is required')
    .isISO8601().withMessage('Invalid arrival_time'),

  body('availableSeats')
    .notEmpty().withMessage('available_seat is required')
    .isInt({ min: 0 }).withMessage('available_seat must be a non-negative integer'),

  body('availableSleepers')
    .notEmpty().withMessage('available_sleeper is required')
    .isInt({ min: 0 }).withMessage('available_sleeper must be a non-negative integer'),

  body('price')
    .notEmpty().withMessage('price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a non-negative number')
];
