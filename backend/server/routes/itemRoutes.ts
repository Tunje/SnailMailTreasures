import express from "express";
import { protect } from "../middleware/authMiddleware";
import { 
  getAllItems, 
  getItemById, 
  createItem, 
  updateItemById,
  addDealToItem, 
  deleteItem 
} from "../controllers/itemController";

const itemRouter = express.Router();

itemRouter.get("/allitems", getAllItems);
itemRouter.get("/item/:id", getItemById);
itemRouter.post("/createitem", protect, createItem);
itemRouter.put("/updateitem/:id", protect, updateItemById);
itemRouter.put("/adddeal/:id", protect, addDealToItem);
itemRouter.delete("/deleteitem/:id", protect, deleteItem);

export default itemRouter;