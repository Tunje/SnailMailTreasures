import { UserDocument } from "../../server/models/userModel";

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument; // Optional user property for authenticated requests
        }
    }
}