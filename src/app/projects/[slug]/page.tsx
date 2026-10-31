import Image from 'next/image';
import Star2 from "@/assets/star2.svg";
import Star3 from "@/assets/star3.svg";
import Star5 from "@/assets/star5.svg";
import Star1 from "@/assets/star1.svg";
import BgStart from "@/assets/bgstart.png"
import { projects } from '@/lib/data/projects';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FeedbackButton from '@/components/FeedbackButton';
import Link from 'next/link';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project tidak ditemukan | Pameran",
      description: "Halaman project yang Anda cari tidak tersedia.",
    };
  }

  const imageUrl = typeof project.image === 'string'
    ? project.image
    : project.image?.src || "";

  return {
    title: `${project.title} | Pameran Project`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: `Thumbnail project ${project.title}`
        }
      ],
    },
  };
}


const PreviewProjectSection = ({ params }: ProjectPageProps) => {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }
  return (
    <section className="relative w-full min-h-screen bg-[linear-gradient(35deg,#110C4C_25%,#6F2ED6_100%)] text-white flex items-center justify-center overflow-hidden font-sans py-20 md:py-0">

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen scale-[2] md:scale-150">
        <Image src={BgStart} alt="Star Trail Background" fill className="object-cover" />
      </div>


      <div className="absolute top-[5%] left-[5%] md:top-[10%] md:left-16 lg:left-28 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-95 z-0 animate-pulse pointer-events-none rotate-[75deg]">
        <Image src={Star2} alt="Top Left Spark" fill className="object-contain" />
      </div>

      <div className="absolute top-[3%] right-[5%] md:top-5 md:right-32 lg:right-52 w-20 h-20 md:w-40 md:h-40 lg:w-56 lg:h-56 z-0 animate-pulse pointer-events-none">
        <Image src={Star5} alt="Large Glowing Top Right Star" fill className="object-contain" />
      </div>

      <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-16 lg:-left-32 w-32 h-32 md:w-56 md:h-56 lg:w-72 lg:h-72 opacity-100 z-0 transform rotate-[40deg] animate-pulse pointer-events-none">
        <Image src={Star5} alt="Half Star Bleeding Left Bottom" fill className="object-contain" />
      </div>

      <div className="absolute bottom-[15%] right-[10%] md:bottom-20 md:right-60 lg:bottom-14 lg:right-96 w-6 h-6 md:w-10 md:h-10 lg:w-16 lg:h-16 opacity-70 z-0 animate-pulse pointer-events-none">
        <Image src={Star3} alt="Faint Lower Tiny Spark" fill className="object-contain" />
      </div>


      <div className=" container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between z-10 gap-12 relative mt-4 md:mt-0">

        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left space-y-6">
          <div className="text-xs md:text-sm font-medium tracking-wider text-gray-400 mb-2">
            Pameran / Preview Project
          </div>

          <h2 className="font-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
            {project.title}
          </h2>

          <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl">
            {project.description}
          </p>

          <Link href={"/projects"} className="mt-8 px-8 py-3 rounded-full border border-purple-500/50 hover:bg-purple-600/30 hover:text-white hover:border-transparent transition-all duration-300 bg-transparent text-gray-300 text-xs sm:text-sm font-medium">
            Lihat Semua
          </Link>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:items-end relative">

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-[130%] md:h-[130%] bg-purple-600 blur-[80px] md:blur-[100px] opacity-20 rounded-full z-0 pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-lg flex flex-col items-end gap-5">

            <div className="w-full rounded-xl overflow-hidden border-2 border-purple-500/40 p-1.5 md:p-2 bg-black/20 backdrop-blur-sm shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#1e1b4b] flex items-center justify-center">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`Screenshot ${project.title}`}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                )}
              </div>
            </div>
            <FeedbackButton />
          </div>

          <div className="absolute -bottom-10 -right-5 md:-bottom-16 md:-right-10 lg:-bottom-24 lg:-right-14 w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 z-0 pointer-events-none transform rotate-12 md:rotate-0">
            <Image src={Star1} alt="Faded Massive Outline Star watermark" fill className="object-contain" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default PreviewProjectSection;