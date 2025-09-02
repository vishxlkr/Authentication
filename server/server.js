import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

const app = express();

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(
   cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
   })
);

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use("/api/users", userRoutes);

// A simple root route to check if the API is running
app.get("/", (req, res) => {
   res.send("API is running successfully...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
