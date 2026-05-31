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
    if (currentStep < 34) setCurrentStep(currentStep + 1);
    else finishTest();
  };

  const finishTest = async () => {
    if (!paket) return;
    setIsLoading(true);

    // Hitung skor PG
    let pgScore = 0;
    paket.soal_pg.forEach((q) => {
      if (userAnswers[q.id] === q.kunci) pgScore += 1;
    });

    // Panggil Penilaian Sistem untuk Esai
    try {
      const essaysToGrade = paket.soal_essay.map((q) => ({
        id: q.id,
        question: q.pertanyaan,
        idealAnswer: q.jawaban_ideal,
        studentAnswer: essayAnswers[q.id] || "(Siswa tidak memberikan jawaban)"
      }));

      const response = await fetch("/api/grade-essays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essays: essaysToGrade })
      });

      const data = await response.json();
      const essayGrades = data.results;

      const finalResults = { pgScore, essayGrades };
      setResults(finalResults);
      
      // Simpan ke Local Storage
      const history = JSON.parse(localStorage.getItem("kpb_history") || "[]");
      history.push({
        paketId: paket.id,
        date: new Date().toISOString(),
        pgScore,
        essayTotal: essayGrades.reduce((a: number, b: any) => a + b.score, 0)
      });
      localStorage.setItem("kpb_history", JSON.stringify(history));

    } catch (error) {
      console.error("Gagal melakukan penilaian sistem:", error);
      alert("Terjadi kendala pada sistem penilaian. Silakan coba kumpulkan kembali.");
    } finally {
      setIsLoading(false);
      setIsFinished(true);
    }
  };

  if (!isStarted) {
    return (
      <main className="min-h-dvh bg-[#F9F9F9] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl text-center space-y-8">
          <Link href="/" className="text-sm font-medium text-[#888888] hover:text-[#111111] transition-colors">
            &larr; Kembali
          </Link>
          <h1 className="text-4xl font-extrabold text-[#111111] tracking-tight text-center w-full">Pilih Paket Ujian</h1>
          <p className="text-[#555555]">Setiap paket terdiri dari 30 Soal Pilihan Ganda dan 5 Soal Esai.</p>
          
          <div className="grid gap-4 w-full text-left">
            {soalData.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleStart(idx)}
                className="w-full bg-white border border-[#E5E5E5] p-6 rounded-sm hover:border-[#111111] transition-all flex justify-between items-center group shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#111111]">Paket {p.id}</h3>
                  <p className="text-sm text-[#888888]">{p.kategori}</p>
                </div>
                <span className="text-[#111111] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Mulai Tes &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isFinished && results) {
    return (
      <main className="min-h-dvh bg-[#F9F9F9] py-20 px-6">
        <div className="w-full max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold text-[#111111] tracking-tight">Hasil Evaluasi Sistem</h1>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Dokumen Penilaian Resmi</p>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-sm p-12 space-y-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pb-0 md:pr-12">
                <p className="text-[10px] font-bold text-[#888888] uppercase tracking-widest mb-4">Skor Pilihan Ganda</p>
                <p className="text-7xl font-black text-[#111111] tabular-nums">{results.pgScore}<span className="text-2xl text-[#888888] font-medium">/30</span></p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] font-bold text-[#888888] uppercase tracking-widest mb-4">Total Nilai Esai</p>
                <p className="text-7xl font-black text-[#111111] tabular-nums">
                  {results.essayGrades.reduce((a, b) => a + b.score, 0)}<span className="text-2xl text-[#888888] font-medium">/50</span>
                </p>
              </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#111111]">Detail Evaluasi Esai</h3>
              <div className="space-y-6">
                {results.essayGrades.map((grade, idx) => (
                  <div key={grade.id} className="p-6 bg-[#F9F9F9] rounded-sm border border-gray-200/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Soal {idx + 31}</span>
                      <span className="px-3 py-1 bg-[#111111] text-white text-[10px] font-bold rounded-full">Skor: {grade.score}/10</span>
                    </div>
                    <p className="text-sm text-[#111111] font-medium leading-relaxed italic border-l-2 border-gray-300 pl-4">
                      "{essayAnswers[grade.id] || "Kosong"}"
                    </p>
                    <p className="text-[11px] text-[#555555] leading-relaxed">
                      <span className="font-bold text-[#111111]">Catatan Sistem:</span> {grade.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsStarted(false)}
              className="px-10 py-4 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md"
            >
              Ujian Baru
            </button>
            <Link 
              href="/" 
              className="px-10 py-4 bg-white border border-gray-200 text-[#111111] text-xs font-bold uppercase tracking-widest hover:border-[#111111] transition-all text-center"
            >
              Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isPG = currentStep < 30;
  const currentSoal = isPG ? paket?.soal_pg[currentStep] : paket?.soal_essay[currentStep - 30];
  const progressPercent = ((currentStep + 1) / 35) * 100;

  return (
    <main className="min-h-dvh bg-[#F9F9F9] flex flex-col p-6">
      
      <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col">
        
        <header className="flex justify-between items-end mb-12 border-b border-gray-100 pb-8">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{isPG ? "Bagian I: Pilihan Ganda" : "Bagian II: Esai"}</span>
            <h2 className="text-xs font-bold text-[#111111] font-mono">SOAL {currentStep + 1} / 35</h2>
          </div>
          <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden mb-1">
            <div className="h-full bg-[#111111] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </header>

        <div className="flex-1 space-y-12">
          
          <h2 className="text-2xl md:text-3xl font-medium text-[#111111] leading-relaxed text-center w-full px-4">
            {currentSoal?.pertanyaan}
          </h2>

          <div className="w-full max-w-2xl mx-auto">
            {isPG ? (
              <div className="grid gap-3 w-full">
                {Object.entries((currentSoal as any).opsi).map(([key, val]) => {
                  const isSelected = userAnswers[currentSoal!.id] === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setUserAnswers({ ...userAnswers, [currentSoal!.id]: key })}
                      className={`w-full text-left p-6 border transition-all flex gap-6 rounded-sm ${
                        isSelected
                          ? "border-[#111111] bg-white text-[#111111] ring-1 ring-[#111111] shadow-sm"
                          : "border-gray-100 bg-white text-[#555555] hover:border-gray-300"
                      }`}
                    >
                      <span className={`font-mono text-sm font-bold ${isSelected ? 'text-[#111111]' : 'text-gray-300'}`}>
                        {key}
                      </span> 
                      <span className="text-base leading-relaxed">{val as string}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <textarea
                className="w-full h-64 p-8 border border-gray-100 rounded-sm bg-white text-[#111111] text-lg focus:outline-none focus:border-[#111111] resize-none transition-all shadow-sm placeholder:text-gray-200"
                placeholder="Ketik argumentasi teknis Anda di sini..."
                value={essayAnswers[currentSoal!.id] || ""}
                onChange={(e) => setEssayAnswers({ ...essayAnswers, [currentSoal!.id]: e.target.value })}
              ></textarea>
            )}
          </div>
        </div>

        <footer className="mt-20 flex justify-between items-center border-t border-gray-100 pt-8 pb-4">
          <button 
            disabled={currentStep === 0 || isLoading}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#111111] disabled:opacity-0 transition-colors py-4 px-2"
          >
            &larr; Sebelumnya
          </button>
          <button 
            disabled={isLoading}
            onClick={handleNext}
            className="bg-[#111111] text-white px-12 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md disabled:bg-gray-400"
          >
            {currentStep === 34 ? (isLoading ? "Sedang Mengevaluasi..." : "Selesai & Kumpulkan") : "Selanjutnya &rarr;"}
          </button>
        </footer>

      </div>
    </main>
  );
}
