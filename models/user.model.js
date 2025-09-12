const mongoose = require("mongoose");
const _Schema = mongoose.Schema;
//Login stratergy I
const passportLocalMongoose = require("passport-local-mongoose");

// const userSchema = mongoose.Schema({
// 	email: {
// 		type: String,
// 		required: true,
// 	},
// 	googleId: String,
// });

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	googleId: {
		type: String,
		unique: true,
		sparse: true, // allows some users to not have googleId
	},
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
