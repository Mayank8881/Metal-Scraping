/**
 * This is a simple in-memory cache.
 * In production, you can replace this with Redis.
 */

let cache = {
    metals: [],
    lastUpdated: null,
    sourceStatus: {},
};

function setMetalsData(metalsArray, sourceStatus = {}) {
    cache.metals = metalsArray;
    cache.lastUpdated = new Date().toISOString();
    cache.sourceStatus = sourceStatus;
}

function getMetalsData() {
    return cache;
}

module.exports = {
    setMetalsData,
    getMetalsData,
};
