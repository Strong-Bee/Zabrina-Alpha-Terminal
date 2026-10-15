# Zabrina Alpha Terminal

**Crypto Trading & Meme Coin Intelligence Terminal** — workspace riset pasar kripto untuk charting, pemantauan market data, discovery meme coin, serta pengembangan analisis token dan aktivitas on-chain.

Zabrina Alpha Terminal **khusus cryptocurrency dan meme coin**, bukan terminal saham, forex, atau multi-aset umum. Prioritas pengembangan adalah market terminal yang dapat dipercaya, scanner meme coin Solana, token-risk research, wallet intelligence, dan trading analytics yang memiliki sumber data jelas.

<p align="center">
  <a href="https://nextjs.org/docs/app"><img alt="Next.js App Router" src="https://img.shields.io/badge/Next.js-App_Router-black?logo=next.js" /></a>
  <a href="https://react.dev/"><img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?logo=react" /></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript strict" src="https://img.shields.io/badge/TypeScript-Strict-3178c6?logo=typescript" /></a>
  <a href="https://tailwindcss.com/"><img alt="Tailwind CSS v4" src="https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss" /></a>
  <a href="https://github.com/Strong-Bee/Zabrina-Alpha-Terminal/actions"><img alt="GitHub Actions" src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white" /></a>
</p>

