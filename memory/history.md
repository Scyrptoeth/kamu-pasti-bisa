### [2026-05-31] - Optimalisasi Skala Flipcard (Large Workspace)
- **Latest Update**: 
  - Memperbesar dimensi Flipcard menjadi minimal 480px (Tinggi) dan 768px (Lebar max).
  - Meningkatkan padding kartu menjadi `p-12` untuk ruang baca yang lebih lega.
  - Optimalisasi tipografi soal (2xl-3xl) dan jawaban (xl-2xl) agar nyaman dibaca pada layar besar.
  - Penyesuaian kontrol navigasi dan grid CBT agar selaras dengan dimensi kartu yang baru.
  - Verifikasi build sukses dan deployment live ke Vercel.
- **Lesson Learned**: 
  - Ukuran kartu yang dominan (Large Workspace) menciptakan hirarki visual yang lebih kuat dan mendukung fokus 'Zen Mode' bagi siswa.
  - Memberikan whitespace yang cukup (`p-12`) secara drastis menurunkan beban kognitif saat memproses teks soal yang kompleks.
- **Current Status**: **Production Live (V 1.4.0 - Workspace Edition)**.
- **Next Actions**: Melanjutkan integrasi penilaian esai otomatis menggunakan AI Deepseek.

### [2026-05-31] - Transformasi Navigasi Flipcard (Fokus Tunggal & Gaya CBT)
- **Latest Update**: 
  - Mengubah antarmuka 'Kartu Hafalan' (Flipcard) dari grid menjadi tampilan kartu tunggal per layar.
  - Implementasi navigasi gaya CBT (Computer Based Test) dengan grid nomor 7 kolom.
  - Penambahan indikator visual (subtle marker) untuk kartu yang sudah pernah dibuka/dibalik.
- **Lesson Learned**: Tampilan kartu tunggal secara dramatis meningkatkan fokus belajar dibandingkan tampilan grid.
- **Current Status**: **Production Live (V 1.3.0)**.

### [2026-05-31] - Zen Mode & Lokalisasi Total (Pembersihan AI Slop)
- **Latest Update**: Pembersihan total gaya bahasa 'AI Slop' dan lokalisasi penuh ke Bahasa Indonesia formal.
- **Current Status**: **Production Live (V 1.2.0)**.
