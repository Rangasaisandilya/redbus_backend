import express from 'express';
import { updateUserProfile } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { updateUserValidator } from '../middleware/validations/userValidation';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// router.get('/', authenticate, getUserProfile);
router.put('/:id', authenticate, updateUserValidator, validateRequest, updateUserProfile);

export default router;
