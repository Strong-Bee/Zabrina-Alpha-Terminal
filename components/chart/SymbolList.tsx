'use client';

import { useEffect, useState } from 'react';
import { SYMBOLS, CATEGORY_LABELS } from './symbols';
import type { Symbol, Ticker24h } from './types';

interface SymbolListProps {
    activeSymbol: string;
    onSelect: (symbolId: string) => void;
}

const CATEGORIES: (keyof typeof CATEGORY_LABELS)[] = ['crypto'];

export default function SymbolList({
    activeSymbol,
    onSelect,
}: SymbolListProps) {
    const [search, setSearch] = useState('');
    const [tickers, setTickers] = useState<Record<string, Ticker24h>>({});

    // Fetch ticker untuk semua simbol (real-time)
    useEffect(() => {
        let cancelled = false;

        const fetchTickers = async () => {
            try {
                const symbols = SYMBOLS.map((s) => s.id);
                const symbolsParam = encodeURIComponent(JSON.stringify(symbols));
                const res = await fetch(
                    `/api/chart/tickers?symbols=${symbolsParam}`
                );
                const data = await res.json();
                if (cancelled) return;

                if (res.ok && Array.isArray(data.tickers)) {
                    const map: Record<string, Ticker24h> = {};
                    data.tickers.forEach((t: Ticker24h) => {
                        map[t.symbol] = t;
                    });
                    setTickers(map);
                }
            } catch {
                // silent fail
            }
        };

        fetchTickers();
        const id = setInterval(fetchTickers, 15000); // update tiap 15s

        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    const filtered = SYMBOLS.filter(
        (s) =>
            s.ticker.toLowerCase().includes(search.toLowerCase()) ||
            s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-full w-72 flex-col">
            {/* Header */}
            <div className="flex-shrink-0 border-b border-za-border/60 px-4 py-3">
                <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-text-dim">
                        Watchlist
                    </span>
                    <span className="rounded-full bg-za-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-za-accent">
                        {filtered.length}
                    </span>
                </div>

                <div className="relative">
                    <i className="fas fa-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-za-text-dim" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari simbol..."
                        className="w-full rounded-lg border border-za-border bg-za-bg/60 py-2 pl-9 pr-3 text-xs text-white placeholder:text-za-text-dim focus:border-za-accent focus:outline-none focus:ring-1 focus:ring-za-accent/40 transition"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {CATEGORIES.map((cat) => {
                    const items = filtered.filter((s) => s.category === cat);
                    if (items.length === 0) return null;

                    return (
                        <div key={cat} className="border-b border-za-border/40">
                            <div className="sticky top-0 z-10 bg-za-surface/95 px-4 py-2 backdrop-blur-sm">
                                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-za-text-dim">
                                    {CATEGORY_LABELS[cat]}
                                </span>
                            </div>
                            <ul>
                                {items.map((s) => (
                                    <SymbolRow
                                        key={s.id}
                                        symbol={s}
                                        active={s.id === activeSymbol}
                                        ticker={tickers[s.id]}
                                        onSelect={onSelect}
                                    />
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function SymbolRow({
    symbol,
    active,
    ticker,
    onSelect,
}: {
    symbol: Symbol;
    active: boolean;
    ticker?: Ticker24h;
    onSelect: (id: string) => void;
}) {
    const price = ticker?.lastPrice;
    const changePct = ticker?.priceChangePercent ?? 0;
    const isUp = changePct >= 0;

    const formatPrice = (v: number) =>
        v.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: v < 10 ? 4 : 2,
        });

    return (
        <li>
            <button
                type="button"
                onClick={() => onSelect(symbol.id)}
                className={`group flex w-full items-center justify-between gap-2 border-l-2 px-4 py-2.5 text-left transition ${active
                    ? 'border-za-accent bg-za-accent/5'
                    : 'border-transparent hover:border-za-accent/40 hover:bg-za-surface-2/60'
                    }`}
            >
                <div className="min-w-0 flex-1">
                    <div
                        className={`truncate text-sm font-semibold ${active ? 'text-white' : 'text-za-text'
                            }`}
                    >
                        {symbol.ticker}
                    </div>
                    <div className="truncate text-[11px] text-za-text-dim">
                        {symbol.name}
                    </div>
                </div>

                <div className="flex-shrink-0 text-right">
                    {price !== undefined ? (
                        <>
                            <div className="font-mono text-xs font-semibold text-white">
                                {formatPrice(price)}
                            </div>
                            <div
                                className={`font-mono text-[10px] font-semibold ${isUp ? 'text-za-success' : 'text-za-danger'
                                    }`}
                            >
                                {isUp ? '+' : ''}
                                {changePct.toFixed(2)}%
                            </div>
                        </>
                    ) : (
                        <div className="font-mono text-[10px] text-za-text-dim">
                            —
                        </div>
                    )}
                </div>
            </button>
        </li>
    );
}