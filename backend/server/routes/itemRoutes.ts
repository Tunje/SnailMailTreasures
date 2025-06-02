import express from "express";
import { protect } from "../middleware/authMiddleware";
import { 
  getAllItems, 
  getItemById, 
  createItem, 
  updateItemById, 
  deleteItem 
} from "../controllers/itemController";

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
 *                   $ref: '#/components/schemas/Item'
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
 *                $ref: '#/components/schemas/Item'
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
 *           $ref: '#/components/schemas/CreateItem'  
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
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
 *            $ref: '#/components/schemas/UpdateItem'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
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
itemRouter.post("/createitem", protect, createItem);
itemRouter.put("/updateitem/:id", protect, updateItemById);
itemRouter.delete("/deleteitem/:id", protect, deleteItem);

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
