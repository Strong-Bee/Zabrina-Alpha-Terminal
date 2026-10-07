import { NextResponse } from 'next/server';

const DATA360_BASE_URL = 'https://data360api.worldbank.org';
const DATABASE_ID = 'WB_WDI';
const INDICATOR = 'WB_WDI_NY_GDP_MKTP_CD';

const COUNTRY_CODES = [
    'USA', 'CHN', 'JPN', 'DEU', 'GBR', 'FRA', 'IND', 'BRA', 'CAN', 'RUS',
    'KOR', 'AUS', 'ESP', 'MEX', 'IDN', 'NLD', 'SAU', 'TUR', 'CHE', 'POL',
    'SWE', 'BEL', 'ARG', 'NOR', 'AUT', 'IRL', 'ISR', 'SGP', 'PHL', 'DNK',
    'ZAF', 'COL', 'CHL', 'FIN', 'ROU', 'CZE', 'PRT', 'NZL', 'PER', 'GRC',
    'IRQ', 'THA', 'VNM', 'BGD', 'EGY', 'NGA', 'PAK', 'MYS', 'UKR', 'HKG',
];

interface Data360Record {
    OBS_VALUE: string;
    REF_AREA: string;
    TIME_PERIOD: string;
    LATEST_DATA: boolean;
    [key: string]: unknown;
}

// Cache 1 jam (GDP jarang berubah)
let gdpCache: { data: unknown; timestamp: number } | null = null;
const GDP_CACHE_TTL = 60 * 60 * 1000; // 1 jam

export async function GET() {
    const startedAt = Date.now();

    // Cek cache
    if (gdpCache && Date.now() - gdpCache.timestamp < GDP_CACHE_TTL) {
        console.log(`[GDP] Cache HIT`);
        return NextResponse.json(gdpCache.data, {
            headers: { 'X-Data-Source': 'cache' },
        });
    }

    try {
        const refAreaParam = COUNTRY_CODES.join(',');
        const currentYear = new Date().getFullYear();

        const params = new URLSearchParams({
            DATABASE_ID,
            INDICATOR,
            REF_AREA: refAreaParam,
            timePeriodFrom: String(currentYear - 2),
            timePeriodTo: String(currentYear),
        });

        const url = `${DATA360_BASE_URL}/data360/data?${params.toString()}`;
        console.log(`[GDP] Fetching Data360...`);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(url, {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
            cache: 'no-store',
        });

        clearTimeout(timeout);

        if (!res.ok) {
            console.error(`[GDP] HTTP ${res.status}`);
            return buildFallbackResponse(`Upstream HTTP ${res.status}`, startedAt);
        }

        const json = await res.json();
        const records: Data360Record[] = json.value || [];

        if (!Array.isArray(records) || records.length === 0) {
            return buildFallbackResponse('Empty data from Data360', startedAt);
        }

        // Transformasi: ambil data terbaru per negara
        const countryData: Record<
            string,
            { value: number; period: string; isLatest: boolean }
        > = {};

        for (const r of records) {
            const area = r.REF_AREA;
            const value = parseFloat(r.OBS_VALUE);
            const period = r.TIME_PERIOD;
            const isLatest = r.LATEST_DATA === true;

            if (!area || isNaN(value) || !period) continue;

            const existing = countryData[area];

            if (!existing) {
                countryData[area] = { value, period, isLatest };
                continue;
            }

            if (isLatest && !existing.isLatest) {
                countryData[area] = { value, period, isLatest };
                continue;
            }

            if (isLatest === existing.isLatest && period > existing.period) {
                countryData[area] = { value, period, isLatest };
            }
        }

        // Format output untuk frontend
        const gdpData: Record<string, { v: number; s: string }> = {};
        for (const [area, d] of Object.entries(countryData)) {
            gdpData[area] = {
                v: d.value,
                s: `ECONOMICS:${area}GDP`,
            };
        }

        const count = Object.keys(gdpData).length;
        if (count === 0) {
            return buildFallbackResponse('No valid data processed', startedAt);
        }

        console.log(`[GDP] Success: ${count} countries (${Date.now() - startedAt}ms)`);

        const result = {
            region: 'global',
            lastUpdate: Date.now(),
            dataSource: {
                id: 'world-bank-data360',
                attributionName: 'World Bank Data360',
                attributionLink: 'https://data360.worldbank.org/',
            },
            metric: 'gdp',
            data: gdpData,
            _meta: {
                source: 'live',
                count,
                totalRecords: records.length,
                durationMs: Date.now() - startedAt,
            },
        };

        // Simpan cache
        gdpCache = { data: result, timestamp: Date.now() };

        return NextResponse.json(result, {
            headers: {
                'X-Data-Source': 'live',
                'Cache-Control':
                    'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        const isTimeout = message.includes('aborted');
        console.error('[GDP] Exception:', message);
        return buildFallbackResponse(
            isTimeout ? 'Request timeout' : message,
            startedAt
        );
    }
}

function buildFallbackResponse(reason: string, startedAt: number) {
    const FALLBACK: Record<string, { v: number; s: string }> = {
        USA: { v: 30769700000000, s: 'ECONOMICS:USAGDP' },
        CHN: { v: 19498039388042.61, s: 'ECONOMICS:CHNGDP' },
        DEU: { v: 5050922925047.052, s: 'ECONOMICS:DEUGDP' },
        JPN: { v: 4435162999976.941, s: 'ECONOMICS:JPNGDP' },
        IND: { v: 3956067115771.6313, s: 'ECONOMICS:INDGDP' },
        GBR: { v: 4002587541846.0146, s: 'ECONOMICS:GBRGDP' },
        FRA: { v: 3366315927447.3286, s: 'ECONOMICS:FRAGDP' },
        ITA: { v: 2551556954100.35, s: 'ECONOMICS:ITAGDP' },
        BRA: { v: 2279920092492.1333, s: 'ECONOMICS:BRAGDP' },
        CAN: { v: 2319899772425.92, s: 'ECONOMICS:CANGDP' },
        RUS: { v: 2561310169358.743, s: 'ECONOMICS:RUSGDP' },
        KOR: { v: 1872374961553.146, s: 'ECONOMICS:KORGDP' },
        AUS: { v: 1798518933689.2104, s: 'ECONOMICS:AUSGDP' },
        ESP: { v: 1906453309985.8796, s: 'ECONOMICS:ESPGDP' },
        MEX: { v: 1832641364775.521, s: 'ECONOMICS:MEXGDP' },
        IDN: { v: 1445642584163.8086, s: 'ECONOMICS:IDNGDP' },
        NLD: { v: 1332767651100.3904, s: 'ECONOMICS:NLDGDP' },
        SAU: { v: 1276942933333.3333, s: 'ECONOMICS:SAUGDP' },
        TUR: { v: 1597293229287.0005, s: 'ECONOMICS:TURGDP' },
        CHE: { v: 1043529899250.9229, s: 'ECONOMICS:CHEGDP' },
    };

    return NextResponse.json(
        {
            region: 'global',
            lastUpdate: Date.now(),
            dataSource: {
                id: 'world-bank-fallback',
                attributionName: 'World Bank (Snapshot)',
            },
            metric: 'gdp',
            data: FALLBACK,
            _meta: {
                source: 'fallback',
                reason,
                count: Object.keys(FALLBACK).length,
                durationMs: Date.now() - startedAt,
            },
        },
        {
            status: 200,
            headers: { 'X-Data-Source': 'fallback' },
        }
    );
}