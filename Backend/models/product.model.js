const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for Review 
const reviewSchema = new Schema({
    rating: { type: Number, default: 0 },
    comment: String,
    date: { type: Date, default: Date.now },
    reviewerName: String,
    reviewerEmail: String,
});

//diemension Schema
const dimensionsSchema = new Schema({
    width: Number,
    height: Number,
    depth: Number,
});

const metaSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: String,
    qrCode: String,
});

const productSchema = new Schema({
    id: { type: Number, default: "0" }, // You can skip this if using MongoDB's _id
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: dimensionsSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: [reviewSchema],
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: metaSchema,
    images: [String],
    thumbnail: String,
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
