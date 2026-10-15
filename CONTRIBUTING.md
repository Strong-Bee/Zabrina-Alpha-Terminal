# Panduan Kontribusi

Terima kasih telah berkontribusi pada **Zabrina Alpha Terminal**, terminal trading dan riset cryptocurrency yang berfokus pada crypto market data, meme coin discovery, token-risk research, dan on-chain intelligence.

## Ruang lingkup kontribusi

Kontribusi yang relevan meliputi:

- Chart, ticker, candle, watchlist, dan integrasi market data kripto.
- Solana-first meme coin scanner dan dukungan DEX pair.
- Analisis token, likuiditas, holder, authority, serta indikator risiko spesifik chain.
- Wallet tracking, transaksi, whale/early-buyer research, dan perhitungan PnL.
- Alert, paper trading, portfolio analytics, dan jurnal trading.
- Reliability, keamanan, aksesibilitas, dokumentasi, dan test.

Jangan mengubah produk menjadi terminal multi-aset generik atau menambahkan klaim performa trading yang tidak dapat dibuktikan.

## Alur kerja

1. Fork repository atau buat branch fitur dari `main`.
2. Gunakan nama branch deskriptif, misalnya `feat/solana-token-scanner`, `feat/chart-timeframe`, atau `fix/provider-timeout`.
3. Fokus pada satu perubahan logis per pull request.
4. Baca `AGENTS.md`, `docs/ARCHITECTURE.md`, dan roadmap terkait.
5. Sertakan pengujian untuk parser, normalisasi, kalkulasi, dan adapter provider bila memungkinkan.
6. Jalankan pemeriksaan lokal.
7. Jelaskan perubahan, alasan, batasan, risiko, dan hasil tes pada pull request.

## Pemeriksaan lokal

Gunakan versi Node.js yang kompatibel dengan project dan npm lockfile:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Jika perintah gagal, sertakan error relevan dan jangan menyebut perubahan sudah terverifikasi.

## Standar data dan domain

- Gunakan **chain + alamat mint/contract** sebagai identitas token kanonis.
- Bedakan spot, perpetual, DEX pair, pool, dan transaksi on-chain.
- Normalisasikan timestamp, decimal, satuan, simbol, serta status data.
- Sertakan provider, waktu pengambilan, dan link sumber untuk metrik yang penting.
- Tangani data kosong, malformed, stale, timeout, rate limit, dan provider unavailable.
- Jangan membuat harga, volume, market cap, wallet PnL, berita, atau hasil backtest fiktif.
- Jika demo diperlukan, labeli sebagai data demo pada UI dan dokumentasi.
- Jangan menyamakan market cap, FDV, volume, dan likuiditas.
- Jangan menganggap status `unknown` sebagai `pass` atau aman.
- Pemeriksaan Solana dan EVM harus mempertimbangkan model masing-masing jaringan.

## Standar keamanan

- Jangan commit `.env.local`, token, API key, private key, seed phrase, data pribadi, atau log sensitif.
- Jangan menaruh secret di variabel `NEXT_PUBLIC_*`.
- Validasi input pengguna dan respons provider.
- Hindari arbitrary URL fetching, SSRF, unsafe HTML, dan endpoint tanpa batas.
- Hormati rate limits, lisensi, dan ketentuan penggunaan provider.
- Integrasi exchange di masa depan harus menerapkan least privilege; jangan meminta izin withdrawal.
- Pisahkan paper trading dari live trading.

## Pull request checklist

- [ ] Scope tetap fokus pada cryptocurrency dan meme coin.
- [ ] UI memiliki loading, error, empty, dan stale states bila relevan.
- [ ] Data eksternal tervalidasi dan sumbernya jelas.
- [ ] Perubahan sensitif memiliki test atau alasan mengapa test belum tersedia.
- [ ] Tidak ada secret atau data demo yang disajikan sebagai data live.
- [ ] `npm run lint`, `npm run typecheck`, dan `npm run build` sudah dijalankan atau status belum lulus dinyatakan secara jujur.
- [ ] Dokumentasi dan roadmap diperbarui jika perilaku produk berubah.
