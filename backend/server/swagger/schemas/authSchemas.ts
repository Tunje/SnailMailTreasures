// This file defines the Swagger schemas for the User model for use
// in the application for user creation and login.

// Schema for user creation
export const CreateUserSchema = {
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
};

// Optional schema for user login
export const RegisteredUserSchema = {
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
};

// Optional schema for updating a user
export const UpdateUserSchema = {
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
};
