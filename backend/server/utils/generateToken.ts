import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generate a JWT (JSON Web Token) for a given user ID
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Token set to expire in 1 day
  });
};
