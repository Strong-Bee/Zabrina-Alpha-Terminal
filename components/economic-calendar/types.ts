// ============================================================
// KALENDER EKONOMI
// ============================================================
export type EventStatus = 'released' | 'ongoing' | 'upcoming';

export interface EconomicEvent {
    id: number | string;
    country: string;
    title: string;
    date: string;
    impact: 'high' | 'medium' | 'low';
    actual: string | number;
    forecast: string | number;
    previous: string | number;
    status?: EventStatus;
}

export interface GdpItem {
    code: string;
    value: number;
    symbol: string;
}

export type Tab = 'gdp' | 'events';
export type ImpactFilter = 'all' | 'high' | 'medium' | 'low';
export type RangePreset =
    | 'today'
    | 'week'
    | '7days'
    | '30days'
    | 'prev7'
    | 'thismonth'
    | 'custom';

// ============================================================
// EVENT TABLE
// ============================================================
export interface EventRow {
    time: string;
    country: string;
    title: string;
    ff: string;
    tv: string;
    mql5: string;
    previous: string;
    actual: string;
}

export interface EventDay {
    label: string;
    rows: EventRow[];
}

// ============================================================
// NEWS
// ============================================================
export interface MarketNewsItem {
    category: string;
    datetime: string;
    title: string;
    titleEn?: string;
    impact?: string;
    source: string;
    sourceUrl: string;
}

// ============================================================
// MACRO INDICATORS
// ============================================================
export interface MacroIndicatorGroup {
    title: string;
    columns: string[];
    rows: { indicator: string; values: string[] }[];
}

// ============================================================
// RELEASE SUMMARIES
// ============================================================
export interface ReleaseSummary {
    id: string;
    title: string;
    releasedAt: string;
    summaryBy: string;
    points: string[];
    analysis: string;
}

// ============================================================
// CENTRAL BANK RATES
// ============================================================
export interface CentralBankRate {
    name: string;
    note: string;
    rate: string;
    bias: 'Hawkish' | 'Dovish' | 'Netral';
    nextMeeting: string;
}

// ============================================================
// SENTIMENT
// ============================================================
export interface SentimentRow {
    symbol: string;
    bull: number;
    bear: number;
}

// ============================================================
// FUNDAMENTAL SUMMARY
// ============================================================
export interface FundamentalItem {
    symbol: string;
    bias: 'Bullish' | 'Bearish' | 'Netral';
    description: string;
    bullets: string[];
}

// ============================================================
// NEWS (dari /news page)
// ============================================================
export type NewsCategory =
    | 'crypto'
    | 'saham-lokal'
    | 'saham-global'
    | 'forex'
    | 'komoditas'
    | 'makro'
    | 'global'
    | 'teknologi';

export interface NewsItem {
    id: string;
    title: string;
    link: string;
    source: string;
    sourceIcon?: string;
    publishedAt: string;
    summary?: string;
    image?: string;
    category: NewsCategory;
    tags?: string[];
}

export interface NewsSource {
    id: string;
    name: string;
    url: string;
    category: NewsCategory;
    icon?: string;
}

export type NewsCategoryTab = 'semua' | NewsCategory;

export interface CategoryMeta {
    id: NewsCategoryTab;
    label: string;
    icon: string;
    color: string;
    description: string;
}