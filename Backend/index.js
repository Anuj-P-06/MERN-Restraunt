import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";

import { connectDB } from "./config/config.db.js";
import connectCloudinary from "./config/cloudinary.js";
import logger from "./config/logger.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// ENV CONFIG (TOP)
// dotenv.config();
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
}); //this is done to pass the github check 


// PORT (TOP – BEFORE USE)
const PORT = process.env.PORT || 5000;

const app = express();

// DB & CLOUDINARY
if (process.env.NODE_ENV !== "test") {
  connectDB();
  connectCloudinary();
}

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true // accept cookies coming frontend and check them
  })
);
app.use(cookieParser());

// LOGGER
app.use((req, res, next) => {
  req.startTime = Date.now();

  res.on("finish", () => {
    logger.info("Request completed", {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - req.startTime,
    });
  });

  next();
});


// ROUTES
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);

// SERVER START (ONLY ONCE)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

export default app;
