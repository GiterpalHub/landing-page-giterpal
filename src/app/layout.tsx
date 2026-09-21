import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
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
  openGraph: {
    title: "Giterpal | Komunitas Mahasiswa TRPL",
    description:
      "Ruang kolaborasi mahasiswa TRPL untuk belajar, berkarya, dan tumbuh bersama.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title: "Giterpal | Komunitas Mahasiswa TRPL",
    description:
      "Ruang kolaborasi mahasiswa TRPL untuk belajar, berkarya, dan tumbuh bersama.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${syne.variable} ${jakartaSans.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
