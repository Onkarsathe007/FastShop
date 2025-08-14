const mongoose = require("mongoose");
const ConnectMongo = require("../config/conn/db.js");
const Schema = mongoose.Schema;
const products = require("./data.js");

//importing an model.
const productModel = require("../models/product.model.js");

ConnectMongo()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Error:" + e + " occured!");
  });

const ownerId = "686bf803825cf6c5f8a942b3";

//mapping an initial owner to product
const product = products.map((product) => ({
  ...product,
  owner: ownerId,
}));

productModel
  .insertMany(product)
  .then((res) => {
    console.log("products saved");
  })
  .catch((e) => {
    console.log("Error Occred");
  });
