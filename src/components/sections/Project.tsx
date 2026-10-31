import CardProject from "../CardProject";
import Marquee from "react-fast-marquee";

import OutlineButton from "../OutlineButton";
import IconButton from "../IconButton";
import { ArrowUpRight } from "lucide-react";

import GridTexture from "@/assets/textures/grid.png";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data/projects";

export default function Project() {
  const randomRotate = () => {
    const rotationClasses = [
      '-rotate-3',
      '-rotate-2',
      '-rotate-1',
      'rotate-0',
      'rotate-1',
      'rotate-2',
      'rotate-3'
    ];
    return rotationClasses[Math.floor(Math.random() * rotationClasses.length)];

  }
  return (
    <div className="relative h-[140vh] flex flex-col items-center justify-center bg-[#110C4C] overflow-hidden">
      <Image
        src={GridTexture}
        alt="texture"
        fill
        className="object-cover z-10"
      />

      <div className="relative z-10 flex flex-col md:flex-row justify-between text-white w-full px-8 mt-12 max-w-7xl mx-auto gap-6">
        <h2 className="text-7xl md:text-6xl font-primary font-bold">
          Karya Kami
        </h2>
        <p className="text-md font-secondary max-w-lg md:text-lg md:break-words  text-white/90 sm:text-right leading-relaxed">
          Saksikan bagaimana ide-ide brilian bertransformasi menjadi solusi
          nyata. Inilah etalase inovasi dan kolaborasi teknis dari talenta
          terbaik Giterpal Hub.
        </p>
      </div>

      <div className="relative z-10 w-full py-10">
        <Marquee speed={50} pauseOnHover={true}>
          <div className="flex gap-24 pr-24 py-10">
            {projects.map((project, index) => (
              <div key={index} className="w-[400px] flex-shrink-0">
                <Link href={`/projects/${project.slug}`}>
                  <CardProject
                    title={project.title}
                    image={project.image}
                    rotate={randomRotate()}
                  />
                </Link>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      <div className="relative z-10 flex justify-end space-x-2 col-span-1 mb-12">
        <Link href="/projects">
          <OutlineButton>Lihat Semua</OutlineButton>
        </Link>
        <Link href={"/projects"}>
          <IconButton className="shadow-[0_0_20px_theme(colors.white/70)] transition-all duration-300 focus:outline-none hover:bg-white/90">
            <ArrowUpRight />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
