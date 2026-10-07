'use client';

import { MACRO_GROUPS } from './data';

export default function MacroIndicators() {
    return (
        <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-za-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-za-accent">
                    Data Historis
                </span>
            </div>

            <h2 className="text-display mb-4 text-3xl text-white md:text-4xl">
                Indikator Makro &amp; Industri
            </h2>
            <p className="mb-8 max-w-2xl text-sm text-za-text-muted">
                Histori rilis data ekonomi 3 bulan terakhir.
            </p>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {MACRO_GROUPS.map((group) => (
                    <div key={group.title} className="overflow-hidden rounded-2xl border border-za-border bg-za-surface/40">
                        <div className="border-b border-za-border bg-za-surface-2/60 px-5 py-3">
                            <h3 className="text-sm font-semibold text-white">
                                {group.title}
                            </h3>
                        </div>
                        <table className="w-full text-sm">
                            <thead className="bg-za-surface/80 text-[10px] uppercase tracking-wider text-za-text-dim">
                                <tr>
                                    <th className="px-5 py-2 text-left font-medium">Indikator</th>
                                    {group.columns.map((c) => (
                                        <th key={c} className="px-5 py-2 text-center font-medium">
                                            {c}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-za-border/40">
                                {group.rows.map((row) => (
                                    <tr key={row.indicator} className="hover:bg-za-surface-2/40">
                                        <td className="px-5 py-2.5 text-xs text-za-text-muted">
                                            {row.indicator}
                                        </td>
                                        {row.values.map((v, i) => (
                                            <td key={i} className="px-5 py-2.5 text-center font-mono text-xs text-white">
                                                {v}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </section>
    );
}