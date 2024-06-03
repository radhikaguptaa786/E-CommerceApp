// const express = require("express");
// const colors = require("colors");
import express from "express";
import color from "colors";
import dotenv from "dotenv";
import morgon from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cartRoutes from './routes/cartRoutes.js';
import categoryRoute from "./routes/categoryRoute.js";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
// configure
dotenv.config();

// database config
connectDB();
// rest object
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use('/api', cartRoutes); // Use cart routes
app.use(morgon("dev"));
// rest APIs
app.get("/", (req, res) => {
  res.send(
    //{ message: "Welcome to ecommerce app"},
    "<h1>Welcome to ECommerce App</h1>"
  );
});
// PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.bgCyan.white);
});
