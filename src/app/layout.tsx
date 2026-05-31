import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kamu Pasti Bisa",
  description: "Platform belajar minimalis untuk persiapan ujian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} antialiased`}>
      <body className="bg-[#F9F9F9] text-[#111111] min-h-screen">
        {children}
      </body>
    </html>
  );
}
