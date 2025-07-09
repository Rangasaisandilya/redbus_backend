import { body } from 'express-validator';

export const bookingValidator = [
  body('tripId').isMongoId().withMessage('Valid trip ID is required'),
  body('userId').optional().isMongoId().withMessage('Valid user ID is required'),
  body('seatNumbers').isArray({ min: 1 }).withMessage('At least one seat number is required'),
  body('seatNumbers.*').notEmpty().withMessage('Seat number cannot be empty'),
  body('passengers').isArray({ min: 1 }).withMessage('At least one passenger is required'),
  body('passengers.*.name').notEmpty().withMessage('Passenger name is required'),
  body('passengers.*.age').isInt({ min: 1, max: 120 }).withMessage('Passenger age must be between 1 and 120'),
  body('passengers.*.gender').isIn(['male', 'female', 'other']).withMessage('Passenger gender must be male, female, or other'),
  body('passengers.*.seatNumber').notEmpty().withMessage('Passenger seat number is required'),
  body('totalAmount').isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),
  body('status').optional().isIn(['confirmed', 'cancelled', 'completed', 'pending']).withMessage('Invalid booking status'),
  body('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded']).withMessage('Invalid payment status')
];

export const updateBookingValidator = [
  body('tripId').optional().isMongoId().withMessage('Valid trip ID is required'),
  body('userId').optional().isMongoId().withMessage('Valid user ID is required'),
  body('seatNumbers').optional().isArray({ min: 1 }).withMessage('At least one seat number is required'),
  body('seatNumbers.*').optional().notEmpty().withMessage('Seat number cannot be empty'),
  body('passengers').optional().isArray({ min: 1 }).withMessage('At least one passenger is required'),
  body('passengers.*.name').optional().notEmpty().withMessage('Passenger name cannot be empty'),
  body('passengers.*.age').optional().isInt({ min: 1, max: 120 }).withMessage('Passenger age must be between 1 and 120'),
  body('passengers.*.gender').optional().isIn(['male', 'female', 'other']).withMessage('Passenger gender must be male, female, or other'),
  body('passengers.*.seatNumber').optional().notEmpty().withMessage('Passenger seat number cannot be empty'),
  body('totalAmount').optional().isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),
  body('status').optional().isIn(['confirmed', 'cancelled', 'completed', 'pending']).withMessage('Invalid booking status'),
  body('paymentStatus').optional().isIn(['pending', 'paid', 'failed', 'refunded']).withMessage('Invalid payment status')
];
