"use client";

import Link from "next/link";
import Image from "next/image";

export default function TutorialPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-24 min-h-screen font-sans text-ink">
      {/* Header Navigasi */}
      <div className="flex justify-between items-center mb-16 no-print">
        <Link href="/" className="flex items-center gap-4 group">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">&larr;</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono">Kembali ke Beranda</span>
        </Link>
        <button 
          onClick={() => window.print()}
          className="text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2 bg-ink text-white hover:bg-white hover:text-ink border border-ink transition-all rounded-sm font-mono shadow-lg"
        >
          Unduh Versi PDF
        </button>
      </div>

      {/* Judul Utama */}
      <header className="mb-24 text-center md:text-left border-b border-gray-100 pb-12">
        <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-muted font-mono mb-4 block">Dokumentasi Pengguna</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight uppercase">
          Panduan Penggunaan<br />Kamu Pasti Bisa
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
          Selamat datang di platform belajar mandiri. Panduan ini disusun untuk membantu Kamu memaksimalkan setiap fitur yang tersedia guna mencapai hasil belajar yang optimal secara efisien.
        </p>
      </header>

      {/* Konten Panduan */}
      <div className="space-y-32">
        
        {/* Navigasi Beranda */}
        <section id="navigasi" className="group">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono mb-4 block">Bagian 01</span>
              <h2 className="text-3xl font-bold mb-6 tracking-tight uppercase">Navigasi Beranda</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>Halaman utama adalah pusat kendali belajar Kamu. Di sini, Kamu dapat mengakses dua metode utama: Kartu Hafalan dan Simulasi Ujian.</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Klik logo untuk kembali ke beranda kapan saja.</li>
                  <li>Gunakan tombol "Tutorial Penggunaan" untuk mengakses panduan ini.</li>
                  <li>Pilih salah satu metode belajar melalui kartu navigasi besar di tengah layar.</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 w-full border border-gray-100 rounded-sm overflow-hidden shadow-sm">
              <Image 
                src="/tutorial/06-penambahan-beranda-dan-revisi-tombol.png" 
                alt="Navigasi Beranda" 
                width={800} 
                height={500} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* Kartu Hafalan */}
        <section id="flipcard" className="group">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            <div className="md:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono mb-4 block">Bagian 02</span>
              <h2 className="text-3xl font-bold mb-6 tracking-tight uppercase">Kartu Hafalan (Flipcard)</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>Metode ini menggunakan teknik repetisi aktif untuk menguji ingatan Kamu terhadap konsep-konsep inti.</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Klik pada kartu untuk membalikkan posisi dan melihat jawaban/definisi.</li>
                  <li>Gunakan tombol "Sebelumnya" atau "Selanjutnya" untuk berpindah kartu.</li>
                  <li>Perhatikan Grid CBT di bagian samping untuk melihat progres kartu yang sudah Kamu pelajari.</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 w-full border border-gray-100 rounded-sm overflow-hidden shadow-sm">
              <Image 
                src="/tutorial/02-stretch-tampilan.png" 
                alt="Kartu Hafalan" 
                width={800} 
                height={500} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* Simulasi Ujian */}
        <section id="simulasi" className="group">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono mb-4 block">Bagian 03</span>
              <h2 className="text-3xl font-bold mb-6 tracking-tight uppercase">Simulasi Ujian</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>Siapkan diri Kamu dengan simulasi yang menyerupai kondisi ujian sesungguhnya.</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Pilih Paket</strong>: Pilih dari daftar paket soal yang tersedia.</li>
                  <li><strong>Mode Fokus</strong>: Aktifkan mode ini untuk menyembunyikan elemen gangguan di layar.</li>
                  <li><strong>Atur Durasi</strong>: Sesuaikan batas waktu pengerjaan untuk melatih kecepatan Kamu.</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 w-full border border-gray-100 rounded-sm overflow-hidden shadow-sm">
              <Image 
                src="/tutorial/12-pilih-paket-ujian.png" 
                alt="Simulasi Ujian" 
                width={800} 
                height={500} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* Mengerjakan Soal */}
        <section id="mengerjakan" className="group">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            <div className="md:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono mb-4 block">Bagian 04</span>
              <h2 className="text-3xl font-bold mb-6 tracking-tight uppercase">Mengerjakan Soal</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>Antarmuka pengerjaan soal dirancang agar Kamu tetap fokus pada konten soal.</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Pilihan Ganda (PG)</strong>: Klik langsung pada opsi jawaban yang menurut Kamu paling benar.</li>
                  <li><strong>Esai</strong>: Ketikkan jawaban Kamu pada kolom teks yang tersedia untuk soal terbuka.</li>
                  <li><strong>Navigasi Nomor</strong>: Gunakan panel nomor di samping untuk melompat ke soal tertentu.</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 w-full border border-gray-100 rounded-sm overflow-hidden shadow-sm">
              <Image 
                src="/tutorial/08-revisi-tombol-selanjutnya.png" 
                alt="Mengerjakan Soal" 
                width={800} 
                height={500} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* Selesai & Evaluasi */}
        <section id="evaluasi" className="group">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono mb-4 block">Bagian 05</span>
              <h2 className="text-3xl font-bold mb-6 tracking-tight uppercase">Selesai & Evaluasi</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>Langkah akhir untuk mengukur kemampuan Kamu setelah mengerjakan seluruh soal.</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Kumpulkan Jawaban</strong>: Klik tombol "Selesai" dan konfirmasi pada dialog pop-up yang muncul.</li>
                  <li><strong>Hasil Skor</strong>: Sistem akan menampilkan skor akhir Kamu secara instan.</li>
                  <li><strong>Tinjau Pembahasan</strong>: Pelajari kembali soal-soal yang salah melalui penjelasan yang disediakan.</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <div className="border border-gray-100 rounded-sm overflow-hidden shadow-sm">
                <Image 
                  src="/tutorial/09-tombol-selesai.png" 
                  alt="Konfirmasi Selesai" 
                  width={800} 
                  height={400} 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="border border-gray-100 rounded-sm overflow-hidden shadow-sm">
                <Image 
                  src="/tutorial/11-selesai.png" 
                  alt="Hasil Skor" 
                  width={800} 
                  height={400} 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Anonim */}
        <section id="feedback" className="group">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            <div className="md:w-1/2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono mb-4 block">Bagian 06</span>
              <h2 className="text-3xl font-bold mb-6 tracking-tight uppercase">Feedback Anonim</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>Kami sangat menghargai masukan Kamu untuk pengembangan platform yang lebih baik.</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Kirimkan saran, laporan bug, atau apresiasi melalui formulir di bagian bawah beranda.</li>
                  <li>Seluruh pesan dikirim secara anonim tanpa merekam identitas Kamu.</li>
                  <li>Masukan Kamu akan langsung ditinjau oleh tim pengembang secara rutin.</li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2 w-full border border-gray-100 rounded-sm overflow-hidden shadow-sm">
              <Image 
                src="/tutorial/14-feedback-anonim.png" 
                alt="Feedback Anonim" 
                width={800} 
                height={500} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

      </div>

      {/* Footer Panduan */}
      <footer className="mt-32 pt-12 border-t border-gray-100 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted font-mono">
          Semangat Belajar • Kamu Pasti Bisa • 2026
        </p>
      </footer>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            padding: 0 !important;
          }
          main {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 2cm !important;
          }
          section {
            page-break-inside: avoid;
            margin-bottom: 3rem !important;
          }
          img {
            filter: none !important;
            -webkit-filter: grayscale(0) !important;
          }
        }
      `}</style>
    </main>
  );
}
