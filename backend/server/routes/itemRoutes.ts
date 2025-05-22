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

// Keep all routes from master
itemRouter.get("/allitems", getAllItems);
itemRouter.get("/item/:id", getItemById);
itemRouter.post("/createitem", createItem);
itemRouter.put("/updateitem/:id", updateItemById);
itemRouter.delete("/deleteitem/:id", deleteItem);

// Add search route with similar pattern to other routes
itemRouter.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const items = await Item.find({
      itemName: { $regex: new RegExp(q as string, 'i') },
    }).populate('userId', 'username email');
    res.json(items);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default itemRouter;
