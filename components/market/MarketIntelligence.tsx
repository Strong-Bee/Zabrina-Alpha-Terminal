'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type MarketRow = {
  symbol: string;
  price: number;
  change24hPct: number;
  quoteVolume24h: number;
  high24h: number;
  low24h: number;
  ma20: number | null;
  ma50: number | null;
  rsi14: number | null;
  relativeVolume20: number | null;
  trendUp: boolean;
  score: number;
  dataStatus: 'ok' | 'partial';
};

type MarketResponse = {
  provider?: string;
  timeframe?: string;
  generatedAt?: string;
  rows?: MarketRow[];
  note?: string;
  error?: string;
};

type AnalysisResponse = {
  analysis?: string;
  provider?: string;
  model?: string;
  generatedAt?: string;
  error?: string;
};

const number = (value: number | null | undefined, digits = 2) =>
  value === null || value === undefined || !Number.isFinite(value)
    ? '—'
    : value.toLocaleString('en-US', { maximumFractionDigits: digits });

const money = (value: number) => value.toLocaleString('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: value >= 1 ? 3 : 8,
});

const compact = (value: number) => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};

export default function MarketIntelligence({ mode }: { mode: 'screener' | 'radar' }) {
  const [rows, setRows] = useState<MarketRow[]>([]);
  const [provider, setProvider] = useState('Binance public market data');
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [minScore, setMinScore] = useState('0');
  const [analysis, setAnalysis] = useState('');
  const [analysisMeta, setAnalysisMeta] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/market/screener', { cache: 'no-store' });
      const payload = await response.json() as MarketResponse;
      if (!response.ok) throw new Error(payload.error || 'Gagal mengambil data market.');
      setRows(Array.isArray(payload.rows) ? payload.rows : []);
      setProvider(payload.provider || 'Market provider');
      setUpdatedAt(payload.generatedAt || '');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Terjadi kesalahan saat mengambil data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => rows.filter((row) =>
    row.symbol.toLowerCase().includes(query.trim().toLowerCase())
    && row.score >= Number(minScore)
  ), [rows, query, minScore]);

  const runAnalysis = async () => {
    if (!rows.length) {
      setAiError('Belum ada data market yang bisa dianalisis.');
      return;
    }
    setAiLoading(true);
    setAiError('');
    setAnalysis('');
    try {
      const response = await fetch('/api/ai/market-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, rows: rows.slice(0, 20) }),
      });
      const payload = await response.json() as AnalysisResponse;
      if (!response.ok) throw new Error(payload.error || 'Analisis AI gagal.');
      setAnalysis(payload.analysis || '');
      setAnalysisMeta(`${payload.provider || 'AI'} · ${payload.model || ''} · ${payload.generatedAt ? new Date(payload.generatedAt).toLocaleString('id-ID') : ''}`);
    } catch (cause) {
      setAiError(cause instanceof Error ? cause.message : 'Analisis AI gagal.');
    } finally {
      setAiLoading(false);
    }
  };

  const radarRows = useMemo(() => [...rows].sort((a, b) =>
    Math.abs(b.change24hPct) * Math.log10(Math.max(b.quoteVolume24h, 1))
    - Math.abs(a.change24hPct) * Math.log10(Math.max(a.quoteVolume24h, 1))
  ).slice(0, 8), [rows]);

  return (
    <main className="relative min-h-screen bg-za-bg">
      <div className="pointer-events-none absolute inset-0 terminal-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-za-accent/30 bg-za-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-za-accent">
              <span className="status-dot-live" /> AI Market Intelligence
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              {mode === 'screener' ? 'Crypto Screener' : 'Market Radar'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-za-text-muted md:text-base">
              {mode === 'screener'
                ? 'Saring aset kripto berdasarkan tren harian, RSI, relative volume, momentum, dan likuiditas. NVIDIA AI membantu menginterpretasikan data terukur.'
                : 'Pantau aset dengan perubahan harga dan likuiditas menonjol. Gunakan NVIDIA AI untuk merangkum momentum, risiko, dan hal yang perlu diverifikasi.'}
            </p>
          </div>
          <button onClick={() => void load()} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl border border-za-border bg-za-surface px-4 py-3 text-sm font-semibold text-white transition hover:border-za-accent/50 disabled:opacity-50">
            <i className={`fas fa-rotate ${loading ? 'animate-spin' : ''}`} /> {loading ? 'Memuat…' : 'Refresh data'}
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric label="Aset dianalisis" value={String(rows.length)} />
          <Metric label="Kandidat skor ≥ 65" value={String(rows.filter((row) => row.score >= 65).length)} />
          <Metric label="Tren harian naik" value={String(rows.filter((row) => row.trendUp).length)} />
          <Metric label="Data provider" value="Binance · 1D" />
        </div>

        <section className="mb-6 rounded-2xl border border-za-border bg-za-surface/80 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white"><i className="fas fa-microchip text-za-accent" /> NVIDIA AI Analysis</div>
              <p className="mt-1 text-xs leading-5 text-za-text-muted">Analisis on-demand menggunakan data yang ditampilkan. API key hanya digunakan di server; AI tidak mengambil data pasar independen.</p>
            </div>
            <button onClick={() => void runAnalysis()} disabled={aiLoading || loading || rows.length === 0} className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50">
              <i className={`fas ${aiLoading ? 'fa-spinner animate-spin' : 'fa-wand-magic-sparkles'}`} /> {aiLoading ? 'Menganalisis…' : mode === 'screener' ? 'Analisis kandidat' : 'Jalankan Market Radar'}
            </button>
          </div>
          {aiError && <div role="alert" className="mt-4 rounded-lg border border-za-danger/30 bg-za-danger/5 p-3 text-sm text-za-danger">{aiError}</div>}
          {analysis && <div className="mt-5 rounded-xl border border-za-accent/20 bg-za-bg/70 p-4 md:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider text-za-text-dim">
              <span>{analysisMeta}</span><span>Interpretasi AI · bukan sinyal otomatis</span>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-7 text-za-text-muted">{analysis}</div>
          </div>}
        </section>

        {mode === 'radar' && <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {radarRows.map((row) => <article key={row.symbol} className="rounded-xl border border-za-border bg-za-surface/80 p-4">
            <div className="flex items-start justify-between gap-2">
              <div><div className="font-mono text-sm font-bold text-white">{row.symbol}</div><div className="mt-1 text-xs text-za-text-dim">Volume 24 jam {compact(row.quoteVolume24h)}</div></div>
              <span className={`rounded-md px-2 py-1 font-mono text-xs ${row.change24hPct >= 0 ? 'bg-za-success/10 text-za-success' : 'bg-za-danger/10 text-za-danger'}`}>{row.change24hPct >= 0 ? '+' : ''}{number(row.change24hPct)}%</span>
            </div>
            <div className="mt-4 text-xl font-semibold text-white">{money(row.price)}</div>
            <div className="mt-3 flex justify-between text-xs text-za-text-dim"><span>RSI(14)</span><span className="font-mono text-za-text-muted">{number(row.rsi14, 1)}</span></div>
            <div className="mt-1 flex justify-between text-xs text-za-text-dim"><span>Skor rule-based</span><span className="font-mono text-za-accent">{row.score}/100</span></div>
          </article>)}
        </section>}

        {mode === 'screener' && <section className="mb-4 flex flex-col gap-3 sm:flex-row">
          <label className="flex-1 text-xs text-za-text-muted">Cari simbol
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Contoh: BTCUSDT" className="mt-2 w-full rounded-xl border border-za-border bg-za-surface px-3 py-3 text-sm text-white outline-none focus:border-za-accent" />
          </label>
          <label className="text-xs text-za-text-muted sm:w-52">Skor minimum
            <select value={minScore} onChange={(event) => setMinScore(event.target.value)} className="mt-2 w-full rounded-xl border border-za-border bg-za-surface px-3 py-3 text-sm text-white outline-none focus:border-za-accent">
              <option value="0">Semua skor</option><option value="40">40+</option><option value="65">65+</option><option value="80">80+</option>
            </select>
          </label>
        </section>}

        <section className="overflow-hidden rounded-2xl border border-za-border bg-za-surface/80">
          <div className="flex flex-col gap-2 border-b border-za-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
            <h2 className="font-semibold text-white">{mode === 'screener' ? 'Hasil screening' : 'Universe pasar terpantau'}</h2>
            <div className="text-[10px] font-mono text-za-text-dim">{provider}{updatedAt ? ` · ${new Date(updatedAt).toLocaleString('id-ID')}` : ''}</div>
          </div>
          {error && <div role="alert" className="m-4 rounded-lg border border-za-danger/30 bg-za-danger/5 p-3 text-sm text-za-danger">{error}</div>}
          {loading && <div className="p-10 text-center text-sm text-za-text-muted"><i className="fas fa-spinner mr-2 animate-spin" />Mengambil data pasar aktual…</div>}
          {!loading && !error && filtered.length === 0 && <div className="p-10 text-center text-sm text-za-text-muted">Tidak ada aset yang cocok dengan filter saat ini.</div>}
          {!loading && !error && filtered.length > 0 && <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-xs">
              <thead className="bg-za-bg/60 font-mono uppercase tracking-wider text-za-text-dim"><tr>
                <th className="px-4 py-3">Aset</th><th className="px-4 py-3 text-right">Harga</th><th className="px-4 py-3 text-right">24 jam</th><th className="px-4 py-3 text-right">Volume 24j</th><th className="px-4 py-3 text-right">RSI 14</th><th className="px-4 py-3 text-right">RVOL 20</th><th className="px-4 py-3 text-right">MA20 / MA50</th><th className="px-4 py-3 text-right">Skor</th>
              </tr></thead>
              <tbody className="divide-y divide-za-border/70">{filtered.map((row) => <tr key={row.symbol} className="transition hover:bg-za-bg/50">
                <td className="px-4 py-3"><div className="font-mono font-semibold text-white">{row.symbol}</div><div className="mt-1 text-[10px] text-za-text-dim">{row.trendUp ? 'Tren naik' : 'Tren belum terkonfirmasi'}{row.dataStatus === 'partial' ? ' · data parsial' : ''}</div></td>
                <td className="px-4 py-3 text-right font-mono text-white">{money(row.price)}</td>
                <td className={`px-4 py-3 text-right font-mono ${row.change24hPct >= 0 ? 'text-za-success' : 'text-za-danger'}`}>{row.change24hPct >= 0 ? '+' : ''}{number(row.change24hPct)}%</td>
                <td className="px-4 py-3 text-right font-mono text-za-text-muted">{compact(row.quoteVolume24h)}</td>
                <td className="px-4 py-3 text-right font-mono text-za-text-muted">{number(row.rsi14, 1)}</td>
                <td className="px-4 py-3 text-right font-mono text-za-text-muted">{row.relativeVolume20 === null ? '—' : `${number(row.relativeVolume20)}×`}</td>
                <td className="px-4 py-3 text-right font-mono text-za-text-muted">{number(row.ma20)} / {number(row.ma50)}</td>
                <td className="px-4 py-3 text-right"><span className={`rounded-md px-2 py-1 font-mono font-bold ${row.score >= 65 ? 'bg-za-success/10 text-za-success' : 'bg-za-bg text-za-text-muted'}`}>{row.score}</span></td>
              </tr>)}</tbody>
            </table>
          </div>}
          <div className="border-t border-za-border px-4 py-3 text-[10px] leading-5 text-za-text-dim">
            Data aktual dari endpoint publik Binance; indikator dihitung dari candle harian. Skor adalah heuristik teknikal, bukan probabilitas keuntungan atau rekomendasi beli. Universe dibatasi 30 aset USDT dengan volume quote 24 jam tertinggi.
          </div>
        </section>
        <p className="mt-4 text-[11px] leading-5 text-za-text-dim">Penting: fitur ini untuk riset cryptocurrency, bukan saham BEI. NVIDIA AI menginterpretasikan snapshot yang dikirim aplikasi dan tidak menggantikan verifikasi data atau manajemen risiko.</p>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-za-border bg-za-surface/70 p-4">
    <div className="text-[10px] uppercase tracking-wider text-za-text-dim">{label}</div>
    <div className="mt-2 font-mono text-2xl font-semibold text-white">{value}</div>
  </div>;
}
