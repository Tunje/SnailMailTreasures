// This file defines the Swagger schemas for the Item model used in the application.

// Schema for the Item model
export const ItemSchema = {
  type: "object",
  required: ["itemName", "description", "category", "imageUrl", "price"],
  properties: {
    _id: { type: "string", example: "507f1f77bcf86cd799439011" },
    itemName: { type: "string", example: "Vintage Camera" },
    description: { type: "string", example: "A classic camera from the 1960s" },
    imageUrl: { type: "string", example: "http://example.com/image.jpg" },
    category: { type: "string", example: "Photography" },
    price: { type: "number", example: 150.0 },
    userId: { type: "string", example: "507f1f77bcf86cd799439012" },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2023-10-01T12:00:00Z",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      example: "2023-10-01T12:00:00Z",
    },
  },
};

// Schema for creating a new Item
export const CreateItemSchema = {
  type: "object",
  required: [
    "itemName",
    "description",
    "imageUrl",
    "category",
    "price",
    "userId",
  ],
  properties: {
    itemName: {
      type: "string",
      example: "Vintage Camera",
      description: "Name of the item",
    },
    description: {
      type: "string",
      example: "A classic camera from the 1960s",
      description: "Detailed description of the item",
    },
    imageUrl: {
      type: "string",
      example: "http://example.com/image.jpg",
      description: "URL of the item's image",
    },
    category: {
      type: "string",
      example: "Photography",
      description: "Category this item belongs to",
    },
    price: {
      type: "number",
      example: 150.0,
      description: "Price of the item",
    },
    userId: {
      type: "string",
      example: "507f1f77bcf86cd799439012",
      description: "ID of the user who owns the item",
    },
  },
};

// Schema for updating an Item
export const UpdateItemSchema = {
  type: "object",
  properties: {
    itemName: {
      type: "string",
      example: "Vintage Camera Updated",
      description: "Updated name of the item",
    },
    description: {
      type: "string",
      example: "An updated description of the vintage camera",
      description: "Updated description of the item",
    },
    imageUrl: {
      type: "string",
      example: "http://example.com/updated_image.jpg",
      description: "Updated URL of the item's image",
    },
    category: {
      type: "string",
      example: "Photography Updated",
      description: "Updated category this item belongs to",
    },
    price: {
      type: "number",
      example: 175.0,
      description: "Updated price of the item",
    },
  },
};
