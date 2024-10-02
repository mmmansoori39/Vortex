import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error connection to mongoDB", error.message);
        process.exit(1)  // 1 is failure and 0 is success status code
    }
}

export default connectDb;