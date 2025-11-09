require("dotenv").config();
const express = require("express");
const ConnectMongo = require("./config/conn/db.js");
const app = express();

// Connect to database
ConnectMongo();

// Setup all middleware
const setupMiddleware = require("./api/middleware/index.middleware.js");
setupMiddleware(app);

// Health check endpoint - Must be before other routes
app.get("/health", (req, res) => {
  console.log("Health endpoint accessed successfully!");
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "FastShop Backend",
  });
});

console.log("Health endpoint registered at /health");

// Routes
const products = require("./api/routes/product.routes.js");
const home = require("./api/routes/home.routes.js");

app.use("/products", products);
app.use("/", home);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
