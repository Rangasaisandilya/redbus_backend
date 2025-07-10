import express from 'express';
import { getAllUsers, updateUserProfile } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { updateUserValidator } from '../middleware/validations/userValidation';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [passenger, driver, owner, admin]
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/', authenticate, getAllUsers);
router.put('/:id', authenticate, updateUserValidator, validateRequest, updateUserProfile);

export default router;
