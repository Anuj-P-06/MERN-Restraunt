import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { connectDB } from "./config/config.db.js"
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
dotenv.config()


const app = express();

// Database connetion
connectDB()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan())
app.use(cookieParser())

//port
const PORT = process.env.PORT || 5000;


// API
app.get("/",(req,res) => {
    res.send('Hello from the server')
});

app.use('/api/auth',authRoutes)
app.use('api/category',categoryRoutes)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})





