'use client';

import type { NewsItem } from './types';

interface NewsCardProps {
    item: NewsItem;
    featured?: boolean;
}

const CATEGORY_COLORS: Record<
    string,
    { bg: string; text: string; label: string }
> = {
    crypto: {
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        label: 'CRYPTO',
    },
    'saham-lokal': {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        label: 'SAHAM IDX',
    },
    'saham-global': {
        bg: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        label: 'GLOBAL',
    },
};

export default function NewsCard({ item, featured }: NewsCardProps) {
    const cat = CATEGORY_COLORS[item.category] || CATEGORY_COLORS['saham-global'];
    const timeAgo = formatTimeAgo(item.publishedAt);

    return (
        <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-za-border bg-za-surface/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-za-accent/40 hover:bg-za-surface-2 ${featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
        >
            {/* Image */}
            {item.image && (
                <div
                    className={`relative overflow-hidden bg-za-bg ${featured ? 'h-64' : 'h-40'
                        }`}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-za-surface via-transparent to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                {/* Top row: category + source */}
                <div className="mb-3 flex items-center justify-between gap-2">
                    <span
                        className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider ${cat.bg} ${cat.text}`}
                    >
                        {cat.label}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-za-text-dim">
                        <span>{item.sourceIcon}</span>
                        {item.source}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className={`mb-3 font-semibold leading-snug text-white transition group-hover:text-za-accent ${featured ? 'text-xl md:text-2xl' : 'text-base'
                        }`}
                >
                    {item.title}
                </h3>

                {/* Summary */}
                {item.summary && (
                    <p
                        className={`mb-4 flex-1 text-sm leading-relaxed text-za-text-muted ${featured ? 'line-clamp-3' : 'line-clamp-2'
                            }`}
                    >
                        {item.summary}
                    </p>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-za-border/40 pt-3">
                    <span className="font-mono text-[10px] text-za-text-dim">
                        <i className="far fa-clock mr-1" />
                        {timeAgo}
                    </span>
                    <span className="font-mono text-[10px] text-za-accent-2 opacity-0 transition-opacity group-hover:opacity-100">
                        Baca selengkapnya
                        <i className="fas fa-arrow-right ml-1.5 text-[8px]" />
                    </span>
                </div>
            </div>
        </a>
    );
}

function formatTimeAgo(iso: string): string {
    try {
        const date = new Date(iso);
        const diff = Math.floor((Date.now() - date.getTime()) / 60000);

        if (diff < 1) return 'Baru saja';
        if (diff < 60) return `${diff}m lalu`;
        if (diff < 1440) return `${Math.floor(diff / 60)}j lalu`;
        if (diff < 10080) return `${Math.floor(diff / 1440)}h lalu`;
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return '—';
    }
}