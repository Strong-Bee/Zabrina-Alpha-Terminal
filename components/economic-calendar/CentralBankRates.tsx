'use client';

import { CENTRAL_BANK_RATES } from './data';

export default function CentralBankRates() {
    return (
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-za-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                    Kebijakan Moneter
                </span>
            </div>

            <h2 className="text-display mb-4 text-3xl text-white md:text-4xl">
                Suku Bunga Bank Sentral
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-za-text-muted">
                Selisih suku bunga menggerakkan pasangan forex. Bias hawkish/dovish memberi arah jangka menengah.
            </p>

            <div className="overflow-hidden rounded-2xl border border-za-border bg-za-surface/40">
                <div className="grid grid-cols-[1fr_repeat(3,120px)] gap-3 border-b border-za-border bg-za-surface-2/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-za-text-dim">
                    <div>Bank Sentral</div>
                    <div className="text-center">Suku Bunga</div>
                    <div className="text-center">Bias</div>
                    <div className="text-center">Rapat Berikutnya</div>
                </div>

                {CENTRAL_BANK_RATES.map((bank) => {
                    const biasColor =
                        bank.bias === 'Hawkish'
                            ? 'bg-za-danger/10 text-za-danger'
                            : bank.bias === 'Dovish'
                                ? 'bg-za-success/10 text-za-success'
                                : 'bg-za-warning/10 text-za-warning';
                    return (
                        <div
                            key={bank.name}
                            className="grid grid-cols-[1fr_repeat(3,120px)] items-center gap-3 border-b border-za-border/40 px-5 py-3 transition hover:bg-za-surface-2/40 last:border-b-0"
                        >
                            <div>
                                <div className="text-sm font-medium text-white">
                                    {bank.name}
                                </div>
                                <div className="mt-0.5 text-[11px] text-za-text-dim">
                                    {bank.note}
                                </div>
                            </div>
                            <div className="text-center font-mono text-sm font-semibold text-white">
                                {bank.rate}
                            </div>
                            <div className="text-center">
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${biasColor}`}>
                                    {bank.bias}
                                </span>
                            </div>
                            <div className="text-center font-mono text-xs text-za-text-muted">
                                {bank.nextMeeting}
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="mt-4 text-[11px] text-za-text-dim">
                ⚠️ Angka dirangkum dari web — verifikasi ke sumber resmi sebelum dipakai.
            </p>
        </section>
    );
}