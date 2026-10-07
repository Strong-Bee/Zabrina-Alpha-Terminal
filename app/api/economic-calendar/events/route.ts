import { NextRequest, NextResponse } from 'next/server';

const EVENTS_API_URL = 'https://chartevents-reuters.tradingview.com/events';

const DEFAULT_COUNTRIES =
    'AR,AU,BR,CA,CN,FR,DE,IN,ID,IT,JP,KR,MX,RU,SA,ZA,TR,GB,US,ERL';

// ============================================
// CACHE IN-MEMORY (5 detik sesuai upstream)
// ============================================
interface CacheEntry {
    data: unknown;
    timestamp: number;
    from: string;
    to: string;
    countries: string;
}

const CACHE_TTL = 60 * 1000; // 1 menit (bisa diperpanjang dari 5s agar ringan)
const cache = new Map<string, CacheEntry>();

// Blacklist sementara
const FAILED_COUNT = new Map<string, number>();
const BLACKLIST_UNTIL = new Map<string, number>();
const FAIL_THRESHOLD = 3;
const BLACKLIST_DURATION = 5 * 60 * 1000; // 5 menit

function isBlacklisted(key: string): boolean {
    const until = BLACKLIST_UNTIL.get(key);
    if (!until) return false;
    if (Date.now() > until) {
        BLACKLIST_UNTIL.delete(key);
        FAILED_COUNT.delete(key);
        return false;
    }
    return true;
}

function recordFailure(key: string) {
    const count = (FAILED_COUNT.get(key) || 0) + 1;
    FAILED_COUNT.set(key, count);
    if (count >= FAIL_THRESHOLD) {
        BLACKLIST_UNTIL.set(key, Date.now() + BLACKLIST_DURATION);
        console.warn(`[Events] Blacklist sementara: ${key}`);
    }
}

function recordSuccess(key: string) {
    FAILED_COUNT.delete(key);
}

// ============================================
// FETCH UPSTREAM
// ============================================
async function fetchUpstream(from: string, to: string, countries: string) {
    const params = new URLSearchParams({ from, to, countries });
    const url = `${EVENTS_API_URL}?${params.toString()}`;

    console.log(`[Events] Fetching: ${url}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                // ✅ Header WAJIB (dari hasil analisis header asli TradingView)
                Accept: 'application/json',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Priority: 'u=1, i',
                Origin: 'https://www.tradingview-widget.com',
                Referer: 'https://www.tradingview-widget.com/',

                // ✅ Header simulasi browser
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            signal: controller.signal,
            cache: 'no-store',
        });

        clearTimeout(timeout);

        console.log(`[Events] Upstream status: ${res.status} ${res.statusText}`);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const text = await res.text();
        if (!text || text.trim() === '') {
            throw new Error('Empty response');
        }

        let data: unknown;
        try {
            data = JSON.parse(text);
        } catch {
            throw new Error('Invalid JSON from upstream');
        }

        return data;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}

// ============================================
// ROUTE HANDLER
// ============================================
export async function GET(req: NextRequest) {
    const startedAt = Date.now();
    const { searchParams } = new URL(req.url);

    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const countries = searchParams.get('countries') || DEFAULT_COUNTRIES;

    // ===== Validasi =====
    if (!from || !to) {
        return NextResponse.json(
            {
                error: 'Parameter "from" dan "to" wajib diisi (format ISO 8601).',
                events: [],
            },
            { status: 400 }
        );
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        return NextResponse.json(
            { error: 'Format tanggal tidak valid.', events: [] },
            { status: 400 }
        );
    }

    if (fromDate > toDate) {
        return NextResponse.json(
            { error: '"from" tidak boleh lebih besar dari "to".', events: [] },
            { status: 400 }
        );
    }

    // ===== Cache key =====
    const cacheKey = `${from}|${to}|${countries}`;

    // ===== Cek cache =====
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        const age = Date.now() - cached.timestamp;
        console.log(`[Events] Cache HIT (${age}ms old)`);
        return NextResponse.json(cached.data, {
            headers: {
                'X-Data-Source': 'cache',
                'X-Cache-Age': String(age),
            },
        });
    }

    // ===== Cek blacklist =====
    if (isBlacklisted(cacheKey)) {
        console.warn(`[Events] Skip fetch — blacklisted`);
        return NextResponse.json(
            {
                events: [],
                _meta: {
                    source: 'blacklisted',
                    reason: 'Server pernah gagal 3x, skip sementara',
                },
            },
            { status: 200 }
        );
    }

    // ===== Fetch upstream =====
    try {
        const data = await fetchUpstream(from, to, countries);

        // Simpan cache
        cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
            from,
            to,
            countries,
        });

        // Cleanup cache (max 50 entry)
        if (cache.size > 50) {
            const oldestKey = cache.keys().next().value;
            if (oldestKey) cache.delete(oldestKey);
        }

        recordSuccess(cacheKey);

        const duration = Date.now() - startedAt;
        console.log(`[Events] Success (${duration}ms)`);

        return NextResponse.json(data, {
            headers: {
                'X-Data-Source': 'live',
                'X-Duration': String(duration),
                'Cache-Control':
                    'public, s-maxage=60, stale-while-revalidate=120',
            },
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown';
        const isTimeout = message.includes('aborted');
        console.error(`[Events] Failed: ${message}`);

        recordFailure(cacheKey);

        // Fallback ke cache lama (kalau ada)
        if (cached) {
            console.log(`[Events] Serving STALE cache`);
            return NextResponse.json(cached.data, {
                headers: {
                    'X-Data-Source': 'stale',
                    'X-Cache-Age': String(Date.now() - cached.timestamp),
                },
            });
        }

        return NextResponse.json(
            {
                events: [],
                _meta: {
                    source: 'error',
                    reason: isTimeout ? 'Request timeout' : message,
                },
            },
            { status: 200 }
        );
    }
}