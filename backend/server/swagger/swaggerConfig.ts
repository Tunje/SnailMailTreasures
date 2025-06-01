import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

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
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
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
        // Optional: password update can be added later
      },
    },
    
  },
  apis: ["./src/routes/*.ts", "../src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
