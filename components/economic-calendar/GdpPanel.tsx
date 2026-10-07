'use client';

import { useState } from 'react';
import type { EconomicEvent, ImpactFilter } from './types';
import { getCountryName } from '@/lib/economic-calendar/utils';
import FlagIcon from './FlagIcon';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 15;

interface EventsPanelProps {
    events: EconomicEvent[];
    loading: boolean;
    error: string | null;
}

const IMPACT_STYLES = {
    high: {
        border: 'border-l-za-danger',
        badge: 'bg-za-danger/10 text-za-danger',
        label: 'Tinggi',
    },
    medium: {
        border: 'border-l-za-warning',
        badge: 'bg-za-warning/10 text-za-warning',
        label: 'Sedang',
    },
    low: {
        border: 'border-l-za-success',
        badge: 'bg-za-success/10 text-za-success',
        label: 'Rendah',
    },
} as const;

export default function EventsPanel({
    events,
    loading,
    error,
}: EventsPanelProps) {
    const [filter, setFilter] = useState<ImpactFilter>('all');
    const [page, setPage] = useState(1);

    // ===== Loading =====
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12 gap-3 text-za-text-muted">
                <i className="fas fa-spinner animate-spin text-2xl text-za-accent" />
                Memuat agenda ekonomi...
            </div>
        );
    }

    // ===== Error =====
    if (error) {
        return (
            <div className="flex gap-4 rounded-xl border-l-4 border-za-warning bg-za-warning/5 p-6">
                <i className="fas fa-exclamation-triangle mt-1 text-2xl text-za-warning" />
                <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-za-warning">
                        Gagal Memuat Agenda Ekonomi
                    </h3>
                    <p className="text-sm leading-relaxed text-za-text-muted">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    // ===== Empty =====
    if (!events || events.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-za-border bg-za-surface/50 py-12 text-center">
                <i className="fas fa-calendar-check mb-4 text-5xl text-za-text-dim" />
                <h3 className="mb-1 font-medium text-za-text">Belum Ada Event</h3>
                <p className="text-sm text-za-text-dim">
                    Silakan pilih rentang tanggal dan klik &quot;Terapkan Filter&quot;.
                </p>
            </div>
        );
    }

    // ===== Filter =====
    const filtered =
        filter === 'all' ? events : events.filter((e) => e.impact === filter);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const safePage = Math.min(Math.max(1, page), Math.max(1, totalPages));
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

    const handleFilterChange = (f: ImpactFilter) => {
        setFilter(f);
        setPage(1);
    };

    return (
        <div>
            {/* Filter buttons */}
            <div className="mb-4 flex flex-wrap gap-2">
                {(['all', 'high', 'medium', 'low'] as const).map((f) => {
                    const label =
                        f === 'all'
                            ? 'Semua'
                            : f === 'high'
                                ? 'Dampak Tinggi'
                                : f === 'medium'
                                    ? 'Dampak Sedang'
                                    : 'Dampak Rendah';
                    return (
                        <button
                            key={f}
                            type="button"
                            onClick={() => handleFilterChange(f)}
                            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${filter === f
                                ? 'border-za-accent bg-za-accent/15 text-za-accent'
                                : 'border-za-border bg-za-surface text-za-text-muted hover:border-za-accent/50 hover:text-white'
                                }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Info */}
            <div className="mb-3 text-sm text-za-text-muted">
                Menampilkan {filtered.length === 0 ? 0 : start + 1}–
                {Math.min(start + ITEMS_PER_PAGE, filtered.length)} dari{' '}
                {filtered.length} event
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-za-border bg-za-surface/50 py-12 text-center">
                    <i className="fas fa-calendar-check mb-4 text-5xl text-za-text-dim" />
                    <h3 className="mb-1 font-medium text-za-text">
                        Tidak Ada Event
                    </h3>
                    <p className="text-sm text-za-text-dim">
                        Tidak ada event yang sesuai dengan filter.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    {pageItems.map((ev) => {
                        const style =
                            IMPACT_STYLES[ev.impact] || IMPACT_STYLES.medium;
                        let dateStr = '—';
                        let timeStr = '';
                        try {
                            const d = new Date(ev.date);
                            if (!isNaN(d.getTime())) {
                                dateStr = d.toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                });
                                timeStr = d.toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                });
                            }
                        } catch { }

                        const actualStr = String(ev.actual);
                        const actualColor = actualStr.startsWith('-')
                            ? 'text-za-danger'
                            : !isNaN(parseFloat(actualStr)) &&
                                parseFloat(actualStr) > 0
                                ? 'text-za-success'
                                : 'text-white';

                        return (
                            <div
                                key={ev.id}
                                className={`flex flex-wrap items-center gap-4 rounded-xl border border-l-4 ${style.border} border-za-border bg-za-surface p-4 transition hover:border-za-accent/40`}
                            >
                                <FlagIcon code={ev.country} wrapper />

                                <div className="min-w-[200px] flex-1">
                                    <div className="mb-1 text-sm font-semibold text-white">
                                        {ev.title}
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-xs text-za-text-dim">
                                        <span>
                                            <i className="fas fa-map-marker-alt mr-1 text-za-accent" />
                                            {getCountryName(ev.country)}
                                        </span>
                                        <span>
                                            <i className="fas fa-calendar mr-1 text-za-accent" />
                                            {dateStr}
                                        </span>
                                        {timeStr && (
                                            <span>
                                                <i className="fas fa-clock mr-1 text-za-accent" />
                                                {timeStr}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <EventValue
                                        label="Actual"
                                        value={String(ev.actual)}
                                        color={actualColor}
                                    />
                                    <EventValue
                                        label="Forecast"
                                        value={String(ev.forecast)}
                                    />
                                    <EventValue
                                        label="Previous"
                                        value={String(ev.previous)}
                                    />
                                </div>

                                <div
                                    className={`flex-shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase ${style.badge}`}
                                >
                                    {style.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-za-text-muted">
                    {totalPages > 1 && `Halaman ${safePage} dari ${totalPages}`}
                </div>
                <Pagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}

/* ============================================
   SUB COMPONENT
   ============================================ */

function EventValue({
    label,
    value,
    color = 'text-white',
}: {
    label: string;
    value: string;
    color?: string;
}) {
    return (
        <div className="min-w-[60px] text-center">
            <div className="text-[10px] uppercase tracking-wider text-za-text-dim">
                {label}
            </div>
            <div className={`mt-0.5 text-sm font-bold ${color}`}>{value}</div>
        </div>
    );
}