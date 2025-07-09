import { Request, Response } from 'express';
import Booking, { IBookingDocument } from '../models/Booking';
import { IBooking } from '../types';
import { sendResponse } from '../utils/response';

/**
 * @swagger
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
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookingData: IBooking = req.body;
        const booking = new Booking(bookingData);
        const savedBooking = await booking.save();
        
        sendResponse(res, 201, {
            status: true,
            message: 'Booking created successfully',
            data: savedBooking
        });
    } catch (error: any) {
        sendResponse(res, 400, {
            status: false,
            message: 'Failed to create booking',
            errors: [{ msg: error.message, path: 'booking' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/booking:
 *   get:
 *     summary: Get all bookings
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */
export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookings = await Booking.find()
            .sort({ bookedAt: -1 });
        
        sendResponse(res, 200, {
            status: true,
            data: bookings,
            message:"SUCCESS",
            count: bookings.length
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch bookings', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/booking/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Booking not found
 */
export const getBookingById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id)
            .populate('passenger')
            .populate('tripId');
        
        if (!booking) {
            sendResponse(res, 404, {
                status: false,
                message: 'Booking not found',
                errors: [{ msg: 'Booking not found', path: 'id' }]
            });
            return;
        }
        
        sendResponse(res, 200, {
            status: true,
            data: booking,
            message: "SUCCESS"
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch booking', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/booking/trip/{tripId}:
 *   get:
 *     summary: Get bookings by trip ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: List of bookings for trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export const getBookingsByTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const { tripId } = req.params;
        const bookings = await Booking.findByTrip(tripId);
        
        sendResponse(res, 200, {
            status: true,
            data: bookings,
            message: "SUCCESS",
            count: bookings.length
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch bookings for trip', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/booking/active:
 *   get:
 *     summary: Get all active bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: List of active bookings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export const getActiveBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const bookings = await Booking.findActiveBookings();
        
        sendResponse(res, 200, {
            status: true,
            data: bookings,
            message: "SUCCESS",
            count: bookings.length
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to fetch active bookings', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/booking/{id}:
 *   put:
 *     summary: Update booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Booking not found
 */
export const updateBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const booking = await Booking.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('passenger').populate('tripId');
        
        if (!booking) {
            sendResponse(res, 404, {
                status: false,
                message: 'Booking not found',
                errors: [{ msg: 'Booking not found', path: 'id' }]
            });
            return;
        }
        
        sendResponse(res, 200, {
            status: true,
            message: 'Booking updated successfully',
            data: booking
        });
    } catch (error: any) {
        sendResponse(res, 400, {
            status: false,
            message: 'Failed to update booking',
            errors: [{ msg: error.message, path: 'booking' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/booking/{id}/cancel:
 *   patch:
 *     summary: Cancel booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Booking not found
 *       400:
 *         description: Booking cannot be cancelled
 */
export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        
        if (!booking) {
            sendResponse(res, 404, {
                status: false,
                message: 'Booking not found',
                errors: [{ msg: 'Booking not found', path: 'id' }]
            });
            return;
        }
        
        if (!booking.canCancel()) {
            sendResponse(res, 400, {
                status: false,
                message: 'Booking cannot be cancelled',
                errors: [{ msg: 'Booking cannot be cancelled', path: 'booking' }]
            });
            return;
        }
        
        (booking as any).status = 'cancelled';
        if ((booking as any).paymentStatus === 'paid') {
            (booking as any).paymentStatus = 'refunded';
        }
        
        const updatedBooking = await booking.save();
        const refundAmount = booking.calculateRefund();
        
        sendResponse(res, 200, {
            status: true,
            message: 'Booking cancelled successfully' + 'refunded INR ' +  refundAmount,
            data: updatedBooking,
            
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to cancel booking', path: 'server' }]
        });
    }
};

/**
 * @swagger
 * /api/v1/booking/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Booking not found
 */
export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);
        
        if (!booking) {
            sendResponse(res, 404, {
                status: false,
                message: 'Booking not found',
                errors: [{ msg: 'Booking not found', path: 'id' }]
            });
            return;
        }
        
        sendResponse(res, 200, {
            status: true,
            message: 'Booking deleted successfully'
        });
    } catch (error: any) {
        sendResponse(res, 500, {
            status: false,
            message: 'Internal server error',
            errors: [{ msg: 'Failed to delete booking', path: 'server' }]
        });
    }
};