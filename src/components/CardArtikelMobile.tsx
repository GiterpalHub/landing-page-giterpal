import Image from 'next/image';
import { UserRound, CalendarDays } from 'lucide-react';
import Link from 'next/link';

interface CardArtikelProps {
  coverImage: string,
  title: string,
  author: string,
  date: string,
  slug: string
}

export default function CardArtikelMobile({ title, author, date, coverImage, slug }: CardArtikelProps) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="group flex flex-row items-start gap-4 overflow-hidden rounded-[8px] border border-white/20 bg-white/10 p-3.5 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] lg:hidden"
    >
      <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-[6px] bg-white">
        <Image
          src={coverImage}
          alt={`Sampul artikel: ${title}`}
          fill
          sizes="96px"
          className="object-cover object-center"
        />
      </div>

      <div className="pt-1 w-full flex flex-col min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-secondary text-[15px] font-bold text-white group-hover:text-[#AD4BFF] transition leading-snug break-words line-clamp-3">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 font-secondary mt-1.5">
          <div className="flex items-center gap-1 text-white/65 text-xs font-medium">
            <UserRound className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{author}</span>
          </div>
          <div className="flex items-center gap-1 text-white/65 text-xs font-medium">
            <CalendarDays className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
