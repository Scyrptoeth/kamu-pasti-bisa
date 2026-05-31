import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ContentGuard from "@/components/security/ContentGuard";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Kamu Pasti Bisa",
  description: "Platform belajar minimalis untuk persiapan ujian.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#151619",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="font-sans min-h-screen">
        <ContentGuard />
        {children}
      </body>
    </html>
  );
}
