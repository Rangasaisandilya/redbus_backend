import express from "express";
import { addBus, getAllBuses, updateBus } from "../controllers/busController";
import { authenticate } from "../middleware/auth";
import { busValidator } from "../middleware/validations/busValidation";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

router.post("/", authenticate, busValidator, validateRequest, addBus);
router.get("/", authenticate, getAllBuses);
router.put("/:id", authenticate, busValidator, validateRequest, updateBus);

export default router;
