import express, { NextFunction, Request, Response } from "express";
import Item, { ItemDocument } from "../models/itemModel";
import { AuthRequest } from "../middleware/authMiddleware";

// GET all items and show the user who created them
export const getAllItems = async (req: Request, res: Response) => {
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
};

// GET a single item by ID and show the user who created it
export const getItemById = async (req: Request, res: Response) => {
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
};

// Add a new item
export const createItem = async (req: AuthRequest, res: Response) => {
  try {
    const { itemName, description, imageUrl, category, price, userId } = req.body;
    const newItem = new Item({
      itemName,
      description,
      imageUrl,
      category,
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
};

// Update an item by ID
export const updateItemById = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const updateItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updateItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updateItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Delete an item
export const deleteItem = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `Item by name '${deletedItem.itemName}' with ID (ID: ${deletedItem._id}) was successfully deleted.`});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
