import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Item schema and model
export interface IItem extends Document {
  name: string;
  description: string;
  category: string;
  image: string; // Image URL or file path
  price: number;
  userId: mongoose.Schema.Types.ObjectId; // Reference to User model
  createdAt: Date;
}

// Create the schema for the Item model
const ItemSchema: Schema<IItem> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Image URL or file path
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to link to User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item: Model<IItem> = mongoose.model<IItem>("Item", ItemSchema);
export default Item;
