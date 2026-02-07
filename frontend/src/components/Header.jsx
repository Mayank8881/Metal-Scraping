export default function Header() {
    return (
        <div className="w-full flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-900">
                Real-Time Metals Prices Dashboard
            </h1>

            <p className="text-slate-600 text-sm">
                Live prices scraped from trusted sources (Kitco / TradingEconomics).
            </p>
        </div>
    );
}
