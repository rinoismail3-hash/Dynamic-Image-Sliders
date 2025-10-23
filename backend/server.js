const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const imageRoutes = require("./routes/imageRoutes");

dotenv.config();
const app = express();

// ✅ Enable CORS for all origins (important for frontend connection)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Parse JSON data
app.use(express.json());

// ✅ Serve uploaded images (if you store files locally)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Mount routes
app.use("/api/images", imageRoutes);

// ✅ Simple route to test server
app.get("/", (req, res) => {
  res.send("🚀 Image Slider Backend Running Successfully!");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