> **Status proyek:** aktif dikembangkan. Dokumentasi ini membedakan fondasi dan implementasi awal dari rencana. Roadmap bukan bukti bahwa semua fitur sudah tersedia atau siap produksi. Periksa kode dan hasil [GitHub Actions](https://github.com/Strong-Bee/Zabrina-Alpha-Terminal/actions) sebelum mengandalkan status implementasi.

## Daftar isi

- [Visi produk](#visi-produk)
- [Modul utama](#modul-utama)
- [Status implementasi](#status-implementasi)
- [Stack teknologi](#stack-teknologi)
- [Persyaratan](#persyaratan)
- [Instalasi lokal](#instalasi-lokal)
- [Environment](#environment)
- [Perintah pengembangan](#perintah-pengembangan)
- [Struktur proyek](#struktur-proyek)
- [Solana Meme Coin Scanner](#solana-meme-coin-scanner)
- [Prinsip data](#prinsip-data)
- [Arsitektur](#arsitektur)
- [Keamanan](#keamanan)
- [CI dan quality checks](#ci-dan-quality-checks)
- [Roadmap](#roadmap)
- [Kontribusi](#kontribusi)
- [Dokumentasi](#dokumentasi)
- [Disclaimer risiko](#disclaimer)
- [Lisensi](#lisensi)

## Visi produk

Menyediakan satu terminal riset kripto untuk membantu pengguna:

1. Mengamati harga dan candle dari provider yang didukung.
2. Memantau pasangan kripto melalui watchlist.
3. Menemukan pair/token baru, terutama meme coin Solana.
4. Membandingkan volume, likuiditas, perubahan harga, dan aktivitas transaksi.
5. Memeriksa risiko token serta aktivitas on-chain berdasarkan bukti.
6. Menelusuri aktivitas wallet dengan metodologi yang dapat dijelaskan.
7. Mengelola alert, skenario risiko, jurnal, dan analitik trading seiring pengembangan.

Aplikasi ini adalah alat bantu riset, bukan sistem yang menjamin profit atau keamanan token.

## Modul utama

### 1. Crypto market terminal

Fondasi yang ada mencakup route chart, komponen chart, toolbar, watchlist, dan state chart. Integrasi ticker yang sudah ada menggunakan Binance public market data untuk simbol yang didukung.

Pasangan yang relevan untuk pengembangan termasuk BTCUSDT, ETHUSDT, SOLUSDT, XRPUSDT, DOGEUSDT, BNBUSDT, ADAUSDT, AVAXUSDT, dan LINKUSDT. Ketersediaan bergantung pada provider. Data spot dan perpetual harus dipisahkan secara eksplisit.

### 2. Solana meme coin scanner

Halaman awal tersedia di `/meme-coins`, dengan API di `/api/meme-coins`. Scanner mengambil profil token terbaru dari DEX Screener, mengambil data pair Solana secara batch, lalu memfilter berdasarkan likuiditas, volume 24 jam, umur pair, jumlah transaksi, dan pengurutan.

Fitur ini adalah discovery awal. Profil token bukan klasifikasi meme coin yang sempurna, dan indikator risiko bukan audit kontrak.

### 3. Token risk research — pengembangan berikutnya

Target pemeriksaan termasuk likuiditas, konsentrasi holder, aktivitas deployer, mint/freeze authority Solana, serta pemeriksaan kontrak yang sesuai untuk EVM. Hasil perlu menyertakan status `pass`, `warning`, `fail`, atau `unknown`, bukti, sumber, dan waktu pemeriksaan. Data yang tidak tersedia harus tetap `unknown`.

### 4. Wallet dan on-chain intelligence — roadmap

Target fitur: watchlist wallet, timeline transaksi, early buyer dan whale research, realized/unrealized PnL, serta perhitungan yang memperhitungkan biaya dan keterbatasan histori. Label wallet harus bisa direproduksi dari data transaksi, bukan tebakan.

### 5. Trading analytics — roadmap

Target pengembangan mencakup indikator teknikal, struktur pasar, alert, kalkulator risk/reward, jurnal, portfolio, paper trading, dan ringkasan riset AI dengan sumber. Live order execution tidak dijanjikan sebagai fitur aktif.

## Status implementasi

| Fitur | Status |
|---|---|
| Next.js App Router, React, TypeScript, Tailwind | Fondasi proyek |
| Chart workspace dan watchlist | Komponen tersedia; perilaku harus diverifikasi pada runtime |
| Binance ticker endpoint | Integrasi tersedia untuk watchlist; cakupan dan reliabilitas perlu diuji |
| Solana Meme Coin Scanner | Implementasi awal tersedia di `/meme-coins` |
| DEX Screener scanner API | Tersedia di `/api/meme-coins`; tetap bergantung pada provider |
| Token safety analyzer lengkap | Belum diklaim tersedia |
| Wallet PnL dan whale intelligence | Roadmap |
| Alert, portfolio, paper trading | Roadmap |
| Live trading execution | Tidak diklaim tersedia |

## Stack teknologi

- Next.js App Router
- React
- TypeScript strict mode
- Tailwind CSS v4
- lightweight-charts
- Zustand
- Binance public market data
- DEX Screener untuk discovery pair Solana
- ESLint, TypeScript CLI, dan GitHub Actions

Versi aktual tercatat di `package.json` dan `package-lock.json`. Jangan menganggap provider atau fitur aktif hanya karena disebut sebagai target roadmap.

## Persyaratan

- Git
- Node.js yang kompatibel dengan versi Next.js pada repository
- npm
- Koneksi internet untuk instalasi dependency dan akses provider data

## Instalasi lokal

```bash
git clone https://github.com/Strong-Bee/Zabrina-Alpha-Terminal.git
cd Zabrina-Alpha-Terminal
npm ci
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Jika dependency atau build gagal, periksa versi Node.js/npm dan pesan error lengkap sebelum mengganti versi paket.

## Environment

Pengembangan dasar dirancang agar tidak memerlukan secret untuk mulai berjalan. Lihat `.env.example` sebagai template konfigurasi. Jika integrasi tertentu memerlukan credential:

1. Buat file lokal `.env.local`.
2. Isi hanya variabel yang digunakan oleh kode.
3. Jangan commit file lokal atau secret asli.
4. Jangan mengekspos secret melalui `NEXT_PUBLIC_*`.
5. Jangan pernah memasukkan seed phrase atau private key wallet ke aplikasi riset.

Referensi: [Environment Variables — Next.js](https://nextjs.org/docs/app/guides/environment-variables).

## Perintah pengembangan

```bash
npm run dev        # server development
npm run lint       # ESLint
npm run typecheck  # TypeScript typecheck
npm run build      # production build
npm run start      # menjalankan build produksi
```

Sebelum pull request, jalankan:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Jangan menyatakan perintah lulus sebelum benar-benar dijalankan atau workflow menunjukkan hasil sukses.

## Struktur proyek

Peta komponen utama yang diketahui:

```text
app/
  chart/page.tsx
  meme-coins/page.tsx
  api/
    chart/tickers/
    meme-coins/route.ts
components/
  chart/
    ChartWorkspace.tsx
    PriceChart.tsx
    TopToolbar.tsx
    Watchlist.tsx
    chartStore.ts
  meme-coins/
    MemeCoinScanner.tsx
docs/
  ARCHITECTURE.md
  ROADMAP.md
.github/
  workflows/ci.yml
AGENTS.md
CONTRIBUTING.md
SECURITY.md
```

Peta ini menunjukkan area penting, bukan inventaris seluruh file. Periksa branch `main` untuk struktur terbaru.

## Solana Meme Coin Scanner

Jalankan aplikasi lalu buka `/meme-coins`. API tersedia di `/api/meme-coins`.

Default filter:
- Likuiditas minimum: US$5.000.
- Volume 24 jam minimum: US$10.000.
- Umur pair maksimum: 168 jam.
- Transaksi minimum 24 jam: 20.
- Maksimal 50 pair dalam respons UI.

Filter dapat diubah melalui antarmuka. Hasil diambil dari profil token terbaru DEX Screener dan pair Solana yang tersedia; hasil kosong tidak berarti tidak ada meme coin di seluruh jaringan. API dapat gagal atau terkena batas provider.

Indikator awal meliputi likuiditas rendah, pair baru, tekanan jual tinggi, dan market cap yang belum tersedia. Ini hanya heuristik berdasarkan data pair, bukan pemeriksaan keamanan menyeluruh. Belum mencakup audit kontrak lengkap, analisis holder komprehensif, pemeriksaan authority on-chain, simulasi transaksi, atau prediksi profit.

Sumber: [DEX Screener — Solana](https://dexscreener.com/solana).

## Prinsip data

1. **Sumber jelas:** tunjukkan provider serta jenis pasar.
2. **Timestamp jelas:** bedakan waktu event dan waktu pengambilan jika tersedia.
3. **Freshness:** bedakan live, delayed, stale, dan unavailable bila UI mendukung.
4. **Tidak ada angka palsu:** jangan mengganti kegagalan API dengan data demo tanpa label.
5. **Satuan konsisten:** harga, volume, liquidity, market cap, dan FDV tidak boleh tertukar.
6. **Identitas kanonis:** token diidentifikasi dengan chain + mint/contract address.
7. **Rate limits:** patuhi aturan provider, gunakan cache, timeout, dan backoff.
8. **Kegagalan eksplisit:** tampilkan error/unavailable saat data tidak bisa diperoleh.
9. **Keterlacakan:** sediakan sumber untuk metrik dan temuan yang penting.
10. **Ketidakpastian eksplisit:** data tidak tersedia berarti unknown, bukan aman.

Referensi: [Binance Developers](https://developers.binance.com/en/docs/introduction).

## Arsitektur

Pola target:

```text
Exchange REST/WebSocket ─┐
DEX analytics ───────────┼─> Provider adapters
Blockchain RPC/indexer ──┘         |
                                   v
                         Validasi dan normalisasi
                                   |
                                   v
                         Cache, timeout, rate limit
                                   |
                                   v
                          Model data crypto bertipe
                         /      |       |       \
                      Chart  Scanner   Risk    Wallet
```

Logika provider harus dipisahkan dari presentasi UI. Detail model, keamanan, dan strategi testing ada di [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Keamanan

- Jangan meminta atau menyimpan seed phrase/private key.
- Simpan credential hanya di server-side dan jangan commit secret.
- Validasi input dan semua respons provider.
- Hindari arbitrary URL proxy/SSRF serta render HTML mentah.
- Terapkan timeout, rate limit, batas payload, dan retry terbatas.
- Jika kelak mengintegrasikan exchange untuk trading, gunakan API key least-privilege tanpa izin withdrawal.
- Pisahkan paper trading dari live trading dan jangan mengirim order live tanpa persetujuan eksplisit.
- Laporkan kerentanan melalui panduan [SECURITY.md](SECURITY.md).

## CI dan quality checks

Workflow GitHub Actions ditujukan untuk menjalankan install dari lockfile, ESLint, typecheck, dan production build. Status aktual bisa diperiksa di [GitHub Actions](https://github.com/Strong-Bee/Zabrina-Alpha-Terminal/actions). Keberadaan workflow tidak otomatis berarti build commit terbaru berhasil.

## Roadmap

1. **Stabilitas:** lint, typecheck, build, tests, error/stale states.
2. **Market terminal:** candle, timeframe, ticker, stream reconnect.
3. **Solana scanner:** discovery, filter, data provenance, tests.
4. **Token risk:** holder, authority, liquidity, findings berbukti.
5. **Wallet intelligence:** transaksi, early buyer, whale, PnL.
6. **Trading analytics:** alerts, portfolio, jurnal, paper trading.
7. **Ekspansi:** provider dan jaringan baru berdasarkan kualitas data dan kebutuhan.

Lihat [docs/ROADMAP.md](docs/ROADMAP.md). Checklist hanya ditandai selesai setelah implementasi diverifikasi.

## Kontribusi

Baca [CONTRIBUTING.md](CONTRIBUTING.md) dan [AGENTS.md](AGENTS.md). Kontribusi sebaiknya menyertakan alasan, pengujian, sumber provider, batasan, dan dampak pengguna. Jangan memasukkan credential atau data yang tidak berizin.

## Dokumentasi

- [Arsitektur](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Panduan kontribusi](CONTRIBUTING.md)
- [Kebijakan keamanan](SECURITY.md)
- [Panduan agen pengembangan](AGENTS.md)

## Disclaimer

Zabrina Alpha Terminal adalah perangkat lunak untuk informasi, analisis, dan riset. Konten aplikasi bukan nasihat keuangan, investasi, hukum, atau pajak, dan bukan ajakan membeli atau menjual aset.

Cryptocurrency dan meme coin sangat volatil dan dapat mengakibatkan kehilangan seluruh modal. Likuiditas dapat menghilang, harga dapat dimanipulasi, kontrak dapat rentan, dan data provider dapat terlambat atau tidak lengkap. Skor scanner, alert, indikator, AI, dan performa historis tidak menjamin keamanan maupun profit. Verifikasi sumber dan risiko secara mandiri.

## Lisensi

Lihat file `LICENSE` di repository untuk ketentuan lisensi kode. Data pasar, API, logo, chart library, dan layanan pihak ketiga mengikuti lisensi serta ketentuan masing-masing.
