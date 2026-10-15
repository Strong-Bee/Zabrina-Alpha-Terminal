# Roadmap Zabrina Alpha Terminal

Produk ini berfokus pada **crypto trading dan meme coin intelligence**. Checklist berikut adalah rencana; item hanya boleh ditandai selesai setelah implementasi dan verifikasi.

## P0 — Stabilitas dan integritas data

- [ ] Jalankan CI untuk push dan pull request.
- [ ] Lulus ESLint, TypeScript, dan production build.
- [ ] Audit halaman serta endpoint yang sudah ada.
- [ ] Tambahkan unit tests untuk parser dan adapter.
- [ ] Konsistenkan loading, error, empty, stale, dan demo states.
- [ ] Validasi input serta batasi request ke provider.

**Kriteria selesai:** data gagal tidak diganti diam-diam oleh angka contoh; status sumber dan error terlihat jelas.

## P1 — Crypto market terminal

- [ ] Default chart `BTCUSDT / 4H`.
- [ ] Verifikasi historis candle hingga target 600 candle sesuai batas provider.
- [ ] Perbaiki reconnect WebSocket, backoff, dan cleanup.
- [ ] Pastikan watchlist menampilkan harga, perubahan, volume, dan timestamp dari sumber yang sama.
- [ ] Tambahkan normalisasi simbol dan validasi timeframe.
- [ ] Dokumentasikan perbedaan data spot dan perpetual.

**Kriteria selesai:** pergantian simbol/timeframe tidak meninggalkan koneksi lama; candle berurutan dan tidak duplikat.

## P2 — Meme coin scanner, prioritas Solana

- [ ] Integrasi sumber pair/token yang dapat diverifikasi.
- [ ] Filter berdasarkan umur pair, liquidity, volume, transaksi, perubahan harga, dan market cap/FDV jika tersedia.
- [ ] Identifikasi token menggunakan chain + mint/contract address, bukan simbol saja.
- [ ] Tambahkan deteksi data stale, pair duplikat, serta token metadata yang tidak lengkap.
- [ ] Tampilkan alasan sebuah token masuk hasil scanner dan sumber metriknya.
- [ ] Tambahkan filter risiko tanpa mengklaim hasilnya menjamin keamanan.

**Kriteria selesai:** hasil scanner memiliki alamat kanonis, chain, provider, timestamp, dan metrik dengan definisi yang terdokumentasi.

## P3 — Token risk research

- [ ] Periksa likuiditas dan perubahan likuiditas jika data tersedia.
- [ ] Periksa konsentrasi holder dengan klasifikasi pool/burn/locker yang dapat ditelusuri.
- [ ] Tambahkan pemeriksaan khusus chain; bedakan Solana dan EVM.
- [ ] Laporkan status `pass`, `warning`, `fail`, atau `unknown` beserta alasan.
- [ ] Tambahkan tautan explorer untuk temuan on-chain.

**Kriteria selesai:** data yang tidak tersedia tidak pernah diperlakukan sebagai bukti keamanan.

## P4 — Wallet dan whale intelligence

- [ ] Watchlist wallet lintas jaringan.
- [ ] Timeline aktivitas wallet dan tautan transaksi explorer.
- [ ] Identifikasi early buyers dengan definisi waktu yang jelas.
- [ ] Kalkulasi PnL dengan harga historis, biaya, transfer, dan token yang tidak dapat dihargai.
- [ ] Pisahkan realized PnL, unrealized PnL, dan estimasi.
- [ ] Tandai hasil incomplete jika histori tidak memadai.

**Kriteria selesai:** klaim profitable wallet dapat direproduksi dari transaksi dan asumsi yang terdokumentasi.

## P5 — Trading intelligence dan risk management

- [ ] Indikator teknikal serta struktur pasar.
- [ ] Alert harga, volume, volatilitas, dan scanner.
- [ ] Portfolio, jurnal, exposure, drawdown, dan risk/reward.
- [ ] Paper trading sebelum mempertimbangkan live execution.
- [ ] AI research dengan sumber, timestamp, dan pemisahan fakta/inferensi.

**Kriteria selesai:** metrik dan alert dapat diuji; tidak ada klaim profit terjamin.

## P6 — Ekspansi provider dan jaringan

- [ ] Evaluasi DEX analytics API, blockchain RPC/indexer, dan explorer untuk kebutuhan nyata.
- [ ] Perluas dukungan chain setelah identitas token, rate limits, dan kualitas data diuji.
- [ ] Tambahkan data derivatif seperti funding/open interest hanya melalui provider yang sesuai.
- [ ] Dokumentasikan biaya, kuota, lisensi, dan fallback tiap provider.

## Aturan rilis

Jangan menyatakan fitur production-ready, real-time, atau akurat sebelum diuji. Setiap fitur perlu dokumentasi sumber data, freshness, batasan, pengujian, serta perilaku saat provider gagal.
