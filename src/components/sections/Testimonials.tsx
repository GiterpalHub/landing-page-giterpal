"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import Avatar from "@/assets/Avatar.png";

const testimonialsData = [
  {
    id: 1,
    name: "ARDHANA",
    role: "Mahasiswa TRPL",
    text: "Komunitas yang sangat suportif untuk eksplorasi teknologi baru dan kolaborasi proyek nyata.",
    x: -16,
    y: -12,
    z: -700,
  },
  {
    id: 2,
    name: "ALPIN",
    role: "Frontend Developer",
    text: "Diskusi UI/UX dan arsitektur frontend di Giterpal bikin skill ngoding naik level jauh lebih cepat!",
    x: 18,
    y: 12,
    z: -1450,
  },
  {
    id: 3,
    name: "FAJAR",
    role: "UI/UX Designer",
    text: "Tempat terbaik buat mengubah ide desain dari sekadar prototipe Figma menjadi produk digital utuh.",
    x: -20,
    y: 14,
    z: -2200,
  },
  {
    id: 4,
    name: "SITI",
    role: "Product Manager",
    text: "Alur kerja tim dan manajemen proyek di komunitas ini benar-benar melatih kesiapan industri.",
    x: 15,
    y: -15,
    z: -2950,
  },
  {
    id: 5,
    name: "BUDI",
    role: "Tech Lead",
    text: "Budaya code review dan berbagi ilmu di Giterpal Hub membantu menjaga standar kode tetap rapi.",
    x: -14,
    y: -8,
    z: -3700,
  },
  {
    id: 6,
    name: "RIZKY",
    role: "Web Developer",
    text: "Berawal dari belajar bareng, sekarang sudah berani bangun dan rilis aplikasi web sendiri.",
    x: 20,
    y: 8,
    z: -4450,
  },
  {
    id: 7,
    name: "LINDA",
    role: "Backend Engineer",
    text: "Integrasi API dan perancangan database jadi jauh lebih mudah dipahami lewat sesi mentoring.",
    x: -18,
    y: 16,
    z: -5200,
  },
  {
    id: 8,
    name: "DANI",
    role: "Fullstack Developer",
    text: "Ekosistem belajar yang seru, penuh inovasi, dan selalu relevan dengan kebutuhan teknologi saat ini.",
    x: 16,
    y: -12,
    z: -5950,
  },
  {
    id: 9,
    name: "EKA",
    role: "QA Engineer",
    text: "Kolaborasi lintas divisi yang solid membuat setiap rilis karya komunitas terasa lebih matang.",
    x: -15,
    y: 10,
    z: -6700,
  },
  {
    id: 10,
    name: "YANTI",
    role: "Data Enthusiast",
    text: "Sangat terinspirasi dengan semangat teman-teman TRPL dalam memecahkan masalah lewat teknologi!",
    x: 14,
    y: -6,
    z: -7450,
  },
];

