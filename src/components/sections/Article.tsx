"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import OutlineButton from "../OutlineButton";
import IconButton from "../IconButton";
import { articles } from "@/lib/data/articles";

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
          <Link
            key={item.slug}
            href={`/artikel/${item.slug}`}
            className="block"
          >
            <div
              className="
                group relative p-4
                bg-white border border-gray-200 rounded-[32px]
                shadow-sm cursor-pointer
                transition-all duration-500 ease-out
                hover:bg-[#623CEA] hover:border-[#623CEA]
                hover:shadow-2xl hover:-translate-y-2
              "
            >
              <div className="relative mb-6 h-56 w-full overflow-hidden rounded-[24px]">
                <Image
                  src={item.coverImage}
                  alt={`Sampul artikel: ${item.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="space-y-3 px-2 pb-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-primary text-2xl font-bold leading-tight text-[#110C4C] transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <span className="whitespace-nowrap text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-white/80">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400 transition-colors duration-300 group-hover:text-white/60">
                  <span>{item.author}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>

                <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-white/90">
                  {item.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Link href={`/artikel/${articles[0].slug}`}>
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
          href={`/artikel/${articles[0].slug}`}
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
