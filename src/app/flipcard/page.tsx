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
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Minimalis */}
      <header className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Kartu Hafalan</h1>
          <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest">
            Paket {paket.id} — {paket.kategori}
          </p>
        </div>
        <Link href="/" className="text-sm font-medium text-gray-400 hover:text-[#111111] transition-colors">
          &larr; Kembali ke Beranda
        </Link>
      </header>

      {/* Paket Selector Bulat */}
      <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-4">Pilih Paket:</span>
        {soalData.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setSelectedPaket(idx)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border ${
              selectedPaket === idx 
                ? "bg-[#111111] text-white border-[#111111]" 
                : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
            }`}
          >
            {p.id}
          </button>
        ))}
      </div>

      {/* Grid Kartu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allQuestions.map((item, index) => (
          <Flipcard 
            key={index}
            question={item.q} 
            answer={item.a} 
          />
        ))}
      </div>

      <footer className="mt-24 py-12 border-t border-gray-100 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-300 font-bold">
          Kamu Pasti Bisa
        </p>
      </footer>
    </main>
  );
}
