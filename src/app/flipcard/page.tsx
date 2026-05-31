"use client";

import { useState } from "react";
import Flipcard from "@/components/ui/Flipcard";
import soalData from "@/data/soal-ekonomi.json";
import Link from "next/link";

export default function FlipcardPage() {
  const [selectedPaket, setSelectedPaket] = useState(0);
  const paket = soalData[selectedPaket];

  // Gabungkan PG (tanpa opsi) dan Essay untuk Flipcard
  const allQuestions = [
    ...paket.soal_pg.map(q => ({ q: q.pertanyaan, a: q.pembahasan || `Kunci: ${q.kunci}` })),
    ...paket.soal_essay.map(q => ({ q: q.pertanyaan, a: q.jawaban_ideal }))
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Fase Pengenalan: Flipcard</h1>
            <p className="text-slate-600">Pelajari soal dan jawaban sebelum memulai tes simulasi.</p>
          </div>
          <Link href="/" className="text-blue-600 font-medium hover:underline">
            &larr; Kembali ke Beranda
          </Link>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {soalData.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedPaket(idx)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                selectedPaket === idx 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Paket {p.id}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allQuestions.map((item, index) => (
            <Flipcard 
              key={index} 
              question={`${index + 1}. ${item.q}`} 
              answer={item.a} 
            />
          ))}
        </div>
      </div>
    </main>
  );
}
