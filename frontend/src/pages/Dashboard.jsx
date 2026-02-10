// ============================================================================
// DASHBOARD.JSX - Main Dashboard Page
// ============================================================================
// This is the main page component that manages all state for the dashboard.
// It orchestrates data fetching, searching, and filtering of metal prices.
// State Management: metals data, search query, loading status, flip state
// API Communication: Fetches metal data from backend API
// Auto-refresh: Updates prices every 30 seconds
// Search: Debounced search with 500ms delay to prevent excessive API calls

import { useEffect, useState } from "react";
import { fetchMetals } from "../api/metals.api";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MetalsTable from "../components/MetalsTable";
import Loading from "../components/Loading";

export default function Dashboard() {
    // Search input state - stores current search query
    const [search, setSearch] = useState("");
    // Metals data state - stores array of metal objects from API
    const [metals, setMetals] = useState([]);
    // Loading state - true while fetching API data
    const [loading, setLoading] = useState(true);

    // Last update timestamp from backend
    const [lastUpdated, setLastUpdated] = useState(null);
    // Status of data sources (online/offline status)
    const [sourceStatus, setSourceStatus] = useState({});
    // Global flip cards state - when true, all cards show back side (INR)
    const [flipAllCards, setFlipAllCards] = useState(false);

    /**
     * loadMetals - Fetches metal prices from backend API
     * @param {string} searchText - Optional search query to filter metals
     * Updates: metals, lastUpdated, sourceStatus, loading state
     */
    async function loadMetals(searchText = "") {
        try {
            setLoading(true);
            // Call API to fetch metals data
            const result = await fetchMetals(searchText);

            setMetals(result.data || []);
            setLastUpdated(result.lastUpdated || null);
            setSourceStatus(result.sourceStatus || {});
        } catch (error) {
            console.log("❌ Failed to load metals:", error.message);
            setMetals([]);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Initial load - Runs once when component mounts
     * Fetches all metals data without any search filter
     */
    useEffect(() => {
        loadMetals("");
    }, []);

    /**
     * Auto refresh every 30 seconds
     * Keeps metal prices current by refreshing data automatically
     * Repeats with current search query
     */
    useEffect(() => {
        const interval = setInterval(() => {
            loadMetals(search);
        }, 30000);

        return () => clearInterval(interval);
    }, [search]);

    /**
     * Search handler with debounce (500ms delay)
     * Waits 500ms after user stops typing before making API call
     * Prevents excessive API requests while user is typing
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            loadMetals(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        // Main page container with gradient background
        <div className="min-h-screen w-full px-4 py-8 flex justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Content wrapper - limits max width for better layout */}
            <div className="w-full max-w-6xl flex flex-col gap-6">
                {/* Header - Shows dashboard title and source status info */}
                <Header lastUpdated={lastUpdated} sourceStatus={sourceStatus} />

                {/* Search bar and Flip All button */}
                <SearchBar value={search} onChange={setSearch} flipAllCards={flipAllCards} setFlipAllCards={setFlipAllCards} />

                {/* Main content - Shows loading spinner or metal cards grid */}
                {loading ? <Loading /> : <MetalsTable metals={metals} flipAllCards={flipAllCards} />}
            </div>
        </div>
    );
}
