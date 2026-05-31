"use client";

import { useState } from "react";
import Flipcard from "@/components/ui/Flipcard";
import soalData from "@/data/soal-ekonomi.json";
import Link from "next/link";

export default function FlipcardPage() {
  const [selectedPaket, setSelectedPaket] = useState(0);
  const paket = soalData[selectedPaket];

  const allQuestions = [
    ...paket.soal_pg.map(q => ({ q: q.pertanyaan, a: q.pembahasan || `Kunci: ${q.kunci}` })),
    ...paket.soal_essay.map(q => ({ q: q.pertanyaan, a: q.jawaban_ideal }))
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Sticky Editorial Header */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6] border-b border-[#1A3626] px-8 py-6 flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div>
          <h1 className="font-serif text-4xl font-black uppercase tracking-tighter text-[#1A3626]">COGNITION.</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A3626]/60 mt-1">
            Fase Pengenalan & Penguatan Memori — Paket {paket.id}
          </p>
        </div>
        <Link href="/" className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#1A3626] pb-1 hover:opacity-50 transition-opacity">
          &larr; Return to Manifest
        </Link>
      </header>

      {/* Package Selector */}
      <div className="px-8 py-12 border-b border-[#1A3626]/10 overflow-x-auto">
        <div className="flex gap-12 items-center">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black shrink-0">Select Edition:</span>
          {soalData.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedPaket(idx)}
              className={`text-xl font-serif italic transition-all whitespace-nowrap ${
                selectedPaket === idx 
                  ? "text-[#1A3626] underline decoration-2 underline-offset-8" 
                  : "text-[#1A3626]/30 hover:text-[#1A3626]"
              }`}
            >
              Vol. 0{p.id}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="p-8 lg:p-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#1A3626]">
          {allQuestions.map((item, index) => (
            <div key={index} className="border-r border-b border-[#1A3626] p-4">
              <Flipcard 
                question={item.q} 
                answer={item.a} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="p-16 text-center border-t border-[#1A3626]">
        <h2 className="font-serif text-[8vw] font-black opacity-5 select-none uppercase tracking-tighter">
          Kamu Pasti Bisa
        </h2>
      </footer>
    </main>
  );
}
