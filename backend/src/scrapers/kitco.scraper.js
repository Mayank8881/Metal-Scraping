// ============================================================================
// KITCO.SCRAPER.JS - Precious Metals Web Scraper
// ============================================================================
// Scrapes live precious metal prices from Kitco.com
// Extracts Gold, Silver, Platinum, Rhodium, Palladium prices in USD
// Converts prices to INR and gram units for display
// Updates exchange rate daily from free API

const axios = require("axios");
const cheerio = require("cheerio");

// ============================================================================
// EXCHANGE RATE MANAGEMENT
// ============================================================================
// Cache for USD to INR exchange rate to avoid multiple API calls per refresh
let cachedExchangeRate = 90; // Default fallback rate if API fails
let exchangeRateLastFetched = null; // Track when exchange rate was last updated

/**
 * Fetches current USD to INR exchange rate from external API
 * Uses exchangerate-api.com free tier (requires internet connection)
 * Updates global cachedExchangeRate on success
 * Falls back to cached rate if API call fails
 */
async function fetchExchangeRate() {
    try {
        // Call free exchange rate API with 5 second timeout
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD', {
            timeout: 5000,
        });
        // Extract INR rate from response
        const rate = response.data.rates.INR;
        if (rate) {
            // Update global cache with fresh rate
            cachedExchangeRate = rate;
            exchangeRateLastFetched = new Date();
            console.log(`📊 Exchange Rate Updated: 1 USD = ${rate} INR`);
        }
    } catch (error) {
        // Log warning and continue with cached rate
        console.log(`⚠️ Failed to fetch exchange rate: ${error.message}. Using cached rate: ${cachedExchangeRate}`);
    }
}

/**
 * Main Kitco Metals Scraper Function
 * ----------------------------------
 * Fetches Kitco.com precious metals page and extracts live price data
 * Uses web scraping (Cheerio) to parse HTML and extract embedded JSON data
 * 
 * RETURNS:
 * {
 *   success: Boolean,
 *   source: "Kitco",
 *   statusCode: HTTP status code
 *   metals: [
 *     {
 *       metal: "Gold",
 *       priceUSD: 2034.22 (per ounce),
 *       priceUSDAltUnit: 65.45 (per gram),
 *       priceINR: 168833.48 (per ounce),
 *       priceINRAltUnit: 2159.22 (per gram),
 *       currency: "USD/INR",
 *       unitUSD: "oz",
 *       unitINR: "gram",
 *       source: "Kitco",
 *       lastUpdated: ISO timestamp
 *     },
 *     ... more metals
 *   ]
 * }
 */

