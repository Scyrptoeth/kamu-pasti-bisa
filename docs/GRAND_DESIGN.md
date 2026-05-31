# Grand Design: "Kamu Pasti Bisa"
**Status**: Draft - Ready to Develop
**Version**: 1.0.0
**Lead Architect**: Gemini CLI (Expert AI Assistant)

## 1. Visi Produk
"Kamu Pasti Bisa" adalah platform pembelajaran modern yang dirancang khusus untuk membantu siswa menguasai materi ujian sekolah melalui metode pengenalan bertahap (Flipcard) dan simulasi ujian nyata (Tes). Proyek ini memprioritaskan akurasi konten dengan hanya menggunakan sumber referensi tunggal yang telah diverifikasi.

## 2. Arsitektur Teknis
- **Framework**: Next.js 14+ (App Router).
- **Styling**: Vanilla CSS atau Tailwind CSS (Sesuai preferensi Standing Preferences Tier 1).
- **Persistence**: Browser Local Storage (Untuk menyimpan riwayat percobaan dan skor tanpa perlu login).
- **AI Integration**: Deepseek API (Model: deepseek-chat) untuk penilaian otomatis jawaban Essay (Skala 1-10).
- **Security**: API Key Deepseek dikelola via `.env.local` (Server-side Only).

## 3. Fitur Utama & Workflow
### A. Flipcard (Fase Pengenalan)
- **Tujuan**: Memungkinkan siswa "melihat" soal dan jawaban tanpa tekanan opsi ganda.
- **Struktur**: 35 Soal (30 yang nantinya jadi PG + 5 yang nantinya jadi Essay).
- **Interaksi**: Klik untuk membalik kartu (Question -> Answer).

### B. Tes (Fase Simulasi)
- **Struktur Paket**:
  - 30 Soal Pilihan Ganda (A, B, C, D).
  - 5 Soal Essay.
- **Scoring**:
  - PG: Benar +1, Salah/Kosong 0. (Max 30).
  - Essay: Dinilai AI Deepseek (Skala 0-10 per soal). (Max 50).
  - Total Score: Normalisasi ke skala 100 atau skor mentah sesuai kebutuhan.
- **Review Mode**: Menampilkan jawaban pengguna vs Kunci Jawaban (hijau untuk benar, merah untuk salah).
- **Statistik Progres**: Chart/List yang mencatat skor dari Percobaan 1, Percobaan 2, dst.
- **Tombol "Coba Lagi"**: Reset state untuk paket tertentu.

## 4. Struktur Data (JSON)
Data akan diekstrak dari PDF `5-paket-soal.pdf` menjadi format berikut:
```json
{
  "paket_id": "ekonomi-paket-1",
  "kategori": "Ekonomi",
  "soal_pg": [
    {
      "id": 1,
      "pertanyaan": "...",
      "opsi": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "kunci": "A",
      "pembahasan": "..."
    }
  ],
  "soal_essay": [
    {
      "id": 31,
      "pertanyaan": "...",
      "jawaban_ideal": "...",
      "rubrik_penilaian": "..."
    }
  ]
}
```

## 5. Integrasi Deepseek (Grading Essay)
### Prompt Logic:
"Anda adalah guru Ekonomi berpengalaman. Nilailah jawaban siswa berikut berdasarkan Pertanyaan dan Jawaban Ideal yang diberikan. Berikan skor bulat antara 0 hingga 10. Berikan penjelasan singkat mengapa skor tersebut diberikan."

## 6. UI/UX Principles (Taste UI & UI-UX Pro Max)
- **Visual Character**: Calm, focused, academic but modern.
- **Typography**: Clean sans-serif (Inter atau sistem font lokal).
- **Accessibility**: Contrast AA minimum, focus states untuk keyboard navigation, label form yang jelas.
- **Motion**: Subtle transition saat membalik Flipcard dan saat berpindah soal.

## 7. Roadmap Pengembangan
1. **Fase 0**: Inisialisasi Project & Skill Agen (Selesai).
2. **Fase 1**: Ekstraksi AI dari PDF `5-paket-soal.pdf` ke JSON.
3. **Fase 2**: Implementasi UI Dasar (Flipcard & Test Engine).
4. **Fase 3**: Integrasi API Deepseek untuk Essay.
5. **Fase 4**: Implementasi Local Storage Tracker & Statistics.
6. **Fase 5**: Final Polish & Deployment ke Vercel.

---
**Dokumentasi Folder**: `/Users/persiapantubel/Desktop/codex/website-belajar/kamu-pasti-bisa`
