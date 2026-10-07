'use client';

import type { EconomicEvent } from './types';
import {
    getCountryName,
    getEventStatus,
    STATUS_META,
} from '@/lib/economic-calendar/utils';
import FlagIcon from './FlagIcon';

interface HighlightEventsProps {
    events: EconomicEvent[];
    loading: boolean;
}

export default function HighlightEvents({ events, loading }: HighlightEventsProps) {
    const highlights = [...events]
        .filter((e) => e.impact === 'high')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);

    if (loading) {
        return (
            <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
                <div className="flex justify-center py-16">
                    <i className="fas fa-spinner animate-spin text-3xl text-za-accent" />
                </div>
            </section>
        );
    }

    if (highlights.length === 0) {
        return (
            <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
                <div className="rounded-2xl border border-dashed border-za-border bg-za-surface/50 py-12 text-center">
                    <i className="fas fa-calendar-check mb-4 text-5xl text-za-text-dim" />
                    <h3 className="mb-1 font-medium text-za-text">
                        Tidak ada rilis besar saat ini
                    </h3>
                    <p className="text-sm text-za-text-dim">
                        Belum ada data high-impact dalam rentang waktu ini.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-za-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                    Data Real-time
                </span>
            </div>

            <h2 className="text-display mb-4 text-3xl text-white md:text-4xl">
                Kalender Ekonomi
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-za-text-muted">
                Perbandingan rilis data ekonomi dari berbagai sumber utama.
            </p>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {highlights.map((ev) => (
                    <HighlightCard key={ev.id} event={ev} />
                ))}
            </div>
        </section>
    );
}

function HighlightCard({ event }: { event: EconomicEvent }) {
    const status = getEventStatus(event);
    const meta = STATUS_META[status];

    const impactColor =
        event.impact === 'high'
            ? 'text-za-danger border-za-danger/30 bg-za-danger/5'
            : event.impact === 'medium'
                ? 'text-za-warning border-za-warning/30 bg-za-warning/5'
                : 'text-za-success border-za-success/30 bg-za-success/5';

    let timeLabel = '';
    try {
        const dateObj = new Date(event.date);
        const diff = dateObj.getTime() - Date.now();
        const diffHours = Math.round(diff / 3600000);
        const diffDays = Math.round(diff / 86400000);

        if (diff < 0) {
            const absHours = Math.abs(diffHours);
            if (absHours < 1) timeLabel = 'Rilis baru saja';
            else if (absHours < 24) timeLabel = `Rilis ${absHours} jam lalu`;
            else timeLabel = `Rilis ${Math.abs(diffDays)} hari lalu`;
        } else {
            if (diffHours < 1) timeLabel = 'Rilis dalam < 1 jam';
            else if (diffHours < 24) timeLabel = `Rilis dalam ${diffHours} jam`;
            else timeLabel = `Rilis dalam ${diffDays} hari`;
        }
    } catch { }

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-za-border bg-za-surface/60 p-6 backdrop-blur-sm transition hover:border-za-accent/40">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-za-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative mb-5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <FlagIcon code={event.country} size="md" />
                    <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-za-text-dim">
                            {getCountryName(event.country)}
                        </div>
                        <div className="mt-0.5 text-xs text-za-text-muted">
                            {timeLabel}
                        </div>
                    </div>
                </div>
                <div
                    className={`flex-shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.border} ${meta.bg} ${meta.color}`}
                >
                    <i className={`fas ${meta.icon} mr-1 text-[8px]`} />
                    {meta.label}
                </div>
            </div>

            <h3 className="relative mb-5 text-lg font-semibold leading-snug text-white">
                {event.title}
            </h3>

            <div className="relative mb-5 grid grid-cols-3 gap-3 border-y border-za-border/60 py-4">
                <DataCell label="Actual" value={String(event.actual)} highlight />
                <DataCell label="Forecast" value={String(event.forecast)} />
                <DataCell label="Previous" value={String(event.previous)} />
            </div>

            <div className="relative flex items-center justify-between text-[10px] uppercase tracking-wider text-za-text-dim">
                <span className="font-mono">
                    <i className="fas fa-bolt mr-1 text-za-accent" />
                    Auto-update
                </span>
                <span className="font-mono">Kalender + Web</span>
            </div>
        </article>
    );
}

function DataCell({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    const isEmpty = value === '—' || value === '' || value === 'undefined';
    return (
        <div>
            <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-za-text-dim">
                {label}
            </div>
            <div
                className={`truncate font-mono text-sm font-semibold ${highlight && !isEmpty ? 'text-za-accent' : 'text-white'
                    } ${isEmpty ? 'text-za-text-dim' : ''}`}
            >
                {isEmpty ? '—' : value}
            </div>
        </div>
    );
}