import mongoose, { Document, Schema, Model } from "mongoose";

// Define the User schema and model
export interface UserDocument extends Document {
  userName: string;
  email: string;
}

// Create the schema for the User model
const UserSchema: Schema<UserDocument> = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const User: Model<UserDocument> = mongoose.model<UserDocument>("User", UserSchema);
export default User;
