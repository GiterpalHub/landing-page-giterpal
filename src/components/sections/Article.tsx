"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import OutlineButton from "../OutlineButton";
import IconButton from "../IconButton";

const articles = [
  {
    id: 1,
    title: "Revolusi AI: Bagaimana ChatGPT Mengubah Cara Kita Bekerja",
    category: "Artificial Intelligence",
    author: "Tech Insight",
    date: "15 Januari 2026",
    description:
      "Kecerdasan buatan generatif seperti ChatGPT kini bukan lagi sekadar mainan, melainkan alat produktivitas utama. Dari coding hingga penulisan kreatif, AI merombak lanskap profesional dengan kecepatan yang belum pernah terjadi sebelumnya...",
    image: "https://picsum.photos/seed/ai-tech/800/500",
  },
  {
    id: 2,
    title: "Masa Depan Web 3.0: Lebih dari Sekadar Crypto & NFT",
    category: "Blockchain",
    author: "Satoshi Nakamoto Jr.",
    date: "12 Januari 2026",
    description:
      "Web 3.0 menjanjikan internet yang terdesentralisasi, di mana pengguna memiliki kendali penuh atas data mereka. Namun, tantangan skalabilitas dan adopsi massal masih menjadi hambatan utama yang perlu dipecahkan para developer...",
    image: "https://picsum.photos/seed/web3/800/500",
  },
  {
    id: 3,
    title:
      "Perbandingan Framework Frontend 2026: Next.js vs Remix vs SvelteKit",
    category: "Web Development",
    author: "Dev Community",
    date: "10 Januari 2026",
    description:
      "Persaingan framework frontend semakin memanas. Next.js tetap dominan dengan fitur App Router-nya, namun Remix menawarkan manajemen data yang lebih intuitif, dan SvelteKit hadir dengan performa yang sangat ringan. Mana yang terbaik untuk proyek Anda?",
    image: "https://picsum.photos/seed/coding/800/500",
  },
];

export default function Article() {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-white py-24 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <h2 className="font-primary text-6xl font-bold text-[#110C4C]">
          Artikel
        </h2>
        <p className="text-right font-secondary text-gray-600 max-w-md leading-relaxed">
          Temukan berita artikel yang sesuai dengan minat. Kami menyajikan
          berbagai macam artikel yang membahas tentang teknologi. Silakan klik
          judul artikel untuk membaca lebih lanjut.
        </p>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {articles.map((item) => (
          <div
            key={item.id}
            className="
              group relative p-4 
              bg-white border border-gray-200 rounded-[32px] 
              shadow-sm cursor-pointer
              transition-all duration-500 ease-out
              
              hover:bg-[#623CEA] hover:border-[#623CEA] 
              hover:shadow-2xl hover:-translate-y-2
            "
          >
            <div className="relative w-full h-56 mb-6 overflow-hidden rounded-[24px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="space-y-3 px-2 pb-2">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-2xl font-bold font-primary text-[#110C4C] leading-tight transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <span className="text-sm font-medium text-gray-500 whitespace-nowrap transition-colors duration-300 group-hover:text-white/80">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 transition-colors duration-300 group-hover:text-white/60">
                <span>{item.author}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 transition-colors duration-300 group-hover:text-white/90">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <OutlineButton
          className="
            border-gray-300 text-[#110C4C] rounded-full px-8 py-6
            hover:bg-[#623CEA] hover:text-white hover:border-[#623CEA]
          "
        >
          Jelajahi Artikel
        </OutlineButton>

        <IconButton
          className="
            bg-[#623CEA] text-white w-14 h-14 rounded-full
            hover:bg-[#502bb5] hover:scale-110
          "
        >
          <ArrowUpRight className="w-6 h-6" />
        </IconButton>
      </div>
    </div>
  );
}
