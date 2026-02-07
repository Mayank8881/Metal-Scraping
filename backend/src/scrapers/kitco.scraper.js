const axios = require("axios");
const cheerio = require("cheerio");

// Cache for exchange rate to avoid multiple API calls
let cachedExchangeRate = 90; // Default fallback rate
let exchangeRateLastFetched = null;

/**
 * Fetch current USD to INR exchange rate
 */
async function fetchExchangeRate() {
    try {
        // Use a free exchange rate API
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD', {
            timeout: 5000,
        });
        const rate = response.data.rates.INR;
        if (rate) {
            cachedExchangeRate = rate;
            exchangeRateLastFetched = new Date();
            console.log(`📊 Exchange Rate Updated: 1 USD = ${rate} INR`);
        }
    } catch (error) {
        console.log(`⚠️ Failed to fetch exchange rate: ${error.message}. Using cached rate: ${cachedExchangeRate}`);
    }
}

/**
 * Kitco Scraper
 * ---------------------------
 * This scraper fetches the Kitco metals page HTML
 * and extracts metals prices from it.
 *
 * OUTPUT FORMAT:
 * [
 *   { metal: "Gold", priceUSD: 2034.22, priceINR: 168833.48, currency: "USD/INR", unit: "oz", source: "Kitco" }
 * ]
 */

async function scrapeKitcoMetals() {
    // Fetch exchange rate at the start
    await fetchExchangeRate();
    const url = "https://www.kitco.com/price/precious-metals";

    try {
        /**
         * STEP 1: Fetch the HTML page
         */
        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
            },
            timeout: 15000,
        });

        /**
         * STEP 2: Load HTML into Cheerio
         * Cheerio allows us to query HTML like jQuery
         */
        const $ = cheerio.load(response.data);

        /**
         * STEP 3: Extract data from the embedded JSON
         * Kitco embeds market data in a __NEXT_DATA__ script tag
         */

        const metals = [];
        let jsonData = null;

        // Look for the script tag containing the JSON data
        const scripts = $("script");
        console.log(`📋 Found ${scripts.length} script tags. Searching for market data...`);

        scripts.each((idx, script) => {
            const content = $(script).html();
            if (content && content.includes('"gold"') && content.includes('"bid"')) {
                try {
                    // Find the start of the JSON object
                    const jsonStart = content.indexOf('{"props"');
                    if (jsonStart === -1) return;

                    // Extract from the start until we find a properly closed JSON
                    // We'll count braces to find the matching close
                    let braceCount = 0;
                    let inString = false;
                    let escaped = false;
                    let jsonEnd = jsonStart;

                    for (let i = jsonStart; i < content.length; i++) {
                        const char = content[i];

                        if (escaped) {
                            escaped = false;
                            continue;
                        }

                        if (char === '\\') {
                            escaped = true;
                            continue;
                        }

                        if (char === '"') {
                            inString = !inString;
                            continue;
                        }

                        if (!inString) {
                            if (char === '{') braceCount++;
                            if (char === '}') braceCount--;

                            if (braceCount === 0 && i > jsonStart) {
                                jsonEnd = i + 1;
                                break;
                            }
                        }
                    }

                    if (jsonEnd > jsonStart) {
                        const jsonString = content.substring(jsonStart, jsonEnd);
                        const parsed = JSON.parse(jsonString);
                        jsonData = parsed.props.pageProps.dehydratedState.queries[0].state.data;
                        console.log("✅ JSON data extracted successfully!");
                    }
                } catch (e) {
                    console.log("⚠️ Failed to parse embedded JSON:", e.message);
                }
            }
        });

        // If we found the JSON data, extract metals from it
        if (jsonData) {
            const metalSymbols = {
                gold: "Gold",
                silver: "Silver",
                platinum: "Platinum",
                rhodium: "Rhodium",
                palladium: "Palladium",
            };

            Object.entries(metalSymbols).forEach(([key, name]) => {
                if (jsonData[key] && jsonData[key].results && jsonData[key].results.length > 0) {
                    const result = jsonData[key].results[0];
                    const priceUSDPerOz = result.bid || result.ask || result.close;

                    if (priceUSDPerOz) {
                        // Conversion: 1 troy oz = 31.1035 grams
                        const GRAMS_PER_OZ = 31.1035;

                        // Calculate prices
                        const priceUSDPerGram = parseFloat((priceUSDPerOz / GRAMS_PER_OZ).toFixed(2));
                        const priceINRPerOz = parseFloat((priceUSDPerOz * cachedExchangeRate).toFixed(2));
                        const priceINRPerGram = parseFloat((priceUSDPerGram * cachedExchangeRate).toFixed(2));

                        metals.push({
                            metal: name,
                            priceUSD: priceUSDPerOz,
                            priceUSDAltUnit: priceUSDPerGram,
                            priceINR: priceINRPerOz,
                            priceINRAltUnit: priceINRPerGram,
                            currency: "USD/INR",
                            unitUSD: "oz",
                            unitINR: "gram",
                            source: "Kitco",
                            lastUpdated: new Date().toISOString(),
                        });
                        console.log(`✅ Extracted ${name}: $${priceUSDPerOz}/oz ($${priceUSDPerGram}/g) USD / ₹${priceINRPerOz}/oz (₹${priceINRPerGram}/g) INR`);
                    }
                }
            });
        }

        /**
         * STEP 4: Return the extracted data
         */
        return {
            success: metals.length > 0,
            source: "Kitco",
            statusCode: 200,
            metals,
        };
    } catch (error) {
        console.log("🔥 FULL KITCO ERROR OBJECT:", error.message);

        return {
            success: false,
            source: "Kitco",
            statusCode: error.response?.status || 500,
            metals: [],
            error: error.message || JSON.stringify(error, Object.getOwnPropertyNames(error)),
        };
    }
}

module.exports = {
    scrapeKitcoMetals,
};
