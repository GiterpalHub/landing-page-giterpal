import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Giterpal | Komunitas Mahasiswa TRPL",
  description:
    "Komunitas mahasiswa Teknologi Rekayasa Perangkat Lunak yang berfokus pada pengembangan skill, inovasi teknologi, dan kolaborasi proyek nyata.",
  keywords: [
    "Giterpal Hub",
    "Komunitas TRPL",
    "Mahasiswa IT",
    "Belajar Coding",
    "Teknologi Rekayasa Perangkat Lunak",
    "Web Development",
    "Komunitas Developer Indonesia",
    "Politeknik Negeri Madiun",
  ],
  authors: [{ name: "Tim Giterpal Hub" }],
  creator: "Giterpal Hub",
  publisher: "Giterpal Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
