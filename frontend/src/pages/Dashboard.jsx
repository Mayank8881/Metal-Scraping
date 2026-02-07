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
        <div className="min-h-screen w-full px-4 py-8 flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-6">
                <Header />

                <SearchBar value={search} onChange={setSearch} />

                {/* Status bar */}
                <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-1">
                    <p className="text-sm text-slate-700">
                        <span className="font-semibold">Backend Last Updated:</span>{" "}
                        {lastUpdated ? new Date(lastUpdated).toLocaleString() : "Not yet"}
                    </p>

                    <p className="text-sm text-slate-700">
                        <span className="font-semibold">Source Status:</span>{" "}
                        {Object.keys(sourceStatus).length > 0
                            ? JSON.stringify(sourceStatus)
                            : "Unknown"}
                    </p>
                </div>

                {loading ? <Loading /> : <MetalsTable metals={metals} />}
            </div>
        </div>
    );
}
