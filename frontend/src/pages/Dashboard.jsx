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
                <Header />

                <SearchBar value={search} onChange={setSearch} />

                {/* Status bar */}
                <div className="w-full rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-5 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold">Backend Last Updated</p>
                            <p className="text-sm text-slate-900 mt-1 font-medium">
                                {lastUpdated ? new Date(lastUpdated).toLocaleString() : "Waiting for first update..."}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold">Source Status</p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {Object.entries(sourceStatus).map(([source, status]) => (
                                    <span key={source} className={`text-xs font-semibold px-3 py-1 rounded-full ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {source}: {status ? '✓ Active' : '✗ Inactive'}
                                    </span>
                                ))}
                                {Object.keys(sourceStatus).length === 0 && (
                                    <span className="text-xs text-slate-600 italic">No source status available</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? <Loading /> : <MetalsTable metals={metals} />}
            </div>
        </div>
    );
}
