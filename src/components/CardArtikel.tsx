import { CalendarDays, UserRound } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardArtikelProps {
  className?: string;
  theme?: "light" | "glass";
  coverImage: StaticImageData | string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
}

const CardArtikel = ({
  className = "",
  theme = "light",
  coverImage,
  title,
  category,
  author,
  date,
  excerpt,
  slug,
}: CardArtikelProps) => {
  const isGlass = theme === "glass";

  if (isGlass) {
    return (
      <Link
        href={`/articles/${slug}`}
        className={`block group h-full ${className}`}
      >
        <div
          className="
            flex flex-col relative h-full overflow-hidden rounded-[20px]
            p-4 sm:p-5 bg-white/10 border border-white/20 backdrop-blur-xl
            shadow-[0_4px_20px_rgba(0,0,0,0.15)]
            transition-all duration-300 ease-out
            hover:bg-white/15 hover:border-white/40
            hover:shadow-[0_16px_36px_rgba(255,255,255,0.12)] hover:-translate-y-1.5
          "
        >
          <div className="relative w-full h-48 sm:h-52 shrink-0 overflow-hidden rounded-[12px] mb-4 border border-white/10">
            <Image
              src={coverImage}
              alt={`Sampul artikel: ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col flex-grow">
            <h3 className="font-secondary text-[17px] lg:text-[19px] font-bold leading-snug text-white group-hover:text-[#AD4BFF] transition-colors duration-300 mb-2 line-clamp-2">
              {title}
            </h3>

            <div className="flex items-center gap-3 font-secondary text-xs mb-3.5">
              <span className="font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                {category}
              </span>
              <span className="text-white/50 group-hover:text-white/75 transition-colors duration-300">
                {date}
              </span>
            </div>

            <p className="font-secondary text-xs md:text-[13px] text-white/70 group-hover:text-white/90 leading-relaxed line-clamp-3 transition-colors duration-300">
              {excerpt}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${slug}`}
      className={`block group h-full ${className}`}
    >
      <div
        className="
          flex flex-col relative h-full overflow-hidden rounded-[20px]
          p-4 sm:p-5 bg-white border border-[#9B72F2]/60
          shadow-[0_4px_20px_rgba(17,12,76,0.04)]
          transition-all duration-300 ease-out
          hover:bg-[#623CEA] hover:border-[#623CEA]
          hover:shadow-[0_16px_36px_rgba(98,60,234,0.28)] hover:-translate-y-1.5
        "
      >
        <div className="relative w-full h-48 sm:h-52 shrink-0 overflow-hidden rounded-[12px] mb-4">
          <Image
            src={coverImage}
            alt={`Sampul artikel: ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <h3 className="font-secondary text-[17px] lg:text-[19px] font-bold leading-snug text-[#110C4C] group-hover:text-white transition-colors duration-300 mb-2">
            {title}
          </h3>

          <div className="flex items-center gap-3 font-secondary text-xs mb-3.5">
            <span className="font-medium text-[#110C4C]/80 group-hover:text-white/95 transition-colors duration-300">
              {category}
            </span>
            <span className="text-gray-400 group-hover:text-white/75 transition-colors duration-300">
              {date}
            </span>
          </div>

          <p className="font-secondary text-xs md:text-[13px] text-[#110C4C]/80 group-hover:text-white/90 leading-relaxed line-clamp-3 transition-colors duration-300">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardArtikel;
