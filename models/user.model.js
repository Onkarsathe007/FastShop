const mongoose = require("mongoose");
const _Schema = mongoose.Schema;
//Login stratergy
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
	email: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
