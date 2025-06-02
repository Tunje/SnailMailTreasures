import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import itemRouter from "./routes/itemRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerConfig";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from the React frontend
app.use(express.json());

// MongoDB connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/snailmail');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) =>
  console.error(`MongoDB connection error: ${err}`)
);

// Routes
app.use('/api/users', userRouter); // All routes begin with /api/users
app.use('/api/items', itemRouter); // All routes begin with /api/items

// Swagger documentation

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Start server
connectToDatabase();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
