const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const connectMongo = require("./conn/db.js");
require("dotenv").config();

const productModel = require("./models/productModel.js");
const path = require("path");

//connecting to mongoDB.
connectMongo();

//To handel post requrest.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//ejs mate setup.
app.engine("ejs", ejsMate);

app.get("/", async (req, res) => {
    try {
        var product = await productModel.find();
        res.render("home.ejs", { product });
    } catch (e) {
        console.log("Error:" + e + " Occured");
    }
});

app.listen(process.env.PORT, () => {
    console.log("Listing on port :" + process.env.PORT);
});
