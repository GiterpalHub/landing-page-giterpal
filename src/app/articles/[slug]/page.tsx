import { unstable_cache } from "next/cache";
import CardArtikelMobile from "@/components/CardArtikelMobile";
import CardArtikel from "@/components/CardArtikel";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, CalendarDays, UserRound } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import Star2 from "@/assets/star2.svg";
import Star5 from "@/assets/star5.svg";
import Star3 from "@/assets/star5.svg";
import BgStart from "@/assets/bgstart.webp";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ShareButton";
import CommentSection from "@/components/sections/CommentSection";
import { createClient } from "@/lib/supabase";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

const getCachedArticle = unstable_cache(
  async (slug: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return data;
  },
  ["article-detail-cache"],
  {
    revalidate: 180, 
  }
);

export async function generateStaticParams() {
  const { data: articles } = await createClient().from("articles").select("slug");
  return articles?.map((article) => ({ slug: article.slug })) || [];
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getCachedArticle(params.slug);

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
      publishedTime: article.published_date,
      authors: [article.author],
      images: [{ url: `${process.env.NEXT_PUBLIC_STORAGE_URL}/article/${article.cover_image}` }],
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = await getCachedArticle(params.slug);

  if (!article) {
    notFound();
  }

  const { data: otherArticles } = await createClient()
    .from("articles")
    .select("*")
    .neq("slug", params.slug)
    .limit(3);

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
        <div className="mb-6 flex items-center justify-between lg:absolute lg:-left-14 lg:top-0 lg:mb-0">
          <Button asChild type="button" variant="glass" className="h-11 rounded-full px-3 lg:w-11 lg:justify-center lg:px-0">
            <Link href="/#article" aria-label="Kembali">
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              <span className="pr-2 lg:hidden">Kembali</span>
            </Link>
          </Button>

          <ShareButton />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-[32px] border border-white/20 bg-white/10 p-5 shadow-[0_0_61px_rgba(255,255,255,0.08)] backdrop-blur-xl md:p-8 lg:col-span-2 lg:p-10">
            <article>
              <header className="mb-8">
                <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#110C4C]">
                  {article.category}
                </span>
                <h1 className="break-words font-primary text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  {article.title}
                </h1>
                <div className="mt-6 flex flex-wrap gap-5 font-secondary text-sm text-white/65">
                  <span className="inline-flex items-center gap-2">
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                    {article.author}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {formatDate(article.published_date)}
                  </span>
                </div>
              </header>

              <div className="mb-10 overflow-hidden rounded-[24px] border border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.35)]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/article/${article.cover_image}`}
                  alt={`Sampul artikel: ${article.title}`}
                  className="h-auto w-full object-cover"
                  priority
                  width={800}
                  height={450}
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>

              <div className="space-y-6 font-secondary text-lg leading-loose text-white/80 md:text-xl">
                {article.content.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="mt-10 border-t border-white/15 pt-8">
              <CommentSection articleId={article.id} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <p className="mb-5 font-primary text-xl font-bold">Artikel lainnya</p>

            <div className="flex flex-col gap-6">
              {otherArticles?.map((a) => (
                <Fragment key={a.slug}>
                  <CardArtikelMobile
                    slug={a.slug}
                    title={a.title}
                    author={a.author}
                    date={formatDate(a.published_date)}
                    coverImage={`${process.env.NEXT_PUBLIC_STORAGE_URL}/article/${a.cover_image}`}
                  />
                  <CardArtikel
                    theme="glass"
                    className="hidden lg:block"
                    slug={a.slug}
                    author={a.author}
                    category={a.category}
                    coverImage={`${process.env.NEXT_PUBLIC_STORAGE_URL}/article/${a.cover_image}`}
                    date={formatDate(a.published_date)}
                    excerpt={a.excerpt}
                    title={a.title}
                  />
                </Fragment>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}