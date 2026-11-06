import CardArtikel from "@/components/CardArtikel";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, CalendarDays } from "lucide-react";
import { articles, getArticleBySlug } from "@/lib/data/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Star2 from "@/assets/star2.svg";
import Star5 from "@/assets/star5.svg";
import Star3 from "@/assets/star5.svg";
import BgStart from "@/assets/bgstart.webp";
import CommentSection from "@/components/sections/CommentSection";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Artikel tidak ditemukan | Giterpal",
    };
  }

  return {
    title: `${article.title} | Giterpal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.coverImage.src }],
    },
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  const otherArticles = articles.filter((a) => a.slug !== article?.slug);
  if (!article) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(35deg,#110C4C_25%,#6F2ED6_100%)] px-4 pb-24 pt-28 text-white md:px-12 lg:px-16">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 mix-blend-screen scale-[1.5] md:scale-[2]">
          <Image src={BgStart} alt="Star Trail Background" fill className="object-cover" />
        </div>

        <div className="absolute top-[12%] left-[18%] md:top-[15%] md:left-[22%] w-10 h-10 md:w-16 md:h-16 opacity-90 animate-pulse rotate-[65deg]">
          <Image src={Star2} alt="Star Sparkle" fill className="object-contain" />
        </div>

        <div className="absolute top-[8%] right-[12%] md:top-[10%] md:right-[15%] lg:right-[18%] w-16 h-16 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-85 animate-pulse rotate-12">
          <Image src={Star5} alt="Glowing Star" fill className="object-contain" />
        </div>

        <div className="absolute top-[6%] left-[48%] md:top-[8%] md:left-[55%] w-4 h-4 md:w-6 md:h-6 opacity-40 animate-pulse rotate-45">
          <Image src={Star3} alt="Tiny Spark" fill className="object-contain" />
        </div>

        <div className="absolute -bottom-[5%] -left-[10%] md:-bottom-[10%] md:-left-[15%] lg:-bottom-[15%] lg:-left-[12%] w-40 h-40 md:w-64 md:h-64 lg:w-96 lg:h-96 opacity-100 transform rotate-[35deg] animate-pulse">
          <Image src={Star5} alt="Massive Bleeding Star" fill className="object-contain" />
        </div>

        <div className="absolute top-[45%] left-[8%] md:top-[50%] md:left-[12%] w-5 h-5 md:w-7 md:h-7 opacity-60 animate-pulse -rotate-[15deg]">
          <Image src={Star3} alt="Small Spark" fill className="object-contain" />
        </div>

        <div className="absolute bottom-[25%] right-[8%] md:bottom-[30%] md:right-[14%] lg:bottom-[35%] lg:right-[18%] w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 opacity-75 animate-pulse rotate-[110deg]">
          <Image src={Star2} alt="Medium Spark" fill className="object-contain" />
        </div>

        <div className="absolute top-[65%] right-[25%] md:top-[70%] md:right-[30%] w-6 h-6 md:w-9 md:h-9 opacity-30 animate-pulse rotate-[25deg]">
          <Image src={Star3} alt="Faint Spark" fill className="object-contain" />
        </div>

        <div className="absolute bottom-[10%] left-[45%] md:bottom-[15%] md:left-[50%] w-4 h-4 md:w-5 md:h-5 opacity-50 animate-pulse -rotate-[45deg]">
          <Image src={Star3} alt="Tiny Spark Bottom" fill className="object-contain" />
        </div>

      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 flex items-center">
          <Link
            href="/articles"
            aria-label="Kembali ke Daftar Artikel"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-secondary font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-[#110C4C] hover:border-white shadow-sm"
          >
            <ChevronLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={2.5}
              aria-hidden="true"
            />
            <span>Kembali ke Artikel</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-[14px] sm:rounded-[16px] border border-white/20 bg-white/10 p-6 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl lg:col-span-2">
            <article>
              <header className="mb-8">
                <h1 className="break-words font-secondary text-2xl font-bold leading-[1.25] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] mb-6">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-secondary text-white/70 border-b border-white/15 pb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 border border-white/30 text-xs font-bold text-white shadow-sm">
                      {article.author.charAt(0)}
                    </div>
                    <span className="font-medium text-white/90">{article.author}</span>
                  </div>
                  <span className="text-white/30">•</span>
                  <div className="flex items-center gap-1.5 text-white/70">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    <span>{article.date}</span>
                  </div>
                  <span className="text-white/30">•</span>
                  <span className="font-medium text-white/90">{article.category}</span>
                </div>
              </header>

              <div className="relative mb-10 overflow-hidden rounded-[10px] md:rounded-[12px] border border-white/15 bg-black/20 shadow-2xl">
                <Image
                  src={article.coverImage}
                  alt={`Sampul artikel: ${article.title}`}
                  className="h-auto w-full max-h-[520px] object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>

              <div className="space-y-6 font-secondary text-base sm:text-lg leading-relaxed text-white/85">
                {article.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="mt-14 border-t border-white/15 pt-8">
              <CommentSection />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <p className="mb-5 font-primary text-xl font-bold text-white">Artikel lainnya</p>

            <div className="flex flex-col gap-6">
              {otherArticles.map((a) => (
                <CardArtikel
                  key={a.slug}
                  theme="glass"
                  slug={a.slug}
                  author={a.author}
                  category={a.category}
                  coverImage={a.coverImage}
                  date={a.date}
                  excerpt={a.excerpt}
                  title={a.title}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
