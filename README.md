# ⚡ ZABRINA ALPHA TERMINAL

> **Professional Trading Intelligence Platform** — Kalender ekonomi, chart real-time, berita pasar, dan data makro dalam satu terminal terintegrasi.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📖 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Project](#-struktur-project)
- [Instalasi](#-instalasi)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Design System](#-design-system)
- [Deployment](#-deployment)
- [FAQ](#-faq)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Project

**ZABRINA ALPHA TERMINAL** adalah platform trading intelligence berbasis web yang menyatukan berbagai data pasar dalam satu dashboard profesional. Dirancang untuk trader, analis, dan investor yang membutuhkan:

- **Data ekonomi real-time** dari sumber terpercaya (TradingView, World Bank, Binance)
- **Chart profesional** dengan TradingView Widget
- **Berita pasar** dari 80+ sumber RSS terkurasi
- **Analisis makro** dan sentimen pasar

Project ini dibangun dengan **Next.js 16 App Router**, **TypeScript**, **Tailwind CSS v4**, dan mengutamakan **performance**, **SEO**, dan **user experience**.

---

## ✨ Fitur Utama

### 📅 Kalender Ekonomi (`/economic-calendar`)

- **Agenda event real-time** dari TradingView Events API
- **Status event**: Sudah Rilis / Sedang Berlangsung / Akan Datang
- **Countdown timer** untuk event yang akan datang
- **Filter** berdasarkan dampak (high/medium/low) dan status
- **Data GDP global** dari World Bank Data360 (200+ negara)
- **Highlight event** high-impact dengan catatan analisis
- **Multi-source forecast** (ForexFactory, TradingView, MQL5)
- **Suku bunga bank sentral** dengan bias hawkish/dovish
- **Wawasan pasar** dengan sentimen instansi
- **Kabar pasar** terbaru dari berbagai sumber
- **Peta ekonomi global** via TradingView Widget
- **Indikator makro** historis (CPI, NFP, GDP, dll.)

### 📈 Chart (`/chart`)

- **TradingView Advanced Chart** terintegrasi
- **Multi-symbol** support: BTC, ETH, SOL, XRP, DOGE, BNB, ADA, AVAX, LINK, MATIC
- **Multi-timeframe**: 1m hingga 1M
- **Watchlist real-time** via Binance WebSocket
- **Harga live** dengan persentase perubahan
- **Auto-reconnect** WebSocket
- **Dark theme** konsisten dengan brand

### 📰 Berita (`/news`)

- **80+ sumber RSS** terkurasi dari seluruh dunia
- **9 kategori**: Semua, Crypto, Saham Lokal, Saham Global, Forex, Komoditas, Makro, Global, Teknologi
- **Auto-refresh** setiap 5 menit
- **Search & filter** instan
- **Featured card** untuk berita terbaru
- **Optimasi**: cache, concurrency limit, blacklist otomatis

### 🏠 Landing Page (`/`)

- **Hero section** dengan value proposition
- **Live ticker** animasi (XAU, EUR/USD, BTC, dll.)
- **Feature cards** 6 modul utama
- **Live clock** WIB dengan detik
- **CTA** yang mengarah ke Kalender Ekonomi

---

## 🛠 Tech Stack

### Core

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **Next.js** | 16.4 | Framework React dengan App Router |
| **React** | 19 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Turbopack** | Bundled | Bundler dev & build cepat |

### Styling

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **Font Awesome** | 6.5 | Ikon |
| **Flag Icons** | 7.5 | Bendera negara |

### Data & State

| Teknologi | Kegunaan |
|-----------|----------|
| **Zustand** | State management (chart store) |
| **Native Fetch** | HTTP client |
| **WebSocket** | Real-time data (Binance) |
| **RSS Parser** | Custom XML parser |

### Data Sources

- **TradingView** — Events API, Widgets
- **World Bank Data360** — GDP data
- **Binance Public API** — Klines, Tickers, WebSocket

---

## 📁 Struktur Project

```
zabrina-alpha-terminal/
├── app/                                    # Next.js App Router
│   ├── layout.tsx                          # Root layout (Navbar + Footer)
│   ├── page.tsx                            # Landing page
│   ├── globals.css                         # Design system + Tailwind
│   ├── economic-calendar/
│   │   └── page.tsx                        # Halaman kalender ekonomi
│   ├── chart/
│   │   └── page.tsx                        # Halaman chart
│   ├── news/
│   │   └── page.tsx                        # Halaman berita
│   └── api/
│       ├── economic-calendar/
│       │   ├── events/route.ts             # API events (TradingView)
│       │   └── gdp/route.ts                # API GDP (World Bank)
│       ├── chart/
│       │   ├── klines/route.ts             # API klines (Binance)
│       │   └── tickers/route.ts            # API tickers (Binance)
│       └── news/
│           └── route.ts                    # API berita (RSS aggregator)
│
├── components/                             # React components
│   ├── Navbar.tsx                          # Navigasi utama
│   ├── Footer.tsx                          # Footer
│   ├── CopyrightYear.tsx                   # Client component (tahun)
│   ├── ClockDisplay.tsx                    # Live clock
│   ├── NewsletterForm.tsx                  # Form newsletter
│   │
│   ├── economic-calendar/                  # Komponen kalender ekonomi
│   │   ├── EconomicCalendarHub.tsx         # Wrapper utama
│   │   ├── CalendarHero.tsx                # Hero section
│   │   ├── HighlightEvents.tsx             # Sorotan event high-impact
│   │   ├── EventsTable.tsx                 # Tabel event mendatang
│   │   ├── MarketNews.tsx                  # Kabar pasar
│   │   ├── EconomicMap.tsx                 # Peta ekonomi TradingView
│   │   ├── MacroIndicators.tsx             # Tabel makro historis
│   │   ├── ReleaseSummaries.tsx            # Rangkuman FOMC/CPI/NFP
│   │   ├── CentralBankRates.tsx            # Suku bunga bank sentral
│   │   ├── MarketInsights.tsx              # Sentimen pasar
│   │   ├── FundamentalSummary.tsx          # Ringkasan fundamental
│   │   ├── GdpPanel.tsx                    # Panel GDP
│   │   ├── EventsPanel.tsx                 # Panel events
│   │   ├── FlagIcon.tsx                    # Bendera negara
│   │   ├── Pagination.tsx                  # Pagination
│   │   ├── data.ts                         # Data statis
│   │   └── types.ts                        # TypeScript interfaces
│   │
│   ├── chart/                              # Komponen chart
│   │   ├── ChartWorkspace.tsx              # Layout chart
│   │   ├── TopToolbar.tsx                  # Symbol picker + TF
│   │   ├── PriceChart.tsx                  # TradingView Widget
│   │   ├── Watchlist.tsx                   # Watchlist real-time
│   │   ├── chartStore.ts                   # Zustand store
│   │   ├── symbols.ts                      # Simbol + timeframe
│   │   └── types.ts                        # Types
│   │
│   └── news/                               # Komponen berita
│       ├── NewsPage.tsx                    # Wrapper berita
│       ├── NewsCategoryTabs.tsx            # Tab kategori
│       ├── NewsCard.tsx                    # Kartu berita
│       ├── NewsFilters.tsx                 # Filter + search
│       ├── NewsList.tsx                    # List berita
│       └── types.ts                        # Types
│
├── lib/                                    # Utility functions
│   ├── economic-calendar/
│   │   └── utils.ts                        # Helper kalender
│   └── news/
│       └── sources.ts                      # Konfigurasi RSS sources
│
├── public/                                 # Static assets
│   └── og-*.png                            # OpenGraph images
│
├── next.config.ts                          # Konfigurasi Next.js
├── postcss.config.mjs                      # PostCSS config
├── tsconfig.json                           # TypeScript config
├── package.json                            # Dependencies
└── README.md                               # Dokumentasi ini
```

---

## 🚀 Instalasi

### Prasyarat

- **Node.js** ≥ 20.x
- **npm** ≥ 10.x atau **pnpm** ≥ 9.x
- Koneksi internet (untuk fetch data real-time)

### Langkah Install

1. **Clone repository**

```bash
git clone https://github.com/your-username/zabrina-alpha-terminal.git
cd zabrina-alpha-terminal
```

2. **Install dependencies**

```bash
npm install
# atau
pnpm install
yarn install
```

3. **Setup environment variables** (opsional)

Buat file `.env.local` di root:

```env
# TradingView cookie (opsional, untuk events API)
TV_COOKIE=

# Base URL untuk metadata
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Jalankan dev server**

```bash
npm run dev
```

5. **Buka di browser**

```
http://localhost:3000
```

---

## 🔐 Environment Variables

| Variable | Wajib | Deskripsi |
|----------|-------|-----------|
| `TV_COOKIE` | ❌ | Cookie TradingView untuk events API (kalau upstream blokir) |
| `NEXT_PUBLIC_BASE_URL` | ❌ | Base URL untuk metadata SEO |

**Cara mendapatkan `TV_COOKIE`:**
1. Buka `tradingview.com` di browser
2. Login (kalau punya akun)
3. DevTools → Application → Cookies
4. Copy value `sessionid` dan `tv_ecuid`
5. Format: `sessionid=xxx; tv_ecuid=yyy`

---

## 🔌 API Routes

### `GET /api/economic-calendar/events`

Ambil event ekonomi dari TradingView.

**Query params:**
- `from` (required) — Tanggal mulai (ISO 8601)
- `to` (required) — Tanggal akhir (ISO 8601)
- `countries` (optional) — Kode negara dipisahkan koma

**Contoh:**
```
GET /api/economic-calendar/events?from=2026-10-08T00:00:00.000Z&to=2026-10-15T00:00:00.000Z
```

**Response:**
```json
[
  {
    "id": "event-123",
    "country": "US",
    "title": "Non-Farm Payrolls",
    "date": "2026-10-08T12:30:00.000Z",
    "impact": "high",
    "actual": "185K",
    "forecast": "180K",
    "previous": "175K"
  }
]
```

**Headers response:**
- `X-Data-Source`: `live` | `cache` | `stale` | `fallback`
- `X-Duration`: Waktu fetch (ms)
- `X-Cache-Age`: Umur cache (ms)

### `GET /api/economic-calendar/gdp`

Ambil data GDP dari World Bank Data360.

**Response:**
```json
{
  "region": "global",
  "lastUpdate": 1791400000000,
  "dataSource": {
    "id": "world-bank-data360",
    "attributionName": "World Bank Data360"
  },
  "data": {
    "USA": { "v": 30769700000000, "s": "ECONOMICS:USAGDP" },
    "CHN": { "v": 19498039388042.61, "s": "ECONOMICS:CHNGDP" }
  },
  "_meta": {
    "source": "live",
    "count": 50,
    "durationMs": 234
  }
}
```

### `GET /api/chart/klines`

Ambil data klines (candlestick) dari Binance.

**Query params:**
- `symbol` — Binance symbol (default: `BTCUSDT`)
- `interval` — Timeframe (default: `1d`)
- `limit` — Jumlah candle (default: `500`)

**Contoh:**
```
GET /api/chart/klines?symbol=BTCUSDT&interval=1h&limit=100
```

### `GET /api/chart/tickers`

Ambil ticker 24 jam dari Binance.

**Query params:**
- `symbols` — Array simbol (JSON atau CSV)

**Contoh:**
```
GET /api/chart/tickers?symbols=BTCUSDT,ETHUSDT,SOLUSDT
```

### `GET /api/news`

Ambil berita dari 80+ sumber RSS.

**Query params:**
- `category` — Kategori berita (default: `semua`)
- `limit` — Jumlah berita (default: `50`, max: `100`)

**Kategori tersedia:**
- `semua`, `crypto`, `saham-lokal`, `saham-global`
- `forex`, `komoditas`, `makro`, `global`, `teknologi`

**Contoh:**
```
GET /api/news?category=crypto&limit=20
```

**Response:**
```json
{
  "category": "crypto",
  "count": 20,
  "totalAvailable": 350,
  "sources": {
    "total": 24,
    "success": 22,
    "failed": 2
  },
  "cached": true,
  "items": [
    {
      "id": "coindesk-abc123",
      "title": "Bitcoin rallies past $84,000",
      "link": "https://...",
      "source": "CoinDesk",
      "publishedAt": "2026-10-08T01:23:00.000Z",
      "category": "crypto"
    }
  ]
}
```

---

## 🎨 Design System

### Warna (`globals.css`)

```css
@theme {
  /* Surface */
  --color-za-bg: #04060a;          /* Background utama */
  --color-za-surface: #0a0e15;     /* Card surface */
  --color-za-surface-2: #0f141c;   /* Elevated surface */
  --color-za-border: #1a2230;      /* Border default */
  --color-za-border-bright: #253243;

  /* Text */
  --color-za-text: #e8edf5;        /* Primary text */
  --color-za-text-muted: #8b98ab;  /* Secondary text */
  --color-za-text-dim: #56637a;    /* Tertiary text */

  /* Accent */
  --color-za-accent: #00d4ff;      /* Cyan utama */
  --color-za-accent-2: #4facfe;    /* Blue secondary */
  --color-za-accent-3: #7c3aed;    /* Purple tertiary */

  /* Semantic */
  --color-za-success: #00e599;     /* Bullish / success */
  --color-za-warning: #fbbf24;     /* Warning */
  --color-za-danger: #ff4757;      /* Bearish / error */
}
```

### Font

- **Sans**: Inter (via `next/font/google`)
- **Mono**: JetBrains Mono (untuk angka & code)

### Utility Classes

| Class | Kegunaan |
|-------|----------|
| `.text-display` | Typography display (letter-spacing -0.03em) |
| `.text-gradient-accent` | Gradient text (cyan → purple) |
| `.btn-primary` | Tombol utama dengan glow |
| `.glass` | Glass morphism effect |
| `.border-gradient` | Border dengan gradient |
| `.terminal-grid` | Grid background terminal-style |
| `.glow-orb` | Ambient glow effect |
| `.status-dot-live` | Live pulsing indicator |
| `.flag-wrapper` | Flag icon wrapper |
| `.animate-in` | Fade-in animation |
| `.animate-marquee` | Marquee ticker animation |

### Contoh Penggunaan

```tsx
<div className="rounded-2xl border border-za-border bg-za-surface/60 p-6 backdrop-blur-sm">
  <h2 className="text-display text-3xl text-white">Judul</h2>
  <p className="text-za-text-muted">Deskripsi</p>
  <button className="btn-primary rounded-xl px-6 py-3">
    <span>Aksi</span>
  </button>
</div>
```

---

## 🚢 Deployment

### Vercel (Direkomendasikan)

1. **Push ke GitHub**

```bash
git add .
git commit -m "feat: initial deploy"
git push origin main
```

2. **Import ke Vercel**
   - Buka [vercel.com/new](https://vercel.com/new)
   - Import repository
   - Klik **Deploy**

3. **Set environment variables** (kalau ada)
   - Settings → Environment Variables
   - Tambahkan `TV_COOKIE` (opsional)

### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build & run:

```bash
docker build -t zabrina-alpha .
docker run -p 3000:3000 zabrina-alpha
```

### Manual VPS

```bash
# Clone
git clone https://github.com/your-username/zabrina-alpha-terminal.git
cd zabrina-alpha-terminal

# Install
npm ci

# Build
npm run build

# Run dengan PM2
npm install -g pm2
pm2 start npm --name "zabrina-alpha" -- start
pm2 save
pm2 startup
```

---

## ❓ FAQ

### Kenapa kalender ekonomi kosong?

Kalau upstream TradingView memblokir request, API akan fallback ke data statis (50 negara). Cek DevTools → Network → response header `X-Data-Source`:
- `live` → berhasil fetch dari TradingView
- `cache` → dari cache (1 menit)
- `stale` → cache lama (upstream gagal)
- `fallback` → data statis

### Chart TradingView tidak muncul?

TradingView Widget butuh:
1. **Koneksi internet** — Widget fetch dari `s3.tradingview.com`
2. **Browser modern** — Support iframe + postMessage
3. **Domain tidak di-blacklist** — Kalau pakai ad-blocker, whitelist `tradingview.com`

### Berita kosong untuk kategori tertentu?

Beberapa sumber RSS mati/berubah URL. Cek log terminal:
```
[News] Gagal CoinGecko: HTTP 403
[News] Berhasil: 73, Gagal: 15, Total item: 3563
```

Kalau banyak yang gagal, edit `lib/news/sources.ts` — update URL atau hapus sumber mati.

### Bagaimana cara menambahkan simbol ke watchlist?

Edit `components/chart/symbols.ts`:

```ts
export const SYMBOLS: Symbol[] = [
    { id: 'BTCUSDT', ticker: 'BTC/USDT', name: 'Bitcoin', category: 'crypto' },
    // Tambahkan di sini
    { id: 'ARBUSDT', ticker: 'ARB/USDT', name: 'Arbitrum', category: 'crypto' },
];
```

### Kenapa error "Cannot listen to the event from the provided iframe"?

Error ini non-fatal dari TradingView Widget. Sudah di-fix di `PriceChart.tsx` dan `EconomicMap.tsx` dengan cleanup yang benar (`removeChild` bukan `innerHTML = ''`).

### Bagaimana cara ganti nama brand "ZABRINA ALPHA"?

Cari & ganti string di seluruh project:

```bash
# Linux/macOS
grep -rl "ZABRINA ALPHA" --include="*.tsx" --include="*.ts" | xargs sed -i 's/ZABRINA ALPHA/NAMA BARU/g'

# Windows PowerShell
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) -replace 'ZABRINA ALPHA','NAMA BARU' | Set-Content $_.FullName
}
```

File yang perlu diubah:
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `app/page.tsx`
- `app/layout.tsx` (metadata)
- `README.md`

---

## 📄 Lisensi

MIT License — bebas digunakan untuk project pribadi maupun komersial.

```
Copyright (c) 2026 ZABRINA ALPHA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## ⚠️ Disclaimer

**Data yang disajikan di ZABRINA ALPHA TERMINAL bersifat informatif dan bukan merupakan nasihat investasi.**

Trading forex, komoditas, crypto, dan instrumen keuangan lainnya memiliki **tingkat risiko tinggi** dan dapat mengakibatkan kerugian melebihi modal Anda. Selalu lakukan riset mandiri dan konsultasikan dengan penasihat keuangan yang berlisensi sebelum mengambil keputusan trading.

Semua data diambil dari sumber publik (TradingView, World Bank, Binance, RSS) dan disajikan apa adanya (**as is**). Kami tidak menjamin akurasi, kelengkapan, atau ketepatan waktu data.

---

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

### Aturan Kontribusi

- Ikuti **Conventional Commits** (`feat:`, `fix:`, `docs:`, dll.)
- Jalankan `npm run lint` sebelum commit
- Tambahkan tests jika mengubah logika bisnis
- Update dokumentasi jika menambah fitur

---

## 📞 Kontak & Support

- **Issues**: [GitHub Issues](https://github.com/your-username/zabrina-alpha-terminal/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/zabrina-alpha-terminal/discussions)
- **Email**: support@zabrina-alpha.terminal

---

<div align="center">

**⚡ ZABRINA ALPHA TERMINAL**

Built with ❤️ using Next.js 16 + TypeScript + Tailwind CSS v4

*Pantau semua. Trade smarter.*

</div>