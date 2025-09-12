const mongoose = require("mongoose");
require("dotenv").config();

async function ConnectMongo() {
	try {
		await mongoose.connect(`${process.env.MONGODB_URI}`, {
			serverSelectionTimeoutMS: 30000,
			maxPoolSize: 10,
			socketTimeoutMS: 45000,
		});
		console.log("✅ Connected to MongoDB");
	} catch (e) {
		console.log(`Error·${e}·occcured`);
		throw e;
	}
}

module.exports = ConnectMongo;
