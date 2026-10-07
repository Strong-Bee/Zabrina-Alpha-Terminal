'use client';

import type { NewsItem } from './types';
import NewsCard from './NewsCard';

interface NewsListProps {
    items: NewsItem[];
    loading: boolean;
    error: string | null;
    onRetry: () => void;
}

export default function NewsList({
    items,
    loading,
    error,
    onRetry,
}: NewsListProps) {
    // Loading
    if (loading && items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-za-text-muted">
                <i className="fas fa-spinner animate-spin text-3xl text-za-accent" />
                <p className="text-sm">Memuat berita dari berbagai sumber...</p>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-za-danger/30 bg-za-danger/5 px-6 py-12 text-center">
                <i className="fas fa-exclamation-triangle text-3xl text-za-danger" />
                <div>
                    <h3 className="mb-1 font-semibold text-white">
                        Gagal Memuat Berita
                    </h3>
                    <p className="text-sm text-za-text-muted">{error}</p>
                </div>
                <button
                    type="button"
                    onClick={onRetry}
                    className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold"
                >
                    <span className="inline-flex items-center gap-2">
                        <i className="fas fa-redo text-xs" />
                        Coba Lagi
                    </span>
                </button>
            </div>
        );
    }

    // Empty
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-za-border bg-za-surface/50 px-6 py-16 text-center">
                <i className="fas fa-newspaper text-5xl text-za-text-dim" />
                <div>
                    <h3 className="mb-1 font-medium text-za-text">
                        Tidak Ada Berita
                    </h3>
                    <p className="text-sm text-za-text-dim">
                        Tidak ada berita yang cocok dengan pencarian Anda.
                    </p>
                </div>
            </div>
        );
    }

    // Grid
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => (
                <NewsCard
                    key={item.id}
                    item={item}
                    featured={idx === 0 && items.length > 4}
                />
            ))}
        </div>
    );
}