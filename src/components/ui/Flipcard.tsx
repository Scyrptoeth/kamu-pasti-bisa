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
      className="group perspective w-full h-80 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative preserve-3d duration-700 w-full h-full ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute backface-hidden w-full h-full bg-[#FAF9F6] border border-[#1A3626] p-10 flex flex-col items-start justify-between shadow-sm transition-colors group-hover:bg-[#FAF9F6]/50">
          <span className="text-[10px] font-bold text-[#1A3626] uppercase tracking-[0.4em]">Query.</span>
          <p className="font-serif text-2xl font-medium leading-tight text-[#1A3626]">{question}</p>
          <p className="text-[10px] text-[#1A3626]/40 uppercase tracking-[0.2em] italic">Interact to reveal solution</p>
        </div>

        {/* Back */}
        <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-[#1A3626] border border-[#1A3626] p-10 flex flex-col items-start justify-between shadow-sm overflow-y-auto">
          <span className="text-[10px] font-bold text-[#FAF9F6] uppercase tracking-[0.4em]">Response.</span>
          <p className="font-sans text-lg text-[#FAF9F6] leading-relaxed">{answer}</p>
          <p className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-[0.2em] italic">Click to revert</p>
        </div>
      </div>
    </div>
  );
}
