import { NextRequest, NextResponse } from 'next/server';

const BINANCE_BASE = 'https://data-api.binance.vision';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol') || 'BTCUSDT';
    const interval = searchParams.get('interval') || '1d';
    const limit = searchParams.get('limit') || '500';

    const url = `${BINANCE_BASE}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

    try {
        const res = await fetch(url, {
            headers: { Accept: 'application/json' },
            cache: 'no-store',
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: `Binance error: HTTP ${res.status}` },
                { status: res.status }
            );
        }

        const raw: unknown = await res.json();
        if (!Array.isArray(raw)) {
            return NextResponse.json({ error: 'Format data candle tidak valid' }, { status: 502 });
        }

        const klines = raw
            .filter((k): k is unknown[] => Array.isArray(k) && k.length >= 6)
            .map((k) => ({
                time: Math.floor(Number(k[0]) / 1000),
                open: Number(k[1]),
                high: Number(k[2]),
                low: Number(k[3]),
                close: Number(k[4]),
                volume: Number(k[5]),
            }))
            .filter((k) => Number.isFinite(k.time) && Number.isFinite(k.open) && Number.isFinite(k.high) && Number.isFinite(k.low) && Number.isFinite(k.close) && Number.isFinite(k.volume));

        return NextResponse.json(
            { symbol, interval, klines },
            { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: `Gagal memuat klines: ${message}` }, { status: 502 });
    }
}