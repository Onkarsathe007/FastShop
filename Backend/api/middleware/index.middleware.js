const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("passport-local");
require("dotenv").config();

//mongo session store
var store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

module.exports = function setupMiddleware(app) {
  // Parse form and JSON data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Static file serving
  app.use(
    "/assets",
    express.static(path.join(__dirname, "../../views/template/assets")),
  );

  // Template engine setup
  const ejsMate = require("ejs-mate");
  app.engine("ejs", ejsMate);
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../../views"));

  // Override methods like PUT/DELETE
  app.use(methodOverride("_method"));

  // Sessions, cookies, and flash messages
  app.use(cookieParser());
  app.use(
    require("express-session")({
      secret: process.env.SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
      store: store,
      resave: true,
      saveUninitialized: true,
    }),
  );

  app.use(flash());

  //passport | Authentication Setup
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user; // optional: to access user details in EJS
    next();
  });
};
