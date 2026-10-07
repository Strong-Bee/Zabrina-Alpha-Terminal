'use client';

import { SENTIMENTS, FEAR_GREED } from './data';

export default function MarketInsights() {
    return (
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-za-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                    Analisis
                </span>
            </div>

            <h2 className="text-display mb-4 text-3xl text-white md:text-4xl">
                Wawasan Pasar
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-za-text-muted">
                Analisis sentimen pada instrumen utama.
            </p>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Sentiment list */}
                <div className="rounded-2xl border border-za-border bg-za-surface/40 p-5 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">
                            Sentiment Instansi
                        </h3>
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider">
                            <span className="flex items-center gap-1 text-za-success">
                                <span className="h-2 w-2 rounded-sm bg-za-success" />
                                Long
                            </span>
                            <span className="flex items-center gap-1 text-za-danger">
                                <span className="h-2 w-2 rounded-sm bg-za-danger" />
                                Short
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {SENTIMENTS.map((s) => (
                            <div key={s.symbol}>
                                <div className="mb-1 flex items-center justify-between text-xs">
                                    <span className="font-mono font-semibold text-white">
                                        {s.symbol}
                                    </span>
                                    <div className="flex items-center gap-3 font-mono text-[10px]">
                                        <span className="text-za-success">
                                            BULL {s.bull.toFixed(2)}%
                                        </span>
                                        <span className="text-za-danger">
                                            BEAR {s.bear.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="flex h-2 overflow-hidden rounded-full bg-za-border">
                                    <div
                                        className="bg-za-success transition-all"
                                        style={{ width: `${s.bull}%` }}
                                    />
                                    <div
                                        className="bg-za-danger transition-all"
                                        style={{ width: `${s.bear}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fear & Greed */}
                <div className="rounded-2xl border border-za-border bg-za-surface/40 p-5">
                    <h3 className="mb-4 text-sm font-semibold text-white">
                        BTC Fear &amp; Greed
                    </h3>

                    <div className="mb-4 text-center">
                        <div className="font-mono text-5xl font-bold text-za-success">
                            {FEAR_GREED.value}
                        </div>
                        <div className="mt-1 text-sm text-za-success">
                            {FEAR_GREED.label}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="relative mb-4 h-2 overflow-hidden rounded-full bg-gradient-to-r from-za-danger via-za-warning to-za-success">
                        <div
                            className="absolute top-0 h-full w-1 -translate-x-1/2 bg-white shadow-lg"
                            style={{ left: `${FEAR_GREED.value}%` }}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                        {[
                            { label: 'Yesterday', value: FEAR_GREED.yesterday },
                            { label: 'Last Week', value: FEAR_GREED.lastWeek },
                            { label: 'Last Month', value: FEAR_GREED.lastMonth },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="font-mono text-lg font-bold text-white">
                                    {item.value}
                                </div>
                                <div className="text-[10px] uppercase text-za-text-dim">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}