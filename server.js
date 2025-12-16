require("dotenv").config(); // Load .env first

const express = require("express");
const { connectWithRetry } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check route for api to postgres connection
app.get("/", (req, res) => {
    res.json({ message: "API is running inside Docker with Postgres connected!" });
});

// Example placeholder route for future user routes
app.get("/api/status", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
});

// Start server WITH database retry logic
(async () => {
    try {
        await connectWithRetry(); // Connect to database first if not wait two seconds and try again
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
})();
