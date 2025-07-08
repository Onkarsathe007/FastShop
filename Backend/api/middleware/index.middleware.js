const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("passport-local");

module.exports = function setupMiddleware(app) {
    // Parse form and JSON data
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Static file serving
    app.use("/assets", express.static(path.join(__dirname, "../../views/template/assets")));

    // Template engine setup
    const ejsMate = require("ejs-mate");
    app.engine("ejs", ejsMate);
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../../views"));

    // Override methods like PUT/DELETE
    app.use(methodOverride("_method"));

    // Sessions, cookies, and flash messages
    app.use(cookieParser());
    app.use(session({ secret: "secret code", resave: false, saveUninitialized: false }));
    app.use(flash());

    //passport | Authentication Setup
    app.use(passport.initialize());
    app.use(passport.session());
};
