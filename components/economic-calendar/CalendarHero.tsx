'use client';

interface CalendarHeroProps {
    lastUpdateText: string;
    status: 'checking' | 'online' | 'offline';
}

export default function CalendarHero({
    lastUpdateText,
    status,
}: CalendarHeroProps) {
    const statusColor = {
        checking: 'bg-za-warning',
        online: 'bg-za-success',
        offline: 'bg-za-danger',
    }[status];

    const statusLabel = {
        checking: 'Memuat',
        online: 'Data Real-time',
        offline: 'Terputus',
    }[status];

    return (
        <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-za-accent/30 bg-za-accent/5 px-3.5 py-1.5">
                <span className="status-dot-live" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-za-accent">
                    Kalender Ekonomi Live · Real-time
                </span>
            </div>

            <h1 className="text-display mb-4 max-w-3xl text-5xl text-white md:text-7xl">
                Kalender Ekonomi.
                <br />
                <span className="text-gradient-accent">Pantau semua.</span>
            </h1>

            <p className="mb-10 max-w-2xl text-base leading-relaxed text-za-text-muted md:text-lg">
                Data ekonomi global real-time dari berbagai sumber terpercaya dalam
                satu layar. Bandingkan forecast antar-lembaga, lihat event
                high-impact, dan dapatkan konteks pasar secara otomatis.
            </p>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-4 py-2 backdrop-blur-sm">
                    <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                    <span className="font-mono text-xs tracking-wider text-za-text">
                        {statusLabel}
                    </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-4 py-2 backdrop-blur-sm">
                    <i className="fas fa-sync-alt text-[10px] text-za-accent-2" />
                    <span className="font-mono text-xs text-za-text-muted">
                        {lastUpdateText}
                    </span>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-za-border bg-za-surface/60 px-4 py-2 backdrop-blur-sm sm:flex">
                    <i className="fas fa-shield-halved text-[10px] text-za-success" />
                    <span className="font-mono text-xs text-za-text-muted">
                        Verified Sources
                    </span>
                </div>
            </div>
        </section>
    );
}