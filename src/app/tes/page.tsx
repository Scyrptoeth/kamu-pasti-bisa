"use client";

import { useState } from "react";
import soalData from "@/data/soal-ekonomi.json";
import Link from "next/link";

export default function TesPage() {
  const [selectedPaketIdx, setSelectedPaketIdx] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<{ pgScore: number; essayGrades: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const paket = selectedPaketIdx !== null ? soalData[selectedPaketIdx] : null;

  const handleStart = (idx: number) => {
    setSelectedPaketIdx(idx);
    setIsStarted(true);
    setIsFinished(false);
    setCurrentStep(0);
    setUserAnswers({});
    setEssayAnswers({});
  };

  const handleNext = () => {
    if (currentStep < 34) {
      setCurrentStep(currentStep + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = async () => {
    if (!paket) return;
    setIsLoading(true);

    let pgScore = 0;
    paket.soal_pg.forEach((q) => {
      if (userAnswers[q.id] === q.kunci) {
        pgScore += 1;
      }
    });

    // Mock AI grading for now
    const essayGrades = paket.soal_essay.map((q) => ({
      id: q.id,
      question: q.pertanyaan,
      studentAnswer: essayAnswers[q.id] || "",
      score: 10,
      explanation: "Penilaian esai telah selesai dilakukan."
    }));

    setResults({ pgScore, essayGrades });
    setIsLoading(false);
    setIsFinished(true);
  };

  if (!isStarted) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-24">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Simulasi Ujian</h1>
          <p className="text-gray-500">Pilih paket soal untuk memulai evaluasi pemahamanmu.</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {soalData.map((p, idx) => (
            <div key={p.id} className="bg-white p-10 border border-gray-100 rounded-sm shadow-sm flex flex-col justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Modul {p.id}</span>
                <h3 className="text-2xl font-bold mt-2 mb-8">{p.kategori}</h3>
              </div>
              <button 
                onClick={() => handleStart(idx)}
                className="w-full bg-[#111111] text-white py-4 font-bold text-sm rounded-sm hover:opacity-90 transition-opacity"
              >
                Mulai Ujian
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-[#111111] transition-colors">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  if (isFinished && results) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-2xl text-center">
          <h2 className="text-5xl font-bold mb-12 tracking-tight">Hasil Ujian</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 py-12 border-y border-gray-100">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pilihan Ganda</span>
              <p className="text-6xl font-bold mt-4">{results.pgScore}<span className="text-xl font-medium text-gray-300"> / 30</span></p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Penilaian Esai</span>
              <p className="text-2xl font-bold mt-4">Selesai Dinilai</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setIsStarted(false)}
              className="w-full bg-[#111111] text-white py-5 font-bold text-sm rounded-sm hover:opacity-90 transition-opacity"
            >
              Ulangi Simulasi
            </button>
            <Link href="/" className="w-full border border-gray-200 py-5 font-bold text-sm text-center rounded-sm hover:border-gray-400 transition-colors">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isPG = currentStep < 30;
  const currentSoal = isPG ? paket?.soal_pg[currentStep] : paket?.soal_essay[currentStep - 30];

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 md:py-24">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {isPG ? "Bagian I: Pilihan Ganda" : "Bagian II: Esai"} — Soal {currentStep + 1}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {currentStep + 1} / 35
          </span>
        </div>
        <div className="h-1 bg-gray-100 w-full overflow-hidden">
          <div 
            className="h-full bg-[#111111] transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / 35) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Konten Soal */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-12">
          {currentSoal?.pertanyaan}
        </h2>

        {isPG ? (
          <div className="flex flex-col gap-3">
            {Object.entries((currentSoal as any).opsi).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setUserAnswers({ ...userAnswers, [currentSoal!.id]: key })}
                className={`text-left p-6 border transition-all rounded-sm ${
                  userAnswers[currentSoal!.id] === key
                    ? "border-[#111111] bg-[#111111] text-white"
                    : "border-gray-100 hover:border-gray-300 bg-white"
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-widest mr-6 ${userAnswers[currentSoal!.id] === key ? 'text-gray-400' : 'text-gray-300'}`}>{key}</span> 
                <span className="font-medium text-lg">{val as string}</span>
              </button>
            ))}
          </div>
        ) : (
          <textarea
            className="w-full bg-white border border-gray-100 p-8 text-lg leading-relaxed focus:border-gray-300 outline-none transition-all resize-none min-h-[200px] rounded-sm"
            placeholder="Tuliskan jawaban esai Anda di sini..."
            value={essayAnswers[currentSoal!.id] || ""}
            onChange={(e) => setEssayAnswers({ ...essayAnswers, [currentSoal!.id]: e.target.value })}
          ></textarea>
        )}
      </section>

      {/* Navigasi Bawah */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-50">
        <button 
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="text-sm font-bold text-gray-400 hover:text-[#111111] disabled:opacity-0 transition-opacity"
        >
          &larr; Sebelumnya
        </button>
        <button 
          onClick={handleNext}
          className="bg-[#111111] text-white px-12 py-5 font-bold text-sm rounded-sm hover:opacity-90 transition-opacity"
        >
          {currentStep === 34 ? (isLoading ? "Mengirim..." : "Selesai & Kumpulkan") : "Selanjutnya &rarr;"}
        </button>
      </div>
    </main>
  );
}
