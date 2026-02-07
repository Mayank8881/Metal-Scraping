const { scrapeKitcoMetals } = require("../scrapers");
const { setMetalsData } = require("./cache.service");

const SCRAPE_INTERVAL_SECONDS = parseInt(
    process.env.SCRAPE_INTERVAL_SECONDS || "60"
);

/**
 * This function fetches metals data from scrapers
 * and stores it in cache.
 */
async function refreshMetalsPrices() {
    console.log("🔄 Scraping metals prices...");

    // Try Kitco first
    const kitcoResult = await scrapeKitcoMetals();

    if (kitcoResult.success && kitcoResult.metals.length > 0) {
        console.log("✅ Scraped from Kitco successfully.");

        setMetalsData(kitcoResult.metals, {
            Kitco: "success",
        });

        return;
    }

    console.log("❌ Kitco scraping failed.");
    console.log("Reason:", kitcoResult.error);
    console.log("Status Code:", kitcoResult.statusCode);

    /**
     * Future fallback:
     * Investing.com / TradingEconomics / MoneyControl etc.
     */

    setMetalsData([], {
        Kitco: "failed",
    });
}

/**
 * Starts a background job that refreshes metals prices.
 */
function startMetalsScraperJob() {
    // Run once immediately when server starts
    refreshMetalsPrices();

    // Then repeat every X seconds
    setInterval(refreshMetalsPrices, SCRAPE_INTERVAL_SECONDS * 1000);
}

module.exports = {
    startMetalsScraperJob,
};
