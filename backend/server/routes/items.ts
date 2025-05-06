import express, { Request, Response } from "express";
import Item, { IItem } from "../models/item";

const itemRouter = express.Router();

itemRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items = await Item.find().populate("userId", "username email");
    res.json(items);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

itemRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const items = await Item.findById(req.params.id).populate(
      "userId",
      "username email"
    );
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

itemRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, image, price, userId } = req.body;
    const newItem = new Item({
      title,
      description,
      image,
      price,
      userId,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

itemRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const updateItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updateItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

itemRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleteItem = await Item.findByIdAndDelete(req.params.id);

    res.json({ message: "Item deleted" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default itemRouter;
