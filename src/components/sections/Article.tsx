"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import OutlineButton from "../OutlineButton";
import IconButton from "../IconButton";
import { articles } from "@/lib/data/articles";
import CardArtikel from "../CardArtikel";

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
        {articles.map((item,i) => (
          <CardArtikel key={i} theme="light" {...item}/>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Link href={`/articles`}>
          <OutlineButton
          className="
            border-gray-300 text-[#110C4C] rounded-full px-8 py-6
            hover:bg-[#623CEA] hover:text-white hover:border-[#623CEA]
          "
          >
            Baca Artikel
          </OutlineButton>
        </Link>

        <Link
          href={`/articles`}
          aria-label="Buka artikel terbaru"
        >
          <IconButton
          className="
            bg-[#623CEA] text-white w-14 h-14 rounded-full
            hover:bg-[#502bb5] hover:scale-110
          "
          >
            <ArrowUpRight className="w-6 h-6" aria-hidden="true" />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
