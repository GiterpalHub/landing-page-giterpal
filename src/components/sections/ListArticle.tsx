"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CardArtikel from "@/components/CardArtikel";
import { StaticImageData } from "next/image";

interface ArticleProps {
    slug: string;
    author: string;
    category: string;
    coverImage: StaticImageData;
    date: string;
    excerpt: string;
    title: string;
}

export default function ListArticle({ initialArticles }: { initialArticles: ArticleProps[] }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredArticles = initialArticles.filter((article) => {
        const query = searchQuery.toLowerCase();
        return (
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query)
        );
    });

    return (
        <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="group relative mx-auto mb-12 w-full max-w-2xl">
                <div className="absolute -inset-0.5 rounded-full bg-white/40 opacity-0 blur-xl transition duration-500 group-focus-within:opacity-40" />
                <input
                    type="text"
                    placeholder="Cari artikel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full rounded-full border border-white/20 bg-white/10 py-4 pl-6 pr-14 font-secondary text-[15px] text-white outline-none backdrop-blur-xl transition-all placeholder:text-white/50 focus:border-white/50"
                />
                <button
                    type="button"
                    aria-label="Cari"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2 transition-colors hover:bg-white hover:text-[#6F2ED6] group-focus-within:bg-[#6F2ED6] group-focus-within:text-white"
                >
                    <Search className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <CardArtikel
                            theme="light"
                            key={article.slug}
                            slug={article.slug}
                            author={article.author}
                            category={article.category}
                            coverImage={article.coverImage}
                            date={article.date}
                            excerpt={article.excerpt}
                            title={article.title}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-white/50">
                        <p>Artikel dengan kata kunci <span className="text-white">&quot;{searchQuery}&quot;</span> tidak ditemukan.</p>
                    </div>
                )}
            </div>
        </div>
    );
}