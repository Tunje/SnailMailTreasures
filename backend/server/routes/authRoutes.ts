import express from "express";
import { loginUser, registerUser } from "../controllers/authController";

const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *                description: The user's username
 *                example: john_doe
 *              email:
 *                type: string
 *                description: The user's email address
 *                example: "john@email.com"
 *              password:
 *                type: string
 *                description: The user's secure password
 *                example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The user's unique identifier
 *                  example: "507f1f77bcf86cd799439011"
 *                userName:
 *                  type: string
 *                  description: The user's username
 *                  example: john_doe
 *                email:
 *                  type: string
 *                  description: The user's email address
 *                  example: "john@email.com"
 *                token:
 *                  type: string
 *                  description: The JWT token for the user
 *                  example: "eyJhbGciOi
 *       500:
 *         description: Failed to register user
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *                  example: "Failed to register user"
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: The user's email address
 *                example: "john@email.com"
 *              password:
 *                type: string
 *                description: The user's secure password
 *                example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The user's unique identifier
 *                  example: "507f1f77bcf86cd799439011"
 *                userName:
 *                  type: string
 *                  description: The user's username
 *                  example: john_doe
 *                email:
 *                  type: string
 *                  description: The user's email address
 *                  example: "john@email.com"
 *                token:
 *                  type: string
 *                  description: The JWT token for the user
 *                  example: "eyJhbGciOi
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *                  example: "Invalid email or password"
 *       500:
 *         description: Failed to login user
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *                  example: "Failed to login user"
 */

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
