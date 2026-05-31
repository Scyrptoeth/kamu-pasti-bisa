"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type FeedbackEntry = {
  id: string;
  message: string;
  timestamp: string;
};

export default function DeveloperDashboard() {
  const [token, setToken] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data.feedbacks);
        setIsAuthorized(true);
        localStorage.setItem("kpb_dev_token", token);
      } else {
        setError("Token tidak valid. Akses ditolak.");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("kpb_dev_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  if (!isAuthorized) {
    return (
      <main className="min-h-dvh bg-[#F9F9F9] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-gray-100 p-12 rounded-sm shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-ink uppercase tracking-tighter">Developer Access</h1>
            <p className="text-xs font-bold text-muted uppercase tracking-widest font-mono">Restricted Area</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted font-mono">Admin Token</label>
              <input 
                type="password" 
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full p-4 border border-gray-100 rounded-sm focus:border-ink outline-none font-mono text-sm"
                placeholder="Masukkan token akses..."
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-ink text-white py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all disabled:bg-gray-300"
            >
              {isLoading ? "Verifying..." : "Masuk ke Dashboard"}
            </button>
            {error && <p className="text-center text-xs font-bold text-red-500 uppercase tracking-wide">{error}</p>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#F9F9F9] p-8 max-w-[95%] mx-auto flex flex-col gap-12">
      <header className="flex justify-between items-center border-b border-gray-100 pb-8">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={160} height={40} className="h-10 w-auto" />
          </Link>
          <div className="h-8 w-px bg-gray-100" />
          <h1 className="text-xl font-black text-ink uppercase tracking-tight">Feedback Central</h1>
        </div>
        <button 
          onClick={() => {
            setIsAuthorized(false);
            localStorage.removeItem("kpb_dev_token");
          }}
          className="text-[10px] font-bold text-muted hover:text-ink uppercase tracking-widest font-mono border-b border-gray-100 hover:border-ink transition-all pb-1"
        >
          Logout
        </button>
      </header>

      <div className="grid gap-6">
        {feedbacks.length === 0 ? (
          <div className="bg-white border border-gray-100 p-20 text-center rounded-sm">
            <p className="text-sm font-bold text-muted uppercase tracking-widest font-mono">Belum ada feedback yang masuk.</p>
          </div>
        ) : (
          feedbacks.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm hover:border-ink transition-all space-y-4">
              <div className="flex justify-between items-start border-b border-gray-50 pb-4">
                <span className="text-[10px] font-bold text-gray-300 font-mono">ID: {item.id}</span>
                <span className="text-[10px] font-bold text-muted font-mono">{new Date(item.timestamp).toLocaleString("id-ID")}</span>
              </div>
              <p className="text-lg text-ink font-medium leading-relaxed">
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>

      <footer className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted font-mono pt-8 border-t border-gray-100">
        Developer Internal Tool
      </footer>
    </main>
  );
}
