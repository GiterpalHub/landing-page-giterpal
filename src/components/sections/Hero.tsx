"use client";

import { useEffect, useState, useRef } from "react";
import { BicepsFlexed, Newspaper, Sparkles, SproutIcon } from "lucide-react";
import CardMission from "../CardMission";
import GlowButton from "../GlowButton";
import StarTrail from "@/assets/star-trail.svg";
import Image from "next/image";

import cloudImage from "@/assets/cloud.png";
import Dicoding from "@/assets/dicoding.png";
import Planet1 from "@/assets/palent1.png";
import Planet2 from "@/assets/planet2.png";
import Moon from "@/assets/moon.png";
import Flare from "@/assets/flare.png";
import Light1 from "@/assets/light1.png";
import BgStart from "@/assets/bgstart.png";

import Star2 from "@/assets/star2.svg";
import Star3 from "@/assets/star3.svg";
import Star5 from "@/assets/star5.svg";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [visiProgress, setVisiProgress] = useState(0);
  const visiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      if (visiContainerRef.current) {
        const element = visiContainerRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const startReveal = windowHeight * 1;
        const endReveal = windowHeight * 0.0;
        const elementTop = rect.top;

        let progress = (startReveal - elementTop) / (startReveal - endReveal);
        progress = Math.max(0, Math.min(1, progress));

        setVisiProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const highlightConfig: Record<string, { color: string; className: string }> =
    {
      mahasiswa: { color: "#FF5FFA", className: "font-bold" },
      TRPL: { color: "#FF5FFA", className: "font-bold" },
      skill: { color: "#6BECFF", className: "font-bold" },
      koneksi: { color: "#6BECFF", className: "font-bold" },
      tantangan: { color: "#FF5FFA", className: "font-bold" },
      kerja: { color: "#6BECFF", className: "font-bold" },
      nyata: { color: "#6BECFF", className: "font-bold" },
    };

  const visiDescription =
    "Membangun komunitas tempat mahasiswa TRPL mengasah skill, memperluas koneksi, dan menyiapkan diri menghadapi tantangan dunia kerja nyata.";
  const words = visiDescription.split(" ");

  return (
    <div className="min-h-screen text-white bg-[#110C4C] overflow-hidden relative font-sans">
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
        style={{
          opacity: Math.max(0, 1 - scrollY / 500),
          transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})`,
        }}
      >
        <div className="w-[300px] md:w-[800px]">
          <Image
            src={Flare}
            alt="flare"
            width={800}
            height={800}
            className="opacity-60 mix-blend-screen animate-pulse w-full h-auto"
            priority
          />
        </div>
      </div>

      <div
        className="absolute -top-10 -left-10 md:-top-20 md:-left-20 z-10 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <div className="animate-float-slow w-32 md:w-[400px]">
          <Image
            src={Planet1}
            alt="planet 1"
            width={400}
            height={400}
            className="object-contain w-full h-auto"
            priority
          />
        </div>
      </div>

      <div
        className="absolute top-0 left-0 z-10 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <div className="animate-float-medium w-48 md:w-[500px]">
          <Image
            src={Light1}
            alt="light"
            width={500}
            height={500}
            className="opacity-70 mix-blend-screen w-full h-auto"
            priority
          />
        </div>
      </div>

      <div
        className="absolute top-20 right-4 md:top-32 md:right-24 z-0 pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${scrollY * -0.4}px)` }}
      >
        <div className="animate-float-fast w-16 md:w-[120px]">
          <Image
            src={Moon}
            alt="moon"
            width={120}
            height={120}
            className="object-contain opacity-90 w-full h-auto"
          />
        </div>
      </div>

      <div
        className="absolute top-64 -right-12 md:top-80 md:-right-24 z-20 pointer-events-none transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${scrollY * 0.1}px) rotate(${
            scrollY * 0.05
          }deg)`,
        }}
      >
        <div className="animate-float-slow delay-300 w-48 md:w-[600px]">
          <Image
            src={Planet2}
            alt="planet 2"
            width={600}
            height={600}
            className="object-contain w-full h-auto"
          />
        </div>
      </div>

      <div
        className="h-screen relative z-10 space-y-6 md:space-y-8 flex flex-col items-center justify-center
                   bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
                   from-[#8F39C1]/30 to-transparent to-70% px-4"
      >
        <div
          className="space-y-2 md:space-y-4 text-center relative z-30 mt-[-50px] md:mt-0"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <p className="font-primary text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-2xl animate-fade-in-up tracking-wide">
            GITERPAL HUB
          </p>
          <p className="font-secondary text-base md:text-xl lg:text-2xl text-center text-white/90 max-w-xs md:max-w-2xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
            Together We Learn, Together We Grow!
          </p>
        </div>

        <div
          className="relative z-30 animate-fade-in-up delay-300"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <GlowButton>
            <p className="px-4 md:px-0">MULAI</p>
          </GlowButton>
        </div>

        <div className="absolute bottom-24 md:bottom-8 md:left-24 md:translate-x-0 text-center md:text-left z-20 animate-fade-in-up delay-300 w-full md:w-auto">
          <h2 className="font-secondary mb-2 text-sm md:text-md text-white/70">
            Part of
          </h2>
          <div className="flex justify-center md:justify-start">
            <Image
              src={Dicoding}
              width={200}
              height={60}
              alt="dicoding"
              className="opacity-90 hover:opacity-100 transition-opacity w-32 md:w-[200px] h-auto"
            />
          </div>
        </div>
      </div>

      <div className="min-h-screen md:h-[120vh] flex flex-col items-center justify-center relative z-20 bg-[#110C4C]/95 backdrop-blur-sm shadow-[0_-20px_50px_rgba(17,12,76,1)] overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none mix-blend-lighten">
          <Image
            src={BgStart}
            alt="Star Pattern"
            fill
            className="object-cover"
          />
        </div>

        <div
          className="absolute top-10 left-5 md:left-[20%] z-10 pointer-events-none animate-float-slow"
          style={{
            transform: `translateY(${scrollY * -0.05}px) rotate(-15deg)`,
          }}
        >
          <Image
            src={Star5}
            alt="Star"
            width={300}
            className="w-24 md:w-[300px] drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
        </div>
        <div
          className="absolute top-1/3 right-5 md:right-[15%] z-10 pointer-events-none animate-float-medium"
          style={{ transform: `translateY(${scrollY * -0.08}px)` }}
        >
          <Image
            src={Star3}
            alt="Star"
            width={78}
            className="w-10 md:w-[78px] animate-pulse-slow"
          />
        </div>
        <div
          className="absolute bottom-32 left-8 md:left-[30%] z-10 pointer-events-none animate-float-fast"
          style={{ transform: `translateY(${scrollY * 0.03}px) rotate(45deg)` }}
        >
          <Image
            src={Star2}
            alt="Star"
            width={78}
            className="w-10 md:w-[78px]"
          />
        </div>

        <div
          className="text-center max-w-4xl space-y-6 md:space-y-8 relative z-20 px-6 md:px-4"
          ref={visiContainerRef}
        >
          <h2 className="font-primary text-4xl md:text-6xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Visi
          </h2>

          <p className="text-xl md:text-3xl leading-relaxed md:leading-loose font-secondary text-white/90 flex flex-wrap justify-center gap-x-1.5 gap-y-1 md:gap-x-2">
            {words.map((word, index) => {
              const cleanWord = word.replace(/[,.]/g, "");
              const config = highlightConfig[cleanWord];
              const baseColor = config ? config.color : "#ffffff";
              const extraClass = config ? config.className : "";
              const skeletonColor = config ? config.color : "#ffffff";
              const totalWords = words.length;
              const threshold = index / totalWords;
              const isRevealed = visiProgress > threshold;

              return (
                <span
                  key={index}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${extraClass} ${
                    !isRevealed ? "animate-pulse" : ""
                  }`}
                  style={{
                    backgroundColor: isRevealed ? "transparent" : skeletonColor,
                    color: isRevealed ? baseColor : "transparent",
                    transform: isRevealed ? "scale(1)" : "scale(0.9)",
                    borderRadius: "2px",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      <div className="min-h-[140vh] md:min-h-[160vh] relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#110C4C] to-[#267FAB] to-[110%] py-20 pb-40 md:pb-0">
        <div>
          <Image
            src={StarTrail}
            alt="star"
            fill
            className="object-cover z-10 animate-spin-slow mt-32 md:mt-64 opacity-40 mix-blend-overlay"
          />
        </div>

        <div className="relative z-20 text-center space-y-8 md:space-y-10 px-4 w-full max-w-7xl">
          <h2 className="font-primary text-4xl md:text-5xl font-bold">Misi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            <CardMission
              number="01"
              icon={<SproutIcon className="w-10 h-10 md:w-12 md:h-12" />}
              description="Meningkatkan skill, Bukan Hanya Teori."
            />
            <CardMission
              number="02"
              icon={<Newspaper className="w-10 h-10 md:w-12 md:h-12" />}
              description="Memberikan informasi terbaru dan cepat."
            />
            <CardMission
              number="03"
              icon={<BicepsFlexed className="w-10 h-10 md:w-12 md:h-12" />}
              description="Memberikan tantangan dan studi kasus."
            />
            <CardMission
              number="04"
              icon={<Sparkles className="w-10 h-10 md:w-12 md:h-12" />}
              description="Setiap Studi kasus setidaknya berstandar."
            />
          </div>
        </div>

        <div className="absolute z-30 bottom-0 left-0 w-full pointer-events-none translate-y-[1px]">
          <Image
            src={cloudImage}
            alt="cloud"
            className="w-full h-auto object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
