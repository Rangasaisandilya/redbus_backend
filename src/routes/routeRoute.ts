import { roleAuthentication } from './../middleware/roleAuthentication';
import { authenticate } from './../middleware/auth';
import { validateRequest } from './../middleware/validateRequest';
import express from 'express';
import { getAllRoutes, createRoute, updateRoute } from '../controllers/routeController';
import { createRouteValidator, updateRouteValidator } from '../validators/routeValidator';
import { ADMIN } from '../common/roles';

const router = express.Router();

router.get('/', getAllRoutes);
router.post('/', authenticate, roleAuthentication(ADMIN), createRouteValidator, validateRequest, createRoute);
router.put('/:id', authenticate, roleAuthentication(ADMIN), updateRouteValidator, validateRequest, updateRoute);

export default router;
