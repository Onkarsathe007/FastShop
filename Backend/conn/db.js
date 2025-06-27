const mongoose = require("mongoose");
async function ConnectMongo() {
    await mongoose.connect('mongodb://127.0.0.1:27017/FastShop');
}

module.exports = ConnectMongo;
