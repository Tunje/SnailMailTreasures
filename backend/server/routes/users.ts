import express, { Request, Response } from "express";
import User, { UserDocument } from "../models/user";

const userRouter = express.Router();

// GET all users
userRouter.get("/", async (req: Request, res: Response) => {
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
});

// POST a new user
userRouter.post("/", async (req: Request, res: Response) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

// GET a user by ID
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
});

// GET a user by username
userRouter.get("/userName/:userName", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
});

// PUT - Update user by ID
userRouter.put("/:id", async (req: Request, res: Response): Promise<any> => {
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
});

// DELETE - Remove a user by ID
userRouter.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `User by name '${deletedUser.userName}' with ID (ID: ${deletedUser._id}) was successfully deleted.`});
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default userRouter;
