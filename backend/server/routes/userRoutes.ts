import express from "express";
import { 
  getAllUsers, 
  getUserById, 
  getUserByUsername, 
  updateUser,
  removeFromFavourite,
  addToFavourite, 
  deleteUser, 
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const userRouter = express.Router();

/**
 * @swagger
 * /api/users/allUsers:
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
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         404:
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "User not found"
 *         500:
 *           description: Server error
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
 * /api/users/{id}:
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
 * /api/users/{id}:
 *   post:
 *     summary: Add an item to a user's favourites
 *     description: Adds an item to a user's favourites list and increments the item's favourite count.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Item ID to add to favourites
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: The ID of the item to add to favourites
 *     responses:
 *       200:
 *         description: Item successfully added to favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item added to favourites
 *                 favourites:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Item already in favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item already in favourites
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
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/users/{id}/favourites/{itemId}:
 *   delete:
 *     summary: Remove an item from a user's favourites
 *     description: Removes an item from a user's favourites list and decreases the item's favourite count.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         description: The ID of the item to remove from favourites
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item successfully removed from favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item removed from favourites
 *                 favourites:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Item not in favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item not in favourites
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
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/users/{id}:
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

userRouter.get("/allUsers", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.get("/:userName", getUserByUsername);
userRouter.put("/:id", updateUser);
userRouter.post("/:id", protect, addToFavourite)
userRouter.delete("/:id/favourites/:itemId", removeFromFavourite)
userRouter.delete("/:id", deleteUser);

export default userRouter;