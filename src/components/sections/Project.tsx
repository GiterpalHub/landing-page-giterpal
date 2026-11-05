import CardProject from "../CardProject";
import Marquee from "react-fast-marquee";
import ButtonWithIcon from "../ui/button-with-icon";
import BlurOutUp from "../ui/blur-out-up";

import GridTexture from "@/assets/textures/grid.png";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data/projects";

const cardPosePattern = [
  // 0: DIGITAL MARKETING BEHANCE — sits lower & level (matches center-left card in reference)
  {
    offsetY: "translate-y-6 md:translate-y-7",
    rotate: "rotate-0",
  },
  // 1: TEAM CREATOR — sits higher & tilted counter-clockwise up-right (matches center-right card in reference)
  {
    offsetY: "-translate-y-5 md:-translate-y-6",
    rotate: "-rotate-[3.2deg]",
  },
  // 2: POINT OF SALES APP — sits slightly lower & tilted clockwise down-right (matches far-right card in reference)
  {
    offsetY: "translate-y-3 md:translate-y-4",
    rotate: "rotate-[3.5deg]",
  },
  // 3: E-WALLET MOBILE APP — sits higher & tilted clockwise down-right (matches far-left card in reference)
  {
    offsetY: "-translate-y-6 md:-translate-y-7",
    rotate: "rotate-[2.5deg]",
  },
];

export default function Project() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 md:pt-20 pb-20 md:pb-28
                 bg-[linear-gradient(180deg,#110C4C_0%,#110C4C_50%,#4A148C_100%)]"
    >
      {/* Grid Texture with smooth top & bottom fade so it blends into the purple gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none
                   [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_50%,transparent_82%)]"
      >
        <Image
          src={GridTexture}
          alt="texture"
          fill
          className="object-cover opacity-90"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between text-white w-full px-6 md:px-12 max-w-7xl mx-auto gap-6 mb-2 md:mb-4">
        <BlurOutUp
          as="h2"
          text="Karya Kami"
          className="text-4xl sm:text-5xl md:text-6xl font-primary font-bold tracking-tight"
        />
        <BlurOutUp
          as="p"
          text="Saksikan bagaimana ide-ide brilian bertransformasi menjadi solusi nyata. Inilah etalase inovasi dan kolaborasi teknis dari talenta terbaik Giterpal Hub."
          staggerDelay={2}
          className="text-sm sm:text-base md:text-lg font-secondary max-w-md md:max-w-lg text-white/90 md:text-right leading-relaxed"
        />
      </div>

      {/* Staggered Polaroid Marquee */}
      <div className="relative z-10 w-full my-2 md:my-3">
        <Marquee speed={45} pauseOnHover={true} autoFill={true}>
          <div className="flex items-center gap-8 md:gap-11 pr-8 md:pr-11 py-8 md:py-10">
            {projects.map((project, index) => {
              const pose = cardPosePattern[index % cardPosePattern.length];
              return (
                <div
                  key={index}
                  className={`w-[340px] sm:w-[400px] md:w-[440px] flex-shrink-0 transition-transform duration-500 ${pose.offsetY}`}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <CardProject
                      title={project.title}
                      image={project.image}
                      rotate={pose.rotate}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>

      {/* CTA Button ("Lihat Semua") with animated sliding icon badge */}
      <div className="relative z-10 flex items-center justify-center mt-4 md:mt-6">
        <ButtonWithIcon href="/projects">
          Lihat Semua
        </ButtonWithIcon>
      </div>
    </div>
  );
}
