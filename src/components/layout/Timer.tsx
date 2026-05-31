"use client";

import { useState, useEffect } from "react";

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

export default function Timer({ duration, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp, isActive]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isLowTime = timeLeft < 300; // 5 minutes remaining

  return (
    <div className={`fixed top-8 right-8 z-50 px-6 py-3 border-2 transition-all shadow-xl rounded-sm font-mono flex items-baseline gap-3 ${
      isLowTime ? 'border-red-500 bg-red-50 text-red-600 animate-pulse' : 'border-ink bg-white text-ink'
    }`}>
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Sisa Waktu</span>
      <span className="text-2xl font-black tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
