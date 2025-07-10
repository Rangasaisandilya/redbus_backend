import { body } from 'express-validator';

export const paymentValidator = [
  body('bookingId').isMongoId().withMessage('Valid booking ID is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('paymentMethod').isIn(['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet']).withMessage('Invalid payment method'),
  body('transactionId').optional().isString().withMessage('Transaction ID must be a string')
];

export const paymentStatusValidator = [
  body('status').isIn(['pending', 'paid', 'failed']).withMessage('Invalid payment status')
];
