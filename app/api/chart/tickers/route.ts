import { NextRequest, NextResponse } from 'next/server';

const BINANCE_BASE = 'https://data-api.binance.vision';
const DEFAULT_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'DOGEUSDT'];

function parseSymbols(input: string | null): string[] {
    if (!input) return DEFAULT_SYMBOLS;
    const trimmed = input.trim();
    if (!trimmed) return DEFAULT_SYMBOLS;

    let list: string[] = [];
    if (trimmed.startsWith('[')) {
        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) list = parsed.map(String);
        } catch {}
    }
    if (list.length === 0) list = trimmed.split(',').map((s) => s.trim());

    const cleaned = list
        .map((s) => s.toUpperCase().replace(/[^A-Z0-9]/g, ''))
        .filter(Boolean)
        .slice(0, 30);

    return cleaned.length > 0 ? cleaned : DEFAULT_SYMBOLS;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const symbols = parseSymbols(searchParams.get('symbols'));
    const symbolsParam = JSON.stringify(symbols);
    const url = `${BINANCE_BASE}/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbolsParam)}`;

    try {
        const res = await fetch(url, {
            headers: { Accept: 'application/json' },
            cache: 'no-store',
        });

        if (!res.ok) {
            return NextResponse.json({ error: `Binance error: HTTP ${res.status}`, tickers: [] }, { status: res.status });
        }

        const raw = await res.json();
        const arr = Array.isArray(raw) ? raw : [raw];

        const tickers = arr.map((t: Record<string, unknown>) => {
            const num = (key: string) => {
                const v = t[key];
                const n = typeof v === 'string' ? parseFloat(v) : Number(v);
                return Number.isFinite(n) ? n : 0;
            };
            return {
                symbol: String(t.symbol ?? ''),
                lastPrice: num('lastPrice'),
                priceChange: num('priceChange'),
                priceChangePercent: num('priceChangePercent'),
                highPrice: num('highPrice'),
                lowPrice: num('lowPrice'),
                openPrice: num('openPrice'),
                volume: num('volume'),
                quoteVolume: num('quoteVolume'),
            };
        });

        return NextResponse.json(
            { tickers },
            { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } }
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: `Gagal: ${message}`, tickers: [] }, { status: 502 });
    }
}