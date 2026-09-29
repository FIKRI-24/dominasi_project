# 📘 PRODUCT REQUIREMENT DOCUMENT (PRD)
## Sistem Manajemen Soal Graf & Backend REST API
**Platform**: Karakterisasi Penempatan Sensor Super pada Jaringan (Dominasi & Pembeda Metrik)  
**Teknologi Backend**: Node.js, Express.js, Database SQLite / MySQL  
**Versi Dokumen**: 1.0.0  
**Status**: Acuan Pengembangan (Development Specification & Anti-Hallucination Blueprint)

---

## 1. Ringkasan Eksekutif & Tujuan Sistem
Dokumen ini mendefinisikan arsitektur backend untuk memisahkan bank soal dan data visual graf dari kode frontend React, sehingga:
1. Soal latihan, rumus LaTeX, dan struktur graf dapat dikelola secara dinamis (CRUD) tanpa perlu mengubah kode sumber React ataupun *build* ulang frontend.
2. Evaluasi jawaban dan kunci jawaban tersimpan aman di server (mencegah siswa mengintip kunci via browser *Inspect Element*).
3. Data graf disimpan dalam format standar **JSON Vektor (Nodes & Edges)** yang ringan dan dapat dianalisis oleh mesin komputasi algoritma graf (BFS).

---

## 2. Standar Struktur Data JSON Graf (`graph_data`)

Graf disimpan dalam format JSON murni yang merepresentasikan simpul (*nodes*), sisi (*edges*), dan penanda (*highlights*).

### Skema JSON:
```json
{
  "viewBox": { "width": 300, "height": 160 },
  "nodes": [
    { "id": "v1", "x": 60, "y": 80, "label": "v1" },
    { "id": "v2", "x": 150, "y": 40, "label": "v2" },
    { "id": "v3", "x": 240, "y": 80, "label": "v3" }
  ],
  "edges": [
    ["v1", "v2"],
    ["v2", "v3"],
    ["v1", "v3"]
  ],
  "highlights": ["v1"]
}
```

### Aturan & Batasan Validasi JSON:
* `nodes`: Array objek dengan properti unik `id` (string), koordinat relatif/absolut `x` dan `y` (number), serta `label` (string).
* `edges`: Array pasangan 2 elemen `[u, v]` di mana `u` dan `v` wajib terdaftar di `nodes`. Graf bersifat tak berarah sederhana (*undirected simple graph*).
* `highlights`: Array `id` simpul yang diwarnai khusus (misal warna hijau saat pembahasan atau penempatan sensor).

---

## 3. Skema Basis Data Relasional (Database Schema)

### A. Tabel `packages` (Paket Kuis)
| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | ID Unik Paket (1, 2, 3, 4, ...) |
| `slug` | VARCHAR(50) UNIQUE | Identifikasi URL (misal: `dasar-matrix`, `dasar-dominasi`) |
| `title` | VARCHAR(100) NOT NULL | Judul Paket (misal: *Dasar Bilangan Dominasi*) |
| `icon` | VARCHAR(20) | Karakter Emoji / FontAwesome Icon identifier |
| `difficulty` | VARCHAR(20) | `Beginner`, `Intermediate`, `Advanced` |
| `description` | TEXT | Deskripsi pengantar paket latihan |
| `created_at` | DATETIME DEFAULT CURRENT_TIMESTAMP | Tanggal dibuat |

### B. Tabel `questions` (Bank Soal)
| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | INTEGER PRIMARY KEY AUTOINCREMENT | ID Unik Soal |
| `package_id` | INTEGER NOT NULL | Relasi ke `packages.id` (Foreign Key) |
| `question_text` | TEXT NOT NULL | Teks pertanyaan (mendukung rumus inline `$formula$`) |
| `has_diagram` | BOOLEAN DEFAULT 0 | 1 jika soal memiliki visual graf, 0 jika hanya teks |
| `graph_data` | TEXT (JSON) | String JSON nodes & edges (NULL jika tidak ada diagram) |
| `options` | TEXT (JSON) | Array string 4 pilihan jawaban: `["Opsi A", "Opsi B", ...]` |
| `correct_index` | INTEGER NOT NULL | Indeks jawaban benar (0=A, 1=B, 2=C, 3=D) |
| `explanation` | TEXT NOT NULL | Pembahasan akademik & rujukan teori |
| `order_index` | INTEGER DEFAULT 0 | Urutan kemunculan soal di paket |

---

## 4. Spesifikasi Kontrak REST API

Base URL: `/api`

### 1. Endpoint Publik (Siswa / Frontend)
* `GET /api/packages`  
  * **Fungsi**: Mengambil seluruh daftar paket latihan beserta jumlah soalnya.
  * **Respons**: Status 200, array objek paket.
* `GET /api/packages/:id/questions`  
  * **Fungsi**: Mengambil daftar soal dalam 1 paket untuk dikerjakan.
  * **Keamanan Anti-Cheat**: Kolom `correct_index` dan `explanation` **disembunyikan** dari respons awal, hanya mengirim pertanyaan, data graf, dan pilihan opsi.
