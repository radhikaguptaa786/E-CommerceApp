// const express = require("express");
// const colors = require("colors");
import  express  from "express";
import  color from "colors";
import dotenv from "dotenv"
import morgon from "morgan"
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
// configure
dotenv.config();

// database config
connectDB();
// rest object
const app = express();
// middlewares
app.use(express.json())
// routes
app.use('/api/v1/auth',authRoutes)
app.use(morgon('dev'))
// rest APIs
app.get("/", (req, res) => {
  res.send(
    //{ message: "Welcome to ecommerce app"},
    "<h1>Welcome to ECommerce App</h1>"
  );
});
// PORT
const PORT =process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.bgCyan.white);
});
