const express = require("express");
const cors = require("cors");

const metalsRoutes = require("./routes/metals.routes");

const app = express();

/**
 * Middlewares
 */
app.use(cors()); // Allows frontend to call backend
app.use(express.json()); // Parses JSON request bodies

/**
 * Routes
 */
app.use("/api/metals", metalsRoutes);

/**
 * Health check route (to confirm server is running)
 */
app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Backend is running fine 🚀" });
});

module.exports = app;
