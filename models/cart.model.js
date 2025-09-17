const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
	id: { type: Number, default: "0" }, // You can skip this if using MongoDB's _id
	title: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, requird: true },
	images: [
		{
			url: String,
			public_id: String,
			original: String,
		},
	],
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		//here we refering to the model, not the schema.
	},
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
