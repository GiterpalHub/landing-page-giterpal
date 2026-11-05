"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import ButtonWithIcon from "../ui/button-with-icon";
import BlurOutUp from "../ui/blur-out-up";
import { articles } from "@/lib/data/articles";
import CardArtikel from "../CardArtikel";

export default function Article() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topCapRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGPolygonElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const applyParallax = useCallback(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const rect = sectionEl.getBoundingClientRect();
    const vh = window.innerHeight || 1;

    // Progress as the section enters from bottom of viewport (rect.top = vh) to top (rect.top = 0)
    const rawEntry = (vh - rect.top) / vh;
    const entryProgress = Math.max(0, Math.min(1, rawEntry));

    // Cubic ease-out for content settling smoothly into place
    const contentRaw = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.88)));
    const eased = 1 - Math.pow(1 - contentRaw, 3);

    // Slanted top cap parallax: sweeps upward faster than scroll to cover "Apa Kata Mereka"
    if (topCapRef.current) {
      const capY = (1 - entryProgress) * 65 - entryProgress * 95;
      topCapRef.current.style.transform = `translate3d(0, ${capY}px, 0)`;
    }

    // Secondary parallax on the translucent lavender diagonal wedge (always <= 0 so it never pokes below white layer)
    if (ribbonRef.current) {
      const ribbonOffset = -entryProgress * 16;
      ribbonRef.current.style.transform = `translate3d(0, ${ribbonOffset}px, 0)`;
    }

    // Header parallax
    if (headerRef.current) {
      const headerY = (1 - eased) * 65;
      headerRef.current.style.transform = `translate3d(0, ${headerY}px, 0)`;
    }

    // Staggered parallax across the 3 article cards
    const cardOffsets = [85, 115, 145];
    cardRefs.current.forEach((cardEl, index) => {
      if (!cardEl) return;
      const baseOffset = cardOffsets[index] ?? 100;
      const cardY = (1 - eased) * baseOffset;
      cardEl.style.transform = `translate3d(0, ${cardY}px, 0)`;
    });

    // Bottom CTA parallax
    if (ctaRef.current) {
      const ctaY = (1 - eased) * 75;
      ctaRef.current.style.transform = `translate3d(0, ${ctaY}px, 0)`;
    }
  }, []);

  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useLenis(() => {
    applyParallax();
  });

  useEffect(() => {
    applyParallax();

    // Fallback native scroll listener only if Lenis is not active
    const onScroll = () => {
      if (!lenisRef.current) {
        applyParallax();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", applyParallax);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", applyParallax);
    };
  }, [applyParallax]);

  return (
    <div
      ref={sectionRef}
      className="relative z-20 -mt-[105vh] flex flex-col justify-center overflow-x-clip"
    >
      {/* Slanted diagonal entry overlapping "Apa Kata Mereka" */}
      <div
        aria-hidden="true"
        className="relative w-full h-24 sm:h-32 md:h-44 pointer-events-none select-none z-0"
      >
        <div
          ref={topCapRef}
          className="w-full will-change-transform"
        >
          <svg
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            className="relative z-0 w-full h-24 sm:h-32 md:h-44 block"
          >
            {/* Translucent lavender diagonal band (bottom edge stays diagonal & tucked inside white polygon) */}
            <polygon
              ref={ribbonRef}
              points="0,14 1440,94 1440,174 0,42"
              fill="#9D75F5"
              fillOpacity="0.65"
              className="will-change-transform"
            />
            {/* Main white diagonal surface sloping down from left to right */}
            <polygon
              points="0,28 1440,164 1440,184 0,184"
              fill="#FFFFFF"
            />
          </svg>
          {/* Extended solid white skirt overlapping SVG bottom so parallax translation never exposes a seam */}
          <div className="relative z-10 w-full h-56 bg-white -mt-2" />
        </div>
      </div>

      {/* Main white content body */}
      <div className="relative z-10 bg-white -mt-2 pt-4 sm:pt-8 pb-20 sm:pb-28 md:pb-36 px-6 sm:px-8 md:px-12">
        <div
          ref={headerRef}
          className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-14 gap-6 will-change-transform"
        >
          <BlurOutUp
            as="h2"
            text="Artikel"
            className="font-primary text-4xl sm:text-5xl md:text-[54px] font-bold text-[#110C4C] leading-none tracking-tight"
          />
          <BlurOutUp
            as="p"
            text="Temukan berita artikel yang sesuai dengan minat. Kami menyajikan berbagai macam artikel yang membahas tentang teknologi. Silakan klik judul artikel untuk membaca lebih lanjut."
            staggerDelay={2}
            className="md:text-right font-secondary text-xs sm:text-sm text-[#110C4C]/80 max-w-md leading-relaxed"
          />
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 mb-14">
          {articles.map((item, i) => (
            <div
              key={item.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="will-change-transform h-full"
            >
              <CardArtikel theme="light" {...item} />
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="flex justify-center items-center will-change-transform"
        >
          <ButtonWithIcon href="/articles" variant="light">
            Jelajahi Artikel
          </ButtonWithIcon>
        </div>
      </div>
    </div>
  );
}
