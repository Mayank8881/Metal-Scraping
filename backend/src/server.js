require("dotenv").config();
const app = require("./app");

const { startMetalsScraperJob } = require("./services/metals.service");

const PORT = process.env.PORT || 5000;

/**
 * Start server
 */
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

/**
 * Start scraper background job
 * This will scrape metals prices every X seconds and store in cache.
 */
startMetalsScraperJob();
