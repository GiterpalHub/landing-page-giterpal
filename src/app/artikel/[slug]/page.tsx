import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { articles, getArticleBySlug } from "@/lib/data/articles";

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

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#110C4C] px-6 pb-24 pt-32 text-white md:px-10">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/#article"
          className="mb-10 inline-flex items-center gap-2 font-secondary text-sm text-white/75 transition-colors hover:text-[#6BECFF]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke artikel
        </Link>

        <div className="mb-10 overflow-hidden rounded-3xl border border-white/15 bg-white/10">
          <Image
            src={article.coverImage}
            alt={`Sampul artikel: ${article.title}`}
            className="h-auto w-full object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>

        <div className="mb-8">
          <p className="mb-4 font-secondary text-sm font-semibold uppercase tracking-[0.2em] text-[#6BECFF]">
            {article.category}
          </p>
          <h1 className="font-primary text-4xl font-bold leading-tight md:text-6xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-5 font-secondary text-sm text-white/65">
            <span className="inline-flex items-center gap-2">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {article.date}
            </span>
          </div>
        </div>

        <div className="space-y-6 font-secondary text-lg leading-loose text-white/85 md:text-xl">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
