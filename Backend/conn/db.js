const mongoose = require("mongoose");
require("dotenv").config();

async function ConnectMongo() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB ");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}

module.exports = ConnectMongo;
