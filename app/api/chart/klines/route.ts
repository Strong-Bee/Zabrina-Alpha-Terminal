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

        const raw = await res.json();

        const klines = raw.map((k: any[]) => ({
            time: Math.floor(k[0] / 1000),
            open: parseFloat(k[1]),
            high: parseFloat(k[2]),
            low: parseFloat(k[3]),
            close: parseFloat(k[4]),
            volume: parseFloat(k[5]),
        }));

        return NextResponse.json(
            { symbol, interval, klines },
            { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: `Gagal memuat klines: ${message}` }, { status: 502 });
    }
}