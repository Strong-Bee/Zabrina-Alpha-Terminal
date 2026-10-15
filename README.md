# Zabrina Alpha Terminal

**Crypto Trading & Meme Coin Intelligence Terminal** untuk memantau pasar kripto, membaca chart, menyusun watchlist, dan membangun alur riset meme coin berbasis data yang dapat diverifikasi.

Zabrina Alpha Terminal dikembangkan sebagai workspace riset **khusus cryptocurrency dan meme coin** — bukan terminal multi-aset umum. Arah pengembangannya mencakup market monitoring, Solana-first meme coin discovery, token risk research, on-chain wallet intelligence, dan trading analytics.

<p align="center">
  <a href="https://nextjs.org/docs/app"><img alt="Next.js App Router" src="https://img.shields.io/badge/Next.js-App_Router-black?logo=next.js" /></a>
  <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react" /></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript strict" src="https://img.shields.io/badge/TypeScript-Strict-3178c6?logo=typescript" /></a>
  <a href="https://tailwindcss.com/"><img alt="Tailwind CSS v4" src="https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss" /></a>
  <a href="https://github.com/Strong-Bee/Zabrina-Alpha-Terminal/actions"><img alt="CI" src="https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white" /></a>
</p>

> **Status proyek:** aktif dikembangkan. Dokumen ini membedakan fondasi yang sudah ada dari rencana fitur. Roadmap bukan klaim bahwa semua modul sudah tersedia, berjalan real-time, atau telah lulus pengujian produksi. Selalu verifikasi status dari kode dan workflow CI terbaru.

---

## Daftar Isi

