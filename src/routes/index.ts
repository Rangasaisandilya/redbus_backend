import { Router } from "express";
import tripsRoute from './tripRoute'

import UserRoute from "./userRoutes";
import authRoute from "./authRoutes";
import busRoute from "./busRoutes";

const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/",tripsRoute)

router.use('/user',UserRoute );
router.use('/auth',authRoute );
router.use('/bus',busRoute );

export default router;
