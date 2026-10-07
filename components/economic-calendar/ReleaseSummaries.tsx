'use client';

import { RELEASE_SUMMARIES } from './data';

export default function ReleaseSummaries() {
    return (
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-za-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                    Rangkuman Rilis · Otomatis
                </span>
            </div>

            <h2 className="text-display mb-4 text-3xl text-white md:text-4xl">
                Rangkuman FOMC · CPI · NFP
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-za-text-muted">
                Dirangkum otomatis + pencarian web setelah setiap rilis.
            </p>

            <div className="space-y-6">
                {RELEASE_SUMMARIES.map((summary) => (
                    <article key={summary.id} className="rounded-2xl border border-za-border bg-za-surface/60 p-6">
                        <header className="mb-5 border-b border-za-border/60 pb-4">
                            <h3 className="mb-2 text-lg font-semibold text-white">
                                {summary.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-za-text-dim">
                                <span className="font-mono">{summary.releasedAt}</span>
                                <span>·</span>
                                <span className="flex items-center gap-1.5">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-za-accent/20 text-[10px] font-bold text-za-accent">
                                        S
                                    </span>
                                    {summary.summaryBy}
                                </span>
                            </div>
                        </header>

                        <ol className="mb-5 space-y-3">
                            {summary.points.map((point, i) => (
                                <li key={i} className="flex gap-3 text-sm leading-relaxed text-za-text-muted">
                                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-za-accent/15 font-mono text-[10px] font-bold text-za-accent">
                                        {i + 1}
                                    </span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ol>

                        <div className="rounded-xl border-l-4 border-za-accent bg-za-accent/5 p-4">
                            <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-za-accent">
                                Analisis Sentimen
                            </div>
                            <p className="text-sm leading-relaxed text-za-text-muted">
                                {summary.analysis}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}