const express = require("express");
var router = express.Router();
const productModel = require("../../models/product.model.js");

router.get("/", async (req, res) => {
    try {
        var product = await productModel.find();
        res.locals.success = req.flash("success");
        res.render("home.ejs", { product });
    } catch (e) {
        console.log("Error:" + e + " Occured");
    }
});

module.exports = router;
