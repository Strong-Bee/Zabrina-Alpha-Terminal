'use client';

import { useEffect, useState } from 'react';

interface ClockDisplayProps {
    className?: string;
    showSeconds?: boolean;
    showDate?: boolean;
}

export default function ClockDisplay({
    className = '',
    showSeconds = true,
    showDate = true,
}: ClockDisplayProps) {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    // Placeholder saat SSR — hindari hydration mismatch
    if (!now) {
        return (
            <span className={`font-mono text-[11px] text-za-text-dim ${className}`}>
                -- --- ---- · --:--:--
            </span>
        );
    }

    const dateStr = now.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    });

    const timeStr = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds && { second: '2-digit' }),
    });

    return (
        <span className={`font-mono text-[11px] ${className}`}>
            {showDate && (
                <>
                    <span className="text-za-text-muted">{dateStr}</span>
                    <span className="mx-1.5 text-za-text-dim">·</span>
                </>
            )}
            <span className="text-za-text-muted">{timeStr}</span>
        </span>
    );
}