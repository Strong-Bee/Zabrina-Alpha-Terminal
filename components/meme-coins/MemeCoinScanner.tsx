'use client';

import { useCallback, useEffect, useState } from 'react';

type MemePair = {
  chainId: string;
  dexId: string;
  pairAddress: string;
  tokenAddress: string;
  name: string;
  symbol: string;
  quoteSymbol: string;
  priceUsd: number | null;
  liquidityUsd: number | null;
  volume24h: number;
  priceChange24h: number | null;
  txns24h: number;
  buys24h: number;
  sells24h: number;
  fdv: number | null;
  marketCap: number | null;
  pairCreatedAt: number | null;
  ageHours: number | null;
  url: string;
  riskFlags: string[];
};

type ScannerResponse = {
  pairs: MemePair[];
  error?: string;
  detail?: string;
  meta?: { source: string; chain: string; fetchedAt: string; profileCount?: number };
};

const money = (value: number | null | undefined) => {
  if (value == null || !Number.isFinite(value)) return '—';
  if (value >= 1_000_000_000) return '$' + (value / 1_000_000_000).toFixed(2) + 'B';
  if (value >= 1_000_000) return '$' + (value / 1_000_000).toFixed(2) + 'M';
  if (value >= 1_000) return '$' + (value / 1_000).toFixed(1) + 'K';
  if (value >= 1) return '$' + value.toFixed(2);
  if (value >= 0.000001) return '$' + value.toFixed(8);
  return '$' + value.toExponential(2);
};

const ageLabel = (hours: number | null) => {
  if (hours == null) return 'Unknown';
  if (hours < 1) return Math.max(1, Math.round(hours * 60)) + 'm';
  if (hours < 48) return hours.toFixed(1) + 'h';
  return (hours / 24).toFixed(1) + 'd';
};

