// This file defines the Swagger schemas for the User model used in the application.

// Schema for the User model
export const UserSchema = {
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
};
