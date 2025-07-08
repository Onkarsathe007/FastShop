module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log("User not logged in");
        req.flash("error", "you must be logged in to create product");
        return res.redirect("/login");
    }
    next();
}
