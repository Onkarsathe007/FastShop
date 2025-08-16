const express = require("express");
var router = express.Router();
const productModel = require("../../models/product.model.js");
const connectMongo = require("../../config/conn/db.js");
const User = require("../../models/user.model.js");
const passport = require("passport");
const LocalPassport = require("passport-local");
const { redirectUrl } = require("../middleware/auth.middlware.js");

passport.use(new LocalPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports.index = async (req, res) => {
  try {
    var product = await productModel.find().populate("owner");
    console.log(product);
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.render("home.ejs", { product });
  } catch (e) {
    console.log("Error:" + e + " Occured");
  }
};

module.exports.loginRender = async (req, res) => {
  res.locals.error = req.flash("error");
  res.render("./login.ejs");
};

module.exports.authenticate = (req, res, next) => {
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    successFlash: true,
  })(req, res, () => {
    res.redirect(res.locals.redirectUrl || "/");
  });
};

module.exports.signUpRender = async (req, res) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.render("./signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    var { email, username, password } = req.body;
    const user = {
      email: email,
      username: username,
    };
    var registerUser = await User.register(user, password);
    //Automatic Login after the sign-up
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Signup Successfully");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    next(err);
  });
  req.flash("success", "Logout Successfully");
  res.redirect("/");
};
