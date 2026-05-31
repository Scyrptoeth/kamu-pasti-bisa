"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Kamu Pasti Bisa!</h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Platform persiapan ujian sekolah terbaik dengan metode Flipcard dan Simulasi Tes berbasis AI.
            Kuasai materi Ekonomi dengan cara yang lebih efektif dan menyenangkan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/flipcard" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-blue-50 transition-all"
            >
              🚀 Mulai Belajar (Flipcard)
            </Link>
            <Link 
              href="/tes" 
              className="bg-blue-700 text-white border-2 border-blue-500 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-blue-800 transition-all"
            >
              📝 Simulasi Tes
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-3 gap-12">
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6 text-2xl">🎴</div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Metode Flipcard</h3>
          <p className="text-slate-600">Kenali soal dan jawaban ideal sebelum diuji. Memperkuat daya ingat tanpa tekanan pilihan ganda.</p>
        </div>
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6 text-2xl">🤖</div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Penilaian AI</h3>
          <p className="text-slate-600">Jawaban essay Anda dinilai secara otomatis oleh AI Deepseek dengan standar guru Ekonomi profesional.</p>
        </div>
        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6 text-2xl">📊</div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Statistik Progres</h3>
          <p className="text-slate-600">Pantau perkembangan skor Anda dari percobaan pertama hingga mahir melalui grafik riwayat.</p>
        </div>
      </div>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>© 2026 Kamu Pasti Bisa - Persiapantubel Project</p>
      </footer>
    </main>
  );
}
