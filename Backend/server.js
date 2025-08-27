require("dotenv").config();
const express = require("express");
const ConnectMongo = require("./config/conn/db.js");
const app = express();

// Connect to database
ConnectMongo();

// Setup all middleware
const setupMiddleware = require("./api/middleware/index.middleware.js");
setupMiddleware(app);

// Routes
const products = require("./api/routes/product.routes.js");
const home = require("./api/routes/home.routes.js");

app.use("/products", products);
app.use("/", home);

app.listen(process.env.PORT, () => {
  console.log("Listening on port: " + process.env.PORT);
});
