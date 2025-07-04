const express = require("express");
var router = express.Router();
const connectMongo = require("../conn/db.js");
const schema = require("../utils/middlewares/mongoose/index.js");

const productModel = require("../models/productModel.js");

//connecting to mongoDB.
connectMongo();

router.get("/:id", async (req, res) => {
    try {
        var { id } = req.params;
        console.log(id);
        const product = await productModel.findOne({ id: id });
        console.log(product);
        res.render("./product.ejs", { product });
    } catch (e) {
        console.log("Error:" + e + " Occurred");
        res.status(500).send("Error fetching product");
    }
});

router.get("/:id/reviews", async (req, res) => {
    try {
        const { id } = req.params;
        const { reviewCount, reviewerName, review } = req.query;

        const reviewData = {
            rating: parseInt(reviewCount),
            reviewerName: reviewerName,
            comment: review,
            date: new Date()
        };
        const reviewSchema = schema.reviewSchema;

        const { error, value } = reviewSchema.validate(reviewData);

        if (error) {
            console.log("Review validation error:", error.details);
            return res.status(400).send("Invalid review data");
        }

        // Find product and add review to reviews array
        await productModel.findOneAndUpdate(
            { id: id },
            { $push: { reviews: reviewData } }
        );
        // Redirect back to product page 
        res.redirect(`/products/${id}`);
    } catch (error) {
        console.log("Error adding review:", error);
        res.status(500).send("Error adding review");
    }
});

router.get("/:id/update", async (req, res) => {
    try {
        var { id } = req.params;
        const product = await productModel.findOne({ id: id });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("components/admin/update.ejs", { product });
    } catch (e) {
        console.log("Error:" + e + " Occurred");
        res.status(500).send("Error fetching product");
    }
});

router.post("/:id/update", async (req, res) => {
    try {
        var { id } = req.params;
        const {
            title,
            brand,
            sku,
            price,
            discountPercentage,
            stock,
            category,
            weight,
            minimumOrderQuantity,
            width,
            height,
            depth,
            returnPolicy,
            shippingInformation,
            warrantyInformation,
            description,
            images,
            thumbnail
        } = req.body;

        // Process images array - filter out empty strings
        const processedImages = Array.isArray(images)
            ? images.filter(img => img && img.trim() !== '')
            : (images && images.trim() !== '' ? [images] : []);

        const updateData = {
            title,
            brand,
            sku,
            price: parseFloat(price),
            discountPercentage: parseFloat(discountPercentage),
            stock: parseInt(stock),
            category,
            weight: parseFloat(weight),
            minimumOrderQuantity: parseInt(minimumOrderQuantity),
            dimensions: {
                width: parseFloat(width) || 0,
                height: parseFloat(height) || 0,
                depth: parseFloat(depth) || 0
            },
            returnPolicy,
            shippingInformation,
            warrantyInformation,
            description,
            images: processedImages,
            thumbnail: thumbnail && thumbnail.trim() !== '' ? thumbnail : undefined
        };

        const updatedProduct = await productModel.findOneAndUpdate(
            { id: id },
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }

        res.redirect(`/products/${id}`);
    } catch (e) {
        console.log("Error updating product:" + e);
        res.status(500).send("Error updating product");
    }
});

module.exports = router; 
