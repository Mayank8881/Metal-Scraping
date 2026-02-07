const express = require("express");
const { getMetalsData } = require("../services/cache.service");

const router = express.Router();

/**
 * GET /api/metals
 * Returns all cached metals prices.
 *
 * Optional query:
 * ?search=gold
 */
router.get("/", (req, res) => {
    const { search } = req.query;

    const cache = getMetalsData();

    let metals = cache.metals;

    /**
     * Search filter
     */
    if (search) {
        metals = metals.filter((m) =>
            m.metal.toLowerCase().includes(search.toLowerCase())
        );
    }

    res.json({
        success: true,
        total: metals.length,
        lastUpdated: cache.lastUpdated,
        sourceStatus: cache.sourceStatus,
        data: metals,
    });
});

/**
 * GET /api/metals/:metalName
 * Returns a single metal object.
 *
 * Example:
 * /api/metals/gold
 */
router.get("/:metalName", (req, res) => {
    const { metalName } = req.params;

    const cache = getMetalsData();

    const found = cache.metals.find(
        (m) => m.metal.toLowerCase() === metalName.toLowerCase()
    );

    if (!found) {
        return res.status(404).json({
            success: false,
            message: `Metal '${metalName}' not found.`,
            availableMetals: cache.metals.map((m) => m.metal),
            lastUpdated: cache.lastUpdated,
        });
    }

    res.json({
        success: true,
        lastUpdated: cache.lastUpdated,
        data: found,
    });
});


module.exports = router;
