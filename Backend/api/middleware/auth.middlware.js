module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log("User not logged in");
        req.flash("error", "Log in to add product/reviews and more");
        return res.redirect("/login");
    }
    next();
}
