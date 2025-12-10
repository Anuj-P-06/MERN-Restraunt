import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { connectDB } from "./config/config.db.js"
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from 'dotenv'
dotenv.config()
import connectCloudinary from './config/cloudinary.js'
import { trusted } from 'mongoose'


const app = express();

// Database connetion
connectDB()

// cloudinary connection
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true // accept cookies coming frontend and check them
}))
app.use(morgan())
app.use(cookieParser())

//port
const PORT = process.env.PORT || 5000;


// API
app.get("/",(req,res) => {
    res.send('Hello from the server')
});

app.use('/api/auth',authRoutes)
app.use('/api/category',categoryRoutes)
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

