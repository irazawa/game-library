# 🎮 Game Library Desktop

Sebuah aplikasi desktop sederhana untuk mengelola dan meluncurkan koleksi game PC Anda. Dibuat dengan Electron.js, aplikasi ini menawarkan antarmuka yang bersih dan modern, terinspirasi dari pengalaman konsol game.

---

## ✨ Fitur Utama

- **Manajemen Koleksi:** Tambah, Edit, dan Hapus game dari pustaka Anda dengan mudah.
- **Kustomisasi Visual:** Tentukan ikon dan gambar banner unik untuk setiap game.
- **Peluncur Game:** Jalankan game langsung dari aplikasi dengan permintaan hak Administrator (UAC) yang aman.
- **Dua Mode Tampilan:**
  - **Mode Detail:** Tampilan klasik dengan daftar ikon di atas dan banner besar di bawah.
  - **Mode Grid:** Tampilan ringkas yang menampilkan semua ikon game dalam sebuah kisi.
- **Navigasi Intuitif:**
  - Gunakan **tombol panah ← →** untuk berpindah antar game.
  - **Double-click** pada ikon game untuk langsung menjalankannya.
- **Pengalaman Penuh:** Masuk ke mode layar penuh (fullscreen) untuk pengalaman yang lebih imersif.
- **Penyimpanan Lokal:** Semua data game dan pengaturan disimpan secara lokal di komputer Anda, tidak memerlukan koneksi internet.

---

## 🛠️ Teknologi yang Digunakan

- **[Electron](https://www.electronjs.org/)**: Framework utama untuk membangun aplikasi desktop dengan JavaScript, HTML, dan CSS.
- **[Node.js](https://nodejs.org/)**: Lingkungan runtime JavaScript.
- **[lowdb](https://github.com/typicode/lowdb)**: Database JSON lokal sederhana untuk menyimpan daftar game dan pengaturan.
- **[sudo-prompt](https://github.com/jorangreef/sudo-prompt)**: Untuk menampilkan dialog UAC (izin Administrator) saat menjalankan game.

---

## 🚀 Instalasi & Menjalankan (Untuk Developer)

Jika Anda ingin menjalankan proyek ini dari kode sumbernya, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**

    ```bash
    git clone https://github.com/irazawa/game-library.git
    cd repo-name
    ```

2.  **Install semua dependency:**

    ```bash
    npm install
    ```

3.  **Jalankan aplikasi dalam mode pengembangan:**
    ```bash
    npm start
    ```

---

## 📦 Deploy menjadi `.exe`

Untuk membuat file installer `.exe` yang siap didistribusikan:

1.  Pastikan Anda sudah menyiapkan ikon aplikasi di `assets/icon.ico`.
2.  Jalankan perintah build:
    ```bash
    npm run build
    ```
3.  Hasilnya akan tersedia di dalam folder `dist`. File installer (`.exe`) siap untuk digunakan dan dibagikan.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](https://opensource.org/licenses/MIT).
