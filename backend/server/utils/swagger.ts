import express from "express";
import { userInfo } from "os";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());

const PORT = 3000;


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "snailmail API",
            version: "1.0.0",
            description: "Snailmail website API",
        },
    },
    apis: ["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`server is up and running in http://localhost:${PORT}`);
});


let shopitems = [
    {
        id: 1,
        itemname: "1984",
        price: "400kr",
        description: "george orwell"
    },
    {
        id: 2,
        itemname: "the Hobbit",
        price: "400kr",
        description: "J.R.R. Tolkien",
        
    }
];

/**
 * @swagger
 * /shopitems:
 *  get:
 *   summary: retrives a list of all items
 *   description: Retrieve a list of items in the library.
 *   responses:
 *    200:
 *      description: A list of items.
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id: 
 *                   type: integer
 *                title:
 *                   type: string
 *                price:
 *                   type: string
 *                description:
 *                   type: string
 */


app.get('/shopitems', (req, res) => {
    res.json(shopitems);
});
/**
 * @swagger
 * /shopitems:
 *  post:
 *   summary: Add a new item
 *   requestBody:
 *      require: true
 *      content:
 *         application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - price
 *                - description
 *              properties:
 *                title:
 *                  type: string
 *                price:
 *                  type: string
 *                description:
 *                  type: string
 *   responses:
 *    200:
 *      description: new item added to shop successfully.
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                id: 
 *                   type: integer
 *                title:
 *                   type: string
 *                price:
 *                   type: string
 *                description:
 *                   type: string
 */
app.post("/itemshop", (req, res) => {
    const newitem = {
        id: item.length + 1,
        title: req.body.item,
        price: req.body.price,
        description: req.body.description,
    };
    item.push(newitem);
    res.json({ message: "items added succcessfully!", shopitem: newitem })
});
/**
 * @swagger
 * /items/{id}:
 *  put:
 *   summary: update an existing item
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: numeric ID of the item to update
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *         type: object
 *         properties:
 *           title:
 *             type: string
 *           price:
 *             type: string
 *           description:
 *             type: string
 *   responses:
 *    200:
 *     description: item updated successfully.
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *        properties:
 *            message:
 *              type: string
 *            book: 
 *              type: string
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                price:
 *                  type: string
 *                description:
 *                  type: string
 * 
 *      404:
 *        description: item not found.
 */
app.put("/storeitem:id", (req, res) => {
    const itemid = parseInt(req.params.id)
    const item = item.find(b => b.id === item.id);
    if (!item) {
        return res.status(404).json({ message: "item not found!" });
    }
    item.title = req.body.title || item.title;
    item.price = req.body.price || item.price;
    item.description = req.body.description || item.description;
    res.json({ message: "shopitem updated successfully!", book });
});
/**
 * @swagger
 * /item/{id}:
 *  delete:
 *   summary: you have delete a shopitem
 *   parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: numeric ID of the item to delete
 *   responses:
 *    200:
 *     description: shopitem deleted successfully.
 *     content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *   404:
 *     description: item not found.
 */
app.delete("/shopitem/:id", (req, res) => {
    const itemid = parseInt(req.params.id);
    item = item.filter(b => b.id !== itemid);
    res.json({ message: "shopitem was removed from your list!" });
});

app.get('/user', (req, res) => {
    res.json(userInfo);
});
/**
 * @swagger
 * /user:
 *  get:
 *   summary: user profiles
 *   requestBody:
 *      require: true
 *      content:
 *         application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userid
 *                - username
 *                - password
 *                - email
 *                - status
 *              properties:
 *                userid:
 *                  type: string
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                status:
 *                  type: string
 *                  enum: [active, inactive, pendeing]
 *                  description: the status of the user account
 *   responses:
 *    200:
 *      description: list of users
 *      content:
 *        application/json:
 *          schema:
 *              type: array
 *              properties:
 *                userid:
 *                  type: string
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                status:
 *                  type: string
 *                  enum: [active, inactive, pendeing]
 *                  description: the status of the user account
 */