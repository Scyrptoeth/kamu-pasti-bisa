"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-[90%] mx-auto px-6 min-h-dvh flex flex-col justify-between py-12 md:py-24">
      <div className="mb-12">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo Kamu Pasti Bisa" 
            width={320} 
            height={80} 
            className="h-16 md:h-20 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      <header className="mb-12">
        <h1 className="text-6xl md:text-[10rem] font-bold tracking-tighter leading-none text-ink uppercase">
          Kamu Pasti Bisa.
        </h1>
      </header>

      <nav className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 flex items-center">
        <Link 
          href="/flipcard" 
          className="group p-10 bg-white border border-transparent hover:border-gray-200 transition-all rounded-sm shadow-sm flex flex-col justify-between min-h-[400px]"
        >
          <div>
            <span className="block text-[12px] uppercase tracking-[0.3em] text-muted font-mono mb-6">Metode 01</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-ink leading-tight">Kartu Hafalan</h2>
            <p className="text-muted text-lg leading-relaxed mb-8 max-w-md">
              Perkuat ingatan konsep dasar melalui teknik repetisi aktif dengan kartu bolak-balik.
            </p>
          </div>
          <span className="text-lg font-bold border-b-2 border-ink pb-1 w-fit group-hover:pr-4 transition-all uppercase tracking-widest">Buka Kartu &rarr;</span>
        </Link>

        <Link 
          href="/tes" 
          className="group p-10 bg-white border border-transparent hover:border-gray-200 transition-all rounded-sm shadow-sm flex flex-col justify-between min-h-[400px]"
        >
          <div>
            <span className="block text-[12px] uppercase tracking-[0.3em] text-muted font-mono mb-6">Metode 02</span>
            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-ink leading-tight">Simulasi Ujian</h2>
            <p className="text-muted text-lg leading-relaxed mb-8 max-w-md">
              Uji kesiapanmu dengan soal pilihan ganda dan esai yang dinilai secara komprehensif.
            </p>
          </div>
          <span className="text-lg font-bold border-b-2 border-ink pb-1 w-fit group-hover:pr-4 transition-all uppercase tracking-widest">Mulai Tes &rarr;</span>
        </Link>
      </nav>

      <footer className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center text-[12px] uppercase tracking-[0.3em] text-muted font-mono font-medium">
        <p>© 2026 Kamu Pasti Bisa</p>
        <p>Belajar Tanpa Batas</p>
      </footer>
    </main>
  );
}
