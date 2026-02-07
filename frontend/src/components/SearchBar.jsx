export default function SearchBar({ value, onChange }) {
    return (
        <div className="w-full">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search metal... (gold, silver, platinum)"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none
                   focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
        </div>
    );
}
