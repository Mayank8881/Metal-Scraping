// ============================================================================
// LOADING.JSX - Animated Loading Spinner Component
// ============================================================================
// Displays an animated spinner shown while dashboard is fetching metal data
// Features:
// - Rotating coin animation
// - Loading text message
// - Bouncing dots animation with staggered timing

export default function Loading() {
    return (
        // Main loading container - centered on page
        <div className="w-full flex flex-col items-center justify-center py-20">
            {/* Spinning coin animation */}
            <div className="relative w-20 h-20 mb-6">
                {/* Outer static circle border */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                {/* Inner rotating circle border (creates spinning effect) */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-500 animate-spin"></div>
            </div>
            {/* Loading message */}
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Loading Metals Prices</h3>
            {/* Loading description */}
            <p className="text-slate-600 text-sm">Fetching real-time data from trusted sources...</p>
            {/* Bouncing dots animation with staggered timing */}
            <div className="flex gap-1 mt-4">
                {/* Dot 1 - starts immediately */}
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                {/* Dot 2 - delayed 0.2s */}
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                {/* Dot 3 - delayed 0.4s */}
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
        </div>
    );
}
