// ============================================================================
// METALFLIPCARD.JSX - Interactive 3D Flip Card Component
// ============================================================================
// Displays a single metal with interactive 3D flip animation
// Front side: USD price per oz
// Back side: INR price per gram
// Click card to flip, or use global "Flip All" button
//
// Props:
// - metal: object with price data (priceUSD, priceINR, metal name, etc.)
// - flipAllCards: boolean to sync flip state with all cards
//
// Features:
// - Color-coded by metal type (Gold=Amber, Silver=Gray, etc.)
// - 500ms smooth flip animation using CSS 3D transforms
// - Click to individual flip or global flip button
// - Displays last updated time and source information

import { useState, useEffect } from "react";

// Formats price number to locale-specific format with 2 decimal places
// Returns "-" if price is null or undefined
function formatPrice(price) {
    if (price === null || price === undefined) return "-";
    return price.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

// Returns Tailwind CSS color classes based on metal type
// Each metal has unique gradient and border colors for visual distinction
function getMetalColor(metal) {
    const metalLower = metal.toLowerCase();
    if (metalLower.includes('gold')) return 'from-amber-50 to-yellow-50 border-l-4 border-l-amber-500';
    if (metalLower.includes('silver')) return 'from-slate-50 to-gray-50 border-l-4 border-l-slate-400';
    if (metalLower.includes('platinum') || metalLower.includes('palladium')) return 'from-blue-50 to-cyan-50 border-l-4 border-l-blue-500';
    if (metalLower.includes('rhodium')) return 'from-gray-50 to-gray-200 border-l-4 border-l-gray-500';
    return 'from-indigo-50 to-purple-50 border-l-4 border-l-indigo-500';
}

export default function MetalFlipCard({ metal, flipAllCards }) {
    // Track whether card is currently flipped
    const [isFlipped, setIsFlipped] = useState(flipAllCards);

    // Sync flip state when global flipAllCards prop changes (Flip All button)
    useEffect(() => {
        setIsFlipped(flipAllCards);
    }, [flipAllCards]);

    return (
        // Card container - clickable to flip, maintains 3D perspective
        <div className="h-96 cursor-pointer perspective" onClick={() => setIsFlipped(!isFlipped)}>
            {/* 3D flip container with smooth rotation animation */}
            <div
                className="relative w-full h-full transition-transform duration-500 transform"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* ========== FRONT SIDE - USD PRICE ========== */}
                <div
                    className={`absolute w-full h-full bg-gradient-to-br ${getMetalColor(metal.metal)} rounded-xl p-6 shadow-md hover:shadow-lg flex flex-col`}
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                >
                    {/* Header: Metal name and source */}
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{metal.metal}</h3>
                            <p className="text-xs text-slate-600 mt-1">{metal.source}</p>
                        </div>
                        {/* USD currency icon */}
                        <div className="bg-white rounded-lg p-2">
                            <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.16 2.75a.75.75 0 01.68 0l3.5 1.75a.75.75 0 01.405.657V8a7 7 0 11-14 0V5.157a.75.75 0 01.405-.657l3.5-1.75zM10 4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 0010 4z" />
                            </svg>
                        </div>
                    </div>

                    {/* Main USD price display */}
                    <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-3">
                        <p className="text-slate-600 text-xs uppercase tracking-wide font-semibold mb-1">Price in USD</p>
                        <p className="text-3xl font-bold text-slate-900">
                            ${formatPrice(metal.priceUSD)}
                        </p>
                        <p className="text-sm text-slate-700 mt-2">per {metal.unitUSD || 'oz'}</p>
                    </div>

                    {/* Currency and unit information boxes */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {/* Currency type display */}
                        <div className="bg-white bg-opacity-50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 uppercase font-semibold">Currency</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">USD</p>
                        </div>
                        {/* Unit of measurement display */}
                        <div className="bg-white bg-opacity-50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 uppercase font-semibold">Unit</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">{metal.unitUSD || 'oz'}</p>
                        </div>
                    </div>

                    {/* Footer: Last updated timestamp and flip hint */}
                    <div className="mt-auto pt-3 border-t border-slate-200/50">
                        <div className="flex items-center justify-between gap-2">
                            {/* Last update time */}
                            <p className="text-xs text-slate-600 truncate">
                                <span className="font-semibold">Updated:</span> {metal.lastUpdated
                                    ? new Date(metal.lastUpdated).toLocaleTimeString()
                                    : "N/A"}
                            </p>
                            {/* Flip hint - shows with pulsing animation */}
                            <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold animate-pulse whitespace-nowrap">
                                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                                </svg>
                                Flip
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== BACK SIDE - INR PRICE ========== */}
                <div
                    className={`absolute w-full h-full bg-gradient-to-br from-orange-50 to-rose-50 border-l-4 border-l-orange-600 rounded-xl p-6 shadow-md hover:shadow-lg flex flex-col`}
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    {/* Header: Metal name and source */}
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{metal.metal}</h3>
                            <p className="text-xs text-slate-600 mt-1">{metal.source}</p>
                        </div>
                        {/* INR currency icon */}
                        <div className="bg-white rounded-lg p-2">
                            <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.16 2.75a.75.75 0 01.68 0l3.5 1.75a.75.75 0 01.405.657V8a7 7 0 11-14 0V5.157a.75.75 0 01.405-.657l3.5-1.75zM10 4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 0010 4z" />
                            </svg>
                        </div>
                    </div>

                    {/* Main INR price display */}
                    <div className="bg-white bg-opacity-70 rounded-lg p-4 mb-3">
                        <p className="text-slate-600 text-xs uppercase tracking-wide font-semibold mb-1">Price in Rupees</p>
                        <p className="text-3xl font-bold text-slate-900">
                            ₹{formatPrice(metal.priceINRAltUnit || metal.priceINR)}
                        </p>
                        <p className="text-sm text-slate-700 mt-2">per {metal.unitINR || 'gram'}</p>
                    </div>

                    {/* Currency and unit information boxes */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {/* Currency type display */}
                        <div className="bg-white bg-opacity-50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 uppercase font-semibold">Currency</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">INR</p>
                        </div>
                        {/* Unit of measurement display */}
                        <div className="bg-white bg-opacity-50 rounded-lg p-3">
                            <p className="text-xs text-slate-600 uppercase font-semibold">Unit</p>
                            <p className="text-sm font-bold text-slate-900 mt-1">{metal.unitINR || 'gram'}</p>
                        </div>
                    </div>

                    {/* Footer: Last updated timestamp and flip hint */}
                    <div className="mt-auto pt-3 border-t border-slate-200/50">
                        <div className="flex items-center justify-between gap-2">
                            {/* Last update time */}
                            <p className="text-xs text-slate-600 truncate">
                                <span className="font-semibold">Updated:</span> {metal.lastUpdated
                                    ? new Date(metal.lastUpdated).toLocaleTimeString()
                                    : "N/A"}
                            </p>
                            {/* Flip hint - shows with pulsing animation */}
                            <div className="flex items-center gap-1 text-xs text-orange-600 font-semibold animate-pulse whitespace-nowrap">
                                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0l4 4m10-4v12m0 0l4-4m0 0l-4-4" />
                                </svg>
                                Flip
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
