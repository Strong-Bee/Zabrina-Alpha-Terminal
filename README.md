# Zabrina Alpha Terminal

**Terminal intelijen pasar multi-aset** untuk memantau harga, membaca chart, mengikuti berita, dan menyusun riset pasar dalam satu workspace.

> Status: proyek aktif dalam pengembangan. Ketersediaan setiap modul bergantung pada implementasi di branch saat ini dan layanan data eksternal. Jangan menganggap roadmap sebagai fitur produksi.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Daftar isi

- [Tujuan proyek](#tujuan-proyek)
- [Modul produk](#modul-produk)
- [Teknologi](#teknologi)
- [Mulai lokal](#mulai-lokal)
- [Konfigurasi](#konfigurasi)
- [Perintah pengembangan](#perintah-pengembangan)
- [Arsitektur](#arsitektur)
- [Sumber data dan batasan](#sumber-data-dan-batasan)
- [Keamanan](#keamanan)
- [Roadmap](#roadmap)
- [Kontribusi](#kontribusi)
- [Disclaimer](#disclaimer)
- [Lisensi](#lisensi)

## Tujuan proyek

Zabrina Alpha Terminal dikembangkan sebagai antarmuka riset pasar yang menyatukan beberapa kelas aset dan konteks makro. Sasaran jangka panjangnya mencakup crypto, saham, forex, komoditas, indeks, berita, indikator ekonomi, analitik kuantitatif, on-chain, serta alat manajemen risiko. Integrasi harus diberi label berdasarkan sumber, waktu pembaruan, dan status ketersediaannya.

## Modul produk

### Chart workspace — `/chart`

- Workspace chart dengan fokus pada tampilan penuh.
- Memulai dari simbol **BTCUSDT** dan timeframe **4H** sebagai default produk.
- Target historis hingga 600 candle, jika endpoint penyedia mendukung dan batas API mengizinkan.
- Desain untuk pergantian simbol/timeframe, watchlist, harga, dan data streaming.
- Kode chart harus menangani loading, error, data kosong, reconnect, dan cleanup koneksi.

### Kalender ekonomi — `/economic-calendar`

- Agenda ekonomi dan konteks indikator makro.
- Filter dampak/status dan informasi waktu event bila tersedia dari sumber.
- Nilai forecast, previous, dan actual harus menyertakan sumber; jangan mengisi angka yang tidak tersedia dengan data rekaan.

### Berita — `/news`

- Agregasi berita dari sumber yang dapat diakses.
- Kategori, pencarian, penyaringan, dan penanganan feed yang gagal.
- Konten tetap milik penerbit asal; tampilkan atribusi dan tautan sumber.

### Landing page — `/`

- Ringkasan produk dan akses menuju modul utama.
- Angka harga dan ticker hanya boleh ditampilkan sebagai live jika benar-benar berasal dari feed yang aktif; data contoh harus diberi label demo.

### Cakupan riset berikutnya

AI research assistant, ringkasan berita dengan sitasi, makro global, analitik quant, on-chain, scanner peluang, portfolio/risk analytics, alert, dan personalisasi watchlist direncanakan bertahap. Modul yang belum terhubung ke data nyata tidak boleh dipresentasikan sebagai sinyal atau analisis terverifikasi.

## Teknologi

- **Next.js App Router**, React, TypeScript strict mode
- **Tailwind CSS v4**
- **lightweight-charts** untuk visualisasi chart yang dibangun sendiri
- **Zustand** untuk state client yang memang perlu dibagi
- **Binance Public API/WebSocket** untuk data pasar crypto publik
- **ESLint** untuk pemeriksaan kualitas kode

Versi dependensi aktual ditentukan oleh `package.json` dan lockfile. Jangan memperbarui lockfile secara manual; gunakan npm untuk menyelaraskannya setelah perubahan dependensi.

## Mulai lokal

Persyaratan: Node.js versi LTS yang kompatibel dengan versi Next.js di `package.json`, serta npm.

```bash
git clone https://github.com/Strong-Bee/Zabrina-Alpha-Terminal.git
cd Zabrina-Alpha-Terminal
npm ci
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Jika `npm ci` gagal, periksa versi Node.js/npm dan pastikan `package.json` serta `package-lock.json` berasal dari commit yang sama. Jangan menghapus lockfile sebagai solusi pertama.

## Konfigurasi

Salin `.env.example` menjadi `.env.local` jika diperlukan. Variabel pada contoh adalah opsional kecuali suatu modul menyatakannya wajib. Jangan pernah commit token, API key, kredensial, atau file `.env.local`.

Aplikasi yang memakai endpoint publik sebaiknya tidak memerlukan rahasia server. Jika kelak ada provider yang memerlukan key, akses key hanya dari server-side route dan validasi input request.

## Perintah pengembangan

```bash
npm run dev        # server pengembangan
npm run lint       # ESLint
npm run typecheck  # pemeriksaan TypeScript
npm run build      # build produksi
npm run start      # jalankan build produksi
```

Sebelum membuat pull request, jalankan lint, typecheck, dan build. CI menggunakan pemeriksaan otomatis yang sama.

## Arsitektur

- `app/`: route, layout, dan server/client page Next.js.
- `components/`: komponen antarmuka berdasarkan fitur.
- `lib/`: integrasi data, utilitas, dan fungsi domain yang dapat digunakan ulang.
- `store/` atau modul state terkait: state client bila dibutuhkan.
- `docs/`: keputusan arsitektur dan roadmap.

Pertahankan struktur tanpa folder `src/`. Hindari menaruh seluruh logika data di komponen presentasi. Pisahkan adapter penyedia data dari komponen UI, gunakan tipe eksplisit, dan perlakukan respons API eksternal sebagai data yang tidak tepercaya.

### Prinsip data pasar

1. Simbol, timeframe, dan parameter API harus divalidasi sebelum request.
2. Perhatikan batas rate-limit dan gunakan timeout/error handling.
3. WebSocket harus melakukan cleanup saat komponen unmount dan membatasi reconnect dengan backoff.
4. Timestamp disimpan/ditangani dengan zona waktu yang eksplisit; tampilan lokal boleh mengikuti zona waktu pengguna.
5. Harga, candle, berita, dan indikator harus menampilkan status stale/loading/error jika relevan.
6. Jangan menyebut data tertunda sebagai real-time atau menampilkan data simulasi tanpa label.

Lihat [dokumen arsitektur](docs/ARCHITECTURE.md) dan [roadmap](docs/ROADMAP.md).

## Sumber data dan batasan

- **Binance API**: data pasar crypto publik; ketersediaan dan rate limit mengikuti kebijakan Binance.
- **TradingView widgets**: embed/visualisasi yang tunduk pada syarat dan kemampuan widget.
- **World Bank API**: indikator ekonomi historis sesuai cakupan dataset.
- **RSS publisher**: feed dapat berubah, tidak tersedia, atau membatasi akses.

Sumber-sumber tersebut tidak menjamin semua pasar global, data tick, fundamental, atau berita akan tersedia secara seragam. Integrasi perlu diuji dan setiap tampilan harus menunjukkan sumber data yang benar. Jangan melakukan scraping atau redistribusi yang melanggar syarat layanan sumber.

## Keamanan

- Jangan menyimpan secrets di repository atau mengirimkannya ke browser.
- Validasi dan batasi parameter endpoint; hindari proxy URL arbitrer yang membuka risiko SSRF.
- Jangan merender HTML dari feed berita tanpa sanitasi.
- Terapkan batas request, timeout, dan cache yang sesuai untuk endpoint server.
- Laporkan kerentanan secara privat sesuai [SECURITY.md](SECURITY.md).

## Roadmap

- [x] Fondasi Next.js App Router dan TypeScript
- [x] Halaman utama dan route modul awal
- [x] Fondasi chart workspace
- [ ] Konsistensi loading/error/empty states pada seluruh modul
- [ ] Pengujian unit untuk parser dan adapter data
- [ ] Validasi skema untuk respons API eksternal
- [ ] Observabilitas, rate-limit handling, dan fallback data yang transparan
- [ ] Riset AI dengan sitasi sumber dan label ketidakpastian
- [ ] Analitik portofolio dan risiko dengan metodologi yang terdokumentasi
- [ ] Cakupan multi-aset lebih luas berdasarkan integrasi resmi yang tersedia

Roadmap bukan klaim bahwa fitur tersebut sudah tersedia. Status akan diperbarui saat implementasi dan pengujian selesai.

## Kontribusi

1. Buat branch fitur dari `main`.
2. Buat perubahan sekecil mungkin dan jelaskan alasan teknisnya.
3. Tambahkan atau perbarui pengujian bila mengubah logika data.
4. Jalankan `npm run lint`, `npm run typecheck`, dan `npm run build`.
5. Jangan commit secrets, file hasil build, atau data pasar yang disalin tanpa izin.
6. Buka pull request dengan ringkasan, hasil pengujian, screenshot bila mengubah UI, dan sumber data yang digunakan.

Baca [CONTRIBUTING.md](CONTRIBUTING.md).

## Disclaimer

Zabrina Alpha Terminal adalah perangkat lunak informasi dan riset, bukan penasihat keuangan. Data dapat tertunda, tidak lengkap, atau salah. Analisis AI dan indikator tidak menjamin hasil, tidak merupakan rekomendasi membeli/menjual, dan tidak menggantikan penilaian independen. Selalu verifikasi data pada sumber primer dan kelola risiko Anda sendiri.

## Lisensi

Distribusi menggunakan MIT License jika file `LICENSE` di repository menyatakan demikian. Periksa lisensi dan ketentuan setiap layanan/data pihak ketiga secara terpisah.
