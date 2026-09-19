import mongoose from "mongoose";



const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI?.trim()

    if (!mongoUri?.startsWith('mongodb://') && !mongoUri?.startsWith('mongodb+srv://')) {
      throw new Error('MONGODB_URI must start with mongodb:// or mongodb+srv://')
    }

    await mongoose.connect(`${mongoUri}/zibook`)
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;