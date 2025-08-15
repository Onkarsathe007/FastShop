const express = require("express");
var router = express.Router();
const connectMongo = require("../../config/conn/db.js");
const schema = require("../../utils/middlewares/mongoose/index.js");
const { isLoggedIn } = require("../middleware/auth.middlware.js");

const { isOwner } = require("../middleware/auth.middlware.js");
const { redirectUrl } = require("../middleware/auth.middlware.js");
const { checkProductOwnership } = require("../middleware/auth.middlware.js");

const productModel = require("../../models/product.model.js");

//connecting to mongoDB.
connectMongo();

router.get("/new", isLoggedIn, (req, res) => {
  res.render("./components/admin/new.ejs");
});

router.post("/new", async (req, res) => {
  const {
    images = [],
    thumbnail,
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
  } = req.body;

  // You can store to DB here
  const newProduct = new productModel({
    ...req.body,
    owner: req.user._id, // assign the owner
  });
  // Save the product
  await newProduct.save();
  console.log("Data Saved");
  // Redirect or respond
  res.send("Product received successfully!");
});

router.get("/:id", async (req, res) => {
  try {
    var { id } = req.params;
    const product = await productModel.findOne({ _id: id });
    res.locals.success = req.flash("success");
    res.render("./product.ejs", { product });
  } catch (e) {
    console.log("Error:" + e + " Occurred");
    res.status(500).send("Error fetching product");
  }
});

router.get("/:id/reviews", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewCount, reviewerName, review } = req.query;

    const reviewData = {
      rating: parseInt(reviewCount),
      reviewerName: reviewerName,
      comment: review,
      date: new Date(),
    };
    const reviewSchema = schema.reviewSchema;

    const { error, value } = reviewSchema.validate(reviewData);

    if (error) {
      console.log("Review validation error:", error.details);
      return res.status(400).send("Invalid review data");
    }

    // Find product and add review to reviews array
    await productModel.findByIdAndUpdate(
      { _id: id },
      { $push: { reviews: reviewData } },
    );
    // Redirect back to product page
    req.flash("success", "Review added successfully");
    res.redirect(`/products/${id}`);
  } catch (error) {
    console.log("Error adding review:", error);
    res.status(500).send("Error adding review");
  }
});

router.get("/:id/update", isOwner, isLoggedIn, async (req, res) => {
  try {
    var { id } = req.params;
    const product = await productModel.findOne({ _id: id });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("components/admin/update.ejs", { product });
  } catch (e) {
    console.log("Error:" + e + " Occurred");
    res.status(500).send("Error fetching product");
  }
});

router.post("/:id/update", checkProductOwnership, async (req, res) => {
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
      thumbnail,
    } = req.body;

    // Process images array - filter out empty strings
    const processedImages = Array.isArray(images)
      ? images.filter((img) => img && img.trim() !== "")
      : images && images.trim() !== ""
        ? [images]
        : [];

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
        depth: parseFloat(depth) || 0,
      },
      returnPolicy,
      shippingInformation,
      warrantyInformation,
      description,
      images: processedImages,
      thumbnail: thumbnail && thumbnail.trim() !== "" ? thumbnail : undefined,
    };
    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    console.log("fuck you this time");
    req.flash("success", "Product Updated Successfully");
    res.redirect(`/products/${id}`);
  } catch (e) {
    console.log("Error updating product:" + e);
    res.status(500).send("Error updating product");
  }
});

router.delete("/:id", async (req, res) => {
  console.log("DELETE route hit with ID:", req.params.id);
  console.log("Request method:", req.method);
  try {
    const { id } = req.params;
    console.log(id);
    console.log("Attempting to delete product with ID:", id);
    const deletedProduct = await productModel.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      console.log("Product not found with ID:", id);
      res.redirect("/");
    }

    req.flash("success", "Product deleted successfully");
    res.redirect("/");
  } catch (e) {
    console.log("Error deleting product:" + e);
    res.status(500).send("Error deleting product");
  }
});

module.exports = router;
