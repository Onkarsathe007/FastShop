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

//Serve static files
app.use('/assets', express.static(path.join(__dirname, 'views/template/assets')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//ejs mate setup.
app.engine("ejs", ejsMate);

//home route.
app.get("/", async (req, res) => {
    try {
        var product = await productModel.find();
        res.render("home.ejs", { product });
    } catch (e) {
        console.log("Error:" + e + " Occured");
    }
});


app.get("/products/:id", async (req, res) => {
    var { id } = req.params;
    console.log(id);
    const product = await productModel.findOne({ id: id });
    console.log(product);
    res.render("./product.ejs", { product });
});

app.get("/products/:id/reviews", async (req, res) => {
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

        const { error, value }: reviewSchema.validate(reviewData);



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

app.listen(process.env.PORT, () => {
    console.log("Listing on port :" + process.env.PORT);
});
