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

// Add a deal property to an item
export const addDealToItem = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Ensure user owns the item
    if (item.userId.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "You are unauthorized to edit this item." });
    }

    item.deal = {
      isOnDeal: req.body.isOnDeal,
      dealPrice: req.body.dealPrice,
      dealExpires: req.body.dealExpires,
    };

    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to add deal to item." });
}};

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
