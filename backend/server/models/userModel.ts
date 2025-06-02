import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the User schema and model
export interface UserDocument extends Document {
  userName: string;
  email: string;
  password: string;
  _id: mongoose.Schema.Types.ObjectId
  comparePassword: (password: string) => Promise<boolean>;
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
  password: {
    type: String,
    required: true,
    minlength: 8
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Hash the password before saving
UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method that compares passwords
UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<UserDocument> = mongoose.model<UserDocument>("User", UserSchema);
export default User;
