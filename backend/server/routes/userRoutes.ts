import express from "express";
import { 
  getAllUsers, 
  getUserById, 
  getUserByUsername, 
  updateUser, 
  deleteUser 
} from "../controllers/userController";

const userRouter = express.Router();

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: Get all users
 *      tags: [User]
 *      responses:
 *         200:
 *           description: A list of all users
 *           content: 
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   #ref: '#/components/schemas/User'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "An unknown error occurred"
 */

/**
 * @swagger
 * /api/users/{id}:
 *    get:
 *      summary: Get a user by ID
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema: 
 *           type: string
 *          description: The ID of the user to retrieve
 *      responses:
 *         200:
 *           description: User found
 *           content: 
 *             application/json:
 *              schema:
 *               $ref: '#/components/schemas/User'
 *         404:
 *           description: User not found
 *           content:
 *             application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User not found"
 *         500:
 *           description: Server error
 *           content:
 *             application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "An unknown error occurred"
 */

/**
 * @swagger
 * /api/users/{userName}:
 *   get:
 *     summary: Get a user by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userName
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user to retrieve
 *     responses:
 *       200:
 *         description: User found
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unknown error occurred"
 */

/**
 * @swagger
 * /api/users/updateuser/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unknown error occurred
 */

/**
 * @swagger
 * /api/users/deleteuser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unknown error occurred"
 */

userRouter.get("/allusers", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.get("/user/:userName", getUserByUsername);
userRouter.put("/updateuser/:id", updateUser);
userRouter.delete("/deleteuser/:id", deleteUser);

export default userRouter;