import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

const testConnection = async () => {
    try {
        console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI); // Log the URI
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    } finally {
        mongoose.connection.close();
    }
};

testConnection();
