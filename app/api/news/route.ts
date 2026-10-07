import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { NEWS_SOURCES } from '@/lib/news/sources';
import type { NewsItem, NewsCategory } from '@/components/news/types';

// ============================================
// CACHE IN-MEMORY
// ============================================
interface CacheEntry {
    items: NewsItem[];
    timestamp: number;
    sourceStats: {
        success: number;
        failed: number;
        total: number;
    };
}

const CACHE_TTL = 10 * 60 * 1000; // 10 menit
const cache = new Map<string, CacheEntry>();

// Blacklist sementara untuk sumber yang sering gagal
const FAILED_SOURCES = new Map<string, number>(); // id → failCount
const FAIL_THRESHOLD = 3; // setelah 3x gagal, skip 1 jam
const BLACKLIST_DURATION = 60 * 60 * 1000; // 1 jam
const blacklistUntil = new Map<string, number>();

function isBlacklisted(id: string): boolean {
    const until = blacklistUntil.get(id);
    if (!until) return false;
    if (Date.now() > until) {
        blacklistUntil.delete(id);
        FAILED_SOURCES.delete(id);
        return false;
    }
    return true;
}

function recordFailure(id: string) {
    const count = (FAILED_SOURCES.get(id) || 0) + 1;
    FAILED_SOURCES.set(id, count);
    if (count >= FAIL_THRESHOLD) {
        blacklistUntil.set(id, Date.now() + BLACKLIST_DURATION);
        console.log(`[News] Blacklist sementara: ${id} (gagal ${count}x)`);
    }
}

function recordSuccess(id: string) {
    FAILED_SOURCES.delete(id);
}

// ============================================
// RSS PARSER (sama seperti sebelumnya)
// ============================================
function parseRSS(
    xml: string,
    source: { id: string; name: string; category: NewsCategory }
): NewsItem[] {
    const items: NewsItem[] = [];
    const itemRegex = /<(item|entry)[\s\S]*?<\/\1>/gi;
    const matches = xml.match(itemRegex) || [];

    for (const raw of matches) {
        try {
            const title = extractTag(raw, 'title');
            const link = extractLink(raw);
            const pubDate =
                extractTag(raw, 'pubDate') ||
                extractTag(raw, 'published') ||
                extractTag(raw, 'updated') ||
                new Date().toISOString();
            const description =
                extractTag(raw, 'description') ||
                extractTag(raw, 'summary') ||
                extractTag(raw, 'content:encoded') ||
                '';
            const image = extractImage(raw);

            if (!title || !link) continue;

            items.push({
                id: `${source.id}-${hashString(link)}`,
                title: cleanHTML(title),
                link: link.trim(),
                source: source.name,
                sourceIcon: getSourceIcon(source.id),
                publishedAt: parseDate(pubDate),
                summary: truncate(cleanHTML(description), 200),
                image,
                category: source.category,
            });
        } catch {}
    }

    return items;
}

function extractTag(xml: string, tag: string): string {
    const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
        `<${escapedTag}(?:\\s[^>]*)?>(?:\\s*<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*<\\/${escapedTag}>`,
        'i'
    );
    const match = xml.match(regex);
    return match ? match[1].trim() : '';
}

function extractLink(xml: string): string {
    const simple = extractTag(xml, 'link');
    if (simple && simple.startsWith('http')) return simple;
    const hrefMatch = xml.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i);
    if (hrefMatch) return hrefMatch[1];
    const guid = xml.match(/<guid[^>]*isPermaLink=["']true["'][^>]*>([^<]+)<\/guid>/i);
    if (guid && guid[1].startsWith('http')) return guid[1].trim();
    const atomAlt = xml.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i);
    if (atomAlt) return atomAlt[1];
    return simple;
}

function extractImage(xml: string): string | undefined {
    const media = xml.match(/<media:content[^>]*url=["']([^"']+)["']/i);
    if (media) return media[1];
    const thumb = xml.match(/<media:thumbnail[^>]*url=["']([^"']+)["']/i);
    if (thumb) return thumb[1];
    const encl = xml.match(/<enclosure[^>]*url=["']([^"']+\.(?:jpg|jpeg|png|webp|gif))["']/i);
    if (encl) return encl[1];
    const img = xml.match(/<img[^>]*src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif))["']/i);
    if (img) return img[1];
    return undefined;
}

function cleanHTML(html: string): string {
    return html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

function truncate(str: string, len: number): string {
    return str.length <= len ? str : str.substring(0, len).trim() + '…';
}

function parseDate(str: string): string {
    try {
        const d = new Date(str);
        return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
    } catch {
        return new Date().toISOString();
    }
}

function hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}

