'use client';

import { useEffect, useState } from 'react';
import type { NewsCategory, NewsItem } from './types';
import NewsCategoryTabs from './NewsCategoryTabs';
import NewsFilters from './NewsFilters';
import NewsList from './NewsList';

export default function NewsPage() {
    const [category, setCategory] = useState<string>('semua');
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    // ===== Fetch news =====
    const fetchNews = async (cat: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/news?category=${cat}&limit=50`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Gagal memuat berita');

            setItems(data.items || []);
            setLastUpdate(new Date());
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown error';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    // Load when category changes
    useEffect(() => {
        fetchNews(category);
    }, [category]);

    // Auto-refresh every 5 minutes
    useEffect(() => {
        if (!autoRefresh) return;
        const id = setInterval(() => fetchNews(category), 300000);
        return () => clearInterval(id);
    }, [category, autoRefresh]);

    // Filter by search
    const filtered = search
        ? items.filter(
            (item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.source.toLowerCase().includes(search.toLowerCase()) ||
                (item.summary || '')
                    .toLowerCase()
                    .includes(search.toLowerCase())
        )
        : items;

    const formatLastUpdate = () => {
        if (!lastUpdate) return '—';
        const diff = Math.floor((Date.now() - lastUpdate.getTime()) / 60000);
        if (diff < 1) return 'Baru saja';
        if (diff < 60) return `${diff} menit lalu`;
        return `${Math.floor(diff / 60)} jam lalu`;
    };

    return (
        <div className="animate-in">
            {/* Header */}
            <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-za-border/60 pb-6">
                <div>
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-za-accent">
                        // Market Intelligence
                    </div>
                    <h1 className="text-display text-3xl text-white md:text-5xl">
                        <i className="fas fa-newspaper mr-2 text-za-accent" />
                        Berita Pasar
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-za-text-muted">
                        Berita terkini dari sumber terpercaya: crypto, saham lokal
                        (IDX), dan saham global. Diperbarui otomatis.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Live status */}
                    <div className="flex items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-3.5 py-1.5 backdrop-blur-sm">
                        <span className="status-dot-live" />
                        <span className="font-mono text-[10px] font-medium tracking-wider text-za-success">
                            AUTO-UPDATE
                        </span>
                    </div>

                    {/* Last update */}
                    <div className="flex items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-3.5 py-1.5 backdrop-blur-sm">
                        <i className="fas fa-clock text-[10px] text-za-accent-2" />
                        <span className="font-mono text-[11px] text-za-text-muted">
                            {formatLastUpdate()}
                        </span>
                    </div>

                    {/* Refresh button */}
                    <button
                        type="button"
                        onClick={() => fetchNews(category)}
                        disabled={loading}
                        className="inline-flex h-8 items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-3.5 text-xs text-za-text-muted transition hover:border-za-accent/50 hover:text-white disabled:opacity-50"
                    >
                        <i
                            className={`fas fa-sync-alt text-xs ${loading ? 'animate-spin' : ''
                                }`}
                        />
                        Refresh
                    </button>
                </div>
            </header>

            {/* Category tabs */}
            <NewsCategoryTabs
                active={category}
                onChange={setCategory}
                counts={{
                    semua: items.length,
                    crypto: items.filter((i) => i.category === 'crypto').length,
                    'saham-lokal': items.filter(
                        (i) => i.category === 'saham-lokal'
                    ).length,
                    'saham-global': items.filter(
                        (i) => i.category === 'saham-global'
                    ).length,
                }}
            />

            {/* Filters */}
            <NewsFilters
                search={search}
                onSearchChange={setSearch}
                totalResults={filtered.length}
                autoRefresh={autoRefresh}
                onAutoRefreshChange={setAutoRefresh}
            />

            {/* Content */}
            <NewsList
                items={filtered}
                loading={loading}
                error={error}
                onRetry={() => fetchNews(category)}
            />
        </div>
    );
}