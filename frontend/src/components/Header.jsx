// ============================================================================
// HEADER.JSX - Dashboard Header Component
// ============================================================================
// Displays the dashboard header with:
// 1. Dashboard title and icon
// 2. Last updated timestamp showing when prices were last refreshed
// 3. Source status indicators showing online/offline status of data providers
//
// Props:
// - lastUpdated: ISO timestamp of last API refresh
// - sourceStatus: Object with {sourceName: isOnline} (e.g., {Kitco: true})

export default function Header({ lastUpdated, sourceStatus }) {
    return (
        <div className="w-full">
            {/* Header container with gradient background and drop shadow */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-start justify-between gap-8">
                    {/* Left side - Title and subtitle */}
                    <div className="flex-1">
                        {/* Title with gold coin icon */}
                        <div className="flex items-center gap-3 mb-2">
                            {/* Gold coin SVG icon */}
                            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h1 className="text-4xl font-bold">Metals Dashboard</h1>
                        </div>
                        {/* Subtitle describing dashboard features */}
                        <p className="text-amber-200 text-sm">
                            Live prices from trusted sources • Real-time updates every 30 seconds
                        </p>
                    </div>

                    {/* Right side - Status info */}
                    <div className="flex flex-col gap-4 text-right min-w-max">
                        {/* Backend Last Updated timestamp */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">Last Updated</p>
                            {/* Display formatted time or "Waiting..." if no data yet */}
                            <p className="text-sm text-red-400 mt-1 font-semibold">
                                {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Waiting..."}
                            </p>
                        </div>

                        {/* Data source status indicators */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">Source Status</p>
                            <div className="flex flex-col gap-1">
                                {/* Loop through each data source and display its status */}
                                {Object.entries(sourceStatus).map(([source, status]) => (
                                    <div
                                        key={source}
                                        className={`inline-flex items-center justify-end gap-2 text-xs font-semibold ${status ? 'text-emerald-300' : 'text-red-300'
                                            }`}
                                    >
                                        {/* Source name */}
                                        <span>{source}</span>
                                        {/* Status indicator - animated pulse if online */}
                                        <span className={`w-2 h-2 rounded-full ${status ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
                                        {/* Status symbol - checkmark for online, X for offline */}
                                        <span>{status ? '✓' : '✗'}</span>
                                    </div>
                                ))}
                                {/* Show "Checking..." if sources haven't been checked yet */}
                                {Object.keys(sourceStatus).length === 0 && (
                                    <div className="text-xs text-indigo-300 italic">Checking...</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