function getSourceIcon(id: string): string {
    const map: Record<string, string> = {
        coindesk: '₿', cointelegraph: '◈', decrypt: '⬢', bitcoinmagazine: '₿',
        theblock: '⬛', cryptoslate: '🔷', bitcoinist: '🟠', newsbtc: '📰',
        cryptonews: '🔶', beincrypto: '🔐', contan: '📊', bisnis: '📈',
        'cnbc-indonesia': '📺', 'detik-finance': '📰', 'investor-id': '💼',
        katadata: '📈', tirto: '📰', 'kompas-ekonomi': '📋',
        'antara-ekonomi': '📡', 'tempo-bisnis': '📰', 'reuters-business': '🌐',
        'cnbc-markets': '📊', 'yahoo-finance': '📈', marketwatch: '💹',
        'bloomberg-markets': '🔵', 'ft-markets': '📕', 'wsj-markets': '📰',
        'seeking-alpha': '🔍', benzinga: '🔔',
    };
    return map[id] || '📰';
}

// ============================================
// FETCH SATU SUMBER
// ============================================
async function fetchSource(
    source: (typeof NEWS_SOURCES)[0],
    attempt = 1
): Promise<NewsItem[]> {
    // Skip kalau blacklisted
    if (isBlacklisted(source.id)) return [];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // ← 5s saja

    try {
        const res = await fetch(source.url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                Accept: 'application/rss+xml, application/xml, application/atom+xml, text/xml, */*',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
            },
            signal: controller.signal,
            // ✅ Pakai Next.js fetch cache 10 menit
            next: { revalidate: 600 },
        });

        clearTimeout(timeout);

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const xml = await res.text();
        if (!xml || xml.length < 100) throw new Error('Response pendek');

        recordSuccess(source.id);
        return parseRSS(xml, {
            id: source.id,
            name: source.name,
            category: source.category,
        });
    } catch (err) {
        clearTimeout(timeout);
        const message = err instanceof Error ? err.message : 'Unknown';

        // Retry sekali kalau bukan abort
        if (attempt < 2 && !message.includes('aborted')) {
            await new Promise((r) => setTimeout(r, 500));
            return fetchSource(source, attempt + 1);
        }

        recordFailure(source.id);
        console.warn(`[News] Gagal ${source.name}: ${message}`);
        return [];
    }
}

// ============================================
// CONCURRENCY LIMIT — hanya 10 fetch paralel
// ============================================
async function fetchAllWithConcurrency<T>(
    sources: T[],
    fetcher: (s: T) => Promise<NewsItem[]>,
    concurrency = 10
): Promise<NewsItem[][]> {
    const results: NewsItem[][] = new Array(sources.length);
    let index = 0;

    async function worker() {
        while (index < sources.length) {
            const currentIndex = index++;
            results[currentIndex] = await fetcher(sources[currentIndex]);
        }
    }

    const workers = Array.from({ length: concurrency }, () => worker());
    await Promise.all(workers);
    return results;
}

// ============================================
// FETCH SEMUA SUMBER (dengan cache)
// ============================================
async function fetchNewsByCategory(category: string) {
    // Cek cache dulu
    const cached = cache.get(category);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(`[News] Cache HIT untuk "${category}"`);
        return cached;
    }

    console.log(`[News] Cache MISS, fetch "${category}" dari sumber`);

    const sources =
        category === 'semua'
            ? NEWS_SOURCES
            : NEWS_SOURCES.filter((s) => s.category === category);

    const startedAt = Date.now();

    // Fetch dengan concurrency limit 10
    const results = await fetchAllWithConcurrency(sources, fetchSource, 10);

    const allItems: NewsItem[] = [];
    let successCount = 0;
    let failCount = 0;

    results.forEach((items) => {
        if (items.length > 0) {
            successCount++;
            allItems.push(...items);
        } else {
            failCount++;
        }
    });

    // Sort by date desc
    allItems.sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
    );

    // Dedup by title
    const seen = new Set<string>();
    const unique = allItems.filter((item) => {
        const key = item.title.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    console.log(
        `[News] Selesai dalam ${Date.now() - startedAt}ms — Berhasil: ${successCount}, Gagal: ${failCount}, Item: ${unique.length}`
    );

    const entry: CacheEntry = {
        items: unique,
        timestamp: Date.now(),
        sourceStats: {
            success: successCount,
            failed: failCount,
            total: sources.length,
        },
    };

    cache.set(category, entry);
    return entry;
}

// ============================================
// ROUTE HANDLER
// ============================================
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'semua';
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100);

    const VALID_CATEGORIES = [
        'semua', 'crypto', 'saham-lokal', 'saham-global',
        'forex', 'komoditas', 'makro', 'global', 'teknologi',
    ];
    const safeCategory = VALID_CATEGORIES.includes(category) ? category : 'semua';

    const entry = await fetchNewsByCategory(safeCategory);
    const limited = entry.items.slice(0, limit);

    return NextResponse.json(
        {
            category: safeCategory,
            count: limited.length,
            totalAvailable: entry.items.length,
            sources: entry.sourceStats,
            cached: Date.now() - entry.timestamp < CACHE_TTL,
            ageMs: Date.now() - entry.timestamp,
            items: limited,
        },
        {
            headers: {
                'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
            },
        }
    );
}