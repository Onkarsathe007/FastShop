const express = require("express");
var router = express.Router();
const productModel = require("../../models/product.model.js");
const connectMongo = require("../../config/conn/db.js");
const User = require("../../models/user.model.js");
const passport = require("passport");
const LocalPassport = require("passport-local");
const { redirectUrl } = require("../middleware/auth.middlware.js");
//controlllers
const homeController = require("../controllers/home.controller.js");

//Middleares at: ~/api/middlware/user.middlware.js
passport.use(new LocalPassport(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get("/", homeController.index);

router
  .route("/login")
  .get(homeController.loginRender)
  .post(redirectUrl, homeController.authenticate);

router
  .route("/signup")
  .get(homeController.signUpRender)
  .post(homeController.signUp);

router.get("/logout", homeController.logout);

module.exports = router;
