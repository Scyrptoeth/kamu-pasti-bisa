"use client";

import { useState, useEffect } from "react";
import soalData from "@/data/soal-ekonomi.json";
import Link from "next/link";

export default function TesPage() {
  const [selectedPaketIdx, setSelectedPaketIdx] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0-29: PG, 30-34: Essay
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

    // Hitung skor PG
    let pgScore = 0;
    paket.soal_pg.forEach((q) => {
      if (userAnswers[q.id] === q.kunci) {
        pgScore += 1;
      }
    });

    // Simulasi penilaian Essay (Dalam produksi ini memanggil API Deepseek)
    // Untuk demo/MVP awal, kita tampilkan placeholder atau panggil API jika key ada
    const essayGrades = paket.soal_essay.map((q) => ({
      id: q.id,
      question: q.pertanyaan,
      studentAnswer: essayAnswers[q.id] || "",
      score: 10, // Placeholder
      explanation: "Penilaian AI sedang disiapkan."
    }));

    const finalResults = { pgScore, essayGrades };
    setResults(finalResults);
    
    // Simpan ke Local Storage
    const history = JSON.parse(localStorage.getItem("kpb_history") || "[]");
    history.push({
      paketId: paket.id,
      date: new Date().toISOString(),
      pgScore,
      essayTotal: essayGrades.reduce((a, b) => a + b.score, 0)
    });
    localStorage.setItem("kpb_history", JSON.stringify(history));

    setIsLoading(false);
    setIsFinished(true);
  };

  if (!isStarted) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Pilih Paket Ujian</h1>
          <div className="grid gap-4">
            {soalData.map((p, idx) => (
              <div key={p.id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Paket {p.id}: {p.kategori}</h3>
                  <p className="text-slate-500 text-sm">30 Pilihan Ganda + 5 Essay</p>
                </div>
                <button 
                  onClick={() => handleStart(idx)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Mulai Tes
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isFinished && results) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold text-center mb-8">Hasil Ujian</h1>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <span className="block text-slate-500 text-sm uppercase">Skor PG</span>
              <span className="text-4xl font-black text-blue-600">{results.pgScore} / 30</span>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <span className="block text-slate-500 text-sm uppercase">Evaluasi AI</span>
              <span className="text-4xl font-black text-green-600">Selesai</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setIsStarted(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
            >
              Kembali ke Daftar Paket
            </button>
            <Link href="/" className="text-center text-slate-500 hover:underline">Ke Beranda</Link>
          </div>
        </div>
      </main>
    );
  }

  const isPG = currentStep < 30;
  const currentSoal = isPG ? paket?.soal_pg[currentStep] : paket?.soal_essay[currentStep - 30];

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {isPG ? "Pilihan Ganda" : "Essay"} — Soal {currentStep + 1} / 35
          </span>
          <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all" 
              style={{ width: `${((currentStep + 1) / 35) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <p className="text-xl font-medium text-slate-800 mb-8 leading-relaxed">
            {currentSoal?.pertanyaan}
          </p>

          {isPG ? (
            <div className="grid gap-3">
              {Object.entries((currentSoal as any).opsi).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setUserAnswers({ ...userAnswers, [currentSoal!.id]: key })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    userAnswers[currentSoal!.id] === key
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-bold"
                      : "border-slate-100 hover:border-slate-200 text-slate-600"
                  }`}
                >
                  <span className="mr-4 opacity-50">{key}.</span> {val as string}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              className="w-full h-48 p-4 border-2 border-slate-100 rounded-xl focus:border-blue-500 outline-none transition-all"
              placeholder="Tuliskan jawaban lengkap Anda di sini..."
              value={essayAnswers[currentSoal!.id] || ""}
              onChange={(e) => setEssayAnswers({ ...essayAnswers, [currentSoal!.id]: e.target.value })}
            ></textarea>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-slate-400 font-bold disabled:opacity-0"
          >
            &larr; Sebelumnya
          </button>
          <button 
            onClick={handleNext}
            className="bg-slate-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-black transition-all"
          >
            {currentStep === 34 ? (isLoading ? "Menilai..." : "Selesai & Lihat Hasil") : "Selanjutnya &rarr;"}
          </button>
        </div>
      </div>
    </main>
  );
}
