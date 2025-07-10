import { roleAuthentication } from './../middleware/roleAuthentication';
import { authenticate } from './../middleware/auth';
import { handleValidationErrors } from './../middleware/handleValidationErrors';
import { Router } from "express";
import { getAllTrips, createNewTrip, updateTrip, searchTrips } from "../controllers/tripsController";
import { tripValidator } from "../validators/tripValidator";
import { validateRequest } from '../middleware/validateRequest';
import { ADMIN, OWNER } from '../common/roles';

const router = Router()

//get all trips
router.get("/", getAllTrips)
// post new trips
router.post("/", authenticate, roleAuthentication(ADMIN, OWNER), tripValidator, validateRequest, createNewTrip)
//update existing trip
router.put("/:id", authenticate, roleAuthentication(ADMIN, OWNER), tripValidator, validateRequest, updateTrip)
// get trip by source destionation and from date
router.get("/search",searchTrips)

export default router