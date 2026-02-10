// ============================================================================
// METALS.API.JS - Backend API Service Layer
// ============================================================================
// Handles all HTTP requests to the backend API for fetching metal price data
// Uses axios library for HTTP calls
// Base URL loaded from environment variable VITE_API_BASE_URL
// Set in .env file as: VITE_API_BASE_URL=http://localhost:5000/api/metals

import axios from "axios";

// Backend API base URL - configured in .env file
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches all metals or searches for specific metals
 * @param {string} search - Optional search query to filter by metal name
 * @returns {Promise} Response data with metals array, lastUpdated, sourceStatus
 * 
 * Examples:
 * fetchMetals() - returns all metals
 * fetchMetals("gold") - returns only gold entries
 */
export async function fetchMetals(search = "") {
    // Build URL with optional search parameter
    const url = search ? `${BASE_URL}?search=${search}` : BASE_URL;
    // Make GET request to backend
    const res = await axios.get(url);
    // Return response data (metals array and metadata)
    return res.data;
}

/**
 * Fetches a single metal by name
 * @param {string} metalName - Name of metal (case-insensitive)
 * @returns {Promise} Single metal object with price data
 * 
 * Examples:
 * fetchMetalByName("gold")
 * fetchMetalByName("silver")
 * fetchMetalByName("platinum")
 */
export async function fetchMetalByName(metalName) {
    // Make GET request for specific metal
    const res = await axios.get(`${BASE_URL}/${metalName}`);
    // Return single metal object
    return res.data;
}
