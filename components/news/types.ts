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
    publishedAt: string; // ISO 8601
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

/**
 * Kategori untuk UI tabs (semua + kategori aktual)
 */
export type NewsCategoryTab = 'semua' | NewsCategory;

/**
 * Meta kategori untuk tampilan UI
 */
export interface CategoryMeta {
    id: NewsCategoryTab;
    label: string;
    icon: string;
    color: string;
    description: string;
}