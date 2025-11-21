"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Avatar from "@/assets/Avatar.png";

const testimonialsData = [
  {
    id: 1,
    name: "ARDHANA",
    role: "Mahasiswa",
    text: "Mantap aplikasinya...",
    x: 10,
    y: -10,
    z: 0,
  },
  {
    id: 2,
    name: "ALPIN",
    role: "Developer",
    text: "UI/UX memanjakan mata...",
    x: -20,
    y: 15,
    z: -1000,
  },
  {
    id: 3,
    name: "FAJAR",
    role: "Designer",
    text: "Animasi smooth banget...",
    x: 25,
    y: 5,
    z: -2000,
  },
  {
    id: 4,
    name: "SITI",
    role: "Product Manager",
    text: "Sangat membantu...",
    x: -15,
    y: -20,
    z: -3000,
  },
  {
    id: 5,
    name: "BUDI",
    role: "Tech Lead",
    text: "Code structure rapi...",
    x: 20,
    y: 25,
    z: -4000,
  },
  {
    id: 6,
    name: "RIZKY",
    role: "Frontend",
    text: "Belajar banyak dari sini...",
    x: 0,
    y: 0,
    z: -5000,
  },
  {
    id: 7,
    name: "LINDA",
    role: "Backend Dev",
    text: "API integration mudah...",
    x: -30,
    y: 10,
    z: -6000,
  },
  {
    id: 8,
    name: "DANI",
    role: "Fullstack",
    text: "Teknologi powerful...",
    x: 15,
    y: -15,
    z: -7000,
  },
  {
    id: 9,
    name: "EKA",
    role: "QA Engineer",
    text: "Bug free!...",
    x: -10,
    y: 20,
    z: -8000,
  },
  {
    id: 10,
    name: "YANTI",
    role: "Data Analyst",
    text: "Visualisasi informatif...",
    x: 30,
    y: -5,
    z: -9000,
  },
];

const HEADING_TEXT = "Apa Kata Mereka";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollDistance = rect.height - viewportHeight;

      const scrolled = -rect.top;

      let progress = scrolled / scrollDistance;

      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const PHASE_TYPING_END = 0.2;

  const PHASE_ZOOM_START = 0.2;
  const PHASE_ZOOM_END = 0.3;

  const PHASE_CARDS_START = 0.3;

  const letters = HEADING_TEXT.split("");

  const typingProgress = Math.min(1, scrollProgress / PHASE_TYPING_END);
  const visibleLetterCount = Math.floor(typingProgress * letters.length);

  let textTransform = "scale(1)";
  let textOpacity = 1;
  let textBlur = "0px";

  if (scrollProgress > PHASE_ZOOM_START) {
    const zoomRaw =
      (scrollProgress - PHASE_ZOOM_START) / (PHASE_ZOOM_END - PHASE_ZOOM_START);
    const zoom = Math.max(0, Math.min(1, zoomRaw));

    textTransform = `scale(${1 + zoom * 2})`;
    textOpacity = 1 - zoom;
    textBlur = `${zoom * 10}px`;
  }

  const showCards = scrollProgress > PHASE_CARDS_START;
  const cardsProgress = showCards
    ? (scrollProgress - PHASE_CARDS_START) / (1 - PHASE_CARDS_START)
    : 0;

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#4A148C] z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-container">
        <div
          className="absolute z-50 flex flex-col items-center justify-center pointer-events-none text-center px-4 w-full transition-transform duration-75 ease-linear"
          style={{
            opacity: textOpacity,
            transform: textTransform,
            filter: `blur(${textBlur})`,

            display: textOpacity <= 0.01 ? "none" : "flex",
          }}
        >
          <h2
            className="text-5xl md:text-9xl font-bold text-white drop-shadow-lg"
            style={{ fontFamily: "cursive" }}
          >
            {letters.map((char, index) => {
              const isTyped = index < visibleLetterCount;

              return (
                <span
                  key={index}
                  style={{
                    opacity: isTyped ? 1 : 0.1,

                    transform: isTyped
                      ? "translateY(0) scale(1)"
                      : "translateY(10px) scale(0.8)",
                    filter: isTyped ? "blur(0px)" : "blur(4px)",

                    transition: "all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    display: "inline-block",
                    whiteSpace: "pre",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h2>
        </div>

        <div
          className="relative w-full h-full flex items-center justify-center transform-style-3d"
          style={{
            visibility: showCards ? "visible" : "hidden",
            opacity: showCards ? 1 : 0,
            transition: "opacity 0.5s ease-in",
          }}
        >
          {testimonialsData.map((item) => {
            const speed = 11000;
            const currentZ = item.z + cardsProgress * speed;

            let opacity = 1;
            let scale = 1;

            if (currentZ < -2000) {
              opacity = 0.3 + (currentZ + 10000) / 20000;
              scale = 0.8;
            } else if (currentZ > 500) {
              opacity = 1 - (currentZ - 500) / 300;
              scale = 1.2;
            }

            if (currentZ < -15000 || opacity <= 0) return null;

            return (
              <div
                key={item.id}
                className="absolute p-6 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 w-[320px] md:w-[450px] backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(30, 30, 46, 0.9)",

                  transform: `translate3d(${item.x}vw, ${item.y}vh, ${currentZ}px) scale(${scale})`,
                  opacity: Math.max(0, Math.min(1, opacity)),
                  zIndex: Math.round(currentZ + 10000),
                }}
              >
                <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                  <Image
                    src={Avatar}
                    alt={item.name}
                    fill
                    className="rounded-full object-cover border-2 border-[#FFD700]"
                  />
                </div>
                <div className="text-white">
                  <h3 className="text-lg md:text-xl font-bold uppercase text-[#FFD700]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-300 mb-1">{item.role}</p>
                  <p className="text-sm text-gray-100 leading-tight">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#4A148C_100%)] z-40"></div>
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 800px; /* Field of view kamera */
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
