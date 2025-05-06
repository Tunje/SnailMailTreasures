import mongoose, { Document, Schema, Model } from "mongoose";

// Define the User schema and model
export interface IUser extends Document {
  username: string;
  email: string;
}

// Create the schema for the User model
const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
