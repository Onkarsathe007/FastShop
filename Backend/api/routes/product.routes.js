const express = require("express");
var router = express.Router();
const connectMongo = require("../../config/conn/db.js");
const schema = require("../../utils/middlewares/mongoose/index.js");
const { isLoggedIn } = require("../middleware/auth.middlware.js");
const { isOwner } = require("../middleware/auth.middlware.js");
const { redirectUrl } = require("../middleware/auth.middlware.js");
const { checkProductOwnership } = require("../middleware/auth.middlware.js");
const productModel = require("../../models/product.model.js");
const { storage } = require("../../config/cloudanary.config.js");
const multer = require("multer");

const upload = multer({ storage }); // ✅ now upload is defined

//connecting to mongoDB.
connectMongo();

router.get("/new", isLoggedIn, (req, res) => {
  res.render("./components/admin/new.ejs");
});

router.post("/new", upload.array("images", 5), async (req, res) => {
  try {
    const uploadedImages = req.files.map((file) => ({
      url: file.path, // Cloudinary URL
      public_id: file.filename, // Cloudinary ID
      original: file.originalname,
    }));

    // Build product data
    const newProduct = new productModel({
      ...req.body,
      images: uploadedImages, // ✅ store Cloudinary links instead of req.body.images
      owner: req.user._id,
    });

    // Save product
    await newProduct.save();

    res.json({
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// router.post("/new", upload.array("images", 5), async (req, res) => {
//   const {
//     images = [],
//     thumbnail,
//     title,
//     brand,
//     sku,
//     price,
//     discountPercentage,
//     stock,
//     category,
//     weight,
//     minimumOrderQuantity,
//     width,
//     height,
//     depth,
//     returnPolicy,
//     shippingInformation,
//     warrantyInformation,
//     description,
//   } = req.body;
//
//   // You can store to DB here
//   const newProduct = new productModel({
//     ...req.body,
//     owner: req.user._id, // assign the owner
//   });
//   // Save the product
//   await newProduct.save();
//
//   res.json({
//     message: "Files uploaded successfully!",
//     files: req.files.map((file) => ({
//       url: file.path, // Cloudinary URL
//       public_id: file.filename, // Cloudinary ID
//       original: file.originalname,
//     })),
//   });
//   // console.log("Data Saved");
//   // Redirect or respond
//   res.send("Product received successfully!");
// });
//
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

router.post("/:id/reviews", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewCount, reviewerName, review } = req.body;

    const reviewData = {
      rating: parseInt(reviewCount),
      reviewerName: reviewerName,
      comment: review,
      date: new Date(),
      reviewer: req.user._id.toString(),
      reviewerEmail: req.user.email,
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

// Update a specific review
router.put("/:id/reviews/:reviewId", isLoggedIn, async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const { reviewCount, reviewerName, review } = req.body;

    // Find the product first
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Find the specific review
    const reviewToUpdate = product.reviews.id(reviewId);
    if (!reviewToUpdate) {
      return res.status(404).send("Review not found");
    }

    // Check if current user is the review author
    if (reviewToUpdate.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).send("You can only edit your own reviews");
    }

    const updatedReviewData = {
      rating: parseInt(reviewCount),
      reviewerName: reviewerName,
      comment: review,
      date: new Date(),
      reviewer: req.user._id.toString(),
      reviewerEmail: req.user.email,
    };

    const reviewSchema = schema.reviewSchema;
    const { error, value } = reviewSchema.validate(updatedReviewData);

    if (error) {
      console.log("Review validation error:", error.details);
      return res.status(400).send("Invalid review data");
    }

    // Update the review
    reviewToUpdate.rating = updatedReviewData.rating;
    reviewToUpdate.reviewerName = updatedReviewData.reviewerName;
    reviewToUpdate.comment = updatedReviewData.comment;
    reviewToUpdate.date = updatedReviewData.date;

    // Save the product
    await product.save();

    req.flash("success", "Review updated successfully");
    res.redirect(`/products/${id}`);
  } catch (error) {
    console.log("Error updating review:", error);
    res.status(500).send("Error updating review");
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

router.post(
  "/:id/update",
  upload.array("images", 5),
  checkProductOwnership,
  async (req, res) => {
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

      const uploadedImages = req.files.map((file) => ({
        url: file.path, // Cloudinary URL
        public_id: file.filename, // Cloudinary ID
        original: file.originalname,
      }));

      // Process images array - filter out empty strings and convert to object format
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
        images: uploadedImages,
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
  },
);

router.delete("/:id", isOwner, async (req, res) => {
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
