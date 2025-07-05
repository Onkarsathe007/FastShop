const mongoose = require("mongoose");
const ConnectMongo = require("../conn/db.js");
const Schema = mongoose.Schema;
const products = require("./data.js");

//importing an model.
const productModel = require("../models/productModel.js");

ConnectMongo()
    .then(() => { console.log("Connected to MongoDB") })
    .catch((e) => { console.log("Error:" + e + " occured!") });

productModel.insertMany(products)
    .then((res) => { console.log("products saved") })
    .catch((e) => { console.log("Error Occred") });