const HEADING_WORDS = ["Apa", "Kata", "Mereka"];

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Total characters including spaces between words
  const totalChars = HEADING_WORDS.join(" ").length;

  const updateScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const vw = window.innerWidth || 1;
    const isMobile = vw < 768;

    const scrollDistance = Math.max(1, rect.height - vh);
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollDistance));

    // Start typing slightly before the sticky container locks at top: 0
    // so the user never sees a static ghosted heading while scrolling in
    const entryLead = Math.max(0, Math.min(1, (vh * 0.55 - rect.top) / (vh * 0.55 + scrollDistance * 0.16)));

    // Phase timings (aligned so all cards finish before Article's -mt-[105vh] covers the viewport at ~0.75)
    const PHASE_ZOOM_START = 0.16;
    const PHASE_ZOOM_END = 0.28;
    const PHASE_CARDS_START = 0.19;
    const PHASE_CARDS_END = 0.76;

    // 1. Update individual letters of "Apa Kata Mereka"
    const exactCharPos = entryLead * totalChars;
    letterRefs.current.forEach((span, idx) => {
      if (!span) return;
      // Smooth per-character activation instead of binary step
      const charProgress = Math.max(0, Math.min(1, (exactCharPos - idx + 1.2) / 1.8));
      const easedChar = charProgress * charProgress * (3 - 2 * charProgress);

      const opacity = 0.14 + easedChar * 0.86;
      const translateY = (1 - easedChar) * 14;
      const scale = 0.88 + easedChar * 0.12;

      span.style.opacity = opacity.toFixed(3);
      span.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    });

    // 2. Update heading zoom-through transition
    if (headingWrapRef.current) {
      if (progress <= PHASE_ZOOM_START) {
        headingWrapRef.current.style.opacity = "1";
        headingWrapRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
        headingWrapRef.current.style.visibility = "visible";
      } else if (progress >= PHASE_ZOOM_END) {
        headingWrapRef.current.style.opacity = "0";
        headingWrapRef.current.style.visibility = "hidden";
      } else {
        const zoomT = (progress - PHASE_ZOOM_START) / (PHASE_ZOOM_END - PHASE_ZOOM_START);
        const easedZoom = zoomT * zoomT;
        const scale = 1 + easedZoom * 1.45;
        const opacity = 1 - smoothstep(0, 0.92, zoomT);

        headingWrapRef.current.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
        headingWrapRef.current.style.opacity = opacity.toFixed(3);
        headingWrapRef.current.style.transform = `translate3d(0, 0, 0) scale(${scale.toFixed(3)})`;
      }
    }

    // 3. Update 3D fly-through cards continuously (no preserve-3d flattening, no scale jumps)
    const rawCardsProgress =
      (progress - PHASE_CARDS_START) / (PHASE_CARDS_END - PHASE_CARDS_START);
    const cardsProgress = Math.max(0, Math.min(1.08, rawCardsProgress));
    const totalTravel = 8150;
    const xFactor = isMobile ? 0.32 : 1;
    const yFactor = isMobile ? 0.72 : 1;

    testimonialsData.forEach((item, idx) => {
      const cardEl = cardRefs.current[idx];
      if (!cardEl) return;

      if (progress < PHASE_CARDS_START - 0.02) {
        cardEl.style.visibility = "hidden";
        cardEl.style.opacity = "0";
        return;
      }

      const currentZ = item.z + cardsProgress * totalTravel;

      // Smooth fade-in in deep space (-3400 to -1200) and smooth fade-out before camera plane (+120 to +480)
      let opacity = 0;
      if (currentZ >= -3400 && currentZ <= 480) {
        const fadeIn = smoothstep(-3400, -1200, currentZ);
        const fadeOut = 1 - smoothstep(120, 480, currentZ);
        opacity = fadeIn * fadeOut;
      }

      if (opacity <= 0.005) {
        cardEl.style.visibility = "hidden";
        cardEl.style.opacity = "0";
        return;
      }

      const offsetX = item.x * xFactor;
      const offsetY = item.y * yFactor;

      cardEl.style.visibility = "visible";
      cardEl.style.opacity = opacity.toFixed(3);
      cardEl.style.transform = `translate3d(${offsetX.toFixed(2)}vw, ${offsetY.toFixed(2)}vh, ${currentZ.toFixed(1)}px)`;
    });
  }, [totalChars]);

  useLenis(() => {
    updateScene();
  });

  useEffect(() => {
    updateScene();
    window.addEventListener("scroll", updateScene, { passive: true });
    window.addEventListener("resize", updateScene);
    return () => {
      window.removeEventListener("scroll", updateScene);
      window.removeEventListener("resize", updateScene);
    };
  }, [updateScene]);

  // Precompute global character index so words stay grouped and never break mid-word
  let globalCharCounter = 0;

  return (
    <div
      ref={containerRef}
      className="relative h-[480vh] bg-[#4A148C] z-10 font-secondary select-none"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: "900px" }}
      >
        {/* Ambient cosmic glow backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.28)_0%,rgba(74,20,140,0)_68%)]"
        />

        {/* Center Heading ("Apa Kata Mereka") */}
        <div
          ref={headingWrapRef}
          className="absolute z-40 flex flex-col items-center justify-center pointer-events-none text-center px-6 w-full will-change-transform"
        >
          <h2
            aria-label="Apa Kata Mereka"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[104px] font-primary font-bold text-white drop-shadow-[0_8px_32px_rgba(17,12,76,0.5)] tracking-tight leading-[1.1] flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 md:gap-x-6 gap-y-2"
          >
            {HEADING_WORDS.map((word, wIdx) => {
              const wordChars = word.split("").map((char) => {
                const currentIdx = globalCharCounter++;
                return { char, idx: currentIdx };
              });
              // Account for space between words
              if (wIdx < HEADING_WORDS.length - 1) {
                globalCharCounter++;
              }

              return (
                <span key={wIdx} className="inline-flex whitespace-nowrap">
                  {wordChars.map(({ char, idx }) => (
                    <span
                      key={idx}
                      ref={(el) => {
                        letterRefs.current[idx] = el;
                      }}
                      className="inline-block will-change-transform"
                      style={{
                        opacity: 0.14,
                        transform: "translate3d(0, 14px, 0) scale(0.88)",
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              );
            })}
          </h2>
        </div>

        {/* 3D Cards Stage (pure preserve-3d without parent opacity flattening) */}
        <div
          className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {testimonialsData.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{
                visibility: "hidden",
                opacity: 0,
                zIndex: testimonialsData.length - idx,
                background:
                  "linear-gradient(135deg, rgba(42, 16, 88, 0.94) 0%, rgba(22, 8, 52, 0.96) 100%)",
              }}
              className="absolute p-5 sm:p-6 rounded-2xl border border-white/15 shadow-[0_18px_44px_rgba(10,3,26,0.55),inset_0_1px_1px_rgba(255,255,255,0.18)] flex items-start sm:items-center gap-4 w-[290px] sm:w-[370px] md:w-[440px] will-change-transform"
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full p-0.5 bg-gradient-to-tr from-[#AD4BFF] to-[#6BECFF] shadow-[0_0_16px_rgba(173,75,255,0.45)]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#1A083B]">
                  <Image
                    src={Avatar}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0 text-white font-secondary">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h3 className="text-base sm:text-lg font-primary font-bold uppercase text-white tracking-wide truncate">
                    {item.name}
                  </h3>
                  <span className="text-[11px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#AD4BFF]/20 border border-[#AD4BFF]/40 text-[#E9D5FF] shrink-0">
                    {item.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal mt-1">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Soft edge vignette behind the heading but framing the 3D tunnel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_38%,#4A148C_100%)] z-30"
        />
      </div>
    </div>
  );
}
