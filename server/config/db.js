import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
   } catch (error) {
      console.error(`Database Connection Error: ${error.message}`);
      // Exit process with failure
      process.exit(1);
   }
};

export default connectDB;