* `POST /api/packages/:id/submit`  
  * **Fungsi**: Menerima jawaban siswa, mengkalkulasi skor, dan mengembalikan kunci jawaban resmi + pembahasan lengkap.
  * **Payload Request**: `{ "answers": { "0": 1, "1": 3, ... } }`
  * **Respons**: `{ "score": 80, "details": [ { "question_id": 1, "is_correct": true, "correct": 1, "explanation": "..." } ] }`

### 2. Endpoint Admin (Pengajar / CMS)
* `GET /api/admin/questions?package_id=:id`  
  * **Fungsi**: Menampilkan seluruh data soal lengkap dengan kunci jawaban untuk keperluan editing.
* `POST /api/admin/questions`  
  * **Fungsi**: Menyimpan soal baru (beserta JSON graf).
* `PUT /api/admin/questions/:id`  
  * **Fungsi**: Memperbarui teks soal, opsi jawaban, pembahasan, atau struktur graf.
* `DELETE /api/admin/questions/:id`  
  * **Fungsi**: Menghapus butir soal.
* `POST /api/admin/graph/analyze`  
  * **Fungsi**: Asisten cerdas backend untuk menghitung nilai $\beta(G)$ (Dimensi Metrik) dan $\gamma(G)$ (Bilangan Dominasi) dari data graf yang digambar guru.

---

## 5. Fase-Fase Tahapan Pengerjaan (Development Phases)

Untuk memastikan proses pengembangan berjalan aman, terukur, dan tidak mengalami halusinasi, implementasi dibagi menjadi **5 Fase Berurutan**:

```
[FASE 1] Inisialisasi Backend & Migrasi 40 Soal
   │
[FASE 2] Pembuatan REST API Publik & Grading Engine
   │
[FASE 3] Integrasi Frontend (Dynamic Graph SVG Renderer)
   │
[FASE 4] Pembuatan REST API Admin & Visual Graph Builder Form
   │
[FASE 5] Asisten Cerdas BFS & Pengujian End-to-End
```

### 📌 FASE 1: Inisialisasi Server & Migrasi Data (Database Seeding)
* Menyiapkan direktori `project_root/backend`.
* Menginisialisasi `package.json` backend dengan dependensi: `express`, `cors`, `dotenv`, driver SQLite / MySQL.
* Membuat skema tabel `packages` dan `questions`.
* Menulis skrip migrasi data (*seeder*) untuk memindahkan **seluruh 40 butir soal yang sudah diaudit secara akurat dari `latihan.jsx` ke dalam database**.

### 📌 FASE 2: REST API Publik & Sistem Penilaian Aman
* Membuat router Express untuk `packages` dan `questions`.
* Mengimplementasikan logika *Grading Engine* di sisi server: memverifikasi jawaban siswa, menghitung persentase skor, dan mengembalikan pembahasan.
* Menguji seluruh endpoint menggunakan curl/REST client untuk memastikan respons JSON 100% konsisten.

### 📌 FASE 3: Komponen Renderer Graf Dinamis di Frontend
* Membuat komponen React `<DynamicGraphSvg graphData={...} />`.
* Menghubungkan halaman kuis `latihan.jsx` dengan API backend Express: mengambil paket dan soal secara dinamis.
* Memastikan rumus KaTeX `$formula$` dan graf SVG tampil presisi di layar desktop dan ponsel.

### 📌 FASE 4: Dashboard Admin & Visual Graph Builder
* Menyediakan endpoint CRUD Admin (`POST`, `PUT`, `DELETE`).
* Membuat antarmuka formulir admin sederhana:
  * Input Teks Soal + *Live Preview* KaTeX.
  * Kanvas interaktif mini: klik untuk menaruh titik $v_i$, sambungkan garis antar-titik, dan otomatis membentuk struktur JSON graf.

### 📌 FASE 5: Asisten Hitung Otomatis (Graph Helper Engine) & Finalisasi
* Menanamkan modul BFS JavaScript ke dalam servis backend.
* Menyediakan fitur bagi guru: tombol *"Hitung Otomatis Kunci Jawaban"* yang menghitung $\gamma(G)$ dan $\beta(G)$ secara instan begitu guru selesai menggambar graf.
* Pengujian menyeluruh (*stress test* dan validasi anti-eror).

---

## 6. Pedoman Anti-Halusinasi & Batasan Mutlak (Strict Guardrails)
1. **Integritas Soal Audit**: Ke-40 soal yang telah diaudit secara matematis di sesi sebelumnya adalah data resmi; tidak boleh ada perubahan kunci jawaban atau rumus saat proses migrasi ke database.
2. **Kesesuaian Teorema Graf**: Perhitungan otomatis pada Fase 5 wajib mengacu pada literatur baku (Buczkowski et al. untuk graf roda, Haynes et al. untuk dominasi, dsb.).
3. **Isolasi Modul**: Kode backend diletakkan di dalam folder mandiri `project_root/backend/` tanpa merusak konfigurasi Vite frontend yang sudah stabil di `project_root/frontend/`.
