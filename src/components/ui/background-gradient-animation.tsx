"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "#4A148C",
  gradientBackgroundEnd = "#4A148C",
  firstColor = "139, 92, 246",
  secondColor = "192, 38, 211",
  thirdColor = "99, 102, 241",
  fourthColor = "168, 85, 247",
  fifthColor = "30, 10, 68",
  pointerColor = "173, 75, 255",
  size = "68%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const filterId = `blurMe-${useId().replace(/:/g, "")}`;

  // Use refs to store animation values instead of state
  const curXRef = useRef(0);
  const curYRef = useRef(0);
  const tgXRef = useRef(0);
  const tgYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const [isSafari, setIsSafari] = useState(false);

  // Set up Safari detection
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  // Set up animation loop and window-level mouse tracking so it works behind foreground layers
  useEffect(() => {
    if (!interactive) return;

    const handleWindowMouseMove = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // Only update target when section is near or in viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      tgXRef.current = event.clientX - rect.left - rect.width / 2;
      tgYRef.current = event.clientY - rect.top - rect.height / 2;
    };

    function animateMovement() {
      if (interactiveRef.current) {
        curXRef.current += (tgXRef.current - curXRef.current) / 20;
        curYRef.current += (tgYRef.current - curYRef.current) / 20;

        interactiveRef.current.style.transform = `translate3d(${Math.round(
          curXRef.current
        )}px, ${Math.round(curYRef.current)}px, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animateMovement);
    }

    window.addEventListener("mousemove", handleWindowMouseMove, {
      passive: true,
    });
    animationFrameRef.current = requestAnimationFrame(animateMovement);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [interactive]);

  const cssVariables = {
    "--gradient-background-start": gradientBackgroundStart,
    "--gradient-background-end": gradientBackgroundEnd,
    "--first-color": firstColor,
    "--second-color": secondColor,
    "--third-color": thirdColor,
    "--fourth-color": fourthColor,
    "--fifth-color": fifthColor,
    "--pointer-color": pointerColor,
    "--size": size,
    "--blending-value": blendingValue,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      style={cssVariables}
      className={cn(
        "h-full w-full relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <style>{`
        @keyframes bg-grad-moveHorizontal {
          0% {
            transform: translateX(-50%) translateY(-10%);
          }
          50% {
            transform: translateX(50%) translateY(10%);
          }
          100% {
            transform: translateX(-50%) translateY(-10%);
          }
        }
        @keyframes bg-grad-moveInCircle {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes bg-grad-moveVertical {
          0% {
            transform: translateY(-50%);
          }
          50% {
            transform: translateY(50%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-first {
          animation: bg-grad-moveVertical 26s ease infinite;
        }
        .animate-second {
          animation: bg-grad-moveInCircle 18s reverse infinite;
        }
        .animate-third {
          animation: bg-grad-moveInCircle 34s linear infinite;
        }
        .animate-fourth {
          animation: bg-grad-moveHorizontal 32s ease infinite;
        }
        .animate-fifth {
          animation: bg-grad-moveInCircle 22s ease infinite;
        }
      `}</style>

      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {children && <div className={cn("relative z-10", className)}>{children}</div>}

      <div
        style={
          !isSafari
            ? { filter: `url(#${filterId}) blur(40px)` }
            : undefined
        }
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari && "blur-2xl"
        )}
      >
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.82)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:center_center]",
            "animate-first",
            "opacity-95"
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.78)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-360px)]",
            "animate-second",
            "opacity-90"
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.78)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%+360px)]",
            "animate-third",
            "opacity-90"
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.75)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-180px)]",
            "animate-fourth",
            "opacity-75"
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.85)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
            "[transform-origin:calc(50%-560px)_calc(50%+560px)]",
            "animate-fifth",
            "opacity-90"
          )}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.75)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--blending-value)] w-full h-full top-0 left-0",
              "opacity-75 will-change-transform"
            )}
          />
        )}
      </div>
    </div>
  );
};

export default BackgroundGradientAnimation;
