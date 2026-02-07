export default function SearchBar({ value, onChange }) {
    return (
        <div className="w-full">
            <div className="relative">
                <svg className="w-5 h-5 absolute left-4 top-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search metals by name (e.g., Gold, Silver, Platinum)..."
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 pl-11 outline-none
                       focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                />
            </div>
        </div>
    );
}
