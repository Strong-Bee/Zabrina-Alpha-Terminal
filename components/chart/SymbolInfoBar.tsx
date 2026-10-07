'use client';

import { useEffect, useState } from 'react';
import { SYMBOLS } from './symbols';
import type { Ticker24h } from './types';

interface SymbolInfoBarProps {
    symbolId: string;
}

export default function SymbolInfoBar({ symbolId }: SymbolInfoBarProps) {
    const [ticker, setTicker] = useState<Ticker24h | null>(null);
    const symbol = SYMBOLS.find((s) => s.id === symbolId);

    useEffect(() => {
        let cancelled = false;

        const fetchTicker = async () => {
            try {
                const res = await fetch(
                    `/api/chart/tickers?symbols=${encodeURIComponent(
                        JSON.stringify([symbolId])
                    )}`
                );
                const data = await res.json();
                if (cancelled) return;
                if (res.ok && Array.isArray(data.tickers) && data.tickers[0]) {
                    setTicker(data.tickers[0]);
                }
            } catch {
                // silent
            }
        };

        fetchTicker();
        const id = setInterval(fetchTicker, 5000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [symbolId]);

    if (!symbol) return null;

    const formatPrice = (v: number) =>
        v.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: v < 10 ? 4 : 2,
        });

    const isUp = (ticker?.priceChangePercent ?? 0) >= 0;

    return (
        <div className="flex flex-shrink-0 flex-wrap items-center gap-4 border-b border-za-border/60 bg-za-surface/40 px-4 py-2.5 backdrop-blur-sm">
            {/* Ticker */}
            <div className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tight text-white">
                    {symbol.ticker}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-za-text-dim">
                    {symbol.name}
                </span>
            </div>

            <div className="h-5 w-px bg-za-border" />

            {/* Price */}
            {ticker && (
                <>
                    <div className="flex items-baseline gap-2">
                        <span className="font-mono text-base font-bold text-white">
                            {formatPrice(ticker.lastPrice)}
                        </span>
                        <span
                            className={`font-mono text-sm font-semibold ${isUp ? 'text-za-success' : 'text-za-danger'
                                }`}
                        >
                            {isUp ? '+' : ''}
                            {ticker.priceChangePercent.toFixed(2)}%
                        </span>
                    </div>

                    <div className="hidden items-center gap-3 font-mono text-[11px] text-za-text-muted md:flex">
                        <span>
                            24h H:{' '}
                            <span className="text-za-success">
                                {formatPrice(ticker.highPrice)}
                            </span>
                        </span>
                        <span>
                            L:{' '}
                            <span className="text-za-danger">
                                {formatPrice(ticker.lowPrice)}
                            </span>
                        </span>
                        <span>
                            Vol:{' '}
                            <span className="text-white">
                                {ticker.volume.toLocaleString('en-US', {
                                    maximumFractionDigits: 0,
                                })}
                            </span>
                        </span>
                    </div>
                </>
            )}

            {/* Badge */}
            <div className="ml-auto flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-za-text-dim">
                    Binance
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-za-success/30 bg-za-success/5 px-2 py-0.5 font-mono text-[10px] text-za-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-za-success" />
                    LIVE
                </span>
            </div>
        </div>
    );
}