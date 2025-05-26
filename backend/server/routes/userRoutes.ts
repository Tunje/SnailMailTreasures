import express from "express";
import { 
  getAllUsers, 
  getUserById, 
  getUserByUsername, 
  updateUser, 
  deleteUser 
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/allusers", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.get("/user/:userName", getUserByUsername);
userRouter.put("/updateuser/:id", updateUser);
userRouter.delete("/deleteuser/:id", deleteUser);

export default userRouter;