import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BASE = process.env.BINANCE_API_BASE_URL || 'https://data-api.binance.vision';
const MAX_SYMBOLS = 30;

type Ticker = { symbol: string; lastPrice: string; priceChangePercent: string; quoteVolume: string; highPrice: string; lowPrice: string };
type Kline = [number, string, string, string, string, string, number, string, number, string, string, string];

function average(values: number[]): number {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function rsi(closes: number[], period = 14): number | null {
  if (closes.length <= period) return null;
  let gains = 0;
  let losses = 0;
  for (let i = closes.length - period; i < closes.length; i += 1) {
    const change = closes[i] - closes[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  if (losses === 0) return gains > 0 ? 100 : 50;
  const rs = (gains / period) / (losses / period);
  return 100 - 100 / (1 + rs);
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
    next: { revalidate: 30 },
  });
  if (!response.ok) throw new Error(`Market provider returned HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

export async function GET() {
  try {
    const all = await getJson<Ticker[]>(`${BASE}/api/v3/ticker/24hr`);
    const candidates = all
      .filter((item) => item.symbol.endsWith('USDT') && !/(UP|DOWN|BULL|BEAR)USDT$/.test(item.symbol))
      .map((item) => ({ ...item, quoteVolumeNumber: Number(item.quoteVolume) }))
      .filter((item) => Number.isFinite(item.quoteVolumeNumber) && item.quoteVolumeNumber > 0)
      .sort((a, b) => b.quoteVolumeNumber - a.quoteVolumeNumber)
      .slice(0, MAX_SYMBOLS);

    const rows = await Promise.all(candidates.map(async (ticker) => {
      try {
        const klines = await getJson<Kline[]>(`${BASE}/api/v3/klines?symbol=${encodeURIComponent(ticker.symbol)}&interval=1d&limit=60`);
        const closes = klines.map((row) => Number(row[4])).filter(Number.isFinite);
        const volumes = klines.map((row) => Number(row[5])).filter(Number.isFinite);
        const last = closes.at(-1) ?? Number(ticker.lastPrice);
        const ma20 = closes.length >= 20 ? average(closes.slice(-20)) : null;
        const ma50 = closes.length >= 50 ? average(closes.slice(-50)) : null;
        const avgVol20 = volumes.length >= 20 ? average(volumes.slice(-20)) : null;
        const rvol = avgVol20 && avgVol20 > 0 ? (volumes.at(-1) ?? 0) / avgVol20 : null;
        const relativeStrength = rsi(closes);
        const trend = ma20 !== null && ma50 !== null && last > ma20 && ma20 > ma50;
        const score = [
          trend ? 30 : 0,
          relativeStrength !== null && relativeStrength >= 50 && relativeStrength <= 70 ? 20 : 0,
          rvol !== null && rvol >= 1.5 ? 20 : 0,
          Number(ticker.priceChangePercent) > 0 ? 15 : 0,
          ticker.quoteVolumeNumber >= 100_000_000 ? 15 : ticker.quoteVolumeNumber >= 10_000_000 ? 8 : 0,
        ].reduce((sum, value) => sum + value, 0);
        return {
          symbol: ticker.symbol,
          price: Number(ticker.lastPrice),
          change24hPct: Number(ticker.priceChangePercent),
          quoteVolume24h: ticker.quoteVolumeNumber,
          high24h: Number(ticker.highPrice),
          low24h: Number(ticker.lowPrice),
          ma20,
          ma50,
          rsi14: relativeStrength,
          relativeVolume20: rvol,
          trendUp: trend,
          score,
          dataStatus: 'ok' as const,
        };
      } catch {
        return {
          symbol: ticker.symbol,
          price: Number(ticker.lastPrice),
          change24hPct: Number(ticker.priceChangePercent),
          quoteVolume24h: ticker.quoteVolumeNumber,
          high24h: Number(ticker.highPrice),
          low24h: Number(ticker.lowPrice),
          ma20: null, ma50: null, rsi14: null, relativeVolume20: null,
          trendUp: false, score: 0, dataStatus: 'partial' as const,
        };
      }
    }));

    rows.sort((a, b) => b.score - a.score || b.quoteVolume24h - a.quoteVolume24h);
    return NextResponse.json({
      provider: 'Binance public market data',
      timeframe: '1d',
      generatedAt: new Date().toISOString(),
      rows,
      note: 'Crypto market data, not BEI equities. Scores are rule-based screening metrics, not a prediction or a buy signal.',
    }, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown provider error';
    return NextResponse.json({ error: message, rows: [], provider: 'Binance public market data' }, { status: 502 });
  }
}
