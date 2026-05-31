"use client";

import Link from "next/link";
import Image from "next/image";
import FeedbackForm from "@/components/layout/FeedbackForm";

export default function Home() {
  return (
    <main className="max-w-[90%] mx-auto px-6 min-h-dvh flex flex-col justify-between py-12 md:py-24">
      <div className="flex justify-between items-start">
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
        <div className="text-right hidden md:block">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted font-mono">Volume 1.0</span>
          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1">Platform Belajar Mandiri</p>
        </div>
      </div>

      <header className="mb-24 mt-12 text-center md:text-left">
        <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] text-ink uppercase">
          Kamu<br />Pasti Bisa.
        </h1>
      </header>

      <div className="flex-1 flex flex-col gap-16 lg:gap-24">
        <nav className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <Link 
            href="/flipcard" 
            className="group p-10 bg-white border border-transparent hover:border-ink transition-all rounded-sm shadow-sm flex flex-col justify-between min-h-[420px]"
          >
            <div>
              <span className="block text-[12px] uppercase tracking-[0.3em] text-muted font-mono mb-8 opacity-50">Metode 01</span>
              <h2 className="text-6xl md:text-8xl font-black mb-6 text-ink leading-[0.9]">Kartu Hafalan</h2>
              <p className="text-muted text-lg leading-relaxed max-w-sm">
                Teknik repetisi aktif untuk menguasai konsep inti dengan cepat dan efisien.
              </p>
            </div>
            <span className="text-sm font-bold border-b-2 border-ink pb-1 w-fit group-hover:pr-4 transition-all uppercase tracking-[0.2em]">Buka Arsip &rarr;</span>
          </Link>

          <Link 
            href="/tes" 
            className="group p-10 bg-ink border border-ink hover:bg-white hover:text-ink transition-all rounded-sm shadow-2xl flex flex-col justify-between min-h-[420px] text-white"
          >
            <div>
              <span className="block text-[12px] uppercase tracking-[0.3em] text-gray-400 font-mono mb-8 opacity-50">Metode 02</span>
              <h2 className="text-6xl md:text-8xl font-black mb-6 group-hover:text-ink transition-colors leading-[0.9]">Simulasi Ujian</h2>
              <p className="text-gray-400 group-hover:text-muted text-lg leading-relaxed max-w-sm">
                Uji pemahaman Anda melalui 35 instrumen soal dengan evaluasi sistem otomatis.
              </p>
            </div>
            <span className="text-sm font-bold border-b-2 border-white group-hover:border-ink pb-1 w-fit group-hover:pr-4 transition-all uppercase tracking-[0.2em]">Mulai Simulasi &rarr;</span>
          </Link>
        </nav>

        <div className="w-full mt-24">
          <FeedbackForm />
        </div>
      </div>

      <footer className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-6 text-[10px] uppercase tracking-[0.3em] text-muted font-mono font-medium">
        <div className="flex gap-8">
          <p>© 2026 Kamu Pasti Bisa</p>
        </div>
        <div className="flex gap-8">
          <p>Sistem Pintar v1.2</p>
          <p>Integritas • Otoritas • Fokus</p>
        </div>
      </footer>
    </main>
  );
}
