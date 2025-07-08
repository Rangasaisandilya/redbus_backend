import { body } from 'express-validator';

export const updateUserValidator = [
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('role').optional().isIn(['passenger', 'driver', 'owner', 'admin']).withMessage('Invalid role')
];