async function scrapeKitcoMetals() {
    // Step 0: Fetch latest exchange rate before scraping
    await fetchExchangeRate();
    const url = "https://www.kitco.com/price/precious-metals";

    try {
        // ========================================================================
        // STEP 1: Fetch the HTML page from Kitco
        // ========================================================================
        // Use User-Agent header to avoid being blocked by server
        const response = await axios.get(url, {
            headers: {
                // Mimic Chrome browser to avoid scraping detection
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
            },
            timeout: 15000, // 15 second timeout for network request
        });

        // ========================================================================
        // STEP 2: Load HTML into Cheerio for parsing
        // ========================================================================
        // Cheerio allows jQuery-like DOM manipulation without browser engine
        // Much faster than Puppeteer but won't execute JavaScript
        const $ = cheerio.load(response.data);

        // ========================================================================
        // STEP 3: Extract market data from embedded JSON
        // ========================================================================
        // Kitco embeds market data in script tags (Next.js __NEXT_DATA__ pattern)
        // We need to find the script containing JSON with price data
        // The JSON structure contains: { gold, silver, platinum, etc. } with 'bid' prices

        const metals = [];
        let jsonData = null;

        // Search through all script tags for market data
        const scripts = $("script");
        console.log(`📋 Found ${scripts.length} script tags. Searching for market data...`);

        // Iterate through each script tag to find JSON data
        scripts.each((idx, script) => {
            const content = $(script).html();
            // Check if this script contains metals data (has 'gold' and 'bid' markers)
            if (content && content.includes('"gold"') && content.includes('"bid"')) {
                try {
                    // Find where JSON object starts
                    const jsonStart = content.indexOf('{"props"');
                    if (jsonStart === -1) return; // Not the right script, continue

                    // ========================================================================
                    // JSON Extraction Logic: Find matching closing brace
                    // ========================================================================
                    // Simply finding the close brace won't work due to nested objects
                    // Instead: count opening/closing braces while tracking string state
                    // This ensures we capture the complete JSON even with nested data

                    let braceCount = 0; // Track nesting level
                    let inString = false; // Track if we're inside a string value
                    let escaped = false; // Track escaped characters
                    let jsonEnd = jsonStart; // Position of closing brace

                    // Iterate through characters from start to find end
                    for (let i = jsonStart; i < content.length; i++) {
                        const char = content[i];

                        // Handle escape sequences (e.g., \" or \\)
                        if (escaped) {
                            escaped = false;
                            continue;
                        }

                        // Mark next character as escaped
                        if (char === '\\') {
                            escaped = true;
                            continue;
                        }

                        // Toggle string state on unescaped quotes
                        if (char === '"') {
                            inString = !inString;
                            continue;
                        }

                        // Only count braces outside of strings (not part of string values)
                        if (!inString) {
                            if (char === '{') braceCount++;
                            if (char === '}') braceCount--;

                            // When brace count returns to 0, we've found the complete JSON
                            if (braceCount === 0 && i > jsonStart) {
                                jsonEnd = i + 1;
                                break;
                            }
                        }
                    }

                    // ========================================================================
                    // Parse the extracted JSON string
                    // ========================================================================
                    if (jsonEnd > jsonStart) {
                        // Extract JSON string from content
                        const jsonString = content.substring(jsonStart, jsonEnd);
                        // Parse JSON to JavaScript object
                        const parsed = JSON.parse(jsonString);
                        // Navigate to actual market data (nested deep in Nextjs structure)
                        jsonData = parsed.props.pageProps.dehydratedState.queries[0].state.data;
                        console.log("✅ JSON data extracted successfully!");
                    }
                } catch (e) {
                    // Log parse errors but continue (might find data in another script)
                    console.log("⚠️ Failed to parse embedded JSON:", e.message);
                }
            }
        });

        // ========================================================================
        // STEP 4: Extract individual metals from parsed JSON data
        // ========================================================================
        // Map Kitco JSON keys to friendly metal names
        if (jsonData) {
            const metalSymbols = {
                gold: "Gold",
                silver: "Silver",
                platinum: "Platinum",
                rhodium: "Rhodium",
                palladium: "Palladium",
            };

            // Process each metal type
            Object.entries(metalSymbols).forEach(([key, name]) => {
                // Check if metal exists in JSON and has price data
                if (jsonData[key] && jsonData[key].results && jsonData[key].results.length > 0) {
                    // Get first result (most recent price)
                    const result = jsonData[key].results[0];
                    // Extract USD price (bid is best, fallback to ask or close)
                    const priceUSDPerOz = result.bid || result.ask || result.close;

                    // ====================================================================
                    // Price Calculations: Convert units and currencies
                    // ====================================================================
                    if (priceUSDPerOz) {
                        // Conversion constant: 1 troy ounce = 31.1035 grams
                        const GRAMS_PER_OZ = 31.1035;

                        // Calculate USD price per gram
                        const priceUSDPerGram = parseFloat((priceUSDPerOz / GRAMS_PER_OZ).toFixed(2));
                        // Calculate INR price per ounce using exchange rate
                        const priceINRPerOz = parseFloat((priceUSDPerOz * cachedExchangeRate).toFixed(2));
                        // Calculate INR price per gram using exchange rate
                        const priceINRPerGram = parseFloat((priceUSDPerGram * cachedExchangeRate).toFixed(2));

                        // Add metal to results array with all price variations
                        metals.push({
                            metal: name, // "Gold", "Silver", etc.
                            priceUSD: priceUSDPerOz, // Primary USD price (per oz)
                            priceUSDAltUnit: priceUSDPerGram, // Alternate USD price (per gram)
                            priceINR: priceINRPerOz, // Primary INR price (per oz)
                            priceINRAltUnit: priceINRPerGram, // Alternate INR price (per gram)
                            currency: "USD/INR", // Currency pair indicator
                            unitUSD: "oz", // Unit for USD prices (troy ounce)
                            unitINR: "gram", // Unit for INR prices (gram)
                            source: "Kitco", // Data source
                            lastUpdated: new Date().toISOString(), // Timestamp
                        });
                        // Log successful extraction with formatted prices
                        console.log(`✅ Extracted ${name}: $${priceUSDPerOz}/oz ($${priceUSDPerGram}/g) USD / ₹${priceINRPerOz}/oz (₹${priceINRPerGram}/g) INR`);
                    }
                }
            });
        }

        // ========================================================================
        // STEP 5: Return the extracted data
        // ========================================================================
        return {
            success: metals.length > 0, // True if we extracted any metals
            source: "Kitco", // Data source identifier
            statusCode: 200, // HTTP success status
            metals, // Array of metal objects with prices
        };
    } catch (error) {
        // ========================================================================
        // ERROR HANDLING: Return structured error response
        // ========================================================================
        console.log("🔥 FULL KITCO ERROR OBJECT:", error.message);

        return {
            success: false, // Indicates scraping failed
            source: "Kitco",
            statusCode: error.response?.status || 500, // HTTP error code or 500
            metals: [], // Empty array on failure
            error: error.message || JSON.stringify(error, Object.getOwnPropertyNames(error)),
        };
    }
}

// Export scraper function for use in metals.service.js
module.exports = {
    scrapeKitcoMetals,
};
