import Link from 'next/link';
import type { Metadata } from 'next';
import ClockDisplay from '@/components/ClockDisplay';

export const metadata: Metadata = {
  title: 'ZABRINA ALPHA TERMINAL — Professional Trading Intelligence',
  description:
    'Terminal trading canggih dengan data real-time, kalender ekonomi, dan analitik pasar global.',
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-za-bg">
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 terminal-grid opacity-60" />
        <div className="glow-orb glow-cyan absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 opacity-30" />
        <div className="glow-orb glow-purple absolute -bottom-40 -right-40 h-[600px] w-[600px] opacity-25" />
        <div className="glow-orb glow-cyan absolute -bottom-40 -left-40 h-[500px] w-[500px] opacity-15" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-10">
        {/* ===== HERO ===== */}
        <section className="mb-24 pt-8">
          <div className="animate-in animate-in-delay-1 mb-6 inline-flex items-center gap-2 rounded-full border border-za-accent/30 bg-za-accent/5 px-3.5 py-1.5">
            <span className="flex h-1.5 w-1.5 rounded-full bg-za-accent shadow-[0_0_10px_#00d4ff]" />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-za-accent">
              Institutional Grade · Low Latency
            </span>
          </div>

          <h1 className="animate-in animate-in-delay-2 text-display mb-6 max-w-4xl text-5xl text-white md:text-7xl lg:text-8xl">
            Trade Smarter
            <br />
            with{' '}
            <span className="text-gradient-accent">Alpha Intelligence</span>
          </h1>

          <p className="animate-in animate-in-delay-3 mb-10 max-w-2xl text-base leading-relaxed text-za-text-muted md:text-lg">
            ZABRINA ALPHA TERMINAL menyatukan data ekonomi global, kalender event
            real-time, dan sinyal pasar dalam satu dashboard profesional. Dirancang
            untuk trader serius yang butuh keputusan cepat, presisi, dan terukur.
          </p>

          <div className="animate-in animate-in-delay-4 flex flex-wrap items-center gap-3">
            <Link
              href="/economic-calendar"
              className="btn-primary group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
            >
              <span className="inline-flex items-center gap-2">
                <i className="fas fa-terminal text-xs" />
                Buka Kalender Ekonomi
                <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <a
              href="#features"
              className="group inline-flex items-center gap-2 rounded-xl border border-za-border bg-za-surface/70 px-6 py-3.5 text-sm font-medium text-za-text-muted backdrop-blur-sm transition hover:border-za-accent/50 hover:text-white"
            >
              <i className="fas fa-circle-info text-xs" />
              Pelajari Fitur
            </a>
          </div>

          {/* Metric strip */}
          <div className="animate-in animate-in-delay-4 mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-za-border bg-za-border md:grid-cols-4">
            <MetricTile value="200+" label="Negara Terpantau" />
            <MetricTile value="<50ms" label="Latency Data" />
            <MetricTile value="99.99%" label="Uptime SLA" />
            <MetricTile value="24/7" label="Monitoring" />
          </div>

          {/* Live Ticker */}
          <div className="mt-8 overflow-hidden rounded-xl border border-za-border bg-za-surface/50 backdrop-blur-sm">
            <div className="flex items-center gap-8 whitespace-nowrap px-5 py-3 font-mono text-[13px] animate-marquee">
              <Ticker symbol="XAU/USD" price="2,341.20" change="+0.42%" up />
              <Ticker symbol="EUR/USD" price="1.0876" change="-0.12%" />
              <Ticker symbol="BTC/USD" price="63,420" change="+2.18%" up />
              <Ticker symbol="US10Y" price="4.32%" change="+0.05%" up />
              <Ticker symbol="SPX" price="5,180.4" change="+0.31%" up />
              <Ticker symbol="DXY" price="104.21" change="-0.08%" />
              <Ticker symbol="WTI" price="78.45" change="+1.02%" up />
              <Ticker symbol="XAU/USD" price="2,341.20" change="+0.42%" up />
              <Ticker symbol="EUR/USD" price="1.0876" change="-0.12%" />
              <Ticker symbol="BTC/USD" price="63,420" change="+2.18%" up />
              <Ticker symbol="US10Y" price="4.32%" change="+0.05%" up />
              <Ticker symbol="SPX" price="5,180.4" change="+0.31%" up />
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="mb-24">
          <header className="mb-10">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-za-accent">
                            // Core Modules
            </div>
            <h2 className="text-display max-w-2xl text-3xl text-white md:text-5xl">
              Semua yang Anda butuhkan untuk trading
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon="fa-globe"
              title="GDP Global"
              desc="Data PDB 200+ negara dari World Bank, terurut dan terpaginasi."
              tag="MACRO"
            />
            <Feature
              icon="fa-calendar-alt"
              title="Kalender Ekonomi"
              desc="Agenda ekonomi real-time dengan filter tanggal dan dampak."
              tag="EVENTS"
            />
            <Feature
              icon="fa-chart-line"
              title="Market Analytics"
              desc="Analitik teknikal multi-timeframe dengan indikator lanjutan."
              tag="CHART"
            />
            <Feature
              icon="fa-bell"
              title="Smart Alerts"
              desc="Notifikasi otomatis berdasarkan kondisi pasar dan event."
              tag="ALERT"
            />
            <Feature
              icon="fa-shield-halved"
              title="Risk Guard"
              desc="Manajemen risiko otomatis dengan position sizing."
              tag="RISK"
            />
            <Feature
              icon="fa-robot"
              title="Alpha Signals"
              desc="Sinyal berbasis AI dengan backtest historis transparan."
              tag="AI"
            />
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="border-gradient noise relative mb-24 overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="glow-orb glow-cyan absolute -top-20 left-1/4 h-80 w-80 opacity-25" />
            <div className="glow-orb glow-purple absolute -bottom-20 right-1/4 h-80 w-80 opacity-20" />
          </div>

          <div className="relative text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-za-accent/30 bg-za-accent/5 px-3.5 py-1.5">
              <i className="fas fa-rocket text-[10px] text-za-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-za-accent">
                Ready to Deploy
              </span>
            </div>
            <h2 className="text-display mx-auto mb-5 max-w-3xl text-3xl text-white md:text-5xl">
              Siap upgrade pengalaman trading Anda?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base text-za-text-muted">
              Akses data ekonomi global, kalender event, dan sinyal pasar dalam
              satu terminal terintegrasi.
            </p>
            <Link
              href="/economic-calendar"
              className="btn-primary group inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold"
            >
              <span className="inline-flex items-center gap-2">
                <i className="fas fa-rocket text-xs" />
                Mulai Sekarang
                <i className="fas fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================
   SUB COMPONENTS
   ============================================ */

function MetricTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="group bg-za-surface/60 p-5 backdrop-blur-sm transition hover:bg-za-surface-2">
      <div className="text-gradient-accent font-mono text-2xl font-bold tracking-tight md:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 text-[11px] uppercase tracking-[0.15em] text-za-text-dim">
        {label}
      </div>
    </div>
  );
}

function Ticker({
  symbol,
  price,
  change,
  up,
}: {
  symbol: string;
  price: string;
  change: string;
  up?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="text-za-text-dim">{symbol}</span>
      <span className="font-semibold text-white">{price}</span>
      <span
        className={`inline-flex items-center gap-1 ${up ? 'text-za-success' : 'text-za-danger'
          }`}
      >
        <i
          className={`fas ${up ? 'fa-caret-up' : 'fa-caret-down'
            } text-[10px]`}
        />
        {change}
      </span>
    </span>
  );
}

function Feature({
  icon,
  title,
  desc,
  tag,
}: {
  icon: string;
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-za-border bg-za-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-za-accent/40 hover:bg-za-surface-2">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-za-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.2em] text-za-text-dim">
        [{tag}]
      </div>

      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-za-border bg-za-bg/80 transition group-hover:border-za-accent/40 group-hover:bg-za-accent/5">
        <i className={`fas ${icon} text-lg text-za-accent`} />
      </div>

      <h3 className="relative mb-2 font-semibold text-white">{title}</h3>
      <p className="relative text-sm leading-relaxed text-za-text-muted">
        {desc}
      </p>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-za-accent to-transparent transition-all duration-500 group-hover:w-full" />
    </article>
  );
}