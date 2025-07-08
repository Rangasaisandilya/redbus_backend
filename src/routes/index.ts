import { Router } from "express";
import tripsRoute from './tripRoute'


const router = Router();

// Versioned routing prefix is added in app.ts using env.BASIC_API_URL
router.use("/",tripsRoute)


export default router;
