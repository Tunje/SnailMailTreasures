import swaggerJSDoc from "swagger-jsdoc";
import { UserSchema } from "./schemas/userSchemas"
import { CreateUserSchema, RegisteredUserSchema, UpdateUserSchema} from "./schemas/authSchemas";
import { ItemSchema, CreateItemSchema, UpdateItemSchema } from "./schemas/itemSchemas";

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
        User: UserSchema,
        // Schemas for authentication
        CreateUser: CreateUserSchema,
        RegisteredUser: RegisteredUserSchema,
        UpdateUser: UpdateUserSchema,
        // Schemas for item
        Item: ItemSchema,
        CreateItem: CreateItemSchema,
        UpdateItem: UpdateItemSchema,
      },
    },
  },
  apis: ["./routes/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
