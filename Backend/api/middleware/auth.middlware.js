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
