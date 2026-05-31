"use client";

import { useState, useEffect } from "react";
import soalData from "@/data/soal-ekonomi.json";
import Link from "next/link";
import Image from "next/image";

export default function TesPage() {
  const [selectedPaketIdx, setSelectedPaketIdx] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); 
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<{ pgScore: number; essayGrades: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHistory = JSON.parse(localStorage.getItem("kpb_history") || "[]");
      setHistory(savedHistory);
    }
  }, [isFinished]);

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
    }
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
      <main className="min-h-dvh bg-white flex flex-col justify-between p-6 md:p-12">
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

        <header className="flex justify-between items-baseline border-b-2 border-ink pb-8">
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter text-ink uppercase leading-none">Simulasi.</h1>
          <Link href="/" className="text-sm font-bold uppercase tracking-widest text-muted hover:text-ink transition-colors border-b-2 border-gray-100 hover:border-ink pb-1 font-mono">
            &larr; Beranda
          </Link>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-bold text-ink mb-4">Pilih Paket Ujian</h2>
            <p className="text-muted text-lg max-w-sm">Setiap paket terdiri dari 30 Soal Pilihan Ganda dan 5 Soal Esai dengan evaluasi oleh Sistem Pintar yang telah ditanamkan di website.</p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            {soalData.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleStart(idx)}
                className="w-full bg-white border-2 border-gray-100 p-10 rounded-sm hover:border-ink transition-all flex justify-between items-center group shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <h3 className="text-3xl font-bold text-ink">Paket {p.id}</h3>
                  <p className="text-sm font-bold text-muted uppercase tracking-widest mt-2">{p.kategori}</p>
                </div>
                <span className="text-ink font-bold text-sm uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  Mulai &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>

        <footer className="pt-8 border-t border-gray-100 flex justify-between text-[12px] uppercase tracking-[0.3em] text-muted font-mono font-medium">
          <p>© 2026 Kamu Pasti Bisa</p>
          <p></p>
        </footer>
      </main>
    );
  }

  if (isFinished && results) {
    return (
      <main className="min-h-dvh bg-white py-12 px-6 md:px-12 flex flex-col justify-between">
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

        <header className="flex justify-between items-baseline border-b-2 border-ink pb-8 mb-12">
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter text-ink uppercase leading-none">Hasil.</h1>
          <p className="text-sm font-bold text-muted uppercase tracking-[0.4em] font-mono">Dokumen Resmi</p>
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
                {results.essayGrades.reduce((a, b) => a + b.score, 0)}<span className="text-2xl text-muted font-bold">/50</span>
              </p>
            </div>

            {/* Histori Pengerjaan Sebelumnya */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-muted font-mono mb-6">Histori Pengerjaan Sebelumnya</h3>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
                {history
                  .filter((h) => h.paketId === paket?.id)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((h, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-sm text-xs font-mono">
                      <span className="text-muted">{new Date(h.date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      <div className="flex gap-4 font-bold text-ink">
                        <span>PG: {h.pgScore}</span>
                        <span>Esai: {h.essayTotal}</span>
                      </div>
                    </div>
                  ))}
                {history.filter((h) => h.paketId === paket?.id).length <= 1 && history.filter((h) => h.paketId === paket?.id).length > 0 && (
                   <p className="text-[10px] text-muted italic font-mono">Ini adalah pengerjaan pertama Anda untuk paket ini.</p>
                )}
                {history.filter((h) => h.paketId === paket?.id).length === 0 && (
                  <p className="text-[10px] text-muted italic font-mono">Belum ada histori pengerjaan.</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setIsStarted(false)}
                className="w-full py-6 bg-ink text-white text-sm font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-xl rounded-sm"
              >
                Ujian Baru
              </button>
              <Link 
                href="/" 
                className="w-full py-6 bg-white border-2 border-ink text-ink text-sm font-bold uppercase tracking-[0.3em] hover:bg-gray-50 transition-all text-center rounded-sm"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-8 overflow-y-auto pr-4 max-h-[80vh] scrollbar-hide">
            <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-muted font-mono mb-8">Detail Evaluasi AI</h3>
            <div className="grid grid-cols-1 gap-6">
              {results.essayGrades.map((grade, idx) => (
                <div key={grade.id} className="p-10 border-2 border-gray-100 bg-white hover:border-ink transition-all space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                    <span className="text-xs font-bold text-muted uppercase tracking-[0.3em] font-mono">Soal {idx + 31}</span>
                    <span className="px-4 py-2 bg-ink text-white text-xs font-bold font-mono uppercase">Skor: {grade.score}/10</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xl text-ink font-medium leading-relaxed italic border-l-4 border-gray-100 pl-8 py-2">
                      "{essayAnswers[grade.id] || "Kosong"}"
                    </p>
                    <div className="bg-gray-50 p-6 border border-gray-100">
                      <p className="text-xs font-bold uppercase tracking-widest text-ink mb-2 font-mono">Review Pengajar AI:</p>
                      <p className="text-sm text-muted leading-relaxed">
                        {grade.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section: Tinjauan Ulang Hasil Ujian */}
        <div className="mt-24 border-t-4 border-ink pt-16 max-w-[98%] mx-auto w-full">
          <h2 className="text-5xl font-black text-ink uppercase tracking-tighter mb-12">Tinjauan Ulang Hasil Ujian</h2>
          <div className="space-y-16">
            {/* PG Review */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-widest text-muted border-b border-gray-100 pb-4 mb-8 font-mono">Bagian I: Pilihan Ganda</h3>
              <div className="grid grid-cols-1 gap-8">
                {paket?.soal_pg.map((q, idx) => {
                  const userAnswer = userAnswers[q.id];
                  const isCorrect = userAnswer === q.kunci;
                  return (
                    <div key={q.id} className="p-8 border-2 border-gray-100 hover:border-ink transition-all bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-muted">Soal {idx + 1}</span>
                        <span className={`px-4 py-1 text-[10px] font-bold font-mono uppercase ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {isCorrect ? 'Benar' : 'Salah'}
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-ink mb-8 leading-relaxed">{q.pertanyaan}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {Object.entries(q.opsi).map(([key, val]) => {
                          const isUserChoice = userAnswer === key;
                          const isKunci = q.kunci === key;
                          let borderColor = "border-gray-100";
                          let bgColor = "bg-white";

                          if (isUserChoice) {
                            borderColor = isCorrect ? "border-green-500" : "border-red-500";
                            bgColor = isCorrect ? "bg-green-50" : "bg-red-50";
                          } else if (isKunci) {
                            borderColor = "border-green-500";
                            bgColor = "bg-green-50";
                          }

                          return (
                            <div key={key} className={`p-6 border-2 rounded-sm flex gap-4 ${borderColor} ${bgColor}`}>
                              <span className={`font-mono font-black text-xl ${isUserChoice || isKunci ? 'opacity-100' : 'opacity-20'}`}>{key}</span>
                              <span className="text-lg font-medium">{val as string}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-gray-50 p-8 border-l-4 border-ink">
                        <p className="text-xs font-bold uppercase tracking-widest text-ink mb-4 font-mono">Pembahasan:</p>
                        <p className="text-lg text-muted leading-relaxed">{q.pembahasan}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Essay Review */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-widest text-muted border-b border-gray-100 pb-4 mb-8 font-mono">Bagian II: Esai</h3>
              <div className="grid grid-cols-1 gap-8">
                {paket?.soal_essay.map((q, idx) => {
                  const grade = results.essayGrades.find((g: any) => g.id === q.id);
                  return (
                    <div key={q.id} className="p-8 border-2 border-gray-100 hover:border-ink transition-all bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-muted">Soal {idx + 31}</span>
                        <span className="px-4 py-1 bg-ink text-white text-[10px] font-bold font-mono uppercase">Skor: {grade?.score || 0}/10</span>
                      </div>
                      <h4 className="text-2xl font-bold text-ink mb-8 leading-relaxed">{q.pertanyaan}</h4>
                      
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-muted font-mono">Jawaban Anda:</p>
                          <p className="text-xl text-ink font-medium leading-relaxed italic bg-gray-50 p-8 border border-gray-100">
                            "{essayAnswers[q.id] || "(Kosong)"}"
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="p-8 border-2 border-gray-100 bg-white">
                            <p className="text-xs font-bold uppercase tracking-widest text-ink mb-4 font-mono">Evaluasi Sistem:</p>
                            <p className="text-base text-muted leading-relaxed">{grade?.explanation || "Tidak ada evaluasi."}</p>
                          </div>
                          <div className="p-8 border-2 border-gray-100 bg-white">
                            <p className="text-xs font-bold uppercase tracking-widest text-ink mb-4 font-mono">Jawaban Ideal:</p>
                            <p className="text-base text-muted leading-relaxed">{q.jawaban_ideal}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <footer className="pt-16 pb-8 border-t border-gray-100 flex justify-between text-[12px] uppercase tracking-[0.3em] text-muted font-mono font-medium">
          <p>© 2026 Kamu Pasti Bisa</p>
          <p></p>
        </footer>
      </main>
    );
  }

  const isPG = currentStep < 30;
  const currentSoal = isPG ? paket?.soal_pg[currentStep] : paket?.soal_essay[currentStep - 30];
  const progressPercent = ((currentStep + 1) / 35) * 100;

  return (
    <main className="max-w-[98%] mx-auto px-6 py-12 min-h-dvh flex flex-col justify-between">
      
      <div className="mb-12">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo Kamu Pasti Bisa" 
            width={240} 
            height={56} 
            className="h-14 w-auto object-contain"
          />
        </Link>
      </div>

      <header className="flex justify-between items-center border-b-2 border-gray-100 pb-8 mb-12">
        <div className="flex items-center gap-8 lg:gap-12">
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

        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/" className="text-[10px] font-bold text-muted hover:text-ink uppercase tracking-widest font-mono border-b border-transparent hover:border-ink pb-1 transition-all">
            Beranda
          </Link>
          <button 
            onClick={() => {
              if (window.confirm("Kembali ke pemilihan paket? Progres tes saat ini akan hilang.")) {
                setIsStarted(false);
              }
            }}
            className="text-[10px] font-bold text-muted hover:text-ink uppercase tracking-widest font-mono border-b border-transparent hover:border-ink pb-1 transition-all"
          >
            Daftar Paket Tes
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest font-mono">Live</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        <div className="lg:w-1/2 w-full space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight">
            {currentSoal?.pertanyaan}
          </h2>
          {isPG && <p className="text-muted font-mono text-xs uppercase tracking-[0.3em]">Pilih satu jawaban yang paling tepat.</p>}
        </div>

        <div className="lg:w-1/2 w-full">
          {isPG ? (
            <div className="grid gap-4 w-full">
              {Object.entries((currentSoal as any).opsi).map(([key, val]) => {
                const isSelected = userAnswers[currentSoal!.id] === key;
                return (
                  <button
                    key={key}
                    onClick={() => setUserAnswers({ ...userAnswers, [currentSoal!.id]: key })}
                    className={`w-full text-left p-8 border-2 transition-all flex gap-8 rounded-sm ${
                      isSelected
                        ? "border-ink bg-ink text-white shadow-2xl translate-x-4"
                        : "border-gray-100 bg-white text-ink hover:border-ink"
                    }`}
                  >
                    <span className={`font-mono text-2xl font-black ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                      {key}
                    </span> 
                    <span className="text-lg md:text-xl font-medium leading-relaxed">{val as string}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <textarea
              className="w-full h-[50vh] p-12 border-2 border-gray-100 rounded-sm bg-white text-ink text-2xl font-medium focus:outline-none focus:border-ink resize-none transition-all shadow-inner placeholder:text-gray-100"
              placeholder="Ketik argumentasi teknis Anda di sini..."
              value={essayAnswers[currentSoal!.id] || ""}
              onChange={(e) => setEssayAnswers({ ...essayAnswers, [currentSoal!.id]: e.target.value })}
            ></textarea>
          )}
        </div>
      </div>

      <div className="mt-16 mb-8 w-full border-t border-gray-50 pt-12">
        <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] font-mono mb-6">Navigasi Kontrol CBT</p>
        <div className="flex flex-wrap gap-2 lg:gap-3">
          {Array.from({ length: 35 }).map((_, idx) => {
            const isCurrent = currentStep === idx;
            const isPGSoal = idx < 30;
            const soalId = isPGSoal ? paket?.soal_pg[idx]?.id : paket?.soal_essay[idx - 30]?.id;
            const hasAnswer = isPGSoal ? !!userAnswers[soalId!] : (essayAnswers[soalId!] && essayAnswers[soalId!].trim().length > 0);
            
            let statusStyles = "bg-white border-gray-200 text-muted";
            if (isCurrent) {
              statusStyles = "bg-ink border-ink text-white shadow-xl scale-110 z-10";
            } else if (hasAnswer) {
              statusStyles = "bg-gray-100 border-gray-100 text-ink";
            }

            return (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xs font-bold font-mono border-2 transition-all rounded-sm hover:border-ink ${statusStyles}`}
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      <footer className="mt-12 grid grid-cols-3 gap-4 items-center border-t-2 border-gray-100 pt-12 pb-8">
        <div className="flex justify-start">
          <button 
            disabled={currentStep === 0 || isLoading}
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full md:w-auto px-4 md:px-10 py-4 border border-ink bg-white text-ink text-[10px] font-bold font-mono uppercase tracking-[0.3em] hover:bg-gray-50 disabled:opacity-20 transition-all rounded-sm whitespace-nowrap"
          >
            ← SEBELUMNYA
          </button>
        </div>

        <div className="flex justify-center">
          <button 
            disabled={isLoading}
            onClick={() => {
              if (window.confirm("Apakah Anda yakin ingin mengakhiri tes ini? Hasil akan langsung dikalkulasi.")) {
                finishTest();
              }
            }}
            className="w-full md:w-64 py-5 bg-ink text-white text-[11px] font-bold font-mono uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-xl disabled:bg-muted rounded-sm"
          >
            {isLoading ? "MEMPROSES..." : "SELESAI"}
          </button>
        </div>

        <div className="flex justify-end">
          <button 
            disabled={currentStep === 34 || isLoading}
            onClick={handleNext}
            className="w-full md:w-auto px-4 md:px-10 py-4 border border-ink bg-white text-ink text-[10px] font-bold font-mono uppercase tracking-[0.3em] hover:bg-gray-50 disabled:opacity-20 transition-all rounded-sm whitespace-nowrap"
          >
            BERIKUTNYA →
          </button>
        </div>
      </footer>
    </main>
  );
}
