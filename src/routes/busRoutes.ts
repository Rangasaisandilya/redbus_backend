import express from "express";
import { addBus, getAllBuses, updateBus } from "../controllers/busController";
import { authenticate } from "../middleware/auth";
import { busValidator } from "../middleware/validations/busValidation";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bus
 *   description: Bus management endpoints
 */

/**
 * @swagger
 * /api/v1/bus:
 *   post:
 *     summary: Add a new bus
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
 *         description: Bus created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
router.post("/", authenticate, busValidator, validateRequest, addBus);

/**
 * @swagger
 * /api/v1/bus:
 *   get:
 *     summary: Get all buses
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of buses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAllBuses);

/**
 * @swagger
 * /api/v1/bus/{id}:
 *   put:
 *     summary: Update bus
 *     tags: [Bus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bus not found
 */
router.put("/:id", authenticate, busValidator, validateRequest, updateBus);

export default router;
