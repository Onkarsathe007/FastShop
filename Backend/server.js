const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

//To handel post requrest.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.listen(process.env.PORT, () => {
    console.log("Listing on port :" + process.env.PORT);
});
