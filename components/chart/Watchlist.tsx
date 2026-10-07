'use client';

import { useEffect, useRef, useState } from 'react';
import { SYMBOLS } from './symbols';
import type { Ticker24h } from './types';
import { useChartStore } from './chartStore';

interface WatchlistProps {
    onClose: () => void;
}

export default function Watchlist({ onClose }: WatchlistProps) {
    const { symbol: activeSymbol, setSymbol } = useChartStore();
    const [tickers, setTickers] = useState<Record<string, Ticker24h>>({});
    const wsRef = useRef<WebSocket | null>(null);

    // Initial fetch
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(
                    `/api/chart/tickers?symbols=${SYMBOLS.map((s) => s.id).join(',')}`
                );
                const data = await res.json();
                if (cancelled) return;
                if (res.ok && Array.isArray(data.tickers)) {
                    const map: Record<string, Ticker24h> = {};
                    data.tickers.forEach((t: Ticker24h) => (map[t.symbol] = t));
                    setTickers(map);
                }
            } catch { }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    // WS miniTicker
    useEffect(() => {
        let cancelled = false;
        const streams = SYMBOLS.map((s) => `${s.id.toLowerCase()}@miniTicker`);
        const ws = new WebSocket(
            `wss://data-stream.binance.vision/stream?streams=${streams.join('/')}`
        );
        wsRef.current = ws;

        ws.onmessage = (event) => {
            if (cancelled) return;
            try {
                const msg = JSON.parse(event.data);
                const d = msg.data;
                if (!d?.s) return;
                const sym = String(d.s).toUpperCase();
                const last = parseFloat(d.c);
                const open = parseFloat(d.o);
                const change = last - open;
                const changePct = open !== 0 ? (change / open) * 100 : 0;

                setTickers((prev) => ({
                    ...prev,
                    [sym]: {
                        symbol: sym,
                        lastPrice: last,
                        priceChange: change,
                        priceChangePercent: changePct,
                        highPrice: parseFloat(d.h),
                        lowPrice: parseFloat(d.l),
                        openPrice: open,
                        volume: parseFloat(d.v),
                        quoteVolume: parseFloat(d.q),
                    },
                }));
            } catch { }
        };

        return () => {
            cancelled = true;
            ws.close();
        };
    }, []);

    const formatPrice = (v: number) =>
        v.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <aside className="flex w-80 flex-shrink-0 flex-col border-l border-za-border/60 bg-za-surface/30">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-za-border/60 px-4 py-3">
                <span className="text-sm font-semibold text-white">Watchlist</span>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex h-7 w-7 items-center justify-center rounded text-za-text-muted hover:bg-za-surface-2 hover:text-white"
                >
                    <i className="fas fa-xmark text-xs" />
                </button>
            </div>

            {/* Column header */}
            <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-za-border/40 px-4 py-2 text-[10px] uppercase tracking-wider text-za-text-dim">
                <span>Simbol</span>
                <span className="text-right">Harga</span>
                <span className="text-right">Perubahan</span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-1.5 text-[10px] uppercase tracking-wider text-za-text-dim">
                    Crypto
                </div>
                {SYMBOLS.map((s) => {
                    const t = tickers[s.id];
                    const isUp = (t?.priceChangePercent ?? 0) >= 0;
                    return (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => setSymbol(s.id)}
                            className={`grid w-full grid-cols-[1fr_auto_auto] gap-3 border-l-2 px-4 py-2 text-left transition ${activeSymbol === s.id
                                ? 'border-za-accent bg-za-accent/5'
                                : 'border-transparent hover:bg-za-surface-2/60'
                                }`}
                        >
                            <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-white">
                                    {s.ticker}
                                </div>
                                <div className="truncate text-[10px] text-za-text-dim">
                                    {s.name}
                                </div>
                            </div>
                            <div className="text-right font-mono text-xs tabular-nums text-white">
                                {t ? formatPrice(t.lastPrice) : '—'}
                            </div>
                            <div
                                className={`text-right font-mono text-xs tabular-nums ${isUp ? 'text-za-success' : 'text-za-danger'
                                    }`}
                            >
                                {t
                                    ? `${isUp ? '+' : ''}${t.priceChangePercent.toFixed(2)}%`
                                    : '—'}
                            </div>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}