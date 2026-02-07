function formatPrice(price) {
    if (price === null || price === undefined) return "-";
    return price.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

export default function MetalsTable({ metals }) {
    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700">
                    <tr>
                        <th className="px-4 py-3 text-sm font-semibold">Metal</th>
                        <th className="px-4 py-3 text-sm font-semibold">Price</th>
                        <th className="px-4 py-3 text-sm font-semibold">Currency</th>
                        <th className="px-4 py-3 text-sm font-semibold">Unit</th>
                        <th className="px-4 py-3 text-sm font-semibold">Source</th>
                        <th className="px-4 py-3 text-sm font-semibold">Last Updated</th>
                    </tr>
                </thead>

                <tbody>
                    {metals.map((m, idx) => (
                        <tr
                            key={idx}
                            className="border-t border-slate-200 hover:bg-slate-50"
                        >
                            <td className="px-4 py-3 font-medium text-slate-900">
                                {m.metal}
                            </td>

                            <td className="px-4 py-3 text-slate-900">
                                {formatPrice(m.price)}
                            </td>

                            <td className="px-4 py-3 text-slate-700">{m.currency}</td>

                            <td className="px-4 py-3 text-slate-700">{m.unit}</td>

                            <td className="px-4 py-3 text-slate-700">{m.source}</td>

                            <td className="px-4 py-3 text-slate-600 text-sm">
                                {m.lastUpdated
                                    ? new Date(m.lastUpdated).toLocaleString()
                                    : "-"}
                            </td>
                        </tr>
                    ))}

                    {metals.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-4 py-6 text-center text-slate-600"
                            >
                                No metals found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
