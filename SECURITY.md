# Kebijakan Keamanan

Zabrina Alpha Terminal adalah aplikasi riset cryptocurrency dan meme coin. Keamanan aplikasi, integritas data, serta perlindungan kredensial merupakan prioritas. Data market dan on-chain yang bersifat publik tetap harus diperlakukan sebagai input tidak tepercaya.

## Versi yang didukung

Perbaikan keamanan ditujukan ke kode terbaru pada branch `main`. Commit lama mungkin tidak menerima patch.

## Pelaporan kerentanan

Jangan memublikasikan kredensial, exploit yang dapat disalahgunakan, atau detail kerentanan yang belum diperbaiki di issue publik. Hubungi maintainer secara privat melalui metode kontak pada profil GitHub **Strong-Bee**.

Sertakan jika memungkinkan:

- Ringkasan kerentanan dan route/komponen yang terdampak.
- Dampak dan langkah reproduksi yang aman.
- Versi, commit, atau konfigurasi yang terdampak.
- Proof of concept minimal yang tidak mengakses data milik orang lain.
- Mitigasi yang disarankan.

Jangan sertakan API key, access token, seed phrase, private key, data pribadi, atau secret produksi dalam laporan. Beri maintainer waktu yang wajar untuk investigasi sebelum disclosure publik.

## Area keamanan penting

### Kredensial dan wallet

- Fitur riset tidak membutuhkan seed phrase atau private key pengguna; jangan meminta atau menyimpannya.
- Secret provider hanya berada di server-side dan tidak boleh masuk source control, log, screenshot, atau client bundle.
- Jangan gunakan prefix `NEXT_PUBLIC_` untuk secret.
- Jika kelak ada koneksi exchange, gunakan API key least-privilege dan nonaktifkan izin withdrawal.
- Pisahkan paper trading dari live trading; jangan mengirim order live tanpa tindakan eksplisit pengguna.

### API dan provider eksternal

- Perlakukan query parameters, simbol, alamat token, RSS, metadata token, dan semua respons provider sebagai input tidak tepercaya.
- Validasi chain, format alamat, schema respons, tipe data, dan ukuran payload.
- Terapkan timeout, rate limit, batas concurrency, cache, serta retry/backoff terbatas.
- Jangan membuat proxy URL arbitrer yang dapat menyebabkan SSRF.
- Jangan merender HTML pihak ketiga secara mentah.
- Jangan menampilkan data lama sebagai live tanpa penanda freshness.
- Kegagalan pemeriksaan token harus menghasilkan status unavailable/unknown, bukan klaim aman.

### On-chain dan trading analytics

- Alamat wallet publik tidak otomatis mengungkap identitas dunia nyata.
- PnL dan label wallet harus memiliki metodologi serta keterbatasan yang jelas.
- Jangan menganggap scanner atau skor risiko sebagai jaminan keamanan maupun profit.
- Semua kalkulasi yang dapat memengaruhi keputusan trading harus divalidasi dan diuji.

### Supply chain dan CI

- Gunakan dependency lockfile dan tinjau perubahan dependency.
- Beri GitHub Actions permission minimum yang diperlukan.
- Jangan menjalankan script atau binary tidak tepercaya tanpa pemeriksaan.
- Periksa perubahan workflow, dependency, dan environment sebelum merge.

## Disclaimer

Kebijakan ini tidak menjamin aplikasi bebas kerentanan. Pengguna harus memverifikasi data dan risiko sebelum mengambil keputusan finansial.
