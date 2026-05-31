"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage("");
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Gagal mengirim feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-1">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink font-mono">Feedback Anonim</h4>
        <p className="text-[11px] text-muted leading-relaxed">Bantu kami meningkatkan platform ini dengan memberikan masukan Anda secara anonim di sini.</p>
      </div>

      {isSuccess ? (
        <div className="p-6 bg-gray-50 border border-gray-100 rounded-sm">
          <p className="text-xs font-bold text-ink uppercase tracking-widest text-center">Terima kasih atas masukan Anda.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan saran, kritik, atau temuan bug di sini..."
            className="w-full h-32 p-4 bg-white border border-gray-100 rounded-sm focus:border-ink outline-none text-sm transition-all shadow-sm placeholder:text-gray-200 resize-none"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ink text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all disabled:bg-gray-300 shadow-lg"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Feedback &rarr;"}
          </button>
        </form>
      )}
    </div>
  );
}
