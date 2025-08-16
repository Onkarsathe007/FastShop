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

router.get("/login", homeController.loginRender);

router.post("/login", redirectUrl, homeController.authenticate);

router.get("/signup", homeController.signUpRender);

router.post("/signup", homeController.signUp);

router.get("/logout", homeController.logout);

module.exports = router;
