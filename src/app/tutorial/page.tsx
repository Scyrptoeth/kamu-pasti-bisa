"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const sections = [
  { id: "navigasi", title: "Navigasi Beranda", step: "01" },
  { id: "flipcard", title: "Kartu Hafalan", step: "02" },
  { id: "simulasi", title: "Simulasi Ujian", step: "03" },
  { id: "mengerjakan", title: "Mengerjakan Soal", step: "04" },
  { id: "evaluasi", title: "Selesai & Evaluasi", step: "05" },
  { id: "feedback", title: "Feedback Anonim", step: "06" },
];

export default function TutorialPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-dvh flex flex-col justify-between bg-white selection:bg-ink selection:text-white">
      {/* Header Navigasi Atas */}
      <nav className="no-print border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[98%] mx-auto px-4 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-6 group">
            <span className="text-2xl group-hover:-translate-x-2 transition-transform duration-300">&larr;</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono leading-none">Kembali</span>
              <span className="text-[12px] font-bold text-muted font-mono leading-none mt-1">Beranda Utama</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] font-mono text-muted">
              <span>Status: Terverifikasi</span>
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <button 
              onClick={() => window.print()}
              className="text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 bg-ink text-white hover:bg-white hover:text-ink border-2 border-ink transition-all rounded-none font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              Unduh Versi PDF
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container Multi-Kolom */}
      <div className="flex-1 max-w-[98%] mx-auto w-full flex gap-16 py-20 px-4 relative">
        
        {/* Samping (Sidebar): Daftar Isi */}
        <aside className="hidden xl:block w-[300px] sticky top-40 self-start h-fit no-print">
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-muted font-mono mb-6 block">Daftar Isi</span>
              <nav className="flex flex-col border-l-2 border-gray-100">
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className={`group flex items-center py-3 pl-6 border-l-2 -ml-[2px] transition-all duration-300 ${
                      activeSection === section.id 
                      ? "border-ink text-ink translate-x-2" 
                      : "border-transparent text-muted hover:border-gray-300 hover:text-ink"
                    }`}
                  >
                    <span className="text-[10px] font-mono mr-4 opacity-50">{section.step}</span>
                    <span className="text-[13px] font-bold uppercase tracking-widest">{section.title}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-100 mt-8">
              <p className="text-[11px] leading-relaxed text-muted font-mono">
                Butuh bantuan lebih lanjut? Tim support kami tersedia 24/7 melalui jalur feedback anonim.
              </p>
            </div>
          </div>
        </aside>

        {/* Utama (Main Content) */}
        <main className="flex-1 max-w-7xl">
          {/* Hero Section */}
          <header className="mb-40">
            <div className="overflow-hidden mb-8">
              <span className="text-[14px] font-black uppercase tracking-[0.6em] text-muted font-mono inline-block animate-slide-up">
                Dokumentasi Pengguna v2.0
              </span>
            </div>
            <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.85] uppercase mb-12">
              Panduan<br />
              <span className="text-muted opacity-20">Lengkap</span><br />
              Platform
            </h1>
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
                Maksimalkan setiap fitur "Kamu Pasti Bisa" untuk mencapai hasil belajar yang optimal secara efisien dan terukur.
              </p>
              <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-widest text-muted md:text-right">
                <span>Terakhir Diperbarui: 2026.05.20</span>
                <span>Klasifikasi: Publik / Edukasi</span>
              </div>
            </div>
          </header>

          {/* Konten Panduan */}
          <div className="space-y-64 pb-40">
            
            {/* Navigasi Beranda */}
            <section id="navigasi" className="scroll-mt-40 group">
              <div className="flex flex-col gap-12">
                <div className="max-w-3xl">
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-muted font-mono mb-6 block group-hover:text-ink transition-colors">Bagian 01</span>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
                    Navigasi<br />Beranda
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
                    <p>Halaman utama adalah pusat kendali belajar Kamu. Di sini, Kamu dapat mengakses dua metode utama: Kartu Hafalan dan Simulasi Ujian.</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Klik logo untuk kembali ke beranda kapan saja.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Gunakan tombol "Tutorial Penggunaan" untuk mengakses panduan ini.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Pilih salah satu metode belajar melalui kartu navigasi besar di tengah layar.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full bg-gray-50 p-4 md:p-12 border border-gray-100 rounded-none overflow-hidden group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-700">
                  <Image 
                    src="/tutorial/06-penambahan-beranda-dan-revisi-tombol.png" 
                    alt="Navigasi Beranda" 
                    width={1600} 
                    height={1000} 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </section>

            {/* Kartu Hafalan */}
            <section id="flipcard" className="scroll-mt-40 group">
              <div className="flex flex-col gap-12">
                <div className="max-w-3xl">
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-muted font-mono mb-6 block group-hover:text-ink transition-colors">Bagian 02</span>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
                    Kartu<br />Hafalan
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
                    <p>Metode ini menggunakan teknik repetisi aktif untuk menguji ingatan Kamu terhadap konsep-konsep inti.</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Klik pada kartu untuk membalikkan posisi dan melihat jawaban/definisi.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Gunakan tombol "Sebelumnya" atau "Selanjutnya" untuk berpindah kartu.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Perhatikan Grid CBT di bagian samping untuk melihat progres kartu yang sudah Kamu pelajari.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full bg-gray-50 p-4 md:p-12 border border-gray-100 rounded-none overflow-hidden group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-700">
                  <Image 
                    src="/tutorial/02-stretch-tampilan.png" 
                    alt="Kartu Hafalan" 
                    width={1600} 
                    height={1000} 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </section>

            {/* Simulasi Ujian */}
            <section id="simulasi" className="scroll-mt-40 group">
              <div className="flex flex-col gap-12">
                <div className="max-w-3xl">
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-muted font-mono mb-6 block group-hover:text-ink transition-colors">Bagian 03</span>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
                    Simulasi<br />Ujian
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
                    <p>Siapkan diri Kamu dengan simulasi yang menyerupai kondisi ujian sesungguhnya.</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Pilih Paket</strong>: Pilih dari daftar paket soal yang tersedia.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Mode Fokus</strong>: Aktifkan mode ini untuk menyembunyikan elemen gangguan di layar.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Atur Durasi</strong>: Sesuaikan batas waktu pengerjaan untuk melatih kecepatan Kamu.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full bg-gray-50 p-4 md:p-12 border border-gray-100 rounded-none overflow-hidden group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-700">
                  <Image 
                    src="/tutorial/12-pilih-paket-ujian.png" 
                    alt="Simulasi Ujian" 
                    width={1600} 
                    height={1000} 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </section>

            {/* Mengerjakan Soal */}
            <section id="mengerjakan" className="scroll-mt-40 group">
              <div className="flex flex-col gap-12">
                <div className="max-w-3xl">
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-muted font-mono mb-6 block group-hover:text-ink transition-colors">Bagian 04</span>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
                    Mengerjakan<br />Soal
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
                    <p>Antarmuka pengerjaan soal dirancang agar Kamu tetap fokus pada konten soal.</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Pilihan Ganda (PG)</strong>: Klik langsung pada opsi jawaban yang menurut Kamu paling benar.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Esai</strong>: Ketikkan jawaban Kamu pada kolom teks yang tersedia untuk soal terbuka.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Navigasi Nomor</strong>: Gunakan panel nomor di samping untuk melompat ke soal tertentu.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full bg-gray-50 p-4 md:p-12 border border-gray-100 rounded-none overflow-hidden group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-700">
                  <Image 
                    src="/tutorial/08-revisi-tombol-selanjutnya.png" 
                    alt="Mengerjakan Soal" 
                    width={1600} 
                    height={1000} 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </section>

            {/* Selesai & Evaluasi */}
            <section id="evaluasi" className="scroll-mt-40 group">
              <div className="flex flex-col gap-12">
                <div className="max-w-3xl">
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-muted font-mono mb-6 block group-hover:text-ink transition-colors">Bagian 05</span>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
                    Evaluasi<br />Akhir
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
                    <p>Langkah akhir untuk mengukur kemampuan Kamu setelah mengerjakan seluruh soal.</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Kumpulkan Jawaban</strong>: Klik tombol "Selesai" dan konfirmasi pada dialog pop-up yang muncul.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Hasil Skor</strong>: Sistem akan menampilkan skor akhir Kamu secara instan.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span><strong>Tinjau Pembahasan</strong>: Pelajari kembali soal-soal yang salah melalui penjelasan yang disediakan.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-4 md:p-8 border border-gray-100 rounded-none overflow-hidden group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-700">
                    <Image 
                      src="/tutorial/09-tombol-selesai.png" 
                      alt="Konfirmasi Selesai" 
                      width={800} 
                      height={400} 
                      className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>
                  <div className="bg-gray-50 p-4 md:p-8 border border-gray-100 rounded-none overflow-hidden group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-700">
                    <Image 
                      src="/tutorial/11-selesai.png" 
                      alt="Hasil Skor" 
                      width={800} 
                      height={400} 
                      className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Feedback Anonim */}
            <section id="feedback" className="scroll-mt-40 group">
              <div className="flex flex-col gap-12">
                <div className="max-w-3xl">
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-muted font-mono mb-6 block group-hover:text-ink transition-colors">Bagian 06</span>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
                    Feedback<br />Anonim
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
                    <p>Kami sangat menghargai masukan Kamu untuk pengembangan platform yang lebih baik.</p>
                    <ul className="space-y-4">
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Kirimkan saran, laporan bug, atau apresiasi melalui formulir di bagian bawah beranda.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Seluruh pesan dikirim secara anonim tanpa merekam identitas Kamu.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="w-6 h-[1px] bg-ink mt-3"></span>
                        <span>Masukan Kamu akan langsung ditinjau oleh tim pengembang secara rutin.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full bg-gray-50 p-4 md:p-12 border border-gray-100 rounded-none overflow-hidden group-hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-700">
                  <Image 
                    src="/tutorial/14-feedback-anonim.png" 
                    alt="Feedback Anonim" 
                    width={1600} 
                    height={1000} 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>

      {/* Footer Bawah Layar */}
      <footer className="border-t border-gray-100 bg-white py-20 no-print">
        <div className="max-w-[98%] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-ink font-mono">Kamu Pasti Bisa</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted font-mono">Platform Belajar Mandiri v2.0</span>
          </div>
          
          <div className="flex gap-12">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono hover:text-ink transition-colors text-muted">Beranda</Link>
            <Link href="/tutorial" className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono text-ink">Dokumentasi</Link>
            <a href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono hover:text-ink transition-colors text-muted">GitHub</a>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted font-mono">
            © 2026 • Made with Precision
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
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
            padding: 1cm !important;
          }
          section {
            page-break-inside: avoid;
            margin-bottom: 5rem !important;
            scroll-margin-top: 0 !important;
          }
          img {
            filter: none !important;
            -webkit-filter: grayscale(0) !important;
          }
        }
      `}</style>
    </div>
  );
}
