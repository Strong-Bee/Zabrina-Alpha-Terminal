'use client';

export default function WorkspaceToolbar() {
    return (
        <div className="flex flex-shrink-0 flex-wrap items-center gap-2 border-t border-za-border/60 bg-za-surface/40 px-4 py-2 backdrop-blur-sm">
            {/* Left: Mode indicator */}
            <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-za-text-dim">
                    Mode Replay
                </span>
                <span className="text-za-text-dim">—</span>
                <span className="text-xs text-za-text-muted">
                    Geser ke kiri lalu klik candle
                </span>
            </div>

            <div className="ml-auto flex items-center gap-2">
                <ToolButton icon="fa-arrow-pointer" label="Pointer" />
                <ToolButton icon="fa-pen" label="Gambar" />
                <ToolButton icon="fa-ruler" label="Ukur" />
                <ToolButton icon="fa-font" label="Teks" />
                <ToolButton icon="fa-star" label="Favorit" />
                <ToolButton icon="fa-camera" label="Snapshot" />
                <ToolButton icon="fa-gear" label="Pengaturan" />
            </div>
        </div>
    );
}

function ToolButton({ icon, label }: { icon: string; label: string }) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-za-border bg-za-surface/60 text-za-text-muted transition hover:border-za-accent/50 hover:bg-za-accent/5 hover:text-za-accent"
        >
            <i className={`fas ${icon} text-xs`} />
        </button>
    );
}