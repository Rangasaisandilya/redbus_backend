import { body } from 'express-validator';

export const createRouteValidator = [
  body('from').notEmpty().withMessage('Source (from) is required'),
  body('to').notEmpty().withMessage('Destination (to) is required'),
  body('estimatedDuration').notEmpty().withMessage('Estimated duration is required'),
  body('distance').isFloat({ min: 0 }).withMessage('Distance must be a non-negative number'),
  body('stops').isArray({ min: 1 }).withMessage('Stops must be a non-empty array')
];

export const updateRouteValidator = [
  body('from').optional().notEmpty().withMessage('Source (from) cannot be empty'),
  body('to').optional().notEmpty().withMessage('Destination (to) cannot be empty'),
  body('estimatedDuration').optional().notEmpty().withMessage('Estimated duration cannot be empty'),
  body('distance').optional().isFloat({ min: 0 }).withMessage('Distance must be a non-negative number'),
  body('stops').optional().isArray({ min: 1 }).withMessage('Stops must be a non-empty array')
];
