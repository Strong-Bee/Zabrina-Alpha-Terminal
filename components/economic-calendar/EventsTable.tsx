'use client';

import type { EconomicEvent } from './types';
import { getCountryName } from '@/lib/economic-calendar/utils';
import FlagIcon from './FlagIcon';

interface EventsTableProps {
    events: EconomicEvent[];
    loading: boolean;
}

export default function EventsTable({ events, loading }: EventsTableProps) {
    if (loading) {
        return (
            <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
                <div className="flex justify-center py-16">
                    <i className="fas fa-spinner animate-spin text-3xl text-za-accent" />
                </div>
            </section>
        );
    }

    // Group by date
    const grouped = events.reduce<Record<string, EconomicEvent[]>>((acc, ev) => {
        const d = new Date(ev.date);
        const key = d.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
        });
        if (!acc[key]) acc[key] = [];
        acc[key].push(ev);
        return acc;
    }, {});

    const dayKeys = Object.keys(grouped);

    return (
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-za-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                    Event Ekonomi Mendatang (WIB)
                </span>
            </div>

            <h2 className="text-display mb-4 text-3xl text-white md:text-4xl">
                Jadwal Rilis Data
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-za-text-muted">
                Forecast dari 3 sumber: FF = ForexFactory · TV = TradingView · MQL5 = MQL5/Tradays.
            </p>

            {dayKeys.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-za-border bg-za-surface/50 py-12 text-center">
                    <i className="fas fa-calendar-check mb-4 text-5xl text-za-text-dim" />
                    <h3 className="mb-1 font-medium text-za-text">
                        Tidak ada event dalam rentang ini
                    </h3>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-za-border bg-za-surface/40">
                    {/* Header */}
                    <div className="hidden grid-cols-[80px_1fr_repeat(4,90px)] gap-3 border-b border-za-border bg-za-surface px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-za-text-dim md:grid">
                        <div>Jam</div>
                        <div>Event</div>
                        <div className="text-center">FF</div>
                        <div className="text-center">TV</div>
                        <div className="text-center">MQL5</div>
                        <div className="text-center">Actual</div>
                    </div>

                    {dayKeys.map((day) => (
                        <div key={day}>
                            <div className="border-b border-za-border bg-za-surface-2/60 px-5 py-2.5">
                                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-za-accent">
                                    {day}
                                </span>
                            </div>
                            {grouped[day].map((ev) => (
                                <EventRow key={ev.id} event={ev} />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

function EventRow({ event }: { event: EconomicEvent }) {
    const d = new Date(event.date);
    const timeStr = d.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const impactDot =
        event.impact === 'high'
            ? 'bg-za-danger'
            : event.impact === 'medium'
                ? 'bg-za-warning'
                : 'bg-za-success';

    const actualStr = String(event.actual);
    const actualColor =
        actualStr === '—'
            ? 'text-za-text-dim'
            : actualStr.startsWith('-')
                ? 'text-za-danger'
                : 'text-za-success';

    return (
        <div className="grid grid-cols-1 items-center gap-2 border-b border-za-border/40 px-5 py-3 transition hover:bg-za-surface-2/50 md:grid-cols-[80px_1fr_repeat(4,90px)] md:gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-za-text-muted md:block">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${impactDot} md:hidden`} />
                {timeStr}
            </div>
            <div className="flex items-center gap-3">
                <FlagIcon code={event.country} size="sm" />
                <span className="text-sm text-white">{event.title}</span>
            </div>
            <div className="hidden text-center font-mono text-xs text-za-text-muted md:block">
                {String(event.forecast)}
            </div>
            <div className="hidden text-center font-mono text-xs text-za-text-dim md:block">
                -
            </div>
            <div className="hidden text-center font-mono text-xs text-za-text-dim md:block">
                -
            </div>
            <div className={`hidden text-center font-mono text-xs font-semibold md:block ${actualColor}`}>
                {actualStr}
            </div>
        </div>
    );
}