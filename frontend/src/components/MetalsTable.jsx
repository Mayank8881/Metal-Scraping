function formatPrice(price) {
    if (price === null || price === undefined) return "-";
    return price.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function getMetalColor(metal) {
    const metalLower = metal.toLowerCase();
    if (metalLower.includes('gold')) return 'from-amber-50 to-yellow-50 border-l-4 border-l-amber-500';
    if (metalLower.includes('silver')) return 'from-slate-50 to-gray-50 border-l-4 border-l-slate-400';
    if (metalLower.includes('platinum') || metalLower.includes('palladium')) return 'from-blue-50 to-cyan-50 border-l-4 border-l-blue-500';
    if (metalLower.includes('copper')) return 'from-orange-50 to-red-50 border-l-4 border-l-orange-500';
    return 'from-indigo-50 to-purple-50 border-l-4 border-l-indigo-500';
}

export default function MetalsTable({ metals }) {
    if (metals.length === 0) {
        return (
            <div className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-600 text-lg font-medium">No metals found</p>
                <p className="text-slate-500 text-sm mt-2">Try adjusting your search criteria</p>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {metals.map((m, idx) => (
                <div
                    key={idx}
                    className={`bg-gradient-to-br ${getMetalColor(m.metal)} rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{m.metal}</h3>
                            <p className="text-xs text-slate-600 mt-1">{m.source}</p>
                        </div>
                        <div className="bg-white rounded-lg p-2">
                            <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.16 2.75a.75.75 0 01.68 0l3.5 1.75a.75.75 0 01.405.657V8a7 7 0 11-14 0V5.157a.75.75 0 01.405-.657l3.5-1.75zM10 4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 0010 4z" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-4">
                        <p className="text-slate-600 text-xs uppercase tracking-wide font-semibold mb-1">Current Price</p>
                        <p className="text-3xl font-bold text-slate-900">
                            {formatPrice(m.price)}
                        </p>
                        <p className="text-sm text-slate-700 mt-2">{m.currency} per {m.unit}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white bg-opacity-50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 uppercase font-semibold">Currency</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">{m.currency}</p>
                        </div>
                        <div className="bg-white bg-opacity-50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 uppercase font-semibold">Unit</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">{m.unit}</p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200/50">
                        <p className="text-xs text-slate-600">
                            <span className="font-semibold">Updated:</span> {m.lastUpdated
                                ? new Date(m.lastUpdated).toLocaleString()
                                : "N/A"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
