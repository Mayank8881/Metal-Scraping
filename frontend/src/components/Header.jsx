export default function Header({ lastUpdated, sourceStatus }) {
    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-start justify-between gap-8">
                    {/* Left side - Title and subtitle */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h1 className="text-4xl font-bold">Metals Dashboard</h1>
                        </div>
                        <p className="text-amber-200 text-sm">
                            Live prices from trusted sources • Real-time updates every 30 seconds
                        </p>
                    </div>

                    {/* Right side - Status info */}
                    <div className="flex flex-col gap-4 text-right min-w-max">
                        {/* Backend Last Updated */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold">Last Updated</p>
                            <p className="text-sm text-red-400 mt-1 font-semibold">
                                {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Waiting..."}
                            </p>
                        </div>

                        {/* Source Status */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">Source Status</p>
                            <div className="flex flex-col gap-1">
                                {Object.entries(sourceStatus).map(([source, status]) => (
                                    <div
                                        key={source}
                                        className={`inline-flex items-center justify-end gap-2 text-xs font-semibold ${status ? 'text-emerald-300' : 'text-red-300'
                                            }`}
                                    >
                                        <span>{source}</span>
                                        <span className={`w-2 h-2 rounded-full ${status ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
                                        <span>{status ? '✓' : '✗'}</span>
                                    </div>
                                ))}
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
