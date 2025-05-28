import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import mongoose from "mongoose";  
import cors from "cors";
import userRouter from "./server/routes/userRoutes";
import itemRouter from "./server/routes/itemRoutes";
import authRouter from "./server/routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 3000; // Default port is 5000, backup port is 3000

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the React frontend
app.use(express.json());

// MongoDB connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) =>
  console.error(`MongoDB connection error: ${err}`)
);

// Routes
app.use("/api/auth", authRouter); // All routes begin with /api/auth
app.use("/api/users", userRouter); // All routes begin with /api/users
app.use("/api/items", itemRouter); // All routes begin with /api/items

// Start server
connectToDatabase();
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
