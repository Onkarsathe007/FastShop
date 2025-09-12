require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const ConnectMongo = require("../config/conn/db.js");
const _Schema = mongoose.Schema;
const products = require("./data.js");

//importing an model.
const productModel = require("../models/product.model.js");

const ownerId = "686bf803825cf6c5f8a942b3";

//mapping an initial owner to product
const product = products.map((product) => ({
	...product,
	owner: ownerId,
}));

ConnectMongo()
	.then(() => {
		console.log("Connected to MongoDB");
		return productModel.insertMany(product, { ordered: false });
	})
	.then((res) => {
		console.log(`${res.length} products saved`);
		process.exit(0);
	})
	.catch((e) => {
		console.log("Error occurred:", e);
		process.exit(1);
	});
