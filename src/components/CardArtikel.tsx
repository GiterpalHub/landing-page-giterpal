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
            flex flex-col relative h-full overflow-hidden rounded-[32px]
            transition-all duration-500 ease-out
            bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg
            hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-2
          "
        >
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-10" />

          <div className="relative w-full h-52 md:h-56 shrink-0 overflow-hidden">
            <Image
              src={coverImage}
              alt={`Sampul artikel: ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            <div className="absolute top-4 right-4 z-20">
              <span
                className="
                  px-4 py-1.5 rounded-full backdrop-blur-md border text-[10px] md:text-xs
                  font-secondary font-bold uppercase tracking-wider shadow-sm
                  transition-all duration-300 bg-black/40 border-white/10 text-[#6BECFF]
                "
              >
                {category}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-grow p-5 md:p-6 relative z-20">
            <h3 className="font-primary text-[18px] md:text-xl font-bold leading-snug transition-colors duration-300 mb-3 line-clamp-2 text-white group-hover:text-[#6BECFF]">
              {title}
            </h3>

            <div className="flex items-center gap-4 font-secondary mb-4">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-300 text-white/80 group-hover:text-[#6BECFF]">
                <UserRound className="h-4 w-4 md:h-4.5 md:w-4.5" aria-hidden="true" />
                <span className="truncate max-w-[100px] sm:max-w-[150px]">{author}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-300 text-white/65">
                <CalendarDays className="h-4 w-4 md:h-4.5 md:w-4.5" aria-hidden="true" />
                <span>{date}</span>
              </div>
            </div>

            <div className="mt-auto text-[14px] font-secondary leading-relaxed transition-colors duration-300 text-white/65 group-hover:text-white">
              <p className="line-clamp-2 md:line-clamp-3">{excerpt}</p>
            </div>
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
          <h3 className="font-primary text-[17px] lg:text-[19px] font-bold leading-snug text-[#110C4C] group-hover:text-white transition-colors duration-300 mb-2">
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
