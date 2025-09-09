import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vendor")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);


app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
