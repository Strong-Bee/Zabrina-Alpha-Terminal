'use client';

import type { Ticker24h } from './types';
import { SYMBOLS } from './symbols';

interface PriceTickerProps {
    symbolId: string;
    ticker: Ticker24h | null;
    timeframe: string;
}

export default function PriceTicker({ symbolId, ticker, timeframe }: PriceTickerProps) {
    const symbol = SYMBOLS.find((s) => s.id === symbolId);
    if (!symbol) return null;

    const isUp = (ticker?.priceChangePercent ?? 0) >= 0;

    const formatPrice = (v: number) =>
        v.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    const formatVol = (v: number) => {
        if (v >= 1e9) return (v / 1e9).toFixed(2) + ' M';
        if (v >= 1e6) return (v / 1e6).toFixed(2) + ' Jt';
        if (v >= 1e3) return (v / 1e3).toFixed(2) + ' rb';
        return v.toFixed(2);
    };

    return (
        <div className="pointer-events-none absolute left-4 top-3 z-10 select-none">
            {/* Header: nama simbol + TF */}
            <div className="mb-2 flex items-center gap-2 text-xs">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-100 text-[10px] font-bold text-amber-900">
                    <i className="fas fa-bitcoin-sign" />
                </span>
                <span className="font-semibold text-slate-800">{symbol.ticker}</span>
                <span className="text-slate-500">{timeframe.toUpperCase()}</span>
            </div>

            {/* Harga besar */}
            {ticker && (
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold tabular-nums text-slate-900">
                        {formatPrice(ticker.lastPrice)}
                    </span>
                    <span
                        className={`text-sm font-semibold tabular-nums ${isUp ? 'text-emerald-600' : 'text-red-500'
                            }`}
                    >
                        {isUp ? '+' : ''}
                        {ticker.priceChangePercent.toFixed(2)}%
                    </span>
                </div>
            )}

            {/* OHLC row */}
            {ticker && (
                <div className="mt-2 flex flex-wrap gap-3 font-mono text-[10px] text-slate-500">
                    <span>
                        O <span className="text-slate-700">{formatPrice(ticker.openPrice)}</span>
                    </span>
                    <span>
                        H <span className="text-emerald-600">{formatPrice(ticker.highPrice)}</span>
                    </span>
                    <span>
                        L <span className="text-red-500">{formatPrice(ticker.lowPrice)}</span>
                    </span>
                    <span>
                        C <span className="text-slate-700">{formatPrice(ticker.lastPrice)}</span>
                    </span>
                    <span className="text-slate-400">
                        Vol {formatVol(ticker.volume)}
                    </span>
                </div>
            )}
        </div>
    );
}