"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Editorial Navigation */}
      <nav className="border-b border-[#1A3626] py-6 px-8 flex justify-between items-end">
        <span className="font-serif text-2xl font-black uppercase tracking-tighter">KPB.</span>
        <div className="flex gap-8 text-sm uppercase tracking-widest font-medium">
          <Link href="/flipcard" className="hover:opacity-60 transition-opacity">Flipcard</Link>
          <Link href="/tes" className="hover:opacity-60 transition-opacity">Simulation</Link>
        </div>
      </nav>

      {/* Asymmetric Hero Section */}
      <section className="px-8 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8">
          <h1 className="text-[12vw] lg:text-[10vw] font-serif font-black leading-[0.85] tracking-tighter text-[#1A3626] mb-12">
            KAMU<br />PASTI<br /><span className="italic pl-[5vw]">BISA.</span>
          </h1>
          <div className="max-w-xl border-l-4 border-[#1A3626] pl-8">
            <p className="text-xl lg:text-2xl leading-relaxed text-[#1A3626]/80 font-medium">
              Sebuah manifestasi digital untuk penguasaan materi Ekonomi. 
              Melampaui batas belajar konvensional dengan metodologi flipcard 
              dan evaluasi presisi berbasis kecerdasan buatan.
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-4 lg:pt-24 flex flex-col gap-6">
          <Link 
            href="/flipcard" 
            className="group relative border border-[#1A3626] p-8 hover:bg-[#1A3626] hover:text-[#FAF9F6] transition-all duration-500"
          >
            <span className="block text-xs uppercase tracking-[0.3em] mb-4">Phase 01</span>
            <span className="block text-3xl font-serif italic mb-2">Cognition</span>
            <p className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">Metode flipcard untuk penguatan memori jangka panjang.</p>
            <span className="absolute bottom-8 right-8 text-2xl">→</span>
          </Link>

          <Link 
            href="/tes" 
            className="group relative border border-[#1A3626] p-8 hover:bg-[#1A3626] hover:text-[#FAF9F6] transition-all duration-500"
          >
            <span className="block text-xs uppercase tracking-[0.3em] mb-4">Phase 02</span>
            <span className="block text-3xl font-serif italic mb-2">Validation</span>
            <p className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">Simulasi tes dengan penilaian essay otomatis oleh AI.</p>
            <span className="absolute bottom-8 right-8 text-2xl">→</span>
          </Link>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[#1A3626] p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
        <p>© 2026 KAMU PASTI BISA — THE EDITORIAL EDITION</p>
        <p>PROJECT PERSIA PANTUBEL</p>
      </footer>
    </main>
  );
}
