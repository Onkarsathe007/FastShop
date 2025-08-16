const express = require("express");
var router = express.Router();
const connectMongo = require("../../config/conn/db.js");
const schema = require("../../utils/middlewares/mongoose/index.js");
const { isLoggedIn } = require("../middleware/auth.middlware.js");
const { isOwner } = require("../middleware/auth.middlware.js");
const { redirectUrl } = require("../middleware/auth.middlware.js");
const { checkProductOwnership } = require("../middleware/auth.middlware.js");

const productModel = require("../../models/product.model.js");
const productController = require("../controllers/product.controller.js");

//connecting to mongoDB.
connectMongo();

router.get("/new", isLoggedIn, productController.newRender);

router.post("/new", productController.newProduct);

router.get("/:id", productController.renderProduct);

router.post("/:id/reviews", isLoggedIn, productController.addReview);

router.put(
  "/:id/reviews/:reviewId",
  isLoggedIn,
  productController.updateReview,
);

router.get(
  "/:id/update",
  isOwner,
  isLoggedIn,
  productController.updateProductRender,
);

router.post(
  "/:id/update",
  checkProductOwnership,
  productController.updateProduct,
);

router.delete("/:id", isOwner, productController.deleteProduct);

module.exports = router;
