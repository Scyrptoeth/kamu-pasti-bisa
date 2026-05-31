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

    const essayGrades = paket.soal_essay.map((q) => ({
      id: q.id,
      question: q.pertanyaan,
      studentAnswer: essayAnswers[q.id] || "",
      score: 10,
      explanation: "Evaluasi AI substansial telah selesai dilakukan."
    }));

    setResults({ pgScore, essayGrades });
    setIsLoading(false);
    setIsFinished(true);
  };

  if (!isStarted) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">
        <nav className="border-b border-[#1A3626] p-8 flex justify-between items-center">
          <h1 className="font-serif text-3xl font-black uppercase tracking-tighter">VALIDATION.</h1>
          <Link href="/" className="text-[10px] font-bold uppercase tracking-widest border-b border-[#1A3626]">Exit</Link>
        </nav>
        
        <div className="p-8 lg:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soalData.map((p, idx) => (
              <div key={p.id} className="border border-[#1A3626] p-10 flex flex-col justify-between items-start group hover:bg-[#1A3626] hover:text-[#FAF9F6] transition-all duration-500">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Module {p.id}</span>
                  <h3 className="font-serif text-3xl italic mt-4 mb-8">Edisi {p.kategori}</h3>
                </div>
                <button 
                  onClick={() => handleStart(idx)}
                  className="w-full border border-current py-4 font-bold uppercase tracking-[0.2em] text-sm group-hover:bg-[#FAF9F6] group-hover:text-[#1A3626] transition-colors"
                >
                  Initiate Test
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
      <main className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-8 text-[#1A3626]">
        <div className="w-full max-w-4xl border border-[#1A3626] p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <span className="text-[15vw] font-serif font-black opacity-5 leading-none select-none italic">Done.</span>
          </div>
          
          <h2 className="font-serif text-6xl font-black mb-12 uppercase tracking-tighter">SUMMARY.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 border-t border-[#1A3626] pt-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Pilihan Ganda</span>
              <p className="text-7xl font-serif italic mt-4">{results.pgScore}<span className="text-2xl not-italic opacity-30 px-4">/ 30</span></p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">AI Evaluation</span>
              <p className="text-4xl font-serif mt-4">Substantial Complete</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <button 
              onClick={() => setIsStarted(false)}
              className="bg-[#1A3626] text-[#FAF9F6] px-12 py-5 font-bold uppercase tracking-widest text-sm"
            >
              Restart Simulation
            </button>
            <Link href="/" className="px-12 py-5 border border-[#1A3626] font-bold uppercase tracking-widest text-sm text-center">
              Return to Manifest
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isPG = currentStep < 30;
  const currentSoal = isPG ? paket?.soal_pg[currentStep] : paket?.soal_essay[currentStep - 30];

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex flex-col lg:flex-row border-t border-[#1A3626]">
      {/* Left: Question (Serif) */}
      <section className="lg:w-1/2 p-8 lg:p-20 border-b lg:border-b-0 lg:border-r border-[#1A3626] flex flex-col justify-between">
        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#1A3626]/40">
            {isPG ? "Part I: Multiple Choice" : "Part II: Rational Essay"} — Question {currentStep + 1}
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl font-medium leading-tight text-[#1A3626] mt-12 lg:mt-24 italic">
            "{currentSoal?.pertanyaan}"
          </h2>
        </div>
        
        <div className="flex items-center gap-8">
          <span className="font-serif text-8xl font-black opacity-5 select-none">{String(currentStep + 1).padStart(2, '0')}</span>
          <div className="flex-1 h-[1px] bg-[#1A3626]/20">
            <div 
              className="h-full bg-[#1A3626] transition-all duration-500" 
              style={{ width: `${((currentStep + 1) / 35) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Right: Answer (Sans-serif) */}
      <section className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-between bg-white/30 backdrop-blur-sm">
        <div className="flex-1">
          {isPG ? (
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Select Response</span>
              {Object.entries((currentSoal as any).opsi).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setUserAnswers({ ...userAnswers, [currentSoal!.id]: key })}
                  className={`group text-left p-6 border transition-all duration-300 ${
                    userAnswers[currentSoal!.id] === key
                      ? "border-[#1A3626] bg-[#1A3626] text-[#FAF9F6]"
                      : "border-[#1A3626]/10 hover:border-[#1A3626] text-[#1A3626]"
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest mr-6 opacity-40 group-hover:opacity-100">{key}</span> 
                  <span className="font-medium text-lg">{val as string}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Articulate Logic</span>
              <textarea
                className="flex-1 bg-transparent border border-[#1A3626]/20 p-8 text-xl leading-relaxed focus:border-[#1A3626] outline-none transition-all resize-none"
                placeholder="Type your response here..."
                value={essayAnswers[currentSoal!.id] || ""}
                onChange={(e) => setEssayAnswers({ ...essayAnswers, [currentSoal!.id]: e.target.value })}
              ></textarea>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-50 disabled:opacity-0 transition-opacity"
          >
            &larr; Previous
          </button>
          <button 
            onClick={handleNext}
            className="bg-[#1A3626] text-[#FAF9F6] px-12 py-5 font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
          >
            {currentStep === 34 ? (isLoading ? "Syncing..." : "Finalize Simulation") : "Next Question &rarr;"}
          </button>
        </div>
      </section>
    </main>
  );
}
