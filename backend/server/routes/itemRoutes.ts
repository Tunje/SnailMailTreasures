import express from "express";
import { 
  getAllItems, 
  getItemById, 
  createItem, 
  updateItemById, 
  deleteItem 
} from "../controllers/itemController";

const itemRouter = express.Router();

itemRouter.get("/allitems", getAllItems);
itemRouter.get("/item/:id", getItemById);
itemRouter.post("/createitem", createItem);
itemRouter.put("/updateitem/:id", updateItemById);
itemRouter.delete("/deleteitem/:id", deleteItem);

export default itemRouter;