"use client";

import { useEffect, useState, useRef } from "react";
import { useLenis } from "lenis/react";
import CardMission from "../CardMission";
import GlowButton from "../GlowButton";
import BlurOutUp from "../ui/blur-out-up";
import StarTrail from "@/assets/star-trail.svg";
import Image from "next/image";

import cloudImage from "@/assets/cloud.svg";
import Planet1 from "@/assets/palent1.png";
import Planet2 from "@/assets/planet2.png";
import Moon from "@/assets/moon.png";
import Flare from "@/assets/flare.png";
import Light1 from "@/assets/light1.png";
import BgStart from "@/assets/bgstart.png";

import Star2 from "@/assets/star2.svg";
import Star3 from "@/assets/star3.svg";
import Star5 from "@/assets/star5.svg";
import StarLeftText from "@/assets/star left text.svg";
import StarRightText from "@/assets/star right text.svg";
import RocketImg from "@/assets/Rocket.png";
import FlareRocket from "@/assets/flare rocket.png";
import IconMisi1 from "@/assets/icon misi/1.svg";
import IconMisi2 from "@/assets/icon misi/2.svg";
import IconMisi3 from "@/assets/icon misi/3.svg";
import IconMisi4 from "@/assets/icon misi/4.svg";

export default function Hero() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  const [visiProgress, setVisiProgress] = useState(0);

  // Section & Parallax DOM Refs (Direct DOM transforms for 120fps zero-rerender parallax)
  const visiSectionRef = useRef<HTMLDivElement>(null);
  const bgStartRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const planet1Ref = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const planet2Ref = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const star5Ref = useRef<HTMLDivElement>(null);
  const star3Ref = useRef<HTMLDivElement>(null);
  const star2Ref = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  // Sticky One-Way Spill State Refs
  const visiTargetRef = useRef(0);
  const visiCurrentRef = useRef(0);
  const isVisiCompleteRef = useRef(false);
  const spillRafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  // Rocket Inertial Glide Refs (coasts smoothly after user stops scrolling)
  const rocketTargetDeltaRef = useRef(0);
  const rocketCurrentDeltaRef = useRef(0);
  const rocketInitRef = useRef(false);
  const rocketRafRef = useRef<number | null>(null);

  useEffect(() => {
    const renderRocketTransform = (delta: number) => {
      if (!rocketRef.current) return;
      const vw = window.innerWidth || 1440;
      const responsiveScale = Math.min(1.15, Math.max(0.48, vw / 1440));
      const rocketX = delta * 0.48 * responsiveScale;
      const rocketY = delta * -0.25 * responsiveScale;
      rocketRef.current.style.transform = `translate3d(${rocketX}px, ${rocketY}px, 0)`;
    };

    const stepRocketInertia = () => {
      const diff = rocketTargetDeltaRef.current - rocketCurrentDeltaRef.current;
      if (Math.abs(diff) > 0.15) {
        rocketCurrentDeltaRef.current += diff * 0.045;
        renderRocketTransform(rocketCurrentDeltaRef.current);
        rocketRafRef.current = window.requestAnimationFrame(stepRocketInertia);
      } else {
        rocketCurrentDeltaRef.current = rocketTargetDeltaRef.current;
        renderRocketTransform(rocketCurrentDeltaRef.current);
        rocketRafRef.current = null;
      }
    };

    const startRocketRaf = () => {
      if (rocketRafRef.current === null) {
        rocketRafRef.current = window.requestAnimationFrame(stepRocketInertia);
      }
    };

    const applyParallax = (currentScroll: number) => {
      const vh = window.innerHeight || 800;
      const heroScroll = Math.min(currentScroll, vh * 1.6);
      const moonScroll = Math.min(currentScroll, vh * 1.85);

      if (bgStartRef.current) {
        bgStartRef.current.style.transform = `translate3d(0, ${heroScroll * 0.32}px, 0)`;
      }
      if (lightRef.current) {
        lightRef.current.style.transform = `translate3d(0, ${heroScroll * 0.45}px, 0)`;
      }
      if (flareRef.current) {
        flareRef.current.style.transform = `translate3d(0, calc(-50% + ${heroScroll * 0.5}px), 0)`;
      }
      if (planet1Ref.current) {
        planet1Ref.current.style.transform = `translate3d(0, ${heroScroll * 0.52}px, 0)`;
      }
      if (moonRef.current) {
        moonRef.current.style.transform = `translate3d(0, ${moonScroll * 0.85}px, 0)`;
      }
      if (planet2Ref.current) {
        planet2Ref.current.style.transform = `translate3d(0, ${heroScroll * 0.16}px, 0)`;
      }
      if (heroTextRef.current) {
        heroTextRef.current.style.transform = `translate3d(0, ${heroScroll * -0.22}px, 0)`;
      }

      const visiOffset = currentScroll - vh;
      if (star5Ref.current) {
        star5Ref.current.style.transform = `translate3d(0, ${visiOffset * -0.28}px, 0)`;
      }
      if (star3Ref.current) {
        star3Ref.current.style.transform = `translate3d(0, ${visiOffset * -0.35}px, 0)`;
      }
      if (star2Ref.current) {
        star2Ref.current.style.transform = `translate3d(0, ${visiOffset * -0.22}px, 0)`;
      }

      // Rocket diagonal launch trajectory with inertial glide after scroll stops
      if (rocketRef.current) {
        const rocketDelta = currentScroll - vh * 2.05;
        const clampedDelta = Math.max(-vh * 0.9, Math.min(vh * 0.7, rocketDelta));
        rocketTargetDeltaRef.current = clampedDelta;

        if (!rocketInitRef.current) {
          rocketInitRef.current = true;
          rocketCurrentDeltaRef.current = clampedDelta;
          renderRocketTransform(clampedDelta);
        } else {
          startRocketRaf();
        }
      }
    };

    const stepSpillAnimation = () => {
      const diff = visiTargetRef.current - visiCurrentRef.current;
      if (Math.abs(diff) > 0.002) {
        visiCurrentRef.current += diff * 0.22;
      } else {
        visiCurrentRef.current = visiTargetRef.current;
      }

      if (visiTargetRef.current >= 1 && visiCurrentRef.current >= 0.985) {
        visiCurrentRef.current = 1;
        isVisiCompleteRef.current = true;
        setVisiProgress(1);
        spillRafRef.current = null;
        return;
      }

      setVisiProgress(visiCurrentRef.current);

      if (Math.abs(visiTargetRef.current - visiCurrentRef.current) > 0.002) {
        spillRafRef.current = window.requestAnimationFrame(stepSpillAnimation);
      } else {
        spillRafRef.current = null;
      }
    };

    const startSpillRaf = () => {
      if (spillRafRef.current === null) {
        spillRafRef.current = window.requestAnimationFrame(stepSpillAnimation);
      }
    };

    const getPinY = () => {
      return visiSectionRef.current?.offsetTop ?? window.innerHeight;
    };

    const snapToPinY = (pinY: number) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(pinY, { immediate: true });
      } else {
        window.scrollTo(0, pinY);
      }
    };

    const handleScroll = () => {
      const currentScroll = lenisRef.current
        ? lenisRef.current.scroll
        : window.scrollY;
      const pinY = getPinY();

      // Only clamp if user dragged native scrollbar significantly past pinY (> pinY + 6px)
      if (
        !isVisiCompleteRef.current &&
        currentScroll > pinY + 6 &&
        lastScrollYRef.current <= pinY + 80
      ) {
        const overshoot = currentScroll - pinY;
        visiTargetRef.current = Math.min(
          1,
          visiTargetRef.current + overshoot / 700
        );
        startSpillRaf();
        snapToPinY(pinY);
        lastScrollYRef.current = pinY;
        applyParallax(pinY);
        return;
      }

      lastScrollYRef.current = currentScroll;
      if (!lenisRef.current) {
        applyParallax(currentScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isVisiCompleteRef.current) return;

      // Only intercept downward scroll; scrolling up is always free and goes straight back to Hero
      if (e.deltaY <= 0) return;

      const pinY = getPinY();
      const currentScroll = lenisRef.current
        ? lenisRef.current.scroll
        : window.scrollY;
      const targetScroll = lenisRef.current?.targetScroll ?? currentScroll;
      const nextTarget = targetScroll + e.deltaY;

      // If this downward scroll reaches or is at Section 2 (while coming from Hero/Section 2)
      if (nextTarget >= pinY && currentScroll <= pinY + 120) {
        e.preventDefault();
        e.stopPropagation();

        if (lenisRef.current) {
          // Only set targetScroll to pinY once so Lenis glides smoothly without resetting or snapping
          if (Math.abs(lenisRef.current.targetScroll - pinY) > 0.5) {
            lenisRef.current.scrollTo(pinY);
          }
        } else {
          window.scrollTo(0, pinY);
        }

        // Once Section 2 is arriving/pinned in viewport, spill the words
        if (currentScroll >= pinY - 260) {
          const step = Math.min(
            0.16,
            Math.max(0.035, Math.abs(e.deltaY) / 650)
          );
          visiTargetRef.current = Math.min(1, visiTargetRef.current + step);
          startSpillRaf();
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isVisiCompleteRef.current || e.touches.length === 0) return;

      const currentTouchY = e.touches[0].clientY;
      const deltaY = touchStartY - currentTouchY;
      touchStartY = currentTouchY;

      // Only intercept downward scroll (finger swiping up)
      if (deltaY <= 0) return;

      const pinY = getPinY();
      const currentScroll = lenisRef.current
        ? lenisRef.current.scroll
        : window.scrollY;

      if (currentScroll >= pinY - 45 && currentScroll <= pinY + 120) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();

        if (
          lenisRef.current &&
          Math.abs(lenisRef.current.targetScroll - pinY) > 1
        ) {
          lenisRef.current.scrollTo(pinY);
        }

        const step = Math.min(0.16, Math.max(0.02, deltaY / 450));
        visiTargetRef.current = Math.min(1, visiTargetRef.current + step);
        startSpillRaf();
      }
    };

    const onLenisScroll = (e: { scroll: number }) => {
      lastScrollYRef.current = e.scroll;
      applyParallax(e.scroll);
    };

    const activeLenis = lenisRef.current;
    if (activeLenis) {
      activeLenis.on("scroll", onLenisScroll);
    }

    applyParallax(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });

    return () => {
      if (activeLenis) {
        activeLenis.off("scroll", onLenisScroll);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, {
        capture: true,
      });
      window.removeEventListener("touchmove", handleTouchMove, {
        capture: true,
      });
      if (spillRafRef.current !== null) {
        window.cancelAnimationFrame(spillRafRef.current);
      }
      if (rocketRafRef.current !== null) {
        window.cancelAnimationFrame(rocketRafRef.current);
      }
    };
  }, [lenis]);

  const scrollOneScreen = () => {
    const pinY = visiSectionRef.current?.offsetTop ?? window.innerHeight;
    if (lenis) {
      lenis.scrollTo(pinY, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: pinY,
        left: 0,
        behavior: "smooth",
      });
    }
  };

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
  const isAllSpilled = visiProgress >= 0.5;

  return (
    <div className="min-h-screen text-white bg-[#110C4C] overflow-hidden relative font-sans">
      {/* Continuous Ambient Purple Glow (Spans smoothly across Hero & Visi so there is zero boundary seam) */}
      <div
        className="absolute top-0 left-0 right-0 h-[220vh] z-0 pointer-events-none
                   bg-[radial-gradient(ellipse_65%_42%_at_22%_14%,rgba(143,57,193,0.42)_0%,rgba(111,46,214,0.16)_42%,rgba(17,12,76,0)_75%)]"
      />

      {/* Continuous Background Starfield across Hero & Visi */}
      <div
        ref={bgStartRef}
        className="absolute top-0 left-0 right-0 h-[240vh] z-0 opacity-45 pointer-events-none mix-blend-lighten will-change-transform"
      >
        <Image
          src={BgStart}
          alt="Star Pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* HERO FIRST SCREEN */}
      <div className="relative h-screen w-full flex flex-col items-center justify-center px-4 z-10">
        {/* Ambient Top-Left Light Glow */}
        <div
          ref={lightRef}
          className="absolute -top-[12%] -left-[4%] z-10 pointer-events-none will-change-transform"
        >
          <div className="animate-float-medium w-72 sm:w-96 md:w-[55vw] max-w-[760px]">
            <Image
              src={Light1}
              alt="light"
              width={760}
              height={760}
              className="opacity-75 mix-blend-screen w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Lens Flare (Sits behind Planet 1's bottom-right rim and stretches across upper sky) */}
        <div
          ref={flareRef}
          className="absolute left-[-5%] top-[29%] w-[96%] max-w-none z-10 pointer-events-none will-change-transform
                     [mask-image:radial-gradient(ellipse_85%_75%_at_45%_50%,black_45%,transparent_95%)]"
          style={{
            transform: "translate3d(0, -50%, 0)",
          }}
        >
          <Image
            src={Flare}
            alt="flare"
            width={1920}
            height={1080}
            className="opacity-95 mix-blend-screen w-full h-auto"
            priority
          />
        </div>

        {/* Planet 1 (Top-Left Corner, glides down in parallax when scrolling toward Section 2) */}
        <div
          ref={planet1Ref}
          className="absolute -left-[18%] -top-[10%] sm:-left-[15%] sm:-top-[18%] md:-left-[15%] md:-top-[22%] z-20 pointer-events-none will-change-transform"
        >
          <div className="animate-float-slow w-[60vw] sm:w-[46vw] md:w-[41vw] max-w-[620px]">
            <Image
              src={Planet1}
              alt="planet 1"
              width={620}
              height={620}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Moon (Top-Right Sky, strong depth parallax lag so it lingers in view as you scroll down) */}
        <div
          ref={moonRef}
          className="absolute top-[15%] right-[4%] md:top-[16%] md:right-[4.5%] z-20 pointer-events-none will-change-transform"
        >
          <div className="animate-float-fast w-24 sm:w-[135px] md:w-[13.2vw] max-w-[200px]">
            <Image
              src={Moon}
              alt="moon"
              width={200}
              height={200}
              className="object-contain opacity-95 drop-shadow-[0_0_25px_rgba(180,230,255,0.2)] w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Planet 2 (Large Ringed Planet in Bottom-Right, glides smoothly into Section 2) */}
        <div
          ref={planet2Ref}
          className="absolute left-[10%] sm:left-[25%] md:left-[35.5%] top-[62%] sm:top-[57%] md:top-[54%] z-20 pointer-events-none will-change-transform"
        >
          <div className="animate-float-slow delay-300 w-[125vw] sm:w-[105vw] md:w-[96vw] max-w-none">
            <Image
              src={Planet2}
              alt="planet 2"
              width={1400}
              height={638}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Center Hero Typography & CTA (Rises faster than the planets to accentuate depth) */}
        <div
          ref={heroTextRef}
          className="relative z-30 flex flex-col items-center space-y-5 md:space-y-7 -mt-12 md:-mt-10 will-change-transform"
        >
          <div className="space-y-2 md:space-y-4 text-center">
            <BlurOutUp
              as="h1"
              text="GITERPAL HUB"
              className="font-primary text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] tracking-wider leading-none"
            />
            <div>
              <BlurOutUp
                as="p"
                text="Together We Learn, Together We Grow!"
                staggerDelay={4}
                className="font-secondary text-sm sm:text-base md:text-xl lg:text-[22px] text-center text-white/90 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed"
              />
            </div>
          </div>

          <div className="animate-fade-in-up delay-300 pt-1">
            <GlowButton
              onClick={scrollOneScreen}
              className="rounded-full px-8 py-3.5 text-sm md:text-base tracking-wider shadow-[0_0_28px_rgba(192,132,252,0.75),0_0_14px_rgba(255,255,255,0.85)] hover:shadow-[0_0_36px_rgba(192,132,252,0.95),0_0_20px_rgba(255,255,255,1)] hover:scale-105"
            >
              <span>MULAI</span>
            </GlowButton>
          </div>
        </div>
      </div>

      {/* VISI SECTION (Locks viewport on downward scroll until all words spill; scrolling up goes straight to Hero) */}
      <div
        ref={visiSectionRef}
        className="h-screen flex flex-col items-center justify-center relative z-20 px-6 md:px-4"
      >
        {/* Top-Right Ambient Star */}
        <div
          ref={star5Ref}
          className="absolute top-6 right-[8%] md:right-[15%] z-10 pointer-events-none will-change-transform"
        >
          <Image
            src={Star5}
            alt="Star"
            width={180}
            className="w-16 md:w-[160px] animate-float-slow drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
        </div>

        {/* Upper-Left 4-Point Star framing the Rocket launch path (matches design reference) */}
        <div
          ref={star2Ref}
          className="absolute bottom-6 sm:bottom-10 left-[10%] sm:left-[18%] md:left-[23%] z-10 pointer-events-none will-change-transform"
        >
          <Image
            src={Star2}
            alt="Star"
            width={96}
            className="w-12 sm:w-16 md:w-[88px] animate-float-fast"
          />
        </div>

        <div className="text-center max-w-4xl space-y-6 md:space-y-8 relative z-30">
          {/* Decorative Outlined Stars behind left & right edges of Visi text (slides outward from center on complete spill) */}
          <div
            className={`absolute -left-6 sm:-left-12 md:-left-16 -top-2 md:-top-4 z-0 pointer-events-none select-none ${
              isAllSpilled
                ? "translate-x-0 translate-y-0 scale-100 opacity-80"
                : "translate-x-[calc(50vw-3rem)] sm:translate-x-[260px] md:translate-x-[420px] translate-y-6 scale-50 opacity-0"
            }`}
            style={{
              transition:
                "transform 0.8s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.8s cubic-bezier(0.85, 0, 0.15, 1)",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={StarLeftText}
              alt=""
              width={267}
              height={267}
              className="w-28 sm:w-40 md:w-[210px] h-auto"
            />
          </div>
          <div
            className={`absolute -right-4 sm:-right-8 md:-right-12 -bottom-4 md:-bottom-6 z-0 pointer-events-none select-none ${
              isAllSpilled
                ? "translate-x-0 translate-y-0 scale-100 opacity-80"
                : "-translate-x-[calc(50vw-3rem)] sm:-translate-x-[260px] md:-translate-x-[420px] -translate-y-6 scale-50 opacity-0"
            }`}
            style={{
              transition:
                "transform 0.8s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.8s cubic-bezier(0.85, 0, 0.15, 1)",
              willChange: "transform, opacity",
            }}
          >
            <Image
              src={StarRightText}
              alt=""
              width={170}
              height={177}
              className="w-20 sm:w-28 md:w-[140px] h-auto"
            />
          </div>

          <BlurOutUp
            as="h2"
            text="Visi"
            className="relative z-10 font-primary text-4xl md:text-6xl font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
          />

          <p className="relative z-10 text-xl md:text-3xl leading-relaxed md:leading-loose font-secondary text-white/90 flex flex-wrap justify-center gap-x-1.5 gap-y-1 md:gap-x-2">
            {words.map((word, index) => {
              const cleanWord = word.replace(/[,.]/g, "");
              const config = highlightConfig[cleanWord];
              const baseColor = config ? config.color : "#ffffff";
              const extraClass = config ? config.className : "";
              const skeletonColor = config ? config.color : "#ffffff";
              const totalWords = words.length;
              const threshold = (index + 0.5) / totalWords;
              const isRevealed = visiProgress >= threshold;

              return (
                <span
                  key={index}
                  className={`transition-all duration-300 ease-out ${extraClass} ${
                    isRevealed
                      ? "drop-shadow-[0_0_30px_rgba(0,0,0,0.25)]"
                      : "drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
                  }`}
                  style={{
                    backgroundColor: isRevealed ? "transparent" : skeletonColor,
                    color: isRevealed ? baseColor : "transparent",
                    textShadow: isRevealed
                      ? "0 0 30px rgba(0, 0, 0, 0.25)"
                      : "none",
                    boxShadow: !isRevealed
                      ? "0 0 10px rgba(255, 255, 255, 0.25)"
                      : "none",
                    transform: isRevealed ? "scale(1)" : "scale(0.9)",
                    borderRadius: "4px",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      {/* MISI SECTION & ROCKET LAUNCH TRANSITION */}
      <div className="min-h-[140vh] md:min-h-[155vh] relative flex flex-col items-center justify-center bg-gradient-to-b from-[#110C4C] to-[#267FAB] to-[110%] pt-40 sm:pt-52 md:pt-64 pb-44 md:pb-32">
        {/* Concentric Star Trail behind Rocket & Misi (+50% scale, flows freely across section boundaries) */}
        <div className="absolute top-[42%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145vw] h-[145vw] sm:w-[150vw] sm:h-[150vw] max-w-[2200px] max-h-[2200px] min-w-[1100px] min-h-[1100px] pointer-events-none z-10 flex items-center justify-center">
          <Image
            src={StarTrail}
            alt="star trail"
            fill
            className="object-contain animate-spin-slow opacity-45 mix-blend-overlay"
          />
        </div>

        {/* ROCKET LAUNCH TRANSITION (Glides diagonally from bottom-left to top-right along its exhaust beam) */}
        <div
          ref={rocketRef}
          className="absolute -top-[11vw] sm:-top-[12vw] md:-top-[13vw] -left-[18vw] sm:-left-[16vw] md:-left-[15vw] w-[125vw] sm:w-[112vw] md:w-[105vw] max-w-[1560px] z-[15] pointer-events-none select-none will-change-transform"
        >
          <div className="relative w-full h-auto">
            <Image
              src={RocketImg}
              alt="Giterpal Rocket Launch"
              width={1536}
              height={1114}
              className="w-full h-auto object-contain drop-shadow-[0_14px_38px_rgba(8,6,42,0.55)]"
              priority
            />
            <Image
              src={FlareRocket}
              alt=""
              aria-hidden="true"
              className="
                absolute left-[72.2%] top-[37.5%] -translate-x-1/2 -translate-y-1/2
                w-[62%] h-auto object-contain pointer-events-none select-none
                mix-blend-screen animate-rocket-flare
              "
            />
          </div>
        </div>

        {/* Lower-Right 4-Point Star framing Rocket nose & Card 04 (matches Image 3) */}
        <div
          ref={star3Ref}
          className="absolute top-[17%] sm:top-[19%] md:top-[22%] right-[8%] sm:right-[12%] md:right-[15%] z-[16] pointer-events-none will-change-transform"
        >
          <Image
            src={Star3}
            alt="Star"
            width={78}
            className="w-10 sm:w-14 md:w-[74px] animate-float-medium"
          />
        </div>

        <div className="relative z-20 text-center space-y-8 md:space-y-10 px-4 w-full max-w-5xl">
          <BlurOutUp
            as="h2"
            text="Misi"
            className="font-primary text-4xl md:text-5xl font-bold drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 justify-items-center">
            <CardMission
              number="01"
              icon={
                <Image
                  src={IconMisi1}
                  alt="Icon Misi 1"
                  width={44}
                  height={44}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:brightness-0"
                />
              }
              description="Meningkatkan skill, Bukan Hanya Teori."
            />
            <CardMission
              number="02"
              icon={
                <Image
                  src={IconMisi2}
                  alt="Icon Misi 2"
                  width={44}
                  height={44}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:brightness-0"
                />
              }
              description="Memberikan informasi terbaru dan cepat."
            />
            <CardMission
              number="03"
              icon={
                <Image
                  src={IconMisi3}
                  alt="Icon Misi 3"
                  width={44}
                  height={44}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:brightness-0"
                />
              }
              description="Memberikan tantangan dan studi kasus."
            />
            <CardMission
              number="04"
              icon={
                <Image
                  src={IconMisi4}
                  alt="Icon Misi 4"
                  width={44}
                  height={44}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:brightness-0"
                />
              }
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
