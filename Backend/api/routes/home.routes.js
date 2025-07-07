const express = require("express");
var router = express.Router();
const productModel = require("../../models/product.model.js");
const connectMongo = require("../../config/conn/db.js");
const User = require("../../models/user.model.js");
const passport = require("passport");
const LocalPassport = require("passport-local");



//Middleares at: ~/api/middlware/user.middlware.js
passport.use(new LocalPassport(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", async (req, res) => {
    try {
        var product = await productModel.find();
        res.locals.success = req.flash("success");
        res.render("home.ejs", { product });
    } catch (e) {
        console.log("Error:" + e + " Occured");
    }
});


router.get("/registerUser", async (req, res) => {
    let fakeUser = new User({
        email: "shubham@gmail.com",
        username: "nitin1711",
    });
    let registerUser = await User.register(fakeUser, "pass@123")
    res.send(registerUser);
});

router.get("/login", async (req, res) => {
    res.render("./login.ejs")
});

router.get("/signup", async (req, res) => {
    res.locals.success = req.flash("error") || null;
    res.locals.error = req.flash("error") || null;
    res.render("./signup.ejs")
});

router.post("/signup", async (req, res) => {
    try {
        var { email, username, password } = req.body;
        const user = {
            email: email,
            username: username,
        };
        var registerUser = await User.register(user, password);
        console.log(registerUser);
        req.flash("success", "Signup Successfully");
        res.redirect("/")
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
});


module.exports = router;
