"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import Avatar from "@/assets/Avatar.png";
import Signature, { type SignatureHandle } from "../ui/signature";

const testimonialsData = [
  {
    id: 1,
    name: "ARDHANA",
    text: "Komunitas yang sangat suportif untuk eksplorasi teknologi baru dan kolaborasi proyek nyata.",
    x: -16,
    y: -12,
    z: -700,
  },
  {
    id: 2,
    name: "ALPIN",
    text: "Diskusi UI/UX dan arsitektur frontend di Giterpal bikin skill ngoding naik level jauh lebih cepat!",
    x: 18,
    y: 12,
    z: -1450,
  },
  {
    id: 3,
    name: "FAJAR",
    text: "Tempat terbaik buat mengubah ide desain dari sekadar prototipe Figma menjadi produk digital utuh.",
    x: -20,
    y: 14,
    z: -2200,
  },
  {
    id: 4,
    name: "SITI",
    text: "Alur kerja tim dan manajemen proyek di komunitas ini benar-benar melatih kesiapan industri.",
    x: 15,
    y: -15,
    z: -2950,
  },
  {
    id: 5,
    name: "BUDI",
    text: "Budaya code review dan berbagi ilmu di Giterpal Hub membantu menjaga standar kode tetap rapi.",
    x: -14,
    y: -8,
    z: -3700,
  },
  {
    id: 6,
    name: "RIZKY",
    text: "Berawal dari belajar bareng, sekarang sudah berani bangun dan rilis aplikasi web sendiri.",
    x: 20,
    y: 8,
    z: -4450,
  },
  {
    id: 7,
    name: "LINDA",
    text: "Integrasi API dan perancangan database jadi jauh lebih mudah dipahami lewat sesi mentoring.",
    x: -18,
    y: 16,
    z: -5200,
  },
  {
    id: 8,
    name: "DANI",
    text: "Ekosistem belajar yang seru, penuh inovasi, dan selalu relevan dengan kebutuhan teknologi saat ini.",
    x: 16,
    y: -12,
    z: -5950,
  },
  {
    id: 9,
    name: "EKA",
    text: "Kolaborasi lintas divisi yang solid membuat setiap rilis karya komunitas terasa lebih matang.",
    x: -15,
    y: 10,
    z: -6700,
  },
  {
    id: 10,
    name: "YANTI",
    text: "Sangat terinspirasi dengan semangat teman-teman TRPL dalam memecahkan masalah lewat teknologi!",
    x: 14,
    y: -6,
    z: -7450,
  },
];

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SignatureHandle>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    // Phase timings aligned so all cards finish before Article's -mt-[105vh] covers the viewport at ~0.75
    const PHASE_TYPING_END = 0.21;
    const PHASE_ZOOM_START = 0.25;
    const PHASE_ZOOM_END = 0.35;
    const PHASE_CARDS_START = 0.27;
    const PHASE_CARDS_END = 0.76;

    // Scroll-driven handwriting progress:
    // Starts drawing as the centered heading rises into the lower-middle viewport (-0.25 * vh)
    // and completes while pinned at center (PHASE_TYPING_END * scrollDistance)
    const typingStartScrolled = -0.25 * vh;
    const typingEndScrolled = PHASE_TYPING_END * scrollDistance;
    const typingProgress = Math.max(
      0,
      Math.min(
        1,
        (scrolled - typingStartScrolled) /
          Math.max(1, typingEndScrolled - typingStartScrolled)
      )
    );
    signatureRef.current?.setProgress(typingProgress);

    // Heading zoom-through transition into 3D space
    if (headingWrapRef.current) {
      if (progress <= PHASE_ZOOM_START) {
        headingWrapRef.current.style.opacity = "1";
        headingWrapRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
        headingWrapRef.current.style.visibility = "visible";
      } else if (progress >= PHASE_ZOOM_END) {
        headingWrapRef.current.style.opacity = "0";
        headingWrapRef.current.style.visibility = "hidden";
      } else {
        const zoomT =
          (progress - PHASE_ZOOM_START) / (PHASE_ZOOM_END - PHASE_ZOOM_START);
        const easedZoom = zoomT * zoomT;
        const scale = 1 + easedZoom * 1.6;
        const opacity = 1 - smoothstep(0, 0.92, zoomT);

        headingWrapRef.current.style.visibility =
          opacity <= 0.01 ? "hidden" : "visible";
        headingWrapRef.current.style.opacity = opacity.toFixed(3);
        headingWrapRef.current.style.transform = `translate3d(0, 0, 0) scale(${scale.toFixed(3)})`;
      }
    }

    // Update 3D fly-through cards continuously (pure preserve-3d)
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
  }, []);

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

  return (
    <div
      ref={containerRef}
      className="relative h-[500vh] bg-[#4A148C] z-10 font-secondary select-none"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ perspective: "800px" }}
      >
        {/* Center Heading ("Apa Kata Mereka" with Componentry Signature handwriting effect) */}
        <div
          ref={headingWrapRef}
          className="absolute z-50 flex flex-col items-center justify-center pointer-events-none text-center px-4 w-full will-change-transform"
        >
          <Signature
            ref={signatureRef}
            text="Apa Kata Mereka"
            color="#FFFFFF"
            fontSize={72}
            scrollDriven={true}
            className="max-w-[92vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-auto drop-shadow-[0_8px_32px_rgba(17,12,76,0.65)]"
          />
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
                backgroundColor: "rgba(30, 30, 46, 0.92)",
              }}
              className="absolute p-5 sm:p-6 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 w-[290px] sm:w-[360px] md:w-[440px] will-change-transform font-secondary"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                <Image
                  src={Avatar}
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="rounded-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 text-white font-secondary">
                <h3 className="text-base sm:text-lg md:text-xl font-bold uppercase text-white tracking-wide mb-1">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-snug font-normal">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Original radial vignette matching #4A148C seamlessly */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#4A148C_100%)] z-40"
        />
      </div>
    </div>
  );
}