- [Visi dan tujuan](#visi-dan-tujuan)
- [Fokus produk](#fokus-produk)
- [Status kemampuan](#status-kemampuan)
- [Stack teknologi](#stack-teknologi)
- [Memulai dari lokal](#memulai-dari-lokal)
- [Konfigurasi environment](#konfigurasi-environment)
- [Perintah pengembangan](#perintah-pengembangan)
- [Struktur proyek](#struktur-proyek)
- [Arsitektur data](#arsitektur-data)
- [Prinsip market data](#prinsip-market-data)
- [Rencana scanner meme coin](#rencana-scanner-meme-coin)
- [Menggunakan Solana Meme Coin Scanner](#menggunakan-solana-meme-coin-scanner)
- [Kerangka analisis risiko token](#kerangka-analisis-risiko-token)
- [On-chain dan wallet intelligence](#on-chain-dan-wallet-intelligence)
- [Keamanan](#keamanan)
- [Quality assurance dan CI](#quality-assurance-dan-ci)
- [Roadmap](#roadmap)
- [Kontribusi](#kontribusi)
- [Dokumentasi terkait](#dokumentasi-terkait)
- [Disclaimer](#disclaimer)
- [Lisensi](#lisensi)

## Visi dan tujuan

Tujuan Zabrina Alpha Terminal adalah membantu pengguna melakukan riset aset kripto dari satu workspace dengan alur yang lebih terstruktur:

1. Mengamati pergerakan harga dan market data.
2. Menyimpan serta membandingkan aset dalam watchlist.
3. Menemukan token/pair baru, terutama meme coin.
4. Memeriksa likuiditas, aktivitas perdagangan, dan indikator risiko token.
5. Menelusuri aktivitas on-chain dan wallet berdasarkan bukti transaksi.
6. Mendokumentasikan alasan keputusan, skenario risiko, dan hasil analisis.

Aplikasi ini merupakan alat bantu riset. Data pasar, metrik on-chain, dan hasil pemeriksaan harus selalu memiliki sumber, timestamp, batasan, dan status ketersediaan yang jelas.

## Fokus produk

### 1. Crypto market terminal

Fondasi terminal pasar berfokus pada aset kripto, termasuk:

- Chart harga dan pemilihan simbol/timeframe.
- Watchlist pasangan perdagangan kripto.
- Pemantauan harga, perubahan harga, dan volume apabila tersedia dari provider.
- Streaming ticker melalui sumber market data yang didukung.
- Pengembangan berikutnya: market overview lintas exchange, order book, trade tape, funding rate, open interest, dan data likuidasi.

Contoh pasangan yang menjadi target dukungan awal meliputi BTCUSDT, ETHUSDT, SOLUSDT, XRPUSDT, DOGEUSDT, BNBUSDT, ADAUSDT, AVAXUSDT, LINKUSDT, dan pasangan lain yang benar-benar tersedia pada sumber data terintegrasi. Ketersediaan pasangan bergantung pada provider dan jenis pasar; simbol spot tidak otomatis berarti data perpetual tersedia.

### 2. Meme coin scanner — prioritas Solana

Scanner dirancang untuk membantu menyaring token/pair yang layak diteliti lebih lanjut, bukan untuk menjanjikan token yang pasti naik.

Dimensi filter yang direncanakan:

- Chain/network dan alamat mint atau contract.
- Umur token/pair dan waktu listing jika tersedia.
- Likuiditas dan perubahan likuiditas.
- Volume pada beberapa jendela waktu.
- Jumlah transaksi serta perbandingan buy/sell jika sumber menyediakan metrik yang konsisten.
- Perubahan harga, volatilitas, market cap, dan FDV dengan definisi yang jelas.
- Konsentrasi holder, aktivitas deployer, serta indikator kontrak/authority sesuai chain.
- Status data, waktu pembaruan, dan tautan sumber agar hasil bisa diverifikasi.

**Urutan prioritas jaringan:** Solana terlebih dahulu, lalu jaringan EVM sesuai kebutuhan dan kualitas data provider. Integrasi DEX analytics, RPC, explorer, dan indexer akan ditambahkan setelah kontrak API, batas rate, dan aturan penggunaan diperiksa.

### 3. Token risk research

Tujuan modul ini adalah menampilkan *temuan risiko* yang dapat diperiksa, bukan mengeluarkan label “aman” secara mutlak.

Contoh kategori pemeriksaan yang dapat dikembangkan:

- Likuiditas tersedia dan perubahan pool.
- Konsentrasi kepemilikan dan distribusi holder.
- Aktivitas deployer atau wallet terkait.
- Authority/metadata dan konfigurasi khusus Solana.
- Fungsi kontrak, ownership, dan izin berisiko untuk jaringan EVM.
- Perubahan suplai, pajak transaksi, pembatasan transfer, atau pola perdagangan abnormal bila sumber mendukung.
- Usia kontrak/pair, kedalaman pasar, serta ketergantungan pada pool tertentu.

Setiap temuan sebaiknya memiliki status **pass**, **warning**, **fail**, atau **unknown**, disertai penjelasan, sumber, dan waktu pemeriksaan. Status unknown berarti data belum cukup untuk menyimpulkan — bukan berarti aman.

### 4. On-chain intelligence dan wallet tracking

Rencana modul on-chain meliputi:

- Pencarian token berdasarkan chain dan alamat mint/contract.
- Pemeriksaan pair/pool dan transaksi terkait.
- Watchlist wallet yang ditentukan pengguna.
- Pelacakan aktivitas whale dan pembeli awal berdasarkan data transaksi yang dapat diverifikasi.
- Analisis performa historis wallet dengan metodologi yang dapat direproduksi.
- Pemisahan realized PnL dan unrealized PnL, serta pertimbangan biaya, transfer internal, token spam, dan aset yang tidak memiliki harga andal.

Label seperti *profitable wallet*, *smart money*, atau *early buyer* tidak boleh diberikan hanya dari satu transaksi atau cuplikan saldo. Analisis perlu menyebut chain, alamat, periode, sumber, metode perhitungan, serta keterbatasan data.

### 5. Trading intelligence

Fitur yang dapat dikembangkan secara bertahap:

- Indikator teknikal dan analisis struktur pasar.
- Support/resistance, trend, BOS/CHOCH, fair value gap (FVG), dan order block sebagai alat analisis — bukan kepastian arah harga.
- Alert harga, volume, volatilitas, serta kondisi scanner.
- Kalkulasi risk/reward dan skenario stop-loss/take-profit.
- Paper trading, jurnal transaksi, portfolio, exposure, dan analisis PnL.
- Ringkasan riset berbantuan AI yang memisahkan data teramati, inferensi, dan ketidakpastian.

Eksekusi order live bukan asumsi default. Jika kelak ditambahkan, fitur tersebut memerlukan persetujuan eksplisit, pembatasan izin API, validasi order, proteksi kredensial, kontrol risiko, dan pengujian terpisah.

### 6. Berita dan katalis pasar kripto

Pengembangan berikutnya dapat mencakup berita aset kripto, pengumuman protokol, listing/delisting exchange, unlock token, upgrade jaringan, insiden keamanan, dan peristiwa on-chain. Setiap item harus menyertakan penerbit, waktu publikasi, tautan sumber, serta penanda bila informasi belum terkonfirmasi.

## Status kemampuan

| Area | Status dokumentasi |
|---|---|
| Next.js App Router, React, TypeScript, Tailwind | Fondasi stack proyek |
| Halaman chart dan komponen chart/watchlist | Sudah ada di repository; detail perilaku tetap perlu diverifikasi lewat aplikasi dan pengujian |
| Data ticker Binance Vision | Terdapat jalur ticker yang digunakan watchlist; reliabilitas dan cakupan perlu diverifikasi |
| Solana Meme Coin Scanner | Implementasi awal tersedia di `/meme-coins` dan `/api/meme-coins`; perlu validasi runtime/CI dan pengembangan risk checks lanjutan |
| Token risk engine | Roadmap |
| Wallet PnL/whale intelligence | Roadmap |
| Alert, paper trading, portfolio | Roadmap |
| Eksekusi order live | Bukan fitur yang dijanjikan oleh README ini |

Tabel ini sengaja konservatif. Perubahan kode dapat mengubah status fitur; periksa branch main, commit terbaru, dan hasil CI sebelum mengandalkan suatu kemampuan.

## Stack teknologi

- **Next.js App Router** — aplikasi web dan route handler.
- **React** — antarmuka pengguna.
- **TypeScript strict mode** — pemeriksaan tipe.
- **Tailwind CSS v4** — styling.
- **lightweight-charts** — fondasi charting.
- **Zustand** — state UI yang dibagikan.
- **Binance public market data** — sumber untuk pasar/pasangan yang didukung oleh integrasi aktif.
- **ESLint dan TypeScript CLI** — pemeriksaan kualitas kode.
- **GitHub Actions** — workflow CI untuk lint, typecheck, dan build.

Versi paket yang tepat ada di package.json dan package-lock.json. Integrasi pihak ketiga lainnya hanya boleh disebut aktif setelah kode, penanganan error, dan pengujiannya tersedia.

## Memulai dari lokal

### Persyaratan

- Git.
- Node.js versi LTS yang kompatibel dengan versi Next.js pada repository.
- npm.
- Koneksi internet untuk mengakses dependency dan provider data publik.

### Instalasi

    git clone https://github.com/Strong-Bee/Zabrina-Alpha-Terminal.git
    cd Zabrina-Alpha-Terminal
    npm ci
    npm run dev

Buka [http://localhost:3000](http://localhost:3000).

Jika instalasi atau build gagal, periksa versi Node.js, versi npm, dependency lockfile, dan pesan error lengkap sebelum mengubah versi paket.

## Konfigurasi environment

Saat ini, pengembangan dasar ditujukan agar dapat dimulai tanpa menambahkan secret. File .env.example adalah template; periksa file itu sebelum membuat konfigurasi lokal.

Jika sebuah integrasi berikutnya membutuhkan environment variable:

1. Salin template ke .env.local.
2. Isi hanya variabel yang benar-benar digunakan oleh kode.
3. Jangan commit .env.local atau kredensial asli.
4. Secret harus digunakan di server-side dan tidak boleh diberi awalan NEXT_PUBLIC_.
5. Jangan pernah menyimpan seed phrase, private key, atau secret wallet di environment aplikasi riset.

Dokumentasi resmi: [Environment Variables Next.js](https://nextjs.org/docs/app/guides/environment-variables).

## Perintah pengembangan

    npm run dev        # menjalankan server development
    npm run lint       # menjalankan ESLint
    npm run typecheck  # memeriksa tipe TypeScript
    npm run build      # membuat build produksi
    npm run start      # menjalankan build produksi

Untuk pemeriksaan lokal sebelum pull request:

    npm ci
    npm run lint
    npm run typecheck
    npm run build

Jangan menyatakan build berhasil hanya karena perintah sudah dicantumkan atau workflow sudah dibuat. Status keberhasilan harus dilihat dari hasil eksekusi aktual.

## Struktur proyek

Struktur penting yang sudah diketahui pada repository:

    app/
      chart/
        page.tsx                 # route halaman chart
      api/
        chart/
          tickers/               # endpoint ticker yang digunakan watchlist
    components/
      chart/
        ChartWorkspace.tsx       # workspace chart
        PriceChart.tsx           # komponen tampilan chart
        TopToolbar.tsx           # toolbar chart
        Watchlist.tsx            # daftar pasangan yang dipantau
        chartStore.ts            # state UI chart berbasis Zustand
    docs/
      ARCHITECTURE.md            # rancangan arsitektur
      ROADMAP.md                 # tahapan pengembangan
    .github/
      workflows/
        ci.yml                   # workflow CI

Ini adalah peta komponen utama, bukan inventaris lengkap seluruh file. Periksa direktori pada branch aktif untuk mengetahui struktur terbaru.

## Arsitektur data

Alur target untuk integrasi data pasar dan on-chain:

    Exchange API / WebSocket ─┐
    DEX analytics / RPC ──────┼─> Provider adapter
    Explorer / News provider ┘          |
                                         v
                              Validasi dan normalisasi
                                         |
                                         v
                              Cache, timeout, rate limit
                                         |
                                         v
                               Model data crypto bertipe
                               /       |       |       \
                            Chart   Scanner  Risk    Wallet

Prinsip desain:

- Pisahkan komponen antarmuka dari adapter provider dan logika domain.
- Gunakan identitas token berbasis **chain + alamat mint/contract**, bukan simbol saja.
- Normalisasi timestamp, satuan, decimal, simbol, alamat, dan status pasar.
- Beri timeout dan penanganan error pada request eksternal.
- Gunakan cache, backoff, dan concurrency limit sesuai batas provider.
- Hindari mengirim secret ke browser atau menyimpan data server yang tidak diperlukan di global UI store.
- Setiap hasil analisis perlu dapat ditelusuri ke sumber dan metode perhitungannya.

Lihat [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) untuk rancangan lebih lengkap.

## Prinsip market data

1. **Sumber jelas:** catat provider dan jenis pasar (spot, perpetual, DEX pool, atau on-chain).
2. **Timestamp jelas:** bedakan waktu event, waktu provider, dan waktu data diterima aplikasi bila relevan.
3. **Freshness:** tampilkan status live, tertunda, stale, atau unavailable jika UI mendukungnya.
4. **Tidak ada angka palsu:** jangan mengganti kegagalan API dengan angka contoh tanpa label demo yang jelas.
5. **Satuan konsisten:** harga, volume, market cap, FDV, dan likuiditas harus dibedakan.
6. **Identitas token:** chain dan alamat lebih dapat diandalkan daripada ticker yang dapat duplikat.
7. **Rate limit:** patuhi ketentuan provider; gunakan cache, timeout, retry terbatas, dan exponential backoff.
8. **Kegagalan eksplisit:** tunjukkan error atau status unavailable daripada menampilkan data lama seolah-olah real-time.
9. **Keterlacakan:** sediakan link sumber untuk angka dan temuan yang dipakai dalam keputusan.
10. **Tidak menyamakan metrik:** market cap, FDV, liquidity, dan volume mengukur hal yang berbeda.

Untuk Binance, rujuk [dokumentasi resmi Binance Developers](https://developers.binance.com/en/docs/introduction) dan dokumentasi endpoint/stream spesifik sebelum membuat integrasi atau mengubah perilaku koneksi.

## Menggunakan Solana Meme Coin Scanner

Buka route [`/meme-coins`](https://github.com/Strong-Bee/Zabrina-Alpha-Terminal/tree/main/app/meme-coins) saat aplikasi berjalan. Scanner mengambil profil token terbaru dari DEX Screener, meminta data pair Solana secara batch, lalu menerapkan filter likuiditas, volume 24 jam, umur pair, jumlah transaksi, dan pengurutan.

Default filter: likuiditas minimum US$5.000, volume 24 jam minimum US$10.000, umur pair maksimum 168 jam, dan minimal 20 transaksi 24 jam. Angka ini adalah filter awal yang bisa diubah, bukan standar keamanan. Endpoint backend tersedia di `/api/meme-coins`; provider dapat membatasi data atau gagal sementara. Scanner menampilkan error jika pengambilan data gagal dan tidak mengarang data pengganti.

Hasil yang muncul adalah **kandidat pair dari profil token terbaru**, bukan klasifikasi pasti meme coin. Indikator risiko di UI bersifat heuristik sederhana; belum menggantikan audit kontrak, analisis holder, pemeriksaan authority, atau simulasi transaksi.

## Rencana scanner meme coin

Alur kerja scanner yang dituju:

1. Ambil kandidat token/pair dari sumber yang diizinkan.
2. Validasi chain dan alamat mint/contract.
3. Normalisasi metrik serta timestamp.
4. Terapkan filter yang dipilih pengguna.
5. Jalankan pemeriksaan risiko sesuai data yang tersedia.
6. Urutkan kandidat dengan kriteria transparan; jangan menyamakan skor scanner dengan rekomendasi beli.
7. Tampilkan alasan masuk filter, risiko, data yang hilang, sumber, dan waktu pembaruan.
8. Izinkan pengguna membuka sumber asli untuk melakukan verifikasi.

Skor, bila ditambahkan, perlu menjelaskan komponen dan bobotnya. Hindari klaim seperti “pasti pump”, “100% aman”, atau “profit dijamin”.

## Kerangka analisis risiko token

Pemeriksaan risiko perlu mempertimbangkan karakteristik jaringan. Solana dan EVM tidak memiliki model account, program/contract, dan authority yang sama; indikatornya tidak boleh dipaksakan menjadi satu aturan universal.

Contoh status temuan:

- **Pass:** pemeriksaan spesifik telah dijalankan dan tidak menemukan kondisi yang didefinisikan sebagai masalah.
- **Warning:** ada kondisi yang perlu ditinjau pengguna.
- **Fail:** pemeriksaan menemukan kondisi berisiko menurut aturan yang terdokumentasi.
- **Unknown:** data tidak tersedia, tidak cukup, atau pemeriksaan gagal.

Status pass bukan jaminan keamanan. Pemeriksaan otomatis dapat melewatkan manipulasi, perubahan perilaku kontrak, liquidity removal, serangan sosial, atau risiko yang tidak tercakup oleh provider.

## On-chain dan wallet intelligence

Analisis wallet harus transparan mengenai:

- Chain dan alamat wallet yang tepat.
- Rentang waktu dan block/transaction range jika tersedia.
- Sumber transaksi dan metode valuasi.
- Realized vs. unrealized PnL.
- Biaya transaksi, transfer, bridging, airdrop, token spam, dan aset yang tidak dapat dihargai.
- Kemungkinan transaksi internal, wallet yang saling terkait, dan keterbatasan atribusi pemilik.
- Waktu data terakhir diperbarui.

Alamat publik bukan bukti identitas dunia nyata. Hindari menyimpulkan pemilik wallet atau niat seseorang tanpa bukti independen yang memadai.

## Keamanan

- Jangan meminta, mengumpulkan, atau menyimpan seed phrase dan private key untuk fitur riset.
- Jangan memasukkan API key atau token akses ke source code, issue, screenshot, log, atau commit.
- Jangan mengekspos secret melalui variabel NEXT_PUBLIC_*.
- Jika integrasi exchange kelak ditambahkan, gunakan izin minimum dan nonaktifkan izin withdraw.
- Validasi input pengguna dan data dari provider.
- Hindari proxy URL arbitrer yang dapat menimbulkan SSRF.
- Terapkan timeout, batas ukuran response, rate limit, dan error handling.
- Jangan merender HTML mentah dari feed pihak ketiga.
- Audit dependency dan periksa permission workflow CI.
- Laporkan kerentanan secara bertanggung jawab melalui [SECURITY.md](SECURITY.md).

## Quality assurance dan CI

Workflow GitHub Actions ditujukan untuk menjalankan pemeriksaan saat push dan pull request ke branch utama:

1. Instal dependency menggunakan lockfile.
2. Jalankan ESLint.
3. Jalankan TypeScript typecheck.
4. Jalankan production build.

Periksa tab [Actions](https://github.com/Strong-Bee/Zabrina-Alpha-Terminal/actions) di GitHub untuk hasil aktual. Jika workflow gagal, perbaiki penyebabnya sebelum menganggap perubahan siap digabung. Cakupan test otomatis dapat ditambah seiring berkembangnya adapter data, scanner, dan risk engine.

## Roadmap

Tahapan pengembangan berprioritas:

- **P0 — Stabilitas:** lint, typecheck, build, validasi input, status error/stale, dan test.
- **P1 — Crypto terminal:** chart, timeframe, data historis, ticker, dan reconnect stream yang andal.
- **P2 — Solana meme coin scanner:** penemuan pair, filter, sorting, dan provenance data.
- **P3 — Token risk research:** pemeriksaan spesifik chain dengan status unknown yang eksplisit.
- **P4 — Wallet intelligence:** aktivitas wallet, early buyer, whale tracking, dan metodologi PnL.
- **P5 — Trading intelligence:** alert, risk/reward, paper trading, jurnal, dan portfolio analytics.
- **P6 — Ekspansi provider/network:** integrasi baru berdasarkan kebutuhan, keandalan, biaya, dan lisensi.

Lihat [docs/ROADMAP.md](docs/ROADMAP.md). Checklist hanya boleh ditandai selesai setelah implementasi dan verifikasi.

## Kontribusi

Kontribusi berupa bug report, perbaikan dokumentasi, adapter provider, peningkatan aksesibilitas, dan test sangat dihargai.

Sebelum membuat pull request:

1. Baca [CONTRIBUTING.md](CONTRIBUTING.md).
2. Jelaskan masalah, solusi, dan batasan perubahan.
3. Sertakan sumber data resmi dan aturan penggunaan jika menambah provider.
4. Tambahkan validasi serta test yang relevan.
5. Jalankan lint, typecheck, dan build.
6. Pastikan tidak ada secret atau data sensitif di diff.
7. Jangan menandai fitur sebagai real-time atau production-ready tanpa bukti pengujian.

## Dokumentasi terkait

- [Arsitektur](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Panduan kontribusi](CONTRIBUTING.md)
- [Kebijakan keamanan](SECURITY.md)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Environment Variables Next.js](https://nextjs.org/docs/app/guides/environment-variables)
- [Binance Developers](https://developers.binance.com/en/docs/introduction)

## Disclaimer

Zabrina Alpha Terminal adalah perangkat lunak untuk informasi, analisis, dan riset. Konten aplikasi bukan nasihat keuangan, investasi, hukum, atau pajak, dan tidak merupakan ajakan untuk membeli atau menjual aset.

Cryptocurrency dan meme coin memiliki volatilitas serta risiko kehilangan modal yang sangat tinggi. Likuiditas dapat hilang, harga dapat dimanipulasi, kontrak dapat memiliki kerentanan, dan data pihak ketiga dapat terlambat, salah, atau tidak lengkap. Hasil masa lalu tidak menjamin hasil mendatang. Skor, indikator, alert, dan analisis AI bukan jaminan profit atau keamanan.

Lakukan verifikasi mandiri terhadap sumber data dan risiko. Jangan mempertaruhkan dana yang tidak sanggup Anda hilangkan.

## Lisensi

Lihat file [LICENSE](LICENSE) pada repository untuk ketentuan lisensi kode. Data pasar, API, logo, chart library, dan layanan pihak ketiga tunduk pada lisensi serta ketentuan masing-masing.
