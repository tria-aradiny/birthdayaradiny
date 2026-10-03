# Tiup Lilin di Bawah Bintang

Undangan ulang tahun interaktif (HTML, CSS, dan JavaScript murni, tanpa build).
Acara: Sabtu, 24 Oktober 2026, 15.00 WIB di Kala Cemara, Greenforest Bandung.

## Isi project

- `index.html` : undangan interaktif lengkap
- `share.html` : kartu satu halaman ringkas, ini yang dibagikan ke sosmed lewat tombol Bagikan
- `README.md` : panduan ini

Kedua halaman saling terhubung lewat nama file, jadi simpan `index.html` dan `share.html` di folder yang sama.

## Jalankan di komputer

Buka `index.html` langsung di browser. Koneksi internet dibutuhkan untuk memuat font Google Fonts.

## Deploy ke GitHub

Lewat web (paling mudah):

1. Buka https://github.com/new, isi nama repo (misalnya `undangan-ulang-tahun`), lalu klik **Create repository**.
2. Klik **uploading an existing file**, tarik `index.html` dan `README.md`, lalu **Commit changes**.

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
