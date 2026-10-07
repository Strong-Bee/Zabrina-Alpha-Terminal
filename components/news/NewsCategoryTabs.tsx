'use client';

import { CATEGORIES } from '@/lib/news/sources';

interface NewsCategoryTabsProps {
    active: string;
    onChange: (id: string) => void;
    counts: Record<string, number>;
}

export default function NewsCategoryTabs({
    active,
    onChange,
    counts,
}: NewsCategoryTabsProps) {
    return (
        <div className="mb-6 flex gap-2 overflow-x-auto border-b border-za-border/60 pb-2">
            {CATEGORIES.map((cat) => {
                const isActive = active === cat.id;
                const count = counts[cat.id] || 0;

                return (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => onChange(cat.id)}
                        className={`group relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${isActive
                            ? 'bg-za-surface text-white'
                            : 'text-za-text-muted hover:bg-za-surface-2 hover:text-white'
                            }`}
                        title={cat.description}
                    >
                        <i
                            className={`fas ${cat.icon} text-xs ${isActive
                                ? 'text-za-accent'
                                : 'text-za-text-dim group-hover:text-za-accent'
                                }`}
                        />
                        <span>{cat.label}</span>
                        {count > 0 && (
                            <span
                                className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${isActive
                                    ? 'bg-za-accent/20 text-za-accent'
                                    : 'bg-za-surface-2 text-za-text-dim'
                                    }`}
                            >
                                {count}
                            </span>
                        )}

                        {/* Active indicator */}
                        {isActive && (
                            <span className="absolute inset-x-4 -bottom-2 h-0.5 bg-za-accent" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}