import { Router } from "express";
import UserRoute from "./userRoutes";
import authRoute from "./authRoutes";
import busRoute from "./busRoutes";
import bookingRoute from "./bookingRoutes";
import paymentRoute from "./paymentRoutes";

const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use('/user', UserRoute);
router.use('/auth', authRoute);
router.use('/bus', busRoute);
router.use('/booking', bookingRoute);
router.use('/payment', paymentRoute);

export default router;
