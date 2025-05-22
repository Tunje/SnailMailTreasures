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
 * /users:
 *    get:
 *      summary: Get all users
 *      responses:
 *         200:
 *           description: A list of all users
 *           content: 
 *             application/json:
 *              schema:
 *                type: array
 *                items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *    get:
 *      summary: Get a user by ID
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema: 
 *           type: integer
 *      responses:
 *         200:
 *           description: A user object
 *           content: 
 *             application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/allusers", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.get("/user/:userName", getUserByUsername);
userRouter.put("/updateuser/:id", updateUser);
userRouter.delete("/deleteuser/:id", deleteUser);

export default userRouter;