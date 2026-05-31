"use client";

import { useState } from "react";

interface FlipcardProps {
  question: string;
  answer: string;
}

export default function Flipcard({ question, answer }: FlipcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative preserve-3d duration-500 w-full h-full ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute backface-hidden w-full h-full bg-white border-2 border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg">
          <span className="text-sm font-bold text-blue-500 mb-2 uppercase tracking-wider">Pertanyaan</span>
          <p className="text-slate-800 text-lg font-medium">{question}</p>
          <p className="mt-4 text-xs text-slate-400 italic">Klik untuk melihat jawaban</p>
        </div>

        {/* Back */}
        <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-blue-50 border-2 border-blue-600 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-lg overflow-y-auto">
          <span className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">Jawaban</span>
          <p className="text-slate-900 font-semibold">{answer}</p>
        </div>
      </div>
    </div>
  );
}
