import axios from "axios";

/**
 * Backend Base URL
 * If your backend runs on port 5000:
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Get all metals
 */
export async function fetchMetals(search = "") {
    const url = search ? `${BASE_URL}?search=${search}` : BASE_URL;
    const res = await axios.get(url);
    return res.data;
}

/**
 * Get single metal
 * Example: /api/metals/gold
 */
export async function fetchMetalByName(metalName) {
    const res = await axios.get(`${BASE_URL}/${metalName}`);
    return res.data;
}
