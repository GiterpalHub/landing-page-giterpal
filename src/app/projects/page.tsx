import { Metadata } from "next";
import Image from "next/image";
import Star2 from "@/assets/star2.svg";
import Star3 from "@/assets/star3.svg";
import Star5 from "@/assets/star5.svg";
import BgStart from "@/assets/bgstart.webp";
import ProjectGallery from "@/components/sections/ProjectGallery";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pameran Project | Giterpal",
  description: "Kumpulan karya terbaik dan project pilihan yang dipamerkan pada bulan ini.",
  openGraph: {
    title: "Pameran Project | Giterpal",
    description: "Kumpulan karya terbaik dan project pilihan yang dipamerkan pada bulan ini.",
    type: "website",
  }
};

export default function PameranProjectPage() {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-[linear-gradient(35deg,#110C4C_25%,#6F2ED6_100%)] text-white font-secondary overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 mix-blend-screen scale-[2] md:scale-150">
          <Image src={BgStart} alt="Star Trail Background" fill className="object-cover" />
        </div>

        <div className="absolute top-[5%] left-[5%] md:top-[8%] md:left-16 lg:left-8 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-95 animate-pulse rotate-[75deg]">
          <Image src={Star2} alt="Top Left Spark" fill className="object-contain" />
        </div>

        <div className="absolute top-[3%] right-[5%] md:top-5 md:right-32 lg:right-52 w-20 h-20 md:w-40 md:h-40 lg:w-56 lg:h-56 animate-pulse">
          <Image src={Star5} alt="Large Glowing Top Right Star" fill className="object-contain" />
        </div>

        <div className="absolute bottom-[10%] -left-8 md:bottom-20 md:-left-16 lg:bottom-[15%] lg:-left-20 w-32 h-32 md:w-56 md:h-56 lg:w-72 lg:h-72 opacity-100 transform rotate-[40deg] animate-pulse">
          <Image src={Star5} alt="Half Star Bleeding Left Bottom" fill className="object-contain" />
        </div>

        <div className="absolute top-[50%] right-[10%] md:top-[60%] md:right-20 lg:top-[70%] lg:right-40 w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 opacity-70 animate-pulse">
          <Image src={Star3} alt="Faint Lower Tiny Spark" fill className="object-contain" />
        </div>
      </div>

      <main className="relative z-10 flex-grow w-full pt-32 pb-16 px-4 md:px-12 lg:px-24">
        <ProjectGallery />
      </main>

      <Footer />

    </div>
  );
}