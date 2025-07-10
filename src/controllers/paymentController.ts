import { Request, Response } from 'express';
import Payment, { IPaymentDocument } from '../models/Payment';
import Booking from '../models/Booking';
import { IPayment } from '../types';
import { sendResponse } from '../utils/response';

/**
 * @swagger
 * /api/v1/payment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request
 */
export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const paymentData: IPayment = req.body;
        
        // Validate if booking exists
        const booking = await Booking.findById(paymentData.bookingId);
        if (!booking) {
            sendResponse(res, 404, {
                status: false,
                message: 'Booking not found'
            });
            return;
        }

        // Check if payment already exists for this booking
        const existingPayment = await Payment.findOne({ bookingId: paymentData.bookingId });
        if (existingPayment) {
            sendResponse(res, 400, {
                status: false,
                message: 'Payment already exists for this booking'
            });
            return;
        }

        // Generate unique transaction ID
        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const payment = new Payment({
            ...paymentData,
            transactionId
        });
        
        const savedPayment = await payment.save();
        
        sendResponse(res, 201, {
            status: true,
            message: 'Payment created successfully',
            data: savedPayment
        });
    } catch (error: any) {
        sendResponse(res, 400, {
            status: false,
            message: 'Failed to create payment',
            errors: [{ msg: error.message, path: 'payment' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/payment:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export const getAllPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const payments = await Payment.find()
            .populate('bookingId')
            .sort({ createdAt: -1 });
        
        sendResponse(res, 200, {
            status: true,
            data: payments,
            message: "SUCCESS",
            count: payments.length
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch payments', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/payment/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Payment not found
 */
export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id).populate('bookingId');
        
        if (!payment) {
            sendResponse(res, 404, {
                status: false,
                message: 'Payment not found'
            });
            return;
        }
        
        sendResponse(res, 200, {
            status: true,
            data: payment,
            message: "SUCCESS"
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch payment', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/payment/booking/{bookingId}:
 *   get:
 *     summary: Get payments by booking ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: List of payments for booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export const getPaymentsByBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { bookingId } = req.params;
        const payments = await Payment.findByBookingId(bookingId);
        
        sendResponse(res, 200, {
            status: true,
            data: payments,
            message: "SUCCESS",
            count: payments.length
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch payments for booking', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/payment/status/paid:
 *   get:
 *     summary: Get all paid payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: List of paid payments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export const getPaidPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const payments = await Payment.findPaidPayments();
        
        sendResponse(res, 200, {
            status: true,
            data: payments,
            message: "SUCCESS",
            count: payments.length
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch paid payments', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/payment/status/failed:
 *   get:
 *     summary: Get all failed payments
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: List of failed payments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export const getFailedPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const payments = await Payment.findFailedPayments();
        
        sendResponse(res, 200, {
            status: true,
            data: payments,
            message: "SUCCESS",
            count: payments.length
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch failed payments', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/payment/{id}/confirm:
 *   patch:
 *     summary: Confirm payment (mark as paid)
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Payment not found
 */
export const confirmPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id);
        
        if (!payment) {
            sendResponse(res, 404, {
                status: false,
                message: 'Payment not found'
            });
            return;
        }

        if (payment.isPaid()) {
            sendResponse(res, 400, {
                status: false,
                message: 'Payment is already confirmed'
            });
            return;
        }

        const updatedPayment = await payment.markAsPaid();
        
        // Update booking payment status
        await Booking.findByIdAndUpdate(payment.bookingId, {
            paymentStatus: 'paid',
            status: 'confirmed'
        });
        
        sendResponse(res, 200, {
            status: true,
            message: 'Payment confirmed successfully',
            data: updatedPayment
        });
    } catch (error: any) {
        sendResponse(res, 400, {
            status: false,
            message: 'Failed to confirm payment',
            errors: [{ msg: error.message, path: 'payment' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/payment/{id}/fail:
 *   patch:
 *     summary: Mark payment as failed
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment marked as failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Payment not found
 */
export const failPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id);
        
        if (!payment) {
            sendResponse(res, 404, {
                status: false,
                message: 'Payment not found'
            });
            return;
        }

        if (payment.isFailed()) {
            sendResponse(res, 400, {
                status: false,
                message: 'Payment is already marked as failed'
            });
            return;
        }

        const updatedPayment = await payment.markAsFailed();
        
        // Update booking payment status
        await Booking.findByIdAndUpdate(payment.bookingId, {
            paymentStatus: 'failed'
        });
        
        sendResponse(res, 200, {
            status: true,
            message: 'Payment marked as failed',
            data: updatedPayment
        });
    } catch (error: any) {
        sendResponse(res, 400, {
            status: false,
            message: 'Failed to update payment status',
            errors: [{ msg: error.message, path: 'payment' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/payment/{id}:
 *   delete:
 *     summary: Delete payment
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Payment not found
 */
export const deletePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByIdAndDelete(id);
        
        if (!payment) {
            sendResponse(res, 404, {
                status: false,
                message: 'Payment not found'
            });
            return;
        }
        
        sendResponse(res, 200, {
            status: true,
            message: 'Payment deleted successfully',
            data: payment
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to delete payment', path: 'server' }]
        });
    }
};
