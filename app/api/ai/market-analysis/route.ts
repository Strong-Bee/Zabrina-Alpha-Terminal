import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type MarketRow = {
  symbol: string;
  price: number;
  change24hPct: number;
  quoteVolume24h: number;
  ma20: number | null;
  ma50: number | null;
  rsi14: number | null;
  relativeVolume20: number | null;
  trendUp: boolean;
  score: number;
  dataStatus: 'ok' | 'partial';
};

function isMarketRow(value: unknown): value is MarketRow {
  if (!value || typeof value !== 'object') return false;
  const row = value as Record<string, unknown>;
  return typeof row.symbol === 'string'
    && /^[A-Z0-9]{3,24}$/.test(row.symbol)
    && typeof row.price === 'number'
    && Number.isFinite(row.price)
    && typeof row.change24hPct === 'number'
    && Number.isFinite(row.change24hPct)
    && typeof row.quoteVolume24h === 'number'
    && Number.isFinite(row.quoteVolume24h)
    && typeof row.score === 'number'
    && Number.isFinite(row.score);
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      error: 'NVIDIA_API_KEY belum dikonfigurasi di environment server. Tambahkan key NVIDIA NIM di deployment settings.',
    }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body harus berupa JSON yang valid.' }, { status: 400 });
  }

  const input = body as { mode?: unknown; rows?: unknown };
  const mode = input?.mode === 'radar' ? 'radar' : 'screener';
  if (!Array.isArray(input?.rows) || input.rows.length === 0 || input.rows.length > 30 || !input.rows.every(isMarketRow)) {
    return NextResponse.json({ error: 'Kirim 1–30 baris market data yang valid untuk dianalisis.' }, { status: 400 });
  }

  const rows = (input.rows as MarketRow[]).map((row) => ({
    symbol: row.symbol,
    price: row.price,
    change24hPct: row.change24hPct,
    quoteVolume24h: row.quoteVolume24h,
    ma20: row.ma20,
    ma50: row.ma50,
    rsi14: row.rsi14,
    relativeVolume20: row.relativeVolume20,
    trendUp: row.trendUp,
    ruleBasedScore: row.score,
    dataStatus: row.dataStatus,
  }));

  const system = [
    'You are a cautious crypto market research analyst embedded in Zabrina Alpha Terminal.',
    'Analyze only the supplied market data. Never invent prices, news, on-chain facts, or technical indicators.',
    'This is cryptocurrency data from Binance, not Indonesian stock exchange (BEI) data.',
    'Do not promise profit or present outputs as personalized financial advice.',
    'Clearly distinguish observed data from interpretation. If indicators are null or dataStatus is partial, say evidence is incomplete.',
    'Return concise Indonesian Markdown with: Ringkasan pasar; Kandidat terkuat and why; Risiko/invalidasi; What to verify next.',
    'Do not give false precision or claim that a setup guarantees a price direction.',
  ].join(' ');

  const prompt = mode === 'radar'
    ? 'Buat Market Radar: rangkum kondisi momentum lintas aset, aset yang menonjol, perubahan/volume yang patut dipantau, serta risiko dan kondisi invalidasi. Gunakan hanya data JSON berikut:'
    : 'Buat analisis Screener: urutkan kandidat secara hati-hati, jelaskan faktor teknikal yang mendukung dan yang belum terkonfirmasi, serta apa yang perlu diperiksa sebelum keputusan trading. Skor adalah heuristik internal, bukan probabilitas profit. Data JSON:';

  const baseUrl = (process.env.NVIDIA_API_BASE_URL || 'https://integrate.api.nvidia.com/v1').replace(/\/$/, '');
  const model = process.env.NVIDIA_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b';

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 1200,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `${prompt}\n${JSON.stringify(rows)}` },
        ],
      }),
      signal: AbortSignal.timeout(45_000),
      cache: 'no-store',
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return NextResponse.json({
        error: `NVIDIA NIM gagal merespons (HTTP ${response.status}). Periksa NVIDIA_API_BASE_URL, NVIDIA_MODEL, dan API key.`,
        provider: 'NVIDIA NIM',
        detail: process.env.NODE_ENV === 'development' ? detail.slice(0, 500) : undefined,
      }, { status: 502 });
    }

    const result: unknown = await response.json();
    const payload = result as { choices?: Array<{ message?: { content?: unknown } }>; model?: string };
    const analysis = payload.choices?.[0]?.message?.content;
    if (typeof analysis !== 'string' || !analysis.trim()) {
      return NextResponse.json({ error: 'Respons NVIDIA NIM tidak berisi teks analisis yang valid.' }, { status: 502 });
    }

    return NextResponse.json({
      analysis,
      provider: 'NVIDIA NIM',
      model: payload.model || model,
      generatedAt: new Date().toISOString(),
      mode,
      symbolsAnalyzed: rows.length,
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const timedOut = error instanceof Error && error.name === 'TimeoutError';
    return NextResponse.json({
      error: timedOut ? 'Analisis NVIDIA melewati batas waktu. Coba lagi.' : `Tidak dapat menghubungi NVIDIA NIM: ${message}`,
    }, { status: 502 });
  }
}
