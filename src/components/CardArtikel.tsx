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
    slug
}: CardArtikelProps) => {
    
    const isGlass = theme === "glass";

    const containerClass = isGlass
        ? "bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:-translate-y-2"
        : "bg-white border border-gray-200 shadow-md hover:bg-[#623CEA] hover:border-[#623CEA] hover:shadow-2xl hover:-translate-y-2";

    const badgeClass = isGlass
        ? "bg-black/40 border-white/10 text-[#6BECFF]"
        : "bg-white/90 border-gray-200 text-[#623CEA] group-hover:text-white group-hover:bg-white/20 group-hover:border-white/30";

    const titleClass = isGlass
        ? "text-white group-hover:text-[#6BECFF]"
        : "text-[#110C4C] group-hover:text-white";

    const authorClass = isGlass
        ? "text-white/80 group-hover:text-[#6BECFF]"
        : "text-[#623CEA] group-hover:text-white";

    const dateClass = isGlass
        ? "text-white/65"
        : "text-gray-500 group-hover:text-white/80";

    const excerptClass = isGlass
        ? "text-white/65 group-hover:text-white"
        : "text-gray-600 group-hover:text-white/90";

    return (
        <Link
            href={`/articles/${slug}`}
            className={`block group h-full ${className}`}
        >
            <div
                className={`
                    flex flex-col relative h-full overflow-hidden rounded-[32px] 
                    transition-all duration-500 ease-out ${containerClass}
                `}
            >
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-10"></div>

                <div className="relative w-full h-52 md:h-56 shrink-0 overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={`Sampul artikel: ${title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />

                    <div className="absolute top-4 right-4 z-20">
                        <span className={`
                            px-4 py-1.5 rounded-full backdrop-blur-md border text-[10px] md:text-xs 
                            font-secondary font-bold uppercase tracking-wider shadow-sm 
                            transition-all duration-300 ${badgeClass}
                        `}>
                            {category}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col flex-grow p-5 md:p-6 relative z-20">
                    <h3 className={`font-primary text-[18px] md:text-xl font-bold leading-snug transition-colors duration-300 mb-3 line-clamp-2 ${titleClass}`}>
                        {title}
                    </h3>

                    <div className="flex items-center gap-4 font-secondary mb-4">
                        <div className={`flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-300 ${authorClass}`}>
                            <UserRound className="h-4 w-4 md:h-4.5 md:w-4.5" aria-hidden="true" />
                            <span className="truncate max-w-[100px] sm:max-w-[150px]">{author}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-300 ${dateClass}`}>
                            <CalendarDays className="h-4 w-4 md:h-4.5 md:w-4.5" aria-hidden="true" />
                            <span>{date}</span>
                        </div>
                    </div>

                    <div className={`mt-auto text-[14px] font-secondary leading-relaxed transition-colors duration-300 ${excerptClass}`}>
                        <p className="line-clamp-2 md:line-clamp-3">{excerpt}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardArtikel;