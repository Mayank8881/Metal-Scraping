import { useEffect, useState } from "react";
import { fetchMetals } from "../api/metals.api";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MetalsTable from "../components/MetalsTable";
import Loading from "../components/Loading";

export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [metals, setMetals] = useState([]);
    const [loading, setLoading] = useState(true);

    const [lastUpdated, setLastUpdated] = useState(null);
    const [sourceStatus, setSourceStatus] = useState({});

    /**
     * Loads metals from backend API
     */
    async function loadMetals(searchText = "") {
        try {
            setLoading(true);

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
     * Initial load
     */
    useEffect(() => {
        loadMetals("");
    }, []);

    /**
     * Auto refresh every 30 seconds
     */
    useEffect(() => {
        const interval = setInterval(() => {
            loadMetals(search);
        }, 30000);

        return () => clearInterval(interval);
    }, [search]);

    /**
     * Search handler (with small delay)
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            loadMetals(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="min-h-screen w-full px-4 py-8 flex justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="w-full max-w-6xl flex flex-col gap-6">
                <Header lastUpdated={lastUpdated} sourceStatus={sourceStatus} />

                <SearchBar value={search} onChange={setSearch} />

                {loading ? <Loading /> : <MetalsTable metals={metals} />}
            </div>
        </div>
    );
}
