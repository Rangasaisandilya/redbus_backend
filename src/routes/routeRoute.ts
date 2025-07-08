import { validateRequest } from './../middleware/validateRequest';
import express from 'express';
import { getAllRoutes, createRoute, updateRoute } from '../controllers/routeController';
import { createRouteValidator, updateRouteValidator } from '../validators/routeValidator';

const router = express.Router();

router.get('/routes', getAllRoutes);
router.post('/routes', createRouteValidator, validateRequest, createRoute);
router.put('/routes/:id', updateRouteValidator, validateRequest, updateRoute);

export default router;
