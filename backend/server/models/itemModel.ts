import mongoose, { Document, Schema, Model, InsertOneModel } from "mongoose";

// Define the Item schema and model
export interface ItemDocument extends Document {
  itemName: string;
  description: string;
  category: string;
  imageUrl: string; // Image URL or file path
  price: number;
  userId: mongoose.Schema.Types.ObjectId; // Reference to User model
  deal: {
    isOnDeal: boolean; // Indicates if the item is on deal
    dealPrice: number; // Price during the deal
    dealExpires: Date | null; // Expiration date of the deal
  };
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema for the Item model
const ItemSchema: Schema<ItemDocument> = new Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    imageUrl: {
      type: String, // Image URL or file path
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Price should be a positive number
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to link to User model
      required: true,
    },
    deal: {
      isOnDeal: {type: Boolean, default: false}, // Indicates if the item is on deal
      dealPrice: {type: Number, default: 0}, // Price during the deal
      dealExpires: {type: Date, default: null}, // Expiration date of the deal
    },
  }, 
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Item: Model<ItemDocument> = mongoose.model<ItemDocument>("Item", ItemSchema);
export default Item;
