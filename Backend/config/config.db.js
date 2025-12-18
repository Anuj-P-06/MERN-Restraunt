import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//async because there might be some delay connecting
export const connectDB = async () => {
  // Skip DB connection during tests / CI
  if (process.env.NODE_ENV === "test") {
    console.log("Skipping MongoDB connection in test mode");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error.message);

    // Crash app in production if DB fails
    process.exit(1);
  }
};

