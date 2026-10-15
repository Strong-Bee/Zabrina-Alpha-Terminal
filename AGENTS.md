# Panduan Agen — Zabrina Alpha Terminal

Zabrina Alpha Terminal adalah **terminal trading dan riset khusus cryptocurrency, dengan fokus kuat pada meme coin**. Jangan mengubah positioning menjadi terminal multi-aset umum. Prioritaskan chart kripto, market data, Solana meme coin discovery, token-risk research, on-chain wallet intelligence, dan trading analytics.

<!-- BEGIN:nextjs-agent-rules -->

## Panduan Next.js yang digunakan proyek

Versi Next.js ini dapat memiliki API, konvensi, dan struktur yang berbeda dari versi sebelumnya. Sebelum mengubah kode, baca panduan terkait yang tersedia di `node_modules/next/dist/docs/` pada lingkungan proyek dan ikuti peringatan deprecation.

Blok ini dikelola oleh tooling Next.js. Jangan menghapusnya tanpa alasan; perubahan pada blok ini dapat dibuat ulang oleh `next dev`.

<!-- END:nextjs-agent-rules -->

## Konteks stack

- Next.js App Router, React, TypeScript strict mode.
- Tailwind CSS v4.
- Zustand untuk state antarkomponen yang memang perlu dibagikan.
- lightweight-charts untuk kebutuhan chart.
- npm dengan lockfile; pertahankan konsistensi `package.json` dan `package-lock.json`.
- Struktur aplikasi saat ini tidak menggunakan folder `src/`.

## Aturan domain

1. **Crypto-only:** fitur utama harus berkaitan dengan aset kripto, pair exchange, DEX, blockchain, token, wallet, atau trading analytics.
2. **Identitas token:** gunakan chain/network + mint/contract address; jangan mengandalkan simbol atau nama saja.
3. **Jangan mengarang data:** data demo harus diberi label jelas. Kegagalan API tidak boleh disamarkan sebagai data real-time.
4. **Provenance:** untuk metrik pasar dan on-chain, catat provider, timestamp, satuan, dan status freshness jika relevan.
5. **Unknown bukan aman:** data yang tidak tersedia atau gagal diperiksa harus dilaporkan sebagai `unknown`.
6. **Solana dan EVM berbeda:** jangan menerapkan asumsi authority atau model kontrak satu chain ke chain lain.
7. **Tidak ada jaminan profit:** hindari klaim “pasti pump”, “100% aman”, atau “profit dijamin”.
8. **Live execution bukan default:** jangan menambahkan eksekusi order, withdrawal, atau akses private key tanpa spesifikasi, persetujuan, dan kontrol keamanan yang jelas.

## Standar implementasi

- Gunakan tipe eksplisit dan hindari `any`.
- Pisahkan adapter provider, normalisasi data, logika domain, dan presentasi UI.
- Validasi query parameters, chain, alamat, simbol, timeframe, dan respons eksternal.
- Tangani loading, error, empty, stale, timeout, HTTP 429, dan pembatalan request.
- Gunakan timeout, cache, concurrency limit, serta retry/backoff sesuai ketentuan provider.
- Hindari URL proxy arbitrer, SSRF, render HTML mentah, dan secret di client bundle.
- Jangan menyimpan seed phrase/private key untuk fitur riset.
- Gunakan komponen dan design tokens yang sudah ada; jangan membuat gaya UI terpisah tanpa kebutuhan.
- Tambahkan pengujian untuk parser, kalkulasi, dan edge cases bila memungkinkan.

## Verifikasi sebelum selesai

Jalankan:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Periksa hasil aktual, bukan hanya keberadaan script atau workflow. Jangan mengklaim tes lulus jika belum dijalankan. Ringkas perubahan, file yang disentuh, hasil tes, dan risiko yang masih terbuka.
