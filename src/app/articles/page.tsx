import Image from "next/image";
import { articles } from "@/lib/data/articles";
import Star2 from "@/assets/star2.svg";
import Star5 from "@/assets/star5.svg";
import BgStart from "@/assets/bgstart.png";
import Star3 from "@/assets/star3.svg";
import { Metadata } from "next";
import ListArticle from "@/components/sections/ListArticle";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Artikel | Giterpal",
  description: "Kumpulan artikel, tutorial, dan wawasan terbaru seputar teknologi dan pengembangan perangkat lunak dari Giterpal.",
  openGraph: {
    title: "Artikel | Giterpal",
    description: "Kumpulan artikel, tutorial, dan wawasan terbaru seputar teknologi dan pengembangan perangkat lunak dari Giterpal.",
    type: "website",
  },
};

const Artikel = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-[linear-gradient(35deg,#110C4C_25%,#6F2ED6_100%)] font-secondary text-white">
      
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

      <main className="relative z-10 flex-grow w-full pt-32 pb-16 px-4 md:px-10">
        <ListArticle initialArticles={articles} />
      </main>

      <Footer />
    </div>
  );
};

export default Artikel;