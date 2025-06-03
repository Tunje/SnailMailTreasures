import express from "express";
import { 
  getAllUsers, 
  getUserById, 
  getUserByUsername, 
  updateUser,
  addToFavourite, 
  deleteUser 
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.get("/allusers", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.get("/user/:userName", getUserByUsername);
userRouter.put("/updateuser/:id", updateUser);
userRouter.post("/favorites/:id", protect, addToFavourite)
userRouter.delete("/deleteuser/:id", deleteUser);

export default userRouter;