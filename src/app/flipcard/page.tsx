"use client";

import { useState, useMemo } from "react";
import Flipcard from "@/components/ui/Flipcard";
import soalData from "@/data/soal-ekonomi.json";
import Link from "next/link";

export default function FlipcardPage() {
  const [selectedPaket, setSelectedPaket] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [openedCards, setOpenedCards] = useState<Set<number>>(new Set());

  const paket = soalData[selectedPaket];

  const allQuestions = useMemo(() => [
    ...paket.soal_pg.map(q => ({ q: q.pertanyaan, a: q.pembahasan || `Kunci: ${q.kunci}` })),
    ...paket.soal_essay.map(q => ({ q: q.pertanyaan, a: q.jawaban_ideal }))
  ], [paket]);

  const handleNext = () => {
    if (currentCardIndex < allQuestions.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleFlip = () => {
    setOpenedCards(prev => {
      const next = new Set(prev);
      next.add(currentCardIndex);
      return next;
    });
  };

  const handleSelectPaket = (idx: number) => {
    setSelectedPaket(idx);
    setCurrentCardIndex(0);
    setOpenedCards(new Set());
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 min-h-dvh flex flex-col">
      {/* Header Minimalis */}
      <header className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111111]">Kartu Hafalan</h1>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-[0.2em]">
            Paket {paket.id} — {paket.kategori}
          </p>
        </div>
        <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#111111] transition-colors border-b border-gray-100 hover:border-[#111111] pb-1">
          &larr; Beranda
        </Link>
      </header>

      {/* Paket Selector Minimalis */}
      <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300 mr-2">Paket:</span>
        {soalData.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handleSelectPaket(idx)}
            className={`px-3 py-1 rounded-sm text-[10px] font-bold transition-all border ${
              selectedPaket === idx 
                ? "bg-[#111111] text-white border-[#111111]" 
                : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
            }`}
          >
            {p.id}
          </button>
        ))}
      </div>

      {/* Single Flipcard View */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        <div className="w-full max-w-lg">
          <Flipcard 
            key={`${selectedPaket}-${currentCardIndex}`}
            question={allQuestions[currentCardIndex].q} 
            answer={allQuestions[currentCardIndex].a} 
            onFlip={handleFlip}
          />
        </div>

        {/* Navigasi Buttons */}
        <div className="flex items-center gap-4 w-full max-w-lg justify-between">
          <button
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
            className="flex-1 px-6 py-3 border border-gray-100 text-[11px] font-bold uppercase tracking-widest text-[#111111] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-sm"
          >
            Sebelumnya
          </button>
          <div className="px-4 text-[11px] font-bold tabular-nums">
            {currentCardIndex + 1} / {allQuestions.length}
          </div>
          <button
            onClick={handleNext}
            disabled={currentCardIndex === allQuestions.length - 1}
            className="flex-1 px-6 py-3 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-sm"
          >
            Berikutnya
          </button>
        </div>

        {/* CBT Navigation Grid */}
        <div className="w-full max-w-lg mt-8">
          <div className="grid grid-cols-7 gap-2">
            {allQuestions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentCardIndex(idx)}
                className={`aspect-square flex items-center justify-center text-[10px] font-bold border transition-all rounded-sm ${
                  currentCardIndex === idx
                    ? "border-[#111111] bg-[#111111] text-white"
                    : openedCards.has(idx)
                    ? "bg-gray-100 text-gray-400 border-gray-100"
                    : "bg-white text-gray-300 border-gray-50 hover:border-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-24 py-8 text-center">
        <p className="text-[9px] uppercase tracking-[0.5em] text-gray-200 font-bold">
          Zen Study Mode
        </p>
      </footer>
    </main>
  );
}
