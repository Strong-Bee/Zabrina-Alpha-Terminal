'use client';

import { TIMEFRAMES } from './symbols';

interface TimeframeBarProps {
    activeTimeframe: string;
    onSelect: (tf: string) => void;
}

export default function TimeframeBar({
    activeTimeframe,
    onSelect,
}: TimeframeBarProps) {
    return (
        <div className="flex flex-shrink-0 items-center gap-1 overflow-x-auto border-b border-za-border/60 bg-za-surface/40 px-4 py-2 backdrop-blur-sm">
            <span className="mr-2 hidden font-mono text-[10px] uppercase tracking-wider text-za-text-dim sm:inline">
                TF:
            </span>

            {TIMEFRAMES.map((tf) => (
                <button
                    key={tf.value}
                    type="button"
                    onClick={() => onSelect(tf.value)}
                    className={`min-w-[36px] rounded-md px-2.5 py-1 font-mono text-xs font-medium transition ${activeTimeframe === tf.value
                        ? 'bg-za-accent text-za-bg'
                        : 'text-za-text-muted hover:bg-za-surface-2 hover:text-white'
                        }`}
                >
                    {tf.label}
                </button>
            ))}
        </div>
    );
}