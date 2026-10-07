'use client';

import { MARKET_NEWS } from './data';

export default function MarketNews() {
    return (
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-za-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                    Berita · Otomatis
                </span>
            </div>

            <h2 className="text-display mb-4 text-3xl text-white md:text-4xl">
                Kabar Pasar
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-za-text-muted">
                Berita yang menggerakkan dolar, emas, dan suku bunga — diperbarui tiap 30 menit.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MARKET_NEWS.map((news, idx) => (
                    <a
                        key={idx}
                        href={news.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col rounded-2xl border border-za-border bg-za-surface/60 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:border-za-accent/40"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <span className="rounded-full bg-za-accent/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-za-accent">
                                {news.category}
                            </span>
                            <span className="font-mono text-[10px] text-za-text-dim">
                                {news.datetime}
                            </span>
                        </div>

                        <h3 className="mb-3 font-semibold leading-snug text-white transition group-hover:text-za-accent">
                            {news.title}
                        </h3>

                        {news.impact && (
                            <p className="mb-3 flex-1 text-xs leading-relaxed text-za-text-muted">
                                <span className="text-za-accent">✦</span> {news.impact}
                            </p>
                        )}

                        <div className="mt-auto flex items-center justify-between border-t border-za-border/40 pt-3 text-[10px] text-za-text-dim">
                            <span className="font-mono">{news.source}</span>
                            <i className="fas fa-arrow-right opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                    </a>
                ))}
            </div>

            <p className="mt-6 text-[11px] text-za-text-dim">
                ⚠️ Rangkuman berita untuk konteks pasar — bukan rekomendasi beli/jual.
            </p>
        </section>
    );
}