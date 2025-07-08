import { handleValidationErrors } from './../middleware/handleValidationErrors';
import { Router } from "express";
import { getAllTrips,createNewTrip, updateTrip } from "../controllers/tripsController";
import { tripValidator } from "../validators/tripValidator";
import { validateRequest } from '../middleware/validateRequest';

const router= Router()

//get all trips
router.get("/trips",getAllTrips)

// post new trips
router.post("/trips",tripValidator,createNewTrip)

//update existing trip

router.put("/trips/:id",tripValidator,validateRequest,updateTrip)

export default router