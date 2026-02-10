// ============================================================================
// SEARCHBAR.JSX - Search Input and Flip All Button Component
// ============================================================================
// Provides two main controls:
// 1. Search input - allows users to filter metals by name
// 2. Flip All button - toggles all cards between USD and INR prices
// 
// Props:
// - value: current search query string
// - onChange: callback function when search input changes
// - flipAllCards: boolean state indicating if cards should be flipped
// - setFlipAllCards: callback function to toggle flip state

export default function SearchBar({ value, onChange, flipAllCards, setFlipAllCards }) {
    return (
        <div className="w-full flex flex-col gap-3">
            {/* Search input container - relative positioning for search icon */}
            <div className="relative">
                {/* Search icon - positioned absolutely inside input */}
                <svg className="w-5 h-5 absolute left-4 top-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {/* Text input for searching metals */}
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search metals by name (e.g., Gold, Silver, Platinum)..."
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pl-11 outline-none
                       focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                />
            </div>
            {/* Flip All button container - aligned to right */}
            <div className="flex justify-end">
                {/* Button to flip all cards between USD and INR prices */}
                <button
                    onClick={() => setFlipAllCards(!flipAllCards)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors duration-200 hover:shadow-lg"
                    title="Flip all cards to show alternative currency"
                >
                    {/* Button label showing currency conversion */}
                    <span>USD ⇄ INR</span>
                </button>
            </div>
        </div>
    );
}
