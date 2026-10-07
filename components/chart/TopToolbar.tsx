'use client';

import { useState } from 'react';
import { SYMBOLS, TIMEFRAMES } from './symbols';
import { useChartStore } from './chartStore';

export default function TopToolbar() {
    const {
        symbol,
        timeframe,
        setSymbol,
        setTimeframe,
        watchlistOpen,
        setWatchlistOpen,
    } = useChartStore();

    const [symbolOpen, setSymbolOpen] = useState(false);
    const activeSymbol = SYMBOLS.find((s) => s.id === symbol);

    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-za-border/60 bg-za-surface/40 px-3 py-2">
            {/* Symbol picker */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setSymbolOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-semibold text-white transition hover:bg-za-surface-2"
                >
                    <span>{activeSymbol?.ticker || 'BTC/USDT'}</span>
                    <i className="fas fa-chevron-down text-[10px] text-za-text-dim" />
                </button>

                {symbolOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setSymbolOpen(false)}
                        />
                        <div className="absolute left-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-lg border border-za-border bg-za-surface shadow-elevated">
                            {SYMBOLS.map((s) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => {
                                        setSymbol(s.id);
                                        setSymbolOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-za-surface-2 ${s.id === symbol
                                        ? 'bg-za-accent/10 font-semibold text-za-accent'
                                        : 'text-za-text'
                                        }`}
                                >
                                    <span>{s.ticker}</span>
                                    <span className="text-xs text-za-text-dim">
                                        {s.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="h-5 w-px bg-za-border" />

            {/* Timeframe */}
            <div className="flex items-center gap-0.5">
                {TIMEFRAMES.map((tf) => (
                    <button
                        key={tf.value}
                        type="button"
                        onClick={() => setTimeframe(tf.value)}
                        className={`min-w-[36px] rounded-md px-2 py-1 text-xs font-medium transition ${timeframe === tf.value
                            ? 'bg-za-accent/15 text-za-accent'
                            : 'text-za-text-muted hover:bg-za-surface-2 hover:text-white'
                            }`}
                    >
                        {tf.label}
                    </button>
                ))}
            </div>

            {/* Right cluster */}
            <div className="ml-auto flex items-center gap-1">
                {/* Fullscreen */}
                <button
                    type="button"
                    onClick={() => {
                        if (!document.fullscreenElement) {
                            document.documentElement.requestFullscreen();
                        } else {
                            document.exitFullscreen();
                        }
                    }}
                    title="Fullscreen"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-za-text-muted transition hover:bg-za-surface-2 hover:text-white"
                >
                    <i className="fas fa-expand text-xs" />
                </button>

                {/* Watchlist toggle */}
                <button
                    type="button"
                    onClick={() => setWatchlistOpen(!watchlistOpen)}
                    title="Watchlist"
                    className={`inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs transition ${watchlistOpen
                        ? 'bg-za-surface-2 text-white'
                        : 'text-za-text-muted hover:bg-za-surface-2 hover:text-white'
                        }`}
                >
                    <i className="fas fa-list text-xs" />
                    Watchlist
                </button>
            </div>
        </div>
    );
}