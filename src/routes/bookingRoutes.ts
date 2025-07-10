import express from 'express';
import {
    createBooking,
    getAllBookings,
    getBookingById,
    getBookingsByTrip,
    getActiveBookings,
    updateBooking,
    cancelBooking,
    deleteBooking
} from '../controllers/bookingController';
import { bookingValidator, updateBookingValidator } from '../middleware/validations/bookingValidation';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking management endpoints
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /api/v1/booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tripId
 *               - seatNumber
 *               - passenger
 *               - totalAmount
 *             properties:
 *               tripId:
 *                 type: string
 *               seatNumber:
 *                 type: string
 *               passenger:
 *                 type: array
 *                 items:
 *                   type: object
 *               totalAmount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all bookings
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/booking/active:
 *   get:
 *     summary: Get active bookings
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active bookings
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/booking/trip/{tripId}:
 *   get:
 *     summary: Get bookings by trip ID
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings for trip
 *       401:
 *         description: Unauthorized
 * 
 * /api/v1/booking/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Booking]
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
 *         description: Booking details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *   put:
 *     summary: Update booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *   delete:
 *     summary: Delete booking
 *     tags: [Booking]
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
 *         description: Booking deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 * 
 * /api/v1/booking/{id}/cancel:
 *   patch:
 *     summary: Cancel booking
 *     tags: [Booking]
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
 *         description: Booking cancelled successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Booking cannot be cancelled
 *       404:
 *         description: Booking not found
 */

router.post('/', authenticate, bookingValidator, validateRequest, createBooking);
router.get('/', authenticate, getAllBookings);
router.get('/active', authenticate, getActiveBookings);
router.get('/trip/:tripId', authenticate, getBookingsByTrip);
router.get('/:id', authenticate, getBookingById);
router.put('/:id', authenticate, updateBookingValidator, validateRequest, updateBooking);
router.patch('/:id/cancel', authenticate, cancelBooking);
router.delete('/:id', authenticate, deleteBooking);

export default router;