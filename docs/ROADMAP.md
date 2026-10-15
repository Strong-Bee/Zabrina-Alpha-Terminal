# Roadmap Zabrina Alpha Terminal

Zabrina Alpha Terminal dikembangkan sebagai **crypto trading terminal dengan fokus khusus pada meme coin**. Urutan berikut menekankan integritas data dan fondasi sebelum analitik berisiko tinggi. Checklist adalah rencana, bukan klaim fitur sudah selesai.

## P0 — Stabilitas dan kualitas

- [ ] Jalankan lint, TypeScript typecheck, dan production build pada CI.
- [ ] Audit halaman, route handler, dan dependency yang sudah ada.
- [ ] Tambahkan unit test untuk normalisasi data dan provider adapter.
- [ ] Konsistenkan loading, error, empty, stale, serta demo states.
- [ ] Validasi query, simbol, timeframe, chain, dan alamat token.
- [ ] Terapkan timeout, rate limit, cache, dan error mapping.

**Kriteria selesai:** CI hijau pada commit terkait dan kegagalan provider tidak menghasilkan angka palsu.

## P1 — Crypto market terminal

- [ ] Jadikan BTCUSDT 4H sebagai default chart dan dokumentasikan pilihan timeframe.
- [ ] Verifikasi candle historis, batas request, urutan timestamp, serta duplicate handling.
- [ ] Perbaiki WebSocket reconnect, exponential backoff, dan cleanup.
- [ ] Konsistenkan ticker watchlist: harga, perubahan, volume, provider, dan timestamp.
- [ ] Validasi simbol yang tidak didukung dan bedakan data spot/perpetual.
- [ ] Tambahkan market overview untuk aset kripto yang benar-benar didukung provider.

**Kriteria selesai:** pergantian simbol/timeframe tidak meninggalkan koneksi lama dan data memiliki status freshness yang jelas.

## P2 — Solana-first meme coin scanner

- [x] Buat halaman awal scanner dan route API menggunakan data DEX Screener.
- [x] Tambahkan filter likuiditas, volume 24 jam, umur pair, jumlah transaksi, dan sorting.
- [x] Tampilkan alamat token, pair, metrik utama, link sumber, dan indikator awal.
- [ ] Tambahkan test untuk provider error, data malformed, pair duplikat, dan filter boundary.
- [ ] Perbaiki pemilihan kandidat agar lebih tahan terhadap token profil yang tidak memiliki pair.
- [ ] Tambahkan refresh strategy, status freshness, dan batas rate provider yang terdokumentasi.
- [ ] Tambahkan filter chain/address, pencarian token, dan detail pair.

**Kriteria selesai:** setiap hasil memiliki chain, mint address, pair address, provider, timestamp, serta metrik dengan definisi yang jelas. Checkbox implementasi awal tidak berarti audit keamanan lengkap.

## P3 — Token safety research

- [ ] Periksa mint/freeze authority Solana jika RPC/provider mendukung.
- [ ] Tambahkan analisis konsentrasi holder dan klasifikasi pool/burn/locker yang dapat diverifikasi.
- [ ] Tambahkan pemeriksaan likuiditas dan perubahan pool.
- [ ] Buat risk findings dengan status pass, warning, fail, dan unknown.
- [ ] Tambahkan tautan explorer dan bukti untuk setiap temuan.
- [ ] Bedakan aturan Solana dari aturan EVM.

**Kriteria selesai:** data hilang atau pemeriksaan gagal tidak pernah disimpulkan sebagai aman.

## P4 — On-chain wallet intelligence

- [ ] Watchlist wallet berdasarkan chain dan alamat.
- [ ] Timeline transaksi dengan tautan explorer.
- [ ] Early buyer dan whale tracking dengan definisi waktu dan metodologi jelas.
- [ ] Kalkulasi realized/unrealized PnL, fee, transfer, bridge, airdrop, dan token tanpa harga.
- [ ] Tandai data incomplete serta keterbatasan atribusi.
- [ ] Tambahkan alert aktivitas wallet dengan kontrol noise.

**Kriteria selesai:** analisis wallet dapat direproduksi dari transaksi, sumber, periode, dan asumsi yang terdokumentasi.

## P5 — Trading analytics dan risk management

- [ ] Indikator teknikal dan struktur pasar.
- [ ] Alert harga, volume, volatilitas, dan kondisi scanner.
- [ ] Portfolio, jurnal, exposure, drawdown, dan risk/reward.
- [ ] Paper trading dengan fee/slippage model yang dijelaskan.
- [ ] AI research yang menyertakan sumber dan memisahkan fakta dari inferensi.
- [ ] Backtesting dengan data historis, biaya, dan bias yang terdokumentasi.

**Kriteria selesai:** hasil analisis bisa diuji dan tidak ada klaim profit yang dijamin.

## P6 — Provider dan ekspansi chain

- [ ] Evaluasi DEX analytics, RPC/indexer, explorer, dan news providers.
- [ ] Dokumentasikan rate limit, biaya, lisensi, dan reliability.
- [ ] Tambahkan jaringan baru setelah kontrak data dan identitas token diuji.
- [ ] Tambahkan derivatif seperti funding/open interest hanya dari provider yang sesuai.

## P7 — Persiapan produksi

- [ ] Tambahkan observability dan error reporting tanpa secret.
- [ ] Audit dependency, rate limiting, dan keamanan route handler.
- [ ] Uji beban serta skenario provider outage.
- [ ] Dokumentasikan deployment, environment, backup, dan rollback.
- [ ] Tinjau aksesibilitas, responsivitas, dan performa halaman.

## Aturan rilis

Fitur hanya ditandai selesai setelah implementasi diverifikasi melalui test atau demonstrasi yang dapat direproduksi. Jangan menyebut fitur live, akurat, aman, atau production-ready tanpa bukti yang sesuai.
