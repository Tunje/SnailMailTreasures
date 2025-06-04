import { Request, Response } from "express";
import User from "../models/userModel";
import Item from "../models/itemModel";
import logger from "../utils/logger";

// GET all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// GET a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: unknown) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// GET a user's password by username
export const getUserPasswordByUsername = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    if (user) {
      // Only return the password, not the entire user object
      res.status(200).json({ password: user.password });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: unknown) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// GET a user by username
export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: unknown) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

// PUT - Update user by ID
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userName, email } = req.body;

    // This allows for the building of a flexible update object.
    const updateData: Record<string, any> = {};
    if (userName !== undefined) updateData.userName = userName;
    if (email !== undefined) updateData.email = email;

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// POST - Add an item to user's favourites
export const addToFavourite = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.params.id;
    const itemId = req.body.itemId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item already exists in favourites
    if (user.favourites.includes(itemId)) {
      return res.status(400).json({ message: "Item already in favourites" });
    }

    // Add the item to favourites
    user.favourites.push(itemId);
    await user.save();

    // Optionally, you can also update the Item model if needed
    await Item.findByIdAndUpdate(itemId, { $inc: { favouriteCount: 1 } });

    res.status(200).json({ message: "Item added to favourites", favourites: user.favourites });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// DELETE - Remove a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `User by name '${deletedUser.userName}' with ID (ID: ${deletedUser._id}) was successfully deleted.`,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
