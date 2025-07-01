const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const products = require("./api/product.js");
const home = require("./api/home.js");
require("dotenv").config();

const path = require("path");

//To handel post requrest.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Serve static files
app.use('/assets', express.static(path.join(__dirname, 'views/template/assets')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//set up ejs engine.
app.engine("ejs", ejsMate);

app.use("/products", products);
app.use("", home);

app.listen(process.env.PORT, () => {
    console.log("Listing on port :" + process.env.PORT);
});
