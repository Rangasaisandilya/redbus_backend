import { handleValidationErrors } from './../middleware/handleValidationErrors';
import { Router } from "express";
import { getAllTrips,createNewTrip, updateTrip } from "../modules/tripsController";
import { tripValidator } from "../validators/tripValidator";

const router= Router()

//get all trips
router.get("/trips",getAllTrips)

// post new trips
router.post("/trips",tripValidator,createNewTrip)

//update existing trip

router.put("/trips",tripValidator,updateTrip)

export default router