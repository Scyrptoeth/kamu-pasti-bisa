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
        {/* Sisi Depan: Pertanyaan */}
        <div className="absolute backface-hidden w-full h-full bg-white p-8 flex flex-col justify-between shadow-sm rounded-sm">
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Pertanyaan</span>
          <p className="text-xl font-medium leading-relaxed text-[#111111]">{question}</p>
          <p className="text-[10px] text-gray-300 uppercase tracking-tight">Klik untuk melihat jawaban</p>
        </div>

        {/* Sisi Belakang: Jawaban */}
        <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-[#111111] p-8 flex flex-col justify-between shadow-sm rounded-sm">
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Jawaban</span>
          <div className="overflow-y-auto">
            <p className="text-lg text-white leading-relaxed">{answer}</p>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-tight">Klik untuk kembali</p>
        </div>
      </div>
    </div>
  );
}