export default function MemeCoinScanner() {
  const [pairs, setPairs] = useState<MemePair[]>([]);
  const [minLiquidity, setMinLiquidity] = useState('5000');
  const [minVolume, setMinVolume] = useState('10000');
  const [maxAgeHours, setMaxAgeHours] = useState('168');
  const [minTxns, setMinTxns] = useState('20');
  const [sort, setSort] = useState('volume');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fetchedAt, setFetchedAt] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  const loadPairs = useCallback(async () => {
    setLoading(true);
    setError('');
    const query = new URLSearchParams({
      minLiquidity,
      minVolume,
      maxAgeHours,
      minTxns,
      sort,
      limit: '50',
    });
    try {
      const response = await fetch('/api/meme-coins?' + query.toString(), { cache: 'no-store' });
      const payload = (await response.json()) as ScannerResponse;
      if (!response.ok) throw new Error(payload.detail || payload.error || 'Permintaan scanner gagal.');
      setPairs(payload.pairs ?? []);
      setFetchedAt(payload.meta?.fetchedAt ?? '');
    } catch (err) {
      setPairs([]);
      setError(err instanceof Error ? err.message : 'Gagal mengambil data.');
    } finally {
      setLoading(false);
    }
  }, [minLiquidity, minVolume, maxAgeHours, minTxns, sort]);

  useEffect(() => {
    void loadPairs();
  }, [loadPairs, refreshCount]);

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      setError('Clipboard tidak tersedia. Salin alamat dari detail token secara manual.');
    }
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl border border-za-border bg-gradient-to-br from-za-surface via-za-bg to-za-surface p-6 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-za-accent/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-za-accent/30 bg-za-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-za-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-za-accent" />
              Solana · DEX Screener
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Meme Coin Scanner</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-za-text-muted md:text-base">
              Temukan dan saring pair Solana berdasarkan likuiditas, volume, usia pair, serta aktivitas transaksi. Gunakan hasil sebagai titik awal riset, bukan sinyal beli.
            </p>
          </div>
          <button type="button" onClick={() => setRefreshCount((count) => count + 1)} disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-za-border bg-za-surface-2 px-4 py-3 text-sm font-semibold text-white transition hover:border-za-accent/50 disabled:cursor-wait disabled:opacity-60">
            <i className={`fas fa-rotate ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Memuat data…' : 'Refresh data'}
          </button>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-za-border/70 pt-5 md:grid-cols-4">
          <Metric label="Pair lolos filter" value={loading ? '…' : String(pairs.length)} />
          <Metric label="Jaringan" value="Solana" />
          <Metric label="Sumber data" value="DEX Screener" />
          <Metric label="Pembaruan" value={fetchedAt ? new Date(fetchedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '—'} />
        </div>
      </section>

      <section className="rounded-2xl border border-za-border bg-za-surface/70 p-4 md:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold text-white">Filter scanner</h2>
          <span className="text-xs text-za-text-dim">Maksimal 50 pair ditampilkan</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Filter label="Min. likuiditas (USD)" value={minLiquidity} onChange={setMinLiquidity} min="0" step="1000" />
          <Filter label="Min. volume 24j (USD)" value={minVolume} onChange={setMinVolume} min="0" step="1000" />
          <Filter label="Umur maksimal (jam)" value={maxAgeHours} onChange={setMaxAgeHours} min="1" step="1" />
          <Filter label="Min. transaksi 24j" value={minTxns} onChange={setMinTxns} min="0" step="10" />
          <label className="block text-xs text-za-text-muted">
            Urutkan berdasarkan
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="mt-2 w-full rounded-lg border border-za-border bg-za-bg px-3 py-2.5 text-sm text-white outline-none focus:border-za-accent">
              <option value="volume">Volume 24 jam</option>
              <option value="liquidity">Likuiditas</option>
              <option value="change">Perubahan harga 24 jam</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => void loadPairs()} disabled={loading} className="rounded-lg bg-za-accent px-4 py-2 text-sm font-bold text-za-bg disabled:opacity-50">Terapkan filter</button>
          <button type="button" onClick={() => { setMinLiquidity('5000'); setMinVolume('10000'); setMaxAgeHours('168'); setMinTxns('20'); setSort('volume'); }} className="rounded-lg border border-za-border px-4 py-2 text-sm text-za-text-muted hover:text-white">Reset filter</button>
        </div>
      </section>

      {error && <div role="alert" className="rounded-xl border border-za-danger/30 bg-za-danger/5 p-4 text-sm text-za-danger">
        <div className="font-semibold">Data scanner tidak tersedia</div>
        <p className="mt-1 break-words text-za-text-muted">{error}</p>
        <p className="mt-2 text-xs text-za-text-dim">Periksa koneksi atau coba lagi nanti. Data gagal tidak diganti dengan angka demo.</p>
      </div>}

      <section className="overflow-hidden rounded-2xl border border-za-border bg-za-surface/50">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-za-border px-4 py-4 md:px-5">
          <div>
            <h2 className="font-semibold text-white">Kandidat pair Solana</h2>
            <p className="mt-1 text-xs text-za-text-dim">Metrik pair berasal dari provider; tidak semuanya merupakan token meme coin yang telah diklasifikasikan.</p>
          </div>
          <a href="https://dexscreener.com/solana" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-za-accent hover:underline">Buka DEX Screener ↗</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
            <thead className="bg-za-bg/70 text-[10px] uppercase tracking-wider text-za-text-dim">
              <tr>
                <th className="px-4 py-3 font-medium">Token / Pair</th>
                <th className="px-4 py-3 text-right font-medium">Harga</th>
                <th className="px-4 py-3 text-right font-medium">Perubahan 24j</th>
                <th className="px-4 py-3 text-right font-medium">Volume 24j</th>
                <th className="px-4 py-3 text-right font-medium">Likuiditas</th>
                <th className="px-4 py-3 text-right font-medium">Transaksi</th>
                <th className="px-4 py-3 text-right font-medium">Umur pair</th>
                <th className="px-4 py-3 font-medium">Indikator awal</th>
                <th className="px-4 py-3 font-medium">Sumber</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-za-border/70">
              {loading && pairs.length === 0 && <tr><td colSpan={9} className="px-4 py-14 text-center text-za-text-muted"><i className="fas fa-spinner mr-2 animate-spin" />Memuat kandidat dari DEX Screener…</td></tr>}
              {!loading && !error && pairs.length === 0 && <tr><td colSpan={9} className="px-4 py-14 text-center text-za-text-muted">Tidak ada pair yang cocok dengan filter ini. Coba longgarkan filter.</td></tr>}
              {pairs.map((pair) => {
                const change = pair.priceChange24h;
                const changePositive = (change ?? 0) >= 0;
                return <tr key={pair.pairAddress} className="transition hover:bg-white/[0.025]">
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-za-border bg-za-bg font-mono text-xs font-bold text-za-accent">{pair.symbol.slice(0, 3).toUpperCase()}</div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white">{pair.name} <span className="text-za-text-dim">({pair.symbol})</span></div>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-za-text-dim">
                          <span>{pair.dexId}</span><span>·</span><span>{pair.symbol}/{pair.quoteSymbol}</span>
                        </div>
                        <button type="button" onClick={() => void copyAddress(pair.tokenAddress)} className="mt-1 max-w-[220px] truncate font-mono text-[10px] text-za-accent hover:underline" title="Salin alamat token">
                          {pair.tokenAddress} <i className="fas fa-copy ml-1" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-xs text-white">{money(pair.priceUsd)}</td>
                  <td className={`px-4 py-4 text-right font-mono text-xs ${changePositive ? 'text-za-success' : 'text-za-danger'}`}>{change == null ? '—' : `${changePositive ? '+' : ''}${change.toFixed(2)}%`}</td>
                  <td className="px-4 py-4 text-right font-mono text-xs text-white">{money(pair.volume24h)}</td>
                  <td className="px-4 py-4 text-right font-mono text-xs text-white">{money(pair.liquidityUsd)}</td>
                  <td className="px-4 py-4 text-right font-mono text-xs text-white"><span className="block">{pair.txns24h.toLocaleString('id-ID')}</span><span className="mt-1 block text-[10px] text-za-text-dim">{pair.buys24h}B / {pair.sells24h}S</span></td>
                  <td className="px-4 py-4 text-right font-mono text-xs text-white">{ageLabel(pair.ageHours)}</td>
                  <td className="px-4 py-4">
                    {pair.riskFlags.length ? <div className="flex max-w-44 flex-wrap gap-1">{pair.riskFlags.map((flag) => <span key={flag} className="rounded-md border border-za-warning/20 bg-za-warning/5 px-2 py-1 text-[10px] text-za-warning">{flag}</span>)}</div> : <span className="text-xs text-za-text-muted">Tidak ada flag awal</span>}
                  </td>
                  <td className="px-4 py-4"><a href={pair.url} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-xs font-medium text-za-accent hover:underline">Lihat pair ↗</a></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-za-border px-4 py-3 text-[10px] leading-5 text-za-text-dim">
          Data dari DEX Screener. Indikator risiko ini heuristik sederhana, bukan audit kontrak. Likuiditas dapat berubah cepat; angka market cap/FDV dapat tidak tersedia. Selalu verifikasi alamat token dan pair sebelum bertindak.
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-za-border/70 bg-za-bg/50 px-3 py-3">
    <div className="text-[10px] uppercase tracking-wider text-za-text-dim">{label}</div>
    <div className="mt-1 truncate font-mono text-sm font-semibold text-white">{value}</div>
  </div>;
}

function Filter({ label, value, onChange, min, step }: { label: string; value: string; onChange: (value: string) => void; min: string; step: string }) {
  return <label className="block text-xs text-za-text-muted">
    {label}
    <input type="number" inputMode="decimal" min={min} step={step} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-za-border bg-za-bg px-3 py-2.5 text-sm text-white outline-none focus:border-za-accent" />
  </label>;
}
