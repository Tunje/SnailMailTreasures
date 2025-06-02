import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Snailmail Treasures API",
      version: "1.0.0",
      description: "API documentation for Snailmail Treasures",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // Schema for user
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
              description: "The user's unique identifier",
            },
            userName: {
              type: "string",
              description: "The user's username",
              example: "john_doe",
            },
            email: {
              type: "string",
              description: "The user's email address",
              example: "user@email.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the user was created",
              example: "2023-10-01T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the user was last updated",
              example: "2023-10-01T12:00:00Z",
            },
          },
        },
        // Optional schema for creating a user
        CreateUser: {
          type: "object",
          required: ["userName", "email", "password"],
          properties: {
            userName: {
              type: "string",
              description: "The user's username",
              example: "john_doe",
            },
            email: {
              type: "string",
              description: "The user's email address",
              example: "user@email.com",
            },
            password: {
              type: "string",
              description: "The user's secure password",
              example: "password123",
            },
          },
        },
        // Optional schema for user login
        RegisteredUser: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The user's unique identifier",
              example: "507f1f77bcf86cd799439011",
            },
            userName: {
              type: "string",
              description: "The user's username",
              example: "john_doe",
            },
            email: {
              type: "string",
              description: "The user's email address",
              example: "user@email.com",
            },
            token: {
              type: "string",
              description: "The JWT token for the user",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        // Optional schema for updating a user
        UpdateUser: {
          type: "object",
          properties: {
            userName: {
              type: "string",
              description: "The user's username",
              example: "john_doe_updated",
            },
            email: {
              type: "string",
              description: "The user's email address",
              example: "",
            },
          },
        },
        // Schema for item
        Item: {
          type: "object",
          required: ["itemName", "description", "category", "imageUrl", "price",],
          properties: {
            _id: { type: "string", example: "507f1f77bcf86cd799439011" },
            itemName: { type: "string", example: "Vintage Camera" },
            description: { type: "string", example: "A classic camera from the 1960s" },
            imageUrl: { type: "string", example: "http://example.com/image.jpg" },
            category: { type: "string", example: "Photography" },
            price: { type: "number", example: 150.00 },
            userId: { type: "string", example: "507f1f77bcf86cd799439012" },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-10-01T12:00:00Z"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2023-10-01T12:00:00Z"
            },
          },
        },
        // Optional schema for creating an item
        CreateItem: {
          type: "object",
          required: ["itemName", "description", "imageUrl", "category", "price", "userId"],
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
              example: 150.00,
              description: "Price of the item",
            },
            userId: {
              type: "string",
              example: "507f1f77bcf86cd799439012",
              description: "ID of the user who owns the item",
            },
          },
        },

      },
    },
  },
  apis: ["../routes/*.js", "../src/models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
