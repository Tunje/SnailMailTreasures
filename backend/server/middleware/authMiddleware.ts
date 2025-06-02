import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, {UserDocument} from "../models/userModel";

export interface AuthRequest extends Request {
    user?: UserDocument;
}

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error("Authentication error:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};