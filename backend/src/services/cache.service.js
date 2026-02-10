// ============================================================================
// CACHE.SERVICE.JS - In-Memory Data Cache Service
// ============================================================================
// Stores metal price data and metadata in memory for quick access
// This is a simple in-memory implementation suitable for dev/small deployments
// For production at scale, replace with Redis or similar persistent cache

// In-memory cache object storing metals prices and metadata
let cache = {
    // metals: Array of metal objects with USD and INR prices
    metals: [],
    // lastUpdated: ISO timestamp when data was last refreshed from scraper
    lastUpdated: null,
    // sourceStatus: Object tracking status of data sources (online/offline)
    sourceStatus: {},
};

/**
 * Updates the cache with new metal prices and metadata
 * Called when scrapers successfully fetch fresh data
 * 
 * @param {Array} metalsArray - Array of metal objects with price data
 *                              Example: [{ name: "Gold", usd: 2050.50, inr: 170425, ... }]
 * @param {Object} sourceStatus - Status of data sources (e.g., { kitco: "online" })
 */
function setMetalsData(metalsArray, sourceStatus = {}) {
    // Replace metals array with new data
    cache.metals = metalsArray;
    // Update timestamp to current time (ISO format for API responses)
    cache.lastUpdated = new Date().toISOString();
    // Update source status (tracks which data sources are responding)
    cache.sourceStatus = sourceStatus;
}

/**
 * Retrieves all cached metal prices and metadata
 * Called by API endpoints to return data to frontend
 * 
 * @returns {Object} Cache object with metals array, lastUpdated timestamp, and sourceStatus
 */
function getMetalsData() {
    // Return entire cache object with all metals data
    return cache;
}

// Export functions for use in other modules
module.exports = {
    setMetalsData,
    getMetalsData,
};
