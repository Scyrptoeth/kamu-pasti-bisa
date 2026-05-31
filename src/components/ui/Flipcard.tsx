"use client";

import { useState } from "react";

interface FlipcardProps {
  question: string;
  answer: string;
  onFlip?: () => void;
}

export default function Flipcard({ question, answer, onFlip }: FlipcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) onFlip();
  };

  return (
    <div 
      className="group perspective w-full min-h-[480px] cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`relative preserve-3d duration-500 w-full h-full min-h-[480px] ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Sisi Depan: Pertanyaan */}
        <div className="absolute backface-hidden w-full h-full min-h-[480px] bg-white p-12 flex flex-col justify-between shadow-sm rounded-sm border border-gray-100">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Pertanyaan</span>
          <div className="flex-1 flex items-center justify-center py-8">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-[#111111] text-center">{question}</p>
          </div>
          <p className="text-[10px] text-gray-300 uppercase tracking-widest text-center">Klik untuk melihat jawaban</p>
        </div>

        {/* Sisi Belakang: Jawaban */}
        <div className="absolute backface-hidden rotate-y-180 w-full h-full min-h-[480px] bg-[#111111] p-12 flex flex-col justify-between shadow-sm rounded-sm">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Jawaban</span>
          <div className="flex-1 flex items-center justify-center overflow-y-auto py-8">
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed text-center">{answer}</p>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest text-center">Klik untuk kembali</p>
        </div>
      </div>
    </div>
  );
}
