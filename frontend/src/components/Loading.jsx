export default function Loading() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-500 animate-spin"></div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Loading Metals Prices</h3>
            <p className="text-slate-600 text-sm">Fetching real-time data from trusted sources...</p>
            <div className="flex gap-1 mt-4">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
        </div>
    );
}
