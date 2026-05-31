"use client";

import { useState, useMemo } from "react";
import Flipcard from "@/components/ui/Flipcard";
import soalData from "@/data/soal-ekonomi.json";
import Link from "next/link";
import Image from "next/image";

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
    <main className="max-w-[95%] mx-auto px-6 py-12 min-h-dvh flex flex-col justify-between">
      {/* Brand Identity */}
      <div className="mb-12">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo Kamu Pasti Bisa" 
            width={280} 
            height={64} 
            className="h-16 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Header Minimalis */}
      <header className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-4 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-ink uppercase">Kartu Hafalan</h1>
          <p className="text-[12px] text-muted font-mono mt-2 uppercase tracking-[0.4em]">
            Paket {paket.id} — {paket.kategori}
          </p>
        </div>
        <Link href="/" className="text-sm font-bold uppercase tracking-widest text-muted font-mono hover:text-ink transition-colors border-b-2 border-gray-100 hover:border-ink pb-1">
          &larr; Beranda
        </Link>
      </header>

      {/* Paket Selector Minimalis */}
      <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono mr-4">Pilih Paket:</span>
        {soalData.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handleSelectPaket(idx)}
            className={`px-6 py-2 rounded-sm text-xs font-bold font-mono transition-all border-2 ${
              selectedPaket === idx 
                ? "bg-ink text-white border-ink shadow-lg scale-105" 
                : "bg-white text-muted border-gray-100 hover:border-ink"
            }`}
          >
            {p.id}
          </button>
        ))}
      </div>

      {/* Large Flipcard View */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-12">
        <div className="w-full lg:w-2/3 max-w-6xl">
          <Flipcard 
            key={`${selectedPaket}-${currentCardIndex}`}
            question={allQuestions[currentCardIndex].q} 
            answer={allQuestions[currentCardIndex].a} 
            onFlip={handleFlip}
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-12">
          {/* Navigasi Buttons Scaled */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentCardIndex === 0}
                className="flex-1 px-8 py-5 border-2 border-gray-100 text-xs font-bold font-mono uppercase tracking-[0.2em] text-ink hover:border-ink disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-sm bg-white"
              >
                Sebelumnya
              </button>
              <button
                onClick={handleNext}
                disabled={currentCardIndex === allQuestions.length - 1}
                className="flex-1 px-8 py-5 bg-ink text-white text-xs font-bold font-mono uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-sm shadow-xl"
              >
                Berikutnya
              </button>
            </div>
            <div className="text-center py-4 bg-gray-50 rounded-sm border border-gray-100">
              <span className="text-2xl font-black font-mono tabular-nums text-ink">
                {currentCardIndex + 1}
              </span>
              <span className="text-sm font-bold font-mono text-muted mx-2">/</span>
              <span className="text-sm font-bold font-mono text-muted">
                {allQuestions.length}
              </span>
            </div>
          </div>

          {/* CBT Navigation Grid Scaled */}
          <div className="w-full">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono mb-4 text-center">Navigasi Cepat</p>
            <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-5 gap-3">
              {allQuestions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCardIndex(idx)}
                  className={`aspect-square flex items-center justify-center text-xs font-bold font-mono border-2 transition-all rounded-sm ${
                    currentCardIndex === idx
                      ? "border-ink bg-ink text-white shadow-md scale-110 z-10"
                      : openedCards.has(idx)
                      ? "bg-gray-100 text-muted border-gray-100"
                      : "bg-white text-muted border-gray-100 hover:border-ink"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 py-12 border-t border-gray-100 text-center">
        <p className="text-[12px] uppercase tracking-[0.5em] text-muted font-bold font-mono opacity-50">
          © 2026 Kamu Pasti Bisa
        </p>
      </footer>
    </main>
  );
}
