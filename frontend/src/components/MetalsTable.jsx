// ============================================================================
// METALSTABLE.JSX - Responsive Grid Layout for Metal Cards
// ============================================================================
// Renders a responsive grid of metal flip cards
// Handles two states:
// 1. Empty state - shows message when no metals found
// 2. Grid state - displays cards in responsive layout (1-3 columns)
//
// Props:
// - metals: array of metal objects to display
// - flipAllCards: boolean state to flip all cards simultaneously

import MetalFlipCard from "./MetalFlipCard";

export default function MetalsTable({ metals, flipAllCards }) {
    // Empty state - show message when no metals are found
    if (metals.length === 0) {
        return (
            <div className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                {/* Empty state icon */}
                <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-600 text-lg font-medium">No metals found</p>
                <p className="text-slate-500 text-sm mt-2">Try adjusting your search criteria</p>
            </div>
        );
    }

    // Grid state - show responsive grid of metal cards
    // Responsive breakpoints: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map through metals array and create a card for each */}
            {metals.map((m, idx) => (
                // Each card receives metal data and global flip state
                <MetalFlipCard key={idx} metal={m} flipAllCards={flipAllCards} />
            ))}
        </div>
    );
}
