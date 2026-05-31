"use client";

import { useEffect } from "react";

export default function ContentGuard() {
  useEffect(() => {
    // 1. Menonaktifkan Klik Kanan (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Menonaktifkan Shortcut Keyboard Berbahaya (Copy, Paste, DevTools, View Source)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+Shift+I (DevTools), Ctrl+S
      if (
        (e.ctrlKey || e.metaKey) && 
        (e.key === "c" || e.key === "v" || e.key === "u" || e.key === "s" || (e.shiftKey && e.key === "i"))
      ) {
        e.preventDefault();
      }
      
      // Disable F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
      }
    };

    // 3. Deteksi Sederhana Pembukaan DevTools
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // Jika DevTools terdeteksi terbuka, refresh halaman untuk mengunci state
        // window.location.reload(); 
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", detectDevTools);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", detectDevTools);
    };
  }, []);

  return null; // Komponen ini hanya menjalankan side-effect
}
