const productModel = require("../../models/product.model.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        const redirectUrl = req.originalUrl;
        req.session.url = redirectUrl;
        console.log("User not logged in");
        req.flash("error", "Log in to add product/reviews and more");
        return res.redirect("/login");
    }
    next();
}
module.exports.redirectUrl = (req, res, next) => {
    if (req.session.url) {
        res.locals.redirectUrl = req.session.url;
    }
    next();
}

module.exports.checkProductOwnership = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).send("Product not found.");
        }

        if (!product.owner.equals(req.user._id)) {
            return res.status(403).send("You are not authorized to modify this product.");
        }

        // Attach the product for later use in the route
        req.product = product;

        next();
    } catch (err) {
        console.error("Error in checkProductOwnership middleware:", err);
        res.status(500).send("Internal Server Error");
    }
};
