# Zabrina Alpha Terminal

**Crypto & Meme Coin Intelligence Terminal** — workspace riset aset kripto yang berfokus pada charting, market data, on-chain intelligence, dan penemuan meme coin. Sasaran utamanya adalah membantu trader mengamati pasar, mengevaluasi risiko token, serta menelusuri data dari sumber aslinya.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Status:** aktif dikembangkan. Daftar modul di bawah adalah arah produk; hanya fitur yang sudah diimplementasikan dan teruji pada branch aktif yang boleh dianggap tersedia. Tidak ada jaminan profit atau akurasi sinyal.

## Daftar isi

- [Visi](#visi)
- [Cakupan produk](#cakupan-produk)
- [Stack teknologi](#stack-teknologi)
- [Mulai lokal](#mulai-lokal)
- [Konfigurasi](#konfigurasi)
- [Prinsip data pasar](#prinsip-data-pasar)
- [Arsitektur](#arsitektur)
- [Roadmap](#roadmap)
- [Keamanan](#keamanan)
- [Kontribusi](#kontribusi)
- [Disclaimer risiko](#disclaimer-risiko)
- [Lisensi](#lisensi)

## Visi

Zabrina Alpha Terminal bukan terminal multi-aset umum. Produk ini dikhususkan untuk **cryptocurrency**, terutama pasar spot/perpetual dan meme coin lintas jaringan. Prioritas desainnya adalah data yang cepat, sumber yang dapat ditelusuri, filter yang dapat dikonfigurasi, serta penjelasan risiko yang tidak menyesatkan.

## Cakupan produk

### 1. Crypto market terminal

- Chart candlestick, pergantian simbol, dan multi-timeframe.
- Harga, perubahan 24 jam, volume, watchlist, dan ticker streaming.
- Target awal: pasangan Binance spot seperti BTCUSDT, ETHUSDT, SOLUSDT, XRPUSDT, DOGEUSDT, BNBUSDT, ADAUSDT, AVAXUSDT, LINKUSDT, dan pasangan lain yang tersedia.
- Rencana perluasan: market overview lintas exchange, funding rate, open interest, order book, trade tape, dan data likuidasi melalui provider yang sesuai.

### 2. Meme coin scanner

- Menemukan token/pair baru melalui integrasi data yang tersedia.
- Filter usia pair, likuiditas, volume, transaksi buy/sell, perubahan harga, dan market cap/FDV jika sumber menyediakannya.
- Pantau perubahan volume dan momentum tanpa menganggapnya sebagai bukti profitabilitas.
- Dukungan jaringan diprioritaskan bertahap: **Solana terlebih dahulu**, lalu jaringan EVM sesuai kebutuhan dan kualitas sumber.
- Integrasi kandidat dapat mencakup DEX Screener dan API blockchain/provider lain; batas rate, lisensi, dan ketepatan data wajib diperhatikan.

### 3. On-chain intelligence dan wallet tracking

- Detail token, pair, transaksi, holder, dan aktivitas wallet bila tersedia dari explorer/provider.
- Pantau wallet tertentu, transaksi whale, serta pembeli awal.
- Analisis riwayat PnL wallet hanya bila perhitungan dapat direproduksi dari data transaksi yang memadai.
- Tampilkan chain, alamat, periode analisis, waktu pembaruan, transaksi sumber, dan metodologi.
- Jangan melabeli wallet sebagai profitable berdasarkan satu transaksi, saldo token yang belum direalisasikan, atau data yang tidak lengkap.

### 4. Token risk research

- Pemeriksaan likuiditas, konsentrasi holder, usia kontrak/pair, aktivitas deployer, dan perubahan likuiditas jika data mendukung.
- Untuk token EVM, evaluasi izin kontrak dan fungsi berisiko bila tersedia; untuk Solana, periksa authority/metadata dan indikator khusus jaringan bila provider mendukung.
- Tandai data yang tidak tersedia sebagai **unknown**, bukan aman.
- Indikator risiko adalah alat bantu riset, bukan jaminan bahwa token aman atau scam.

### 5. Trading intelligence

- Indikator teknikal dan struktur pasar: trend, support/resistance, BOS/CHOCH, FVG, order block, dan volume.
- Alert harga, volume, volatilitas, dan kondisi scanner.
- Paper trading, jurnal, portfolio, PnL, exposure, dan kalkulasi risk/reward sebagai modul bertahap.
- AI research untuk meringkas data dengan referensi, memisahkan fakta dari inferensi, dan menyatakan ketidakpastian.
- Eksekusi order live bukan asumsi default; integrasi trading harus memiliki persetujuan eksplisit, proteksi kredensial, batas risiko, dan pengujian terpisah.

### 6. Berita dan katalis crypto

- Agregasi berita aset kripto, pengumuman protokol, exchange, unlock, listing, dan peristiwa jaringan dari sumber yang dapat diverifikasi.
- Setiap item perlu mencantumkan penerbit, waktu, serta tautan sumber.
- Kalender makro hanya disertakan sebagai konteks yang memengaruhi pasar crypto, bukan sebagai arah produk utama.

## Stack teknologi

- Next.js App Router, React, TypeScript strict mode.
- Tailwind CSS v4.
- lightweight-charts untuk chart custom.
- Zustand untuk state UI bersama.
- Binance public REST/WebSocket untuk data pasar crypto yang didukung.
- ESLint dan TypeScript untuk pemeriksaan kualitas kode.

Versi dependensi aktual tercatat di `package.json` dan `package-lock.json`. Integrasi lain hanya boleh diklaim tersedia setelah kode dan pengujiannya ada.

## Mulai lokal

Persyaratan: versi Node.js LTS yang kompatibel dengan Next.js di repository dan npm.

```bash
git clone https://github.com/Strong-Bee/Zabrina-Alpha-Terminal.git
cd Zabrina-Alpha-Terminal
npm ci
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Konfigurasi

Salin `.env.example` menjadi `.env.local` hanya jika integrasi yang digunakan membutuhkan konfigurasi. Jangan commit file environment lokal, API key, seed phrase, private key, wallet secret, atau kredensial exchange.

Kunci provider harus berada di server-side. Data publik yang tidak membutuhkan rahasia sebaiknya menggunakan endpoint publik resmi dan mematuhi batas rate provider.

## Perintah pengembangan

```bash
npm run dev        # server pengembangan
npm run lint       # ESLint
npm run typecheck  # pemeriksaan TypeScript
npm run build      # build produksi
npm run start      # jalankan build produksi
```

Sebelum pull request, jalankan lint, typecheck, dan build. Keberhasilan CI harus diverifikasi dari hasil workflow GitHub, bukan diasumsikan dari keberadaan file konfigurasi.

## Prinsip data pasar

1. **Sumber dan freshness:** tampilkan provider dan waktu pembaruan; bedakan live, tertunda, stale, dan demo.
2. **Normalisasi:** validasi alamat token, chain, simbol, timestamp, angka desimal, dan satuan sebelum digunakan.
3. **Rate limits:** hormati kuota, gunakan cache, timeout, retry dengan backoff, serta concurrency limit.
4. **Harga dan market cap:** jelaskan sumber dan metode kalkulasi. Market cap, FDV, dan liquidity bukan metrik yang dapat dipertukarkan.
5. **Wallet PnL:** bedakan realized/unrealized PnL, biaya transaksi, transfer internal, token spam, dan posisi yang tidak dapat dihargai.
6. **Token risk:** hasil pemeriksaan yang tidak tersedia harus ditandai unknown; jangan memberi label aman hanya karena tidak ada temuan.
7. **Tidak ada data rekaan:** jangan mengisi feed gagal dengan angka contoh tanpa label demo yang jelas.

## Arsitektur

Lihat [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) untuk aliran data, pemisahan provider, prinsip keamanan, dan rancangan modul. Lihat [docs/ROADMAP.md](docs/ROADMAP.md) untuk tahapan implementasi.

## Keamanan

- Jangan pernah meminta atau menyimpan seed phrase/private key pengguna untuk fitur riset.
- API key exchange, jika suatu saat dibutuhkan, harus dibatasi izin dan tidak memiliki izin withdraw.
- Jangan membuat proxy URL arbitrer yang berisiko SSRF.
- Validasi input, sanitasi konten pihak ketiga, batasi request, dan jangan merender HTML feed secara mentah.
- Laporkan kerentanan melalui [SECURITY.md](SECURITY.md).

## Roadmap

Roadmap produk mencakup stabilisasi terminal chart, scanner meme coin, on-chain wallet intelligence, token risk research, alert, dan portfolio analytics. Status aktual tiap item harus mengikuti implementasi serta pengujian; lihat [docs/ROADMAP.md](docs/ROADMAP.md).

## Kontribusi

Baca [CONTRIBUTING.md](CONTRIBUTING.md). Pull request harus menjelaskan sumber data, batasan provider, pengujian, dan dampak terhadap pengguna. Jangan memasukkan kredensial, alamat wallet pribadi yang sensitif, atau data pihak ketiga yang tidak berizin.

## Disclaimer risiko

Zabrina Alpha Terminal adalah perangkat lunak informasi dan riset, bukan penasihat keuangan. Aset kripto dan meme coin sangat volatil dan dapat kehilangan sebagian besar atau seluruh nilainya. Data dapat terlambat atau tidak lengkap; deteksi risiko tidak sempurna; aktivitas wallet historis tidak menjamin hasil mendatang. Lakukan verifikasi mandiri dan jangan mempertaruhkan dana yang tidak sanggup Anda hilangkan.

## Lisensi

Periksa file `LICENSE` untuk ketentuan lisensi proyek. Data, API, logo, dan layanan pihak ketiga tetap tunduk pada ketentuan masing-masing.
