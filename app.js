require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

// MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("MongoDB Connection Error:", err));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
    socketTimeoutMS: 45000, // How long sockets to commands can remain idle
    connectTimeoutMS: 15000, // How long to establish initial connection
    retryWrites: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// IoT Tracker Schema
const trackerSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: String, required: true },
});

const Tracker = mongoose.model("Tracker", trackerSchema);

// **POST API: Save IoT Tracker Data**
app.post("/trackers", async (req, res) => {
  try {
    const { deviceId, latitude, longitude, timestamp } = req.body;

    if (!deviceId || !latitude || !longitude || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const tracker = new Tracker({ deviceId, latitude, longitude, timestamp });
    await tracker.save();

    res.status(201).json({ success: true, message: "Tracker data saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **GET API: Retrieve IoT Data by deviceId**
app.get("/trackers/:deviceId", async (req, res) => {
  try {
    const { deviceId } = req.params;
    const trackers = await Tracker.find({ deviceId });

    if (trackers.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    res.status(200).json(trackers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
