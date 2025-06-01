import express from "express";
import { 
  getAllItems, 
  getItemById, 
  createItem, 
  updateItemById, 
  deleteItem 
} from "../controllers/itemController";
import Item from '../models/itemModel';

const itemRouter = express.Router();

/**
 * @swagger
 * /api/allitems:
 *    get:
 *      summary: Get all items
 *      tags: [Item]
 *      responses:
 *         200:
 *           description: A list of all items
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     itemName:
 *                       type: string
 *                       example: "Vintage Camera"
 *                     description:
 *                       type: string
 *                       example: "A classic camera from the 1960s"
 *                     imageUrl:
 *                       type: string
 *                       example: "http://example.com/image.jpg"
 *                     category:
 *                       type: string
 *                       example: "Photography"
 *                     price:
 *                       type: number
 *                       example: 150.00
 *                     userId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439012"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:00:00Z"
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "An error occurred while fetching items"
 */

/**
 * @swagger
 * /api/item/{id}:
 *    get:
 *      summary: Get an item by ID
 *      tags: [Item]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the item to retrieve
 *      responses:
 *         200:
 *           description: An item object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "507f1f77bcf86cd799439011"
 *                   itemName:
 *                     type: string
 *                     example: "Vintage Camera"
 *                   description:
 *                     type: string
 *                     example: "A classic camera from the 1960s"
 *                   imageUrl:
 *                     type: string
 *                     example: "http://example.com/image.jpg"
 *                   category:
 *                     type: string
 *                     example: "Photography"
 *                   price:
 *                     type: number
 *                     example: 150.00
 *                   userId:
 *                     type: string
 *                     example: "507f1f77bcf86cd799439012"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T12:00:00Z"
 *         404:
 *           description: Item not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Item not found"
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "An error occurred while fetching the item"
 */

/**
 * @swagger
 * /api/createitem:
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            required:
 *              - itemName
 *              - description
 *              - imageUrl
 *              - category
 *              - price
 *              - userId
 *            properties:
 *              itemName:
 *                type: string
 *                example: "Vintage Camera"
 *              description:
 *                type: string
 *                example: "A classic camera from the 1960s"
 *              imageUrl:
 *                type: string
 *                example: "http://example.com/image.jpg"
 *              category:
 *                type: string
 *                example: "Photography"
 *              price:
 *                type: number
 *                example: 150.00
 *              userId:
 *                type: string
 *                example: "507f1f77bcf86cd799439012"
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 itemName:
 *                   type: string
 *                   example: "Vintage Camera"
 *                 description:
 *                   type: string
 *                   example: "A classic camera from the 1960s"
 *                 imageUrl:
 *                   type: string
 *                   example: "http://example.com/image.jpg"
 *                 category:
 *                   type: string
 *                   example: "Photography"
 *                 price:
 *                   type: number
 *                   example: 150.00
 *                 userId:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439012"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00Z"
 *       400:
 *        description: Bad request, missing required fields
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Missing required fields"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the item"
 */

/**
 * @swagger
 * /api/updateitem/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              itemName:
 *                type: string
 *                example: "Vintage Camera Updated"
 *              description:
 *                type: string
 *                example: "An updated description for the vintage camera"
 *              imageUrl:
 *                type: string
 *                example: "http://example.com/updated_image.jpg"
 *              category:
 *                type: string
 *                example: "Photography Updated"
 *              price:
 *                type: number
 *                example: 175.00
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 itemName:
 *                   type: string
 *                   example: "Vintage Camera Updated"
 *                 description:
 *                   type: string
 *                   example: "An updated description for the vintage camera"
 *                 imageUrl:
 *                   type: string
 *                   example: "http://example.com/updated_image.jpg"
 *                 category:
 *                   type: string
 *                   example: "Photography Updated"
 *                 price:
 *                   type: number
 *                   example: 175.00
 *                 userId:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439012"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00Z"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       400:
 *        description: Bad request, missing required fields
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Missing required fields"
 *       500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "An error occurred while updating the item"
 */

/**
 * @swagger
 * /api/deleteitem/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted successfully"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while deleting the item"
 */

itemRouter.get("/allitems", getAllItems);
itemRouter.get("/item/:id", getItemById);
itemRouter.post("/createitem", createItem);
itemRouter.put("/updateitem/:id", updateItemById);
itemRouter.delete("/deleteitem/:id", deleteItem);

// (!!!) Below was a search endpoint which was added but the project may not require it.

// itemRouter.get("/search", async (req, res) => {
//   try {
//     const { q } = req.query;
//     const items = await Item.find({
//       itemName: { $regex: new RegExp(q as string, "i") },
//     }).populate("userId", "username email");
//     res.json(items);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: "An unknown error occurred" });
//     }
//   }
// });

export default itemRouter;
