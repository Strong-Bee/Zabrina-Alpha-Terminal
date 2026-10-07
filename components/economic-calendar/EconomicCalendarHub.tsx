'use client';

import { useEffect, useState } from 'react';
import type { EconomicEvent } from './types';
import CalendarHero from './CalendarHero';

export default function EconomicCalendarHub() {
    const [events, setEvents] = useState<EconomicEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const now = new Date();
                const from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const to = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                const res = await fetch(
                    `/api/economic-calendar/events?from=${from.toISOString()}&to=${to.toISOString()}`,
                    { cache: 'no-store' }
                );
                const data = await res.json();
                if (cancelled) return;
                const raw = Array.isArray(data) ? data : data.events || [];
                setEvents(raw);
                setLastUpdate(new Date());
            } catch (err) {
                console.error(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    const lastUpdateText = lastUpdate
        ? `${Math.floor((Date.now() - lastUpdate.getTime()) / 60000)} menit lalu`
        : 'Memuat...';

    return (
        <div className="animate-in">
            <CalendarHero
                lastUpdateText={lastUpdateText}
                status={loading ? 'checking' : events.length > 0 ? 'online' : 'offline'}
            />
            {/* Tambahkan seksi lain di sini setelah komponennya dibuat */}
        </div>
    );
}