const express = require("express");
var router = express.Router();
const productModel = require("../../models/product.model.js");
const _connectMongo = require("../../config/conn/db.js");
const User = require("../../models/user.model.js");
const passport = require("passport");
const LocalPassport = require("passport-local");
const { redirectUrl } = require("../middleware/auth.middlware.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Middleares at: ~/api/middlware/user.middlware.js
passport.use(new LocalPassport(User.authenticate()));

//GOOGLE statergy
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOGGLE_CLIENT_ID,
			clientSecret: process.env.GOGGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		async (_accessToken, _refreshToken, profile, done) => {
			try {
				const existingUser = await User.findOne({ googleId: profile.id });
				if (existingUser) {
					return done(null, existingUser);
				} else {
					const newUser = new User({
						googleId: profile.id,
						username: profile.displayName || profile.emails[0].value,
						email: profile.emails[0].value,
					});
					const user = await newUser.save();
					return done(null, user);
				}
			} catch (error) {
				return done(error, null);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

router.get("/", async (req, res) => {
	var product;
	try {
		product = await productModel.find().populate("owner");
		console.log(product);
		res.locals.success = req.flash("success");
		res.locals.error = req.flash("error");
		console.log(req.user);
		res.render("home.ejs", { product });
	} catch (e) {
		console.log(`Error:${e}·Occured`);
	}
});

router.get("/login", async (req, res) => {
	res.locals.error = req.flash("error");
	res.render("./login.ejs");
});

router.post(
	"/login",
	redirectUrl,
	passport.authenticate("local", {
		failureFlash: true,
		failureRedirect: "/login",
		successFlash: true,
	}),
	async (_req, res) => {
		res.redirect(res.locals.redirectUrl || "/");
	},
);

router.get("/signup", async (req, res) => {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.render("./signup.ejs");
});

router.post("/signup", async (req, res) => {
	var email, username, password, registerUser;
	try {
		({ email, username, password } = req.body);
		const user = {
			email: email,
			username: username,
		};
		registerUser = await User.register(user, password);
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
});

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
		next(err);
	});
	req.flash("success", "Logout Successfully");
	res.redirect("/");
});

router.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	}),
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	}),
);

router.get("/api/logout", (req, res) => {
	req.logout();
	res.send(req.user);
});

router.get("/api/current_user", (req, res) => {
	res.send(req.user);
});

module.exports = router;
