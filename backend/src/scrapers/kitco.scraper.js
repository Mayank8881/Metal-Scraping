const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Kitco Scraper
 * ---------------------------
 * This scraper fetches the Kitco metals page HTML
 * and extracts metals prices from it.
 *
 * OUTPUT FORMAT:
 * [
 *   { metal: "Gold", price: 2034.22, currency: "USD", unit: "oz", source: "Kitco" }
 * ]
 */

async function scrapeKitcoMetals() {
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
                palladium: "Palladium",
                rhodium: "Rhodium",
            };

            Object.entries(metalSymbols).forEach(([key, name]) => {
                if (jsonData[key] && jsonData[key].results && jsonData[key].results.length > 0) {
                    const result = jsonData[key].results[0];
                    const price = result.bid || result.ask || result.close;

                    if (price) {
                        metals.push({
                            metal: name,
                            price: parseFloat(price),
                            currency: jsonData[key].currency || "USD",
                            unit: "oz",
                            source: "Kitco",
                            lastUpdated: new Date().toISOString(),
                        });
                        console.log(`✅ Extracted ${name}: $${price}`);
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
