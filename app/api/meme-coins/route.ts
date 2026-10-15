import { NextRequest, NextResponse } from 'next/server';

const DEX_API = 'https://api.dexscreener.com';
const MAX_TOKENS = 30;
const REQUEST_TIMEOUT_MS = 8_000;

type DexProfile = {
  chainId?: string;
  tokenAddress?: string;
  url?: string;
  icon?: string;
  header?: string;
  description?: string;
  links?: Array<{ type?: string; label?: string; url?: string }>;
};

type DexPair = {
  chainId?: string;
  dexId?: string;
  url?: string;
  pairAddress?: string;
  labels?: string[];
  baseToken?: { address?: string; name?: string; symbol?: string };
  quoteToken?: { address?: string; name?: string; symbol?: string };
  priceUsd?: string;
  txns?: Record<string, { buys?: number; sells?: number }>;
  volume?: Record<string, number>;
  priceChange?: Record<string, number>;
  liquidity?: { usd?: number; base?: number; quote?: number };
  fdv?: number;
  marketCap?: number;
  pairCreatedAt?: number;
};

function numberParam(params: URLSearchParams, key: string, fallback: number, min: number, max: number) {
  const raw = params.get(key);
  if (raw === null || raw.trim() === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function num(value: unknown): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'Zabrina-Alpha-Terminal/1.0' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`DEX Screener returned HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function flagsFor(pair: DexPair, ageHours: number, liquidity: number, buys: number, sells: number) {
  const flags: string[] = [];
  if (!pair.liquidity?.usd || liquidity < 10_000) flags.push('Likuiditas rendah');
  if (ageHours < 24) flags.push('Pair masih baru');
  if (buys + sells > 0 && sells > buys * 2) flags.push('Tekanan jual tinggi');
  if (!num(pair.marketCap ?? pair.fdv)) flags.push('Market cap belum tersedia');
  return flags;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const minLiquidity = numberParam(params, 'minLiquidity', 5_000, 0, 100_000_000_000);
  const minVolume = numberParam(params, 'minVolume', 10_000, 0, 100_000_000_000);
  const maxAgeHours = numberParam(params, 'maxAgeHours', 168, 1, 8760);
  const minTxns = numberParam(params, 'minTxns', 20, 0, 10_000_000);
  const limit = Math.round(numberParam(params, 'limit', 50, 1, 100));
  const sort = params.get('sort') === 'liquidity' ? 'liquidity' : params.get('sort') === 'change' ? 'change' : 'volume';

  try {
    // Fetch recent token profiles first, then request pair data in one batched call.
    const profiles = await fetchJson<DexProfile[]>(`${DEX_API}/token-profiles/latest/v1`);
    const solanaProfiles = (Array.isArray(profiles) ? profiles : [])
      .filter((profile) => profile.chainId === 'solana' && typeof profile.tokenAddress === 'string')
      .filter((profile) => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(profile.tokenAddress ?? ''))
      .slice(0, MAX_TOKENS);

    const addresses = [...new Set(solanaProfiles.map((profile) => profile.tokenAddress as string))];
    if (addresses.length === 0) {
      return NextResponse.json({
        pairs: [],
        meta: { source: 'DEX Screener', chain: 'solana', fetchedAt: new Date().toISOString(), profileCount: 0 },
      }, { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' } });
    }

    const pairData = await fetchJson<DexPair[]>(
      `${DEX_API}/tokens/v1/solana/${addresses.map(encodeURIComponent).join(',')}`,
    );
    const now = Date.now();
    const pairs = (Array.isArray(pairData) ? pairData : [])
      .filter((pair) => pair.chainId === 'solana' && pair.baseToken?.address && pair.pairAddress)
      .map((pair) => {
        const ageHours = pair.pairCreatedAt ? Math.max(0, (now - pair.pairCreatedAt) / 3_600_000) : null;
        const liquidity = num(pair.liquidity?.usd);
        const volume24h = num(pair.volume?.h24);
        const buys = num(pair.txns?.h24?.buys);
        const sells = num(pair.txns?.h24?.sells);
        const flags = flagsFor(pair, ageHours ?? Number.POSITIVE_INFINITY, liquidity, buys, sells);
        return {
          chainId: 'solana',
          dexId: pair.dexId ?? 'unknown',
          pairAddress: pair.pairAddress,
          tokenAddress: pair.baseToken?.address ?? '',
          name: pair.baseToken?.name ?? 'Unknown token',
          symbol: pair.baseToken?.symbol ?? 'UNKNOWN',
          quoteSymbol: pair.quoteToken?.symbol ?? 'Unknown',
          priceUsd: pair.priceUsd ? num(pair.priceUsd) : null,
          liquidityUsd: pair.liquidity?.usd == null ? null : liquidity,
          volume24h,
          priceChange24h: pair.priceChange?.h24 == null ? null : num(pair.priceChange.h24),
          txns24h: buys + sells,
          buys24h: buys,
          sells24h: sells,
          fdv: pair.fdv == null ? null : num(pair.fdv),
          marketCap: pair.marketCap == null ? null : num(pair.marketCap),
          pairCreatedAt: pair.pairCreatedAt ?? null,
          ageHours,
          url: pair.url ?? `https://dexscreener.com/solana/${pair.pairAddress}`,
          riskFlags: flags,
        };
      })
      .filter((pair) => (pair.liquidityUsd ?? 0) >= minLiquidity)
      .filter((pair) => pair.volume24h >= minVolume)
      .filter((pair) => pair.ageHours !== null && pair.ageHours <= maxAgeHours)
      .filter((pair) => pair.txns24h >= minTxns);

    pairs.sort((a, b) => {
      if (sort === 'liquidity') return (b.liquidityUsd ?? 0) - (a.liquidityUsd ?? 0);
      if (sort === 'change') return (b.priceChange24h ?? -Infinity) - (a.priceChange24h ?? -Infinity);
      return b.volume24h - a.volume24h;
    });

    return NextResponse.json({
      pairs: pairs.slice(0, limit),
      meta: {
        source: 'DEX Screener',
        chain: 'solana',
        fetchedAt: new Date().toISOString(),
        profileCount: addresses.length,
        pairCountBeforeFilters: Array.isArray(pairData) ? pairData.length : 0,
        filters: { minLiquidity, minVolume, maxAgeHours, minTxns, sort, limit },
      },
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown provider error';
    return NextResponse.json({
      error: 'Tidak dapat mengambil data meme coin saat ini.',
      detail: message,
      pairs: [],
      meta: { source: 'DEX Screener', chain: 'solana', fetchedAt: new Date().toISOString() },
    }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
