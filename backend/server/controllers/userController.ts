import express, { Request, Response } from "express";
import User from "../models/userModel";

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

// DELETE - Remove a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({
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

// POST - Create a new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // Log the request body to help debug
    console.log("Request body:", req.body);

    const { username, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ userName: username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }

    // Create new user
    const newUser = new User({
      userName: username,
      email,
      password: "password123", // Default password for seeded users
    });

    // Save user to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// POST - Create a new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // Log the request body to help debug
    console.log('Request body:', req.body);
    
    const { username, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ userName: username });
    if (existingUser) {
      return res.status(400).json({ message: "User with this username already exists" });
    }

    // Create new user
    const newUser = new User({
      userName: username,
      email,
      password: 'password123' // Default password for seeded users
    });

    // Save user to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
