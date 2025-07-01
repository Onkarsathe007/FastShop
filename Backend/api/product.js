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

module.exports = router; 
