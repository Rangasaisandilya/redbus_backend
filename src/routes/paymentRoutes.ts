import express from 'express';
import {
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentsByBooking,
    getPaidPayments,
    getFailedPayments,
    confirmPayment,
    failPayment,
    deletePayment
} from '../controllers/paymentController';
import { paymentValidator } from '../middleware/validations/paymentValidation';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management endpoints
 * 
 * /api/v1/payment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *               - amount
 *               - paymentMethod
 *             properties:
 *               bookingId:
 *                 type: string
 *               amount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *                 enum: [credit_card, debit_card, upi, net_banking, wallet]
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/payment/status/paid:
 *   get:
 *     summary: Get all paid payments
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of paid payments
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/payment/status/failed:
 *   get:
 *     summary: Get all failed payments
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of failed payments
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/payment/booking/{bookingId}:
 *   get:
 *     summary: Get payments by booking ID
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of payments for booking
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/payment/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 *   delete:
 *     summary: Delete payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 * 
 * /api/v1/payment/{id}/confirm:
 *   patch:
 *     summary: Confirm payment (mark as paid)
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 * 
 * /api/v1/payment/{id}/fail:
 *   patch:
 *     summary: Mark payment as failed
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment marked as failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */

router.post('/', authenticate, paymentValidator, validateRequest, createPayment);

router.get('/', authenticate, getAllPayments);

router.get('/status/paid', authenticate, getPaidPayments);
router.get('/status/failed', authenticate, getFailedPayments);

router.get('/booking/:bookingId', authenticate, getPaymentsByBooking);

router.get('/:id', authenticate, getPaymentById);

router.patch('/:id/confirm', authenticate, confirmPayment);
router.patch('/:id/fail', authenticate, failPayment);

router.delete('/:id', authenticate, deletePayment);

export default router;
