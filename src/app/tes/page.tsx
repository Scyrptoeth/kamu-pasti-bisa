"use client";

import { useState, useEffect } from "react";
import soalData from "@/data/soal-ekonomi.json";
import Link from "next/link";
import Image from "next/image";
import ScoreChart from "@/components/analytics/ScoreChart";
import Timer from "@/components/layout/Timer";
import { motion, AnimatePresence } from "framer-motion";

type TestMode = "normal" | "focus";

export default function TesPage() {
  const [selectedPaketIdx, setSelectedPaketIdx] = useState<number | null>(null);
  const [isModeSelection, setIsModeSelection] = useState(false);
  const [testMode, setTestMode] = useState<TestMode>("normal");
  const [focusDuration, setFocusDuration] = useState(25); // Default 25 menit
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<{ pgScore: number; essayGrades: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const paket = selectedPaketIdx !== null ? soalData[selectedPaketIdx] : null;

  const handleStartSelection = (idx: number) => {
    setSelectedPaketIdx(idx);
    setIsModeSelection(true);
  };

  const startTest = (mode: TestMode) => {
    setTestMode(mode);
    setIsModeSelection(false);
    setIsStarted(true);
    setIsFinished(false);
    setCurrentStep(0);
    setUserAnswers({});
    setEssayAnswers({});
  };

  const handleNext = () => {
    if (currentStep < 34) {
      setCurrentStep(currentStep + 1);
    }
  };

  const finishTest = async () => {
    if (!paket || isFinished) return;
    setIsLoading(true);

    let pgScore = 0;
    paket.soal_pg.forEach((q) => {
      if (userAnswers[q.id] === q.kunci) pgScore += 1;
    });

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
      
      const history = JSON.parse(localStorage.getItem("kpb_history") || "[]");
      history.push({
        paketId: paket.id,
        date: new Date().toISOString(),
        pgScore,
        essayTotal: essayGrades.reduce((a: number, b: any) => a + (b.score || 0), 0),
        mode: testMode
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

  // State: Pemilihan Paket
  if (!isStarted && !isModeSelection) {
    return (
      <main className="min-h-dvh bg-white flex flex-col justify-between p-6 md:p-12">
        <div className="mb-12">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={320} height={80} className="h-20 w-auto object-contain" />
          </Link>
        </div>

        <header className="flex justify-between items-baseline border-b-2 border-ink pb-8">
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter text-ink uppercase leading-none">Simulasi.</h1>
          <Link href="/" className="text-sm font-bold uppercase tracking-widest text-muted hover:text-ink transition-colors border-b-2 border-gray-100 hover:border-ink pb-1 font-mono">
            &larr; Beranda
          </Link>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-bold text-ink mb-4 text-center lg:text-left">Pilih Paket Ujian</h2>
            <p className="text-muted text-lg max-w-sm text-center lg:text-left mx-auto lg:mx-0">Setiap paket terdiri dari 30 Soal Pilihan Ganda dan 5 Soal Esai dengan evaluasi oleh Sistem Pintar.</p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            {soalData.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleStartSelection(idx)}
                className="w-full bg-white border-2 border-gray-100 p-10 rounded-sm hover:border-ink transition-all flex justify-between items-center group shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <h3 className="text-3xl font-bold text-ink">Paket {p.id}</h3>
                  <p className="text-sm font-bold text-muted uppercase tracking-widest mt-2">{p.kategori}</p>
                </div>
                <span className="text-ink font-bold text-sm uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  Lanjut &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>

        <footer className="pt-8 border-t border-gray-100 flex justify-between text-[12px] uppercase tracking-[0.3em] text-muted font-mono font-medium text-center md:text-left">
          <p>© 2026 Kamu Pasti Bisa</p>
        </footer>
      </main>
    );
  }

  // State: Pemilihan Mode (Interstisial)
  if (isModeSelection) {
    return (
      <main className="min-h-dvh bg-white flex flex-col md:flex-row">
        <motion.div 
          initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="flex-1 p-12 md:p-24 flex flex-col justify-center gap-8 border-r border-gray-100"
        >
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted font-mono">Pilihan 01</span>
            <h2 className="text-5xl md:text-7xl font-black text-ink tracking-tighter uppercase">Mode Normal</h2>
            <p className="text-xl text-muted leading-relaxed max-w-md">Belajar dengan tenang tanpa batasan waktu. Cocok untuk kamu yang sedang membangun pemahaman konsep.</p>
          </div>
          <button 
            onClick={() => startTest("normal")}
            className="w-fit px-12 py-5 border-2 border-ink text-ink font-bold uppercase tracking-widest hover:bg-ink hover:text-white transition-all rounded-sm shadow-lg"
          >
            Mulai Belajar &rarr;
          </button>
        </motion.div>

        <motion.div 
          initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="flex-1 p-12 md:p-24 flex flex-col justify-center gap-8 bg-ink text-white"
        >
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 font-mono">Pilihan 02</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Mode Fokus</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-md">Tantang diri kamu dengan batasan waktu {focusDuration} menit. Sistem akan menutup otomatis saat waktu habis.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 font-mono">Pilih Durasi Waktu</p>
              <div className="flex flex-wrap items-center gap-2">
                {[15, 30, 45].map((time) => (
                  <button
                    key={time}
                    onClick={() => setFocusDuration(time)}
                    className={`px-6 py-2 text-xs font-bold font-mono transition-all border ${focusDuration === time ? 'bg-white text-ink border-white' : 'bg-transparent text-white border-gray-700 hover:border-white'}`}
                  >
                    {time}M
                  </button>
                ))}
                <div className="flex items-center gap-3 ml-2 border-l border-gray-800 pl-4">
                  <span className="text-[10px] font-bold text-gray-500 uppercase font-mono">Kustom:</span>
                  <input 
                    type="number" 
                    min={1} 
                    max={180} 
                    value={focusDuration}
                    onChange={(e) => setFocusDuration(Math.max(1, Math.min(180, Number(e.target.value))))}
                    className="w-16 bg-transparent border-b-2 border-gray-700 text-white text-sm font-bold font-mono py-1 focus:outline-none focus:border-white transition-all text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => startTest("focus")}
            className="w-fit px-12 py-5 bg-white text-ink font-bold uppercase tracking-widest hover:bg-gray-100 transition-all rounded-sm shadow-2xl"
          >
            Mulai Tantangan &rarr;
          </button>
        </motion.div>

        <button 
          onClick={() => setIsModeSelection(false)}
          className="fixed top-8 right-8 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-ink transition-colors font-mono"
        >
          Batal &times;
        </button>
      </main>
    );
  }

  // State: Hasil Ujian
  if (isFinished && results) {
    const history = JSON.parse(localStorage.getItem("kpb_history") || "[]");
    const paketHistory = history.filter((h: any) => h.paketId === paket?.id);

    return (
      <main className="min-h-dvh bg-white py-12 px-6 md:px-12 flex flex-col justify-between">
        <div className="mb-12">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={320} height={80} className="h-20 w-auto object-contain" />
          </Link>
        </div>

        <header className="flex justify-between items-baseline border-b-2 border-ink pb-8 mb-12">
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter text-ink uppercase leading-none">Hasil.</h1>
          <p className="text-sm font-bold text-muted uppercase tracking-[0.4em] font-mono">Laporan Evaluasi</p>
        </header>
        
        <div className="flex-1 max-w-[98%] mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-24 mb-12">
          <div className="lg:w-1/3 space-y-12">
            <div className="p-12 border-4 border-ink bg-white shadow-2xl">
              <p className="text-[12px] font-bold text-muted uppercase tracking-[0.3em] mb-8 font-mono">Skor Akhir Pilihan Ganda</p>
              <p className="text-[10rem] font-black text-ink leading-none tabular-nums">{results.pgScore}<span className="text-3xl text-muted font-bold">/30</span></p>
            </div>
            <div className="p-12 border-2 border-gray-100 bg-gray-50">
              <p className="text-[12px] font-bold text-muted uppercase tracking-[0.3em] mb-8 font-mono">Akumulasi Nilai Esai</p>
              <p className="text-8xl font-black text-ink leading-none tabular-nums">
                {results.essayGrades.reduce((a, b) => a + (b.score || 0), 0)}<span className="text-2xl text-muted font-bold">/50</span>
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <button onClick={() => setIsStarted(false)} className="w-full py-6 bg-ink text-white text-sm font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-xl rounded-sm">Ujian Baru</button>
              <Link href="/" className="w-full text-center py-6 bg-white border-2 border-ink text-ink text-sm font-bold uppercase tracking-[0.3em] hover:bg-gray-50 transition-all rounded-sm">Kembali ke Beranda</Link>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-12">
            <ScoreChart data={paketHistory} />
            <div className="space-y-8 overflow-y-auto pr-4 max-h-[60vh] scrollbar-hide">
              <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-muted font-mono mb-8">Detail Evaluasi Sistem</h3>
              <div className="grid grid-cols-1 gap-6">
                {results.essayGrades.map((grade, idx) => (
                  <div key={grade.id} className="p-10 border-2 border-gray-100 bg-white hover:border-ink transition-all space-y-6">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                      <span className="text-xs font-bold text-muted uppercase tracking-[0.3em] font-mono">Soal {idx + 31}</span>
                      <span className="px-4 py-2 bg-ink text-white text-xs font-bold font-mono uppercase">Skor: {grade.score}/10</span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-xl text-ink font-medium leading-relaxed italic border-l-4 border-gray-100 pl-8 py-2">"{essayAnswers[grade.id] || "Kosong"}"</p>
                      <div className="bg-gray-50 p-6 border border-gray-100">
                        <p className="text-xs font-bold uppercase tracking-widest text-ink mb-2 font-mono">Catatan Sistem:</p>
                        <p className="text-sm text-muted leading-relaxed">{grade.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tinjauan Ulang Section */}
        <div className="mt-24 border-t-4 border-ink pt-16 max-w-[98%] mx-auto w-full">
          <h2 className="text-5xl font-black text-ink uppercase tracking-tighter mb-12">Tinjauan Ulang Hasil Ujian</h2>
          <div className="space-y-16">
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-widest text-muted border-b border-gray-100 pb-4 mb-8 font-mono">Bagian I: Pilihan Ganda</h3>
              <div className="grid grid-cols-1 gap-8">
                {paket?.soal_pg.map((q, idx) => {
                  const userAnswer = userAnswers[q.id];
                  const isCorrect = userAnswer === q.kunci;
                  return (
                    <div key={q.id} className="p-8 border-2 border-gray-100 bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-muted">Soal {idx + 1}</span>
                        <span className={`px-4 py-1 text-[10px] font-bold font-mono uppercase ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {isCorrect ? 'Benar' : 'Salah'}
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-ink mb-8">{q.pertanyaan}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {Object.entries(q.opsi).map(([key, val]) => (
                          <div key={key} className={`p-6 border-2 rounded-sm flex gap-4 ${userAnswer === key ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : (q.kunci === key ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white')}`}>
                            <span className="font-mono font-black text-xl">{key}</span>
                            <span className="text-lg font-medium">{val as string}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-8 border-l-4 border-ink">
                        <p className="text-xs font-bold uppercase tracking-widest text-ink mb-2 font-mono">Pembahasan:</p>
                        <p className="text-lg text-muted">{q.pembahasan}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const isPG = currentStep < 30;
  const currentSoal = isPG ? paket?.soal_pg[currentStep] : paket?.soal_essay[currentStep - 30];
  const progressPercent = ((currentStep + 1) / 35) * 100;

  return (
    <main className="max-w-[98%] mx-auto px-6 py-12 min-h-dvh flex flex-col justify-between">
      {testMode === "focus" && <Timer duration={focusDuration * 60} onTimeUp={finishTest} isActive={!isFinished && !isLoading} />}
      
      <div className="mb-12">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={320} height={80} className="h-20 w-auto object-contain" />
        </Link>
      </div>

      <header className="flex justify-between items-center border-b-2 border-gray-100 pb-8 mb-12">
        <div className="flex items-center gap-12">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.4em] font-mono">{isPG ? "Bagian I: Pilihan Ganda" : "Bagian II: Esai"}</span>
            <h2 className="text-4xl font-black text-ink tabular-nums font-mono leading-none">
              {currentStep + 1} <span className="text-sm text-muted font-bold font-mono">/ 35</span>
            </h2>
          </div>
          <div className="hidden md:block w-64 h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
            <div className="h-full bg-ink transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-[10px] font-bold text-muted hover:text-ink uppercase tracking-widest font-mono border-b border-transparent hover:border-ink pb-1 transition-all">Beranda</Link>
          <button onClick={() => setIsStarted(false)} className="text-[10px] font-bold text-muted hover:text-ink uppercase tracking-widest font-mono border-b border-transparent hover:border-ink pb-1 transition-all">Daftar Paket Tes</button>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${testMode === "focus" ? 'bg-red-500' : 'bg-ink'}`} />
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest font-mono">{testMode === "focus" ? 'Tantangan' : 'Normal'}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-24 items-center">
        <div className="lg:w-1/2 w-full space-y-12">
          <h2 className="text-4xl md:text-6xl font-bold text-ink leading-[1.1] tracking-tight">{currentSoal?.pertanyaan}</h2>
        </div>
        <div className="lg:w-1/2 w-full">
          {isPG ? (
            <div className="grid gap-4 w-full">
              {Object.entries((currentSoal as any).opsi).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setUserAnswers({ ...userAnswers, [currentSoal!.id]: key })}
                  className={`w-full text-left p-8 border-2 transition-all flex gap-8 rounded-sm ${userAnswers[currentSoal!.id] === key ? "border-ink bg-ink text-white shadow-2xl" : "border-gray-100 bg-white text-ink hover:border-ink"}`}
                >
                  <span className={`font-mono text-2xl font-black ${userAnswers[currentSoal!.id] === key ? 'text-white' : 'text-gray-200'}`}>{key}</span> 
                  <span className="text-lg md:text-xl font-medium leading-relaxed">{val as string}</span>
                </button>
              ))}
            </div>
          ) : (
            <textarea
              className="w-full h-[50vh] p-12 border-2 border-gray-100 rounded-sm bg-white text-ink text-2xl font-medium focus:outline-none focus:border-ink resize-none shadow-inner"
              placeholder="Ketik argumentasi teknis kamu di sini..."
              value={essayAnswers[currentSoal!.id] || ""}
              onChange={(e) => setEssayAnswers({ ...essayAnswers, [currentSoal!.id]: e.target.value })}
            ></textarea>
          )}
        </div>
      </div>

      <div className="mt-16 mb-8 border-t border-gray-50 pt-12">
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 35 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-12 h-12 flex items-center justify-center text-xs font-bold font-mono border-2 transition-all rounded-sm ${currentStep === idx ? "bg-ink border-ink text-white scale-110 shadow-xl" : "bg-white border-gray-200 text-muted"}`}
            >
              {String(idx + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      <footer className="mt-12 grid grid-cols-3 gap-4 border-t-2 border-gray-100 pt-12">
        <div className="flex justify-start"><button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)} className="px-10 py-4 border border-ink text-[10px] font-bold font-mono uppercase tracking-[0.3em] hover:bg-gray-50 disabled:opacity-20 rounded-sm whitespace-nowrap">← SEBELUMNYA</button></div>
        <div className="flex justify-center"><button onClick={() => window.confirm("Akhiri tes?") && finishTest()} className="w-64 py-5 bg-ink text-white text-[11px] font-bold font-mono uppercase tracking-[0.3em] hover:opacity-90 shadow-xl rounded-sm">SELESAI</button></div>
        <div className="flex justify-end"><button disabled={currentStep === 34} onClick={handleNext} className="px-10 py-4 border border-ink text-[10px] font-bold font-mono uppercase tracking-[0.3em] hover:bg-gray-50 disabled:opacity-20 rounded-sm whitespace-nowrap">BERIKUTNYA →</button></div>
      </footer>
    </main>
  );
}
