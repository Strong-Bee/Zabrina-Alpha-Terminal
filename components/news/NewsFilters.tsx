'use client';

interface NewsFiltersProps {
    search: string;
    onSearchChange: (v: string) => void;
    totalResults: number;
    autoRefresh: boolean;
    onAutoRefreshChange: (v: boolean) => void;
}

export default function NewsFilters({
    search,
    onSearchChange,
    totalResults,
    autoRefresh,
    onAutoRefreshChange,
}: NewsFiltersProps) {
    return (
        <div className="mb-6 flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[240px] flex-1">
                <i className="fas fa-search pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-za-text-dim" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari berita, sumber, atau topik..."
                    className="w-full rounded-xl border border-za-border bg-za-surface/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-za-text-dim focus:border-za-accent focus:outline-none focus:ring-1 focus:ring-za-accent/40 transition"
                />
            </div>

            {/* Total results */}
            <div className="flex items-center gap-2 rounded-xl border border-za-border bg-za-surface/60 px-3.5 py-2 font-mono text-xs text-za-text-muted">
                <i className="fas fa-list text-[10px] text-za-accent-2" />
                {totalResults} hasil
            </div>

            {/* Auto-refresh toggle */}
            <button
                type="button"
                onClick={() => onAutoRefreshChange(!autoRefresh)}
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition ${autoRefresh
                    ? 'border-za-success/40 bg-za-success/5 text-za-success'
                    : 'border-za-border bg-za-surface/60 text-za-text-muted hover:text-white'
                    }`}
                title="Auto-refresh setiap 5 menit"
            >
                <span
                    className={`h-1.5 w-1.5 rounded-full ${autoRefresh
                        ? 'bg-za-success animate-pulse'
                        : 'bg-za-text-dim'
                        }`}
                />
                Auto-refresh
            </button>
        </div>
    );
}