import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { id: userId }, 
    JWT_SECRET, 
    { expiresIn: 86400 }
  );
};
