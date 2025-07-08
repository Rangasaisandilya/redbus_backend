import { Router } from "express";
import tripsRoute from './tripRoute'

import UserRoute from "./userRoutes";
import authRoute from "./authRoutes";
import busRoute from "./busRoutes";
import routeRoutes from './routeRoute'

const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/trips",tripsRoute)
router.use('/user',UserRoute );
router.use('/auth',authRoute );
router.use('/bus',busRoute );
router.use('/routes',routeRoutes)

export default router;
