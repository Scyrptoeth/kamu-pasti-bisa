"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 md:py-48">
      <header className="mb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Kamu Pasti Bisa.
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl">
          Platform belajar mandiri untuk penguasaan materi secara mendalam. 
          Gunakan metode kartu hafalan untuk ingatan jangka panjang dan 
          simulasi ujian untuk memvalidasi pemahamanmu.
        </p>
      </header>

      <nav className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link 
          href="/flipcard" 
          className="group p-10 bg-white border border-transparent hover:border-gray-200 transition-all rounded-sm shadow-sm"
        >
          <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-6">Metode 01</span>
          <h2 className="text-3xl font-bold mb-4">Kartu Hafalan</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Perkuat ingatan konsep dasar melalui teknik repetisi aktif dengan kartu bolak-balik.
          </p>
          <span className="text-sm font-bold border-b border-[#111111] pb-1">Buka Kartu &rarr;</span>
        </Link>

        <Link 
          href="/tes" 
          className="group p-10 bg-white border border-transparent hover:border-gray-200 transition-all rounded-sm shadow-sm"
        >
          <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-6">Metode 02</span>
          <h2 className="text-3xl font-bold mb-4">Simulasi Ujian</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Uji kesiapanmu dengan soal pilihan ganda dan esai yang dinilai secara komprehensif.
          </p>
          <span className="text-sm font-bold border-b border-[#111111] pb-1">Mulai Tes &rarr;</span>
        </Link>
      </nav>

      <footer className="mt-32 pt-12 border-t border-gray-100 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
        <p>© 2026 Kamu Pasti Bisa</p>
        <p>Belajar Tanpa Batas</p>
      </footer>
    </main>
  );
}
