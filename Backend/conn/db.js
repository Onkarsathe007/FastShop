const mongoose = require("mongoose");
require("dotenv").config();

async function ConnectMongo() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/FastShop");
        console.log("Connected to MongoDB ");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}

module.exports = ConnectMongo;
