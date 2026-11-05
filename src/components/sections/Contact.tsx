"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import Footer from "../layout/Footer";
import DotBorderButton from "../ui/dot-border-button";
import InteractiveEyes from "../ui/interactive-eyes";
import Star2 from "@/assets/star2.svg";
import Star3 from "@/assets/star3.svg";

const UprightSparkle = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    className={className}
    style={style}
  >
    <path
      d="M16 0C16.8 9.2 22.8 15.2 32 16C22.8 16.8 16.8 22.8 16 32C15.2 22.8 9.2 16.8 0 16C9.2 15.2 15.2 9.2 16 0Z"
      fill="#FFFFFF"
    />
  </svg>
);

const AnimatedText = ({
  text,
  isVisible,
  baseDelayMs = 0,
  staggerMs = 26,
  className = "",
}: {
  text: string;
  isVisible: boolean;
  baseDelayMs?: number;
  staggerMs?: number;
  className?: string;
}) => (
  <span
    className={`inline-flex whitespace-nowrap ${className}`}
    aria-label={text}
  >
    {text.split("").map((char, idx) => (
      <span
        key={idx}
        aria-hidden="true"
        className="inline-block will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0) scale(1)"
            : "translateY(38%) scale(0.92)",
          filter: isVisible ? "blur(0px)" : "blur(8px)",
          animation: isVisible
            ? `contact-char-in 640ms cubic-bezier(0.16, 1, 0.3, 1) ${
                baseDelayMs + idx * staggerMs
              }ms both`
            : "none",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);

const GITERPAL_REPEATS = Array.from({ length: 6 });

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const heroBlockRef = useRef<HTMLDivElement>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(-200);
  const velocityRef = useRef(0);
  const lastScrollYRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Trigger entrance choreography when section enters viewport
  useEffect(() => {
    const el = heroBlockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderTrackPosition = useCallback(() => {
    const trackEl = trackRef.current;
    const groupEl = groupRef.current;
    if (!trackEl || !groupEl) return;

    const groupWidth = groupEl.offsetWidth || 1;
    const wrappedX =
      (((offsetRef.current % groupWidth) + groupWidth) % groupWidth) -
      groupWidth;
    trackEl.style.transform = `translate3d(${wrappedX}px, 0, 0)`;
  }, []);

  const startInertiaLoop = useCallback(() => {
    if (rafIdRef.current !== null) return;

    const tick = () => {
      offsetRef.current += velocityRef.current;
      // Smooth exponential friction so the roll coasts/glides after user stops scrolling
      velocityRef.current *= 0.945;

      renderTrackPosition();

      if (Math.abs(velocityRef.current) > 0.04) {
        rafIdRef.current = window.requestAnimationFrame(tick);
      } else {
        velocityRef.current = 0;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = window.requestAnimationFrame(tick);
  }, [renderTrackPosition]);

  const handleScrollDelta = useCallback(
    (currentScrollY: number) => {
      if (lastScrollYRef.current === null) {
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (Math.abs(delta) < 0.05 || Math.abs(delta) > 400) return;

      // Feed scroll delta into horizontal momentum velocity
      velocityRef.current = Math.max(
        -42,
        Math.min(42, velocityRef.current - delta * 0.22)
      );
      startInertiaLoop();
    },
    [startInertiaLoop]
  );

  useLenis(({ scroll }) => {
    handleScrollDelta(scroll);
  });

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    renderTrackPosition();

    const onNativeScroll = () => {
      handleScrollDelta(window.scrollY);
    };

    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("resize", renderTrackPosition);

    return () => {
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", renderTrackPosition);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScrollDelta, renderTrackPosition]);

  return (
    <div className="relative z-20 bg-[linear-gradient(180deg,#34116C_0%,#220B4D_38%,#0F0528_100%)] overflow-x-clip flex flex-col justify-between">
      <style>{`
        @keyframes contact-char-in {
          0% {
            opacity: 0;
            transform: translateY(38%) scale(0.92);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes contact-bubble-up {
          0% {
            opacity: 0;
            transform: translateY(34px) scale(0.84);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes contact-bubble-down {
          0% {
            opacity: 0;
            transform: translateY(-34px) scale(0.84);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes contact-pop-in {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-8deg);
          }
          72% {
            opacity: 1;
            transform: scale(1.12) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes contact-qmark-pop {
          0% {
            opacity: 0;
            transform: scale(0) translateY(14px) rotate(-18deg);
            filter: blur(4px);
          }
          70% {
            opacity: 1;
            transform: scale(1.18) translateY(-4px) rotate(4deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
            filter: blur(0px);
          }
        }
      `}</style>

      {/* Ambient background radial glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[520px] h-[520px] bg-[#6D28D9]/35 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[460px] h-[460px] bg-[#4C1D95]/25 rounded-full blur-[140px]" />
      </div>

      {/* Main CTA Hero Content (taller section height & larger typography block) */}
      <div className="relative z-10 min-h-[90vh] md:min-h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-32 sm:pt-40 md:pt-52 pb-24 sm:pb-32 md:pb-40">
        <div
          ref={heroBlockRef}
          className="relative inline-flex flex-col items-center"
        >
          {/* 5 Decorative 4-Point Sparkle Stars matching exact positions in design */}
          {/* 1. Small upright star above 'N' of INGIN */}
          <UprightSparkle
            className="absolute -top-10 sm:-top-14 left-[20%] w-4 h-4 sm:w-5 sm:h-5 opacity-95 pointer-events-none"
            style={{
              opacity: isVisible ? 0.95 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              animation: isVisible
                ? "contact-pop-in 520ms cubic-bezier(0.22, 1, 0.36, 1) 260ms both"
                : "none",
            }}
          />

          {/* 2. Upper-left tilted star */}
          <div
            className="absolute -top-6 sm:-top-8 -left-6 sm:-left-16 md:-left-28 lg:-left-32 pointer-events-none select-none"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              animation: isVisible
                ? "contact-pop-in 560ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both"
                : "none",
            }}
          >
            <Image
              src={Star3}
              alt=""
              width={96}
              height={96}
              className="w-14 sm:w-20 md:w-24 h-auto animate-float-slow"
            />
          </div>

          {/* 3. Upper-right large tilted star */}
          <div
            className="absolute -top-8 sm:-top-12 -right-6 sm:-right-16 md:-right-28 lg:-right-36 pointer-events-none select-none"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              animation: isVisible
                ? "contact-pop-in 560ms cubic-bezier(0.22, 1, 0.36, 1) 380ms both"
                : "none",
            }}
          >
            <Image
              src={Star2}
              alt=""
              width={125}
              height={125}
              className="w-20 sm:w-24 md:w-32 lg:w-36 h-auto animate-float-medium"
            />
          </div>

          {/* 4. Bottom-left large tilted star */}
          <div
            className="absolute -bottom-8 sm:-bottom-10 -left-6 sm:-left-14 md:-left-24 lg:-left-28 pointer-events-none select-none"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              animation: isVisible
                ? "contact-pop-in 560ms cubic-bezier(0.22, 1, 0.36, 1) 740ms both"
                : "none",
            }}
          >
            <Image
              src={Star2}
              alt=""
              width={125}
              height={125}
              className="w-20 sm:w-24 md:w-32 lg:w-36 h-auto animate-float-fast"
            />
          </div>

          {/* 5. Bottom-right small upright star */}
          <UprightSparkle
            className="absolute -bottom-4 sm:-bottom-5 right-[4%] sm:right-0 w-5 h-5 sm:w-6 sm:h-6 opacity-95 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
            style={{
              opacity: isVisible ? 0.95 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              animation: isVisible
                ? "contact-pop-in 520ms cubic-bezier(0.22, 1, 0.36, 1) 960ms both"
                : "none",
            }}
          />

          {/* 4-Line Aligned Typography + Graphic Block */}
          <div className="inline-flex flex-col items-stretch select-none font-primary font-bold text-white uppercase tracking-tight leading-[1.1] text-[30px] sm:text-6xl md:text-[74px] lg:text-[88px] xl:text-[96px]">
            {/* Row 1: INGIN + Purple Speech Bubble (from bottom) + White Speech Bubble (from top) */}
            <div className="flex items-center justify-between gap-3 sm:gap-5 md:gap-6 w-full mb-2 sm:mb-3 md:mb-4">
              <AnimatedText
                text="INGIN"
                isVisible={isVisible}
                baseDelayMs={0}
                staggerMs={30}
                className="shrink-0"
              />

              {/* Long Purple Speech Bubble (tail bottom-left -> spawns from bottom) */}
              <div
                className="relative flex-1 h-6 sm:h-10 md:h-12 lg:h-14 xl:h-16 bg-[#AD4BFF] rounded-full mx-1 sm:mx-2.5 will-change-transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(34px) scale(0.84)",
                  animation: isVisible
                    ? "contact-bubble-up 700ms cubic-bezier(0.16, 1, 0.3, 1) 130ms both"
                    : "none",
                }}
              >
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 md:-bottom-3 left-5 sm:left-8 md:left-10 w-4 h-3 sm:w-5 sm:h-3.5 md:w-6 md:h-4 text-[#AD4BFF]"
                  viewBox="0 0 18 12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="4,0 18,0 0,12" />
                </svg>
              </div>

              {/* Short White Speech Bubble (tail top-right -> spawns from top) */}
              <div
                className="relative w-14 sm:w-24 md:w-32 lg:w-36 xl:w-44 h-6 sm:h-10 md:h-12 lg:h-14 xl:h-16 bg-white rounded-full shrink-0 will-change-transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(-34px) scale(0.84)",
                  animation: isVisible
                    ? "contact-bubble-down 700ms cubic-bezier(0.16, 1, 0.3, 1) 250ms both"
                    : "none",
                }}
              >
                <svg
                  className="absolute -top-2 sm:-top-2.5 md:-top-3 right-4 sm:right-6 md:right-8 w-4 h-3 sm:w-5 sm:h-3.5 md:w-6 md:h-4 text-white"
                  viewBox="0 0 18 12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="0,12 14,12 18,0" />
                </svg>
              </div>
            </div>

            {/* Row 2: MENDISKUSIKAN (sets the exact block width) */}
            <div className="flex items-center justify-center w-full mb-2 sm:mb-3 md:mb-4">
              <AnimatedText
                text="MENDISKUSIKAN"
                isVisible={isVisible}
                baseDelayMs={200}
                staggerMs={22}
              />
            </div>

            {/* Row 3: Outlined Pill (elongates 0 -> 100%) + SEBUAH + Two Almond Eyes (pop) */}
            <div className="flex items-center justify-between gap-3 sm:gap-5 md:gap-6 w-full mb-2 sm:mb-3 md:mb-4">
              {/* Stable flex-1 wrapper so row layout remains anchored */}
              <div className="flex-1 flex items-center justify-start">
                <div
                  className="h-5 sm:h-8 md:h-10 lg:h-11 border-[2px] sm:border-[3px] border-[#AD4BFF] rounded-full flex items-center justify-start px-3 sm:px-5 md:px-6 overflow-hidden"
                  style={{
                    width: isVisible ? "100%" : "18%",
                    opacity: isVisible ? 1 : 0,
                    transition:
                      "width 780ms cubic-bezier(0.16, 1, 0.3, 1) 360ms, opacity 300ms ease-out 360ms",
                  }}
                >
                  <span
                    className="h-[2px] sm:h-[3px] bg-white rounded-full block"
                    style={{
                      width: isVisible ? "100%" : "0%",
                      opacity: isVisible ? 1 : 0,
                      transition:
                        "width 740ms cubic-bezier(0.16, 1, 0.3, 1) 460ms, opacity 280ms ease-out 460ms",
                    }}
                  />
                </div>
              </div>

              <AnimatedText
                text="SEBUAH"
                isVisible={isVisible}
                baseDelayMs={460}
                staggerMs={28}
                className="shrink-0"
              />

              {/* Pair of Interactive Purple Almond Eyes (pops in + tracks cursor + natural blinks) */}
              <InteractiveEyes isVisible={isVisible} spawnDelayMs={580} />
            </div>

            {/* Row 4: Long Purple Arrow (elongates 0 -> 100%) + PROJEK + ? (pops at end) */}
            <div className="flex items-center justify-between gap-3 sm:gap-5 md:gap-6 w-full">
              {/* Stable flex-1 wrapper so PROJEK? stays anchored while arrow grows toward it */}
              <div className="flex-1 flex items-center justify-start pr-1">
                <div
                  className="flex items-center overflow-visible"
                  style={{
                    width: isVisible ? "100%" : "0%",
                    opacity: isVisible ? 1 : 0,
                    transition:
                      "width 820ms cubic-bezier(0.16, 1, 0.3, 1) 650ms, opacity 280ms ease-out 650ms",
                  }}
                >
                  <div className="flex-1 min-w-0 h-[3.5px] sm:h-[5px] md:h-[6px] lg:h-[7px] bg-[#AD4BFF] rounded-l-full" />
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 -ml-3.5 sm:-ml-5 text-[#AD4BFF] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 4L18 12L7 20"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <span className="shrink-0 inline-flex items-baseline">
                <AnimatedText
                  text="PROJEK"
                  isVisible={isVisible}
                  baseDelayMs={740}
                  staggerMs={30}
                />
                <span
                  className="inline-block origin-bottom will-change-transform"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0)",
                    animation: isVisible
                      ? "contact-qmark-pop 580ms cubic-bezier(0.22, 1, 0.36, 1) 980ms both"
                      : "none",
                  }}
                >
                  ?
                </span>
              </span>
            </div>
          </div>

          {/* KONTAK KAMI Dot Border Button */}
          <div
            className="mt-8 sm:mt-12 md:mt-14"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(22px)",
              transition:
                "opacity 680ms cubic-bezier(0.16, 1, 0.3, 1) 1080ms, transform 680ms cubic-bezier(0.16, 1, 0.3, 1) 1080ms",
            }}
          >
            <DotBorderButton href="mailto:giterpal@gmail.com">
              KONTAK KAMI
            </DotBorderButton>
          </div>
        </div>
      </div>

      {/* Giant Edge-to-Edge GITERPAL Text right above Footer (Scroll-Driven with Inertia/Momentum Decay) */}
      <div
        aria-hidden="true"
        className="relative z-10 w-full pointer-events-none select-none overflow-hidden pb-3 sm:pb-4"
      >
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          <div ref={groupRef} className="flex items-center shrink-0">
            {GITERPAL_REPEATS.map((_, idx) => (
              <span
                key={`a-${idx}`}
                className="font-primary font-bold uppercase text-white/[0.14] text-6xl sm:text-8xl md:text-[118px] lg:text-[140px] leading-none tracking-[0.04em]"
              >
                GITERPAL
              </span>
            ))}
          </div>
          <div className="flex items-center shrink-0">
            {GITERPAL_REPEATS.map((_, idx) => (
              <span
                key={`b-${idx}`}
                className="font-primary font-bold uppercase text-white/[0.14] text-6xl sm:text-8xl md:text-[118px] lg:text-[140px] leading-none tracking-[0.04em]"
              >
                GITERPAL
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
