import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//async because there might be some delay connecting
export const connectDB = async(req,res) => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database conencted')
    }
    catch(error){
        console.log(`Error in connecting to database ${error}`)
    }
}


