import { body } from 'express-validator';

export const busValidator = [
  body('owner').isMongoId().withMessage('Valid owner ID is required'),
  body('driver').isMongoId().withMessage('Valid driver ID is required'),
  body('license_number').notEmpty().withMessage('License number is required'),
  body('type').notEmpty().withMessage('Bus type is required'),
  body('is_ac').isBoolean().withMessage('is_ac must be a boolean'),
  body('total_sleepers').isInt({ min: 0 }).withMessage('Total sleepers must be a number'),
  body('total_seats').isInt({ min: 0 }).withMessage('Total seats must be a number'),
  body('contact').optional().isMobilePhone('any').withMessage('Contact must be a valid phone number')
];
