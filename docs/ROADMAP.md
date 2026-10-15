# Roadmap

Roadmap ini membedakan fondasi yang ada dari pengembangan yang direncanakan. Item belum dianggap selesai hanya karena tercantum di dokumen.

## Prioritas 1 — Stabilitas

- [ ] Jalankan CI pada setiap push dan pull request.
- [ ] Perbaiki lint, TypeScript, dan build failures yang ditemukan CI.
- [ ] Audit route dan modul data untuk loading/error/empty states.
- [ ] Tambahkan unit tests untuk parser dan normalisasi data.
- [ ] Verifikasi default chart `BTCUSDT / 4H` dan jumlah candle historis.

**Kriteria selesai:** pemeriksaan CI lulus, kegagalan provider ditampilkan dengan benar, dan tidak ada angka palsu yang disamarkan sebagai data live.

## Prioritas 2 — Charting dan data pasar

- [ ] Uji reconnect WebSocket, backoff, dan cleanup.
- [ ] Validasi simbol/timeframe dan penanganan rate limit.
- [ ] Konsistensikan watchlist dan sumber harga.
- [ ] Tambahkan label freshness dan timestamp sumber data.

**Kriteria selesai:** perubahan simbol/timeframe tidak meninggalkan koneksi lama; candle tidak duplikat dan berurutan.

## Prioritas 3 — Berita dan makro

- [ ] Validasi RSS, timeout, cache, dan sanitasi.
- [ ] Cantumkan publisher, timestamp, dan tautan sumber.
- [ ] Bedakan data historis, estimasi, dan rilis aktual.
- [ ] Tambahkan status sumber ketika feed tidak tersedia.

**Kriteria selesai:** setiap item berita/indikator memiliki sumber yang dapat ditelusuri dan kegagalan feed tidak merusak halaman.

## Prioritas 4 — AI research

- [ ] Ringkasan dengan sitasi ke sumber yang digunakan.
- [ ] Pemisahan fakta, inferensi, dan ketidakpastian.
- [ ] Tidak ada klaim sinyal terjamin atau profit terjamin.
- [ ] Pengendalian biaya, timeout, dan privasi data.

## Prioritas 5 — Multi-aset dan analitik

- [ ] Integrasi provider resmi untuk saham, forex, komoditas, dan indeks.
- [ ] On-chain dan scanner hanya setelah sumber serta batasan API dievaluasi.
- [ ] Analitik portofolio, drawdown, exposure, dan risk/reward dengan rumus terdokumentasi.
- [ ] Backtest dengan biaya, slippage, dan bias survivorship yang dipertimbangkan.

## Aturan rilis

Jangan menyebut modul sebagai real-time, AI-powered, atau production-ready sebelum integrasi dan perilakunya diuji. Setiap fitur baru perlu menyertakan sumber data, batasan, pengujian, dan dokumentasi konfigurasi.
