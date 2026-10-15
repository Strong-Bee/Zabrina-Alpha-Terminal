# Panduan Kontribusi

Terima kasih telah membantu mengembangkan Zabrina Alpha Terminal.

## Alur kerja

1. Fork repository atau buat branch fitur dari `main`.
2. Gunakan nama branch deskriptif, misalnya `feat/chart-timeframe` atau `fix/rss-timeout`.
3. Fokus pada satu perubahan logis per pull request.
4. Tambahkan pengujian untuk parser, perhitungan, dan adapter data bila memungkinkan.
5. Jalankan pemeriksaan lokal sebelum mengajukan pull request:

   ```bash
   npm ci
   npm run lint
   npm run typecheck
   npm run build
   ```

6. Jelaskan perubahan, alasan, dampak, langkah pengujian, dan screenshot jika UI berubah.

## Standar implementasi

- Pertahankan struktur project tanpa folder `src/`.
- Gunakan TypeScript dan hindari `any` kecuali benar-benar diperlukan serta diberi alasan.
- Pisahkan logika pengambilan data dari komponen presentasi.
- Tangani loading, error, data kosong, timeout, dan rate limit.
- Jangan mengarang harga, berita, metrik, atau hasil backtest. Tandai data demo dengan jelas.
- Jangan commit file `.env.local`, token, build output, atau data pihak ketiga yang tidak berizin.
- Hormati lisensi dan ketentuan layanan seluruh penyedia data.

## Pull request

Pull request sebaiknya menyertakan:
- Ringkasan masalah dan solusi.
- Perubahan perilaku yang terlihat pengguna.
- Perintah pengujian dan hasilnya.
- Risiko yang diketahui atau konfigurasi tambahan yang diperlukan.
