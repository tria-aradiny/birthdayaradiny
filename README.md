# Tiup Lilin di Bawah Bintang

Undangan ulang tahun interaktif (HTML, CSS, dan JavaScript murni, tanpa build).
Acara: Sabtu, 24 Oktober 2026, 15.00 WIB di Kala Cemara, Greenforest Bandung.

## Isi project

- `index.html` : undangan interaktif lengkap
- `share.html` : kartu satu halaman ringkas (versi halaman web)
- `kartu.js` : pembuat video loop kartu undangan (9:16, pas untuk Story/Status), dipakai `index.html` dan `share.html`
- `README.md` : panduan ini

Semua file saling terhubung lewat nama file, jadi simpan `index.html`, `share.html`, dan `kartu.js` di folder yang sama.

## Cara membagikan sebagai video

Begitu halaman dibuka, browser merekam kartu undangan jadi video loop 6 detik (9:16, 720 x 1280) dengan bunting berayun dan bintang berkelip. Tombol **Bagikan video** membuka menu share bawaan HP (WhatsApp, Instagram, Telegram, dan lainnya) dengan video sudah terlampir. Penerima langsung melihat kartunya bergerak, tanpa perlu membuka link.

- **Simpan video**: menyimpan video ke galeri, lalu unggah sebagai Story atau Post (termasuk Instagram).
- **Salin link**: menyalin link `share.html` untuk ditempel di mana saja.
- Format MP4 dipakai kalau browser mendukung (Safari dan Chrome terbaru). Kalau tidak, hasilnya WebM, yang kadang tidak diputar di WhatsApp lama. Kalau ragu, buka dari Safari (iPhone) atau Chrome terbaru (Android).
- Di komputer yang tidak mendukung share file, Bagikan video otomatis menyimpan file ke folder Download.
- Kalau browser sama sekali tidak bisa merekam video, otomatis jadi gambar PNG.
- Perekaman berjalan real-time, jadi tab harus tetap terbuka sekitar 6 detik setelah halaman dimuat.

Tampilan dan animasinya bisa diubah di `kartu.js` (fungsi `paint`; durasi di `DUR`).

## Jalankan di komputer

Buka `index.html` langsung di browser. Koneksi internet dibutuhkan untuk memuat font Google Fonts.

## Deploy ke GitHub

Lewat web (paling mudah):

1. Buka https://github.com/new, isi nama repo (misalnya `undangan-ulang-tahun`), lalu klik **Create repository**.
2. Klik **uploading an existing file**, tarik `index.html`, `share.html`, `kartu.js`, dan `README.md`, lalu **Commit changes**.

Lewat terminal:

```bash
cd undangan-tiup-lilin
git init
git add .
git commit -m "Undangan ulang tahun"
git branch -M main
git remote add origin https://github.com/USERNAME/undangan-ulang-tahun.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub kamu.

## Deploy ke Vercel

1. Masuk ke https://vercel.com dengan akun GitHub.
2. Klik **Add New**, lalu **Project**, dan pilih repo `undangan-ulang-tahun` (klik **Import**).
3. Biarkan semua pengaturan default: Framework Preset **Other**, Build Command kosong, Output Directory kosong.
4. Klik **Deploy**. Setelah selesai kamu dapat link seperti `https://undangan-ulang-tahun.vercel.app`.

Setiap kali `index.html` diubah dan di-push ke GitHub, Vercel otomatis memperbarui situsnya.

## Yang mudah diubah

- Teks, nama, dan tanggal: cari langsung di `index.html`.
- Waktu hitung mundur: cari `2026-10-24T15:00:00+07:00` di bagian script.
- Tanggal ulang tahun di kartu: cari `var BD = [[10, 20], [10, 3], [10, 24]];` (format bulan, tanggal; urutan Tria, Mama, Papa).
- Tautan peta: cari `google.com/maps/search`.
