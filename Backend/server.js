require("dotenv").config();
const express = require("express");
const app = express();

// Setup all middleware
const setupMiddleware = require("./middleware");
setupMiddleware(app);

// Routes
const products = require("./api/product");
const home = require("./api/home");

app.use("/products", products);
app.use("/", home);

app.listen(process.env.PORT, () => {
    console.log("Listening on port: " + process.env.PORT);
});

