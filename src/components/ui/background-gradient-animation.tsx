"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight aurora background.
 *
 * Performance notes (vs. the original SVG "goo" version):
 * - No SVG filter / CSS blur: each blob is a radial-gradient that already fades to
 *   transparent, so edges are soft without any per-frame filter work.
 * - No mix-blend-mode: avoids forcing the browser to re-blend overlapping full-screen layers.
 * - Blobs only animate `transform` (GPU compositor only, no repaint).
 * - CSS animations are paused and the pointer rAF loop stops while the section is off-screen.
 * - Pointer loop sleeps once the blob reaches its target; disabled on touch devices.
 * - Respects prefers-reduced-motion.
 */
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
  /** Kept for API compatibility; ignored in the lightweight version. */
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
  size = "75vmax",
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;
    const pointerEnabled = interactive && canHover && !reduceMotion;

    let inView = false;
    let rafId: number | null = null;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const setPlayState = (running: boolean) => {
      container.style.setProperty(
        "--aurora-play-state",
        running && !reduceMotion ? "running" : "paused"
      );
    };

    const tick = () => {
      curX += (tgX - curX) * 0.06;
      curY += (tgY - curY) * 0.06;
      if (pointerRef.current) {
        pointerRef.current.style.transform = `translate3d(${curX.toFixed(
          1
        )}px, ${curY.toFixed(1)}px, 0)`;
      }
      // Sleep once the blob has settled; wake again on the next mousemove
      if (inView && Math.abs(tgX - curX) + Math.abs(tgY - curY) > 0.5) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!inView) return;
      const rect = container.getBoundingClientRect();
      tgX = event.clientX - rect.left - rect.width / 2;
      tgY = event.clientY - rect.top - rect.height / 2;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        setPlayState(inView);
        if (!inView && rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0 }
    );

    setPlayState(false);
    observer.observe(container);
    if (pointerEnabled) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [interactive]);

  // `closest-side` guarantees the gradient reaches full transparency exactly at the
  // element's edge, so blobs never show a hard clipped border at any aspect ratio.
  const blob = (color: string, alpha: number) =>
    `radial-gradient(circle closest-side, rgba(${color}, ${alpha}) 0%, rgba(${color}, ${(
      alpha * 0.5
    ).toFixed(2)}) 40%, rgba(${color}, ${(alpha * 0.15).toFixed(
      2
    )}) 70%, rgba(${color}, 0) 100%)`;

  // Square blobs sized in vmax so they stay perfectly round on 16:9, ultrawide and portrait
  const blobBase =
    "absolute w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] will-change-transform";

  return (
    <div
      ref={containerRef}
      style={
        {
          "--size": size,
          "--aurora-play-state": "paused",
          background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        } as React.CSSProperties
      }
      className={cn(
        "h-full w-full relative overflow-hidden top-0 left-0",
        containerClassName
      )}
    >
      <style>{`
        @keyframes aurora-vertical {
          0%, 100% { transform: translate3d(0, -30%, 0); }
          50% { transform: translate3d(0, 30%, 0); }
        }
        @keyframes aurora-horizontal {
          0%, 100% { transform: translate3d(-35%, -8%, 0); }
          50% { transform: translate3d(35%, 8%, 0); }
        }
        @keyframes aurora-circle {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .aurora-blob {
          animation-play-state: var(--aurora-play-state, paused) !important;
        }
      `}</style>

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className={cn(blobBase, "aurora-blob")}
          style={{
            background: blob(firstColor, 0.7),
            animation: "aurora-vertical 26s ease-in-out infinite",
          }}
        />
        <div
          className={cn(blobBase, "aurora-blob")}
          style={{
            background: blob(secondColor, 0.55),
            transformOrigin: "calc(50% - 320px) 50%",
            animation: "aurora-circle 22s linear infinite reverse",
          }}
        />
        <div
          className={cn(blobBase, "aurora-blob")}
          style={{
            background: blob(thirdColor, 0.6),
            transformOrigin: "calc(50% + 320px) 50%",
            animation: "aurora-circle 34s linear infinite",
          }}
        />
        <div
          className={cn(blobBase, "aurora-blob")}
          style={{
            background: blob(fourthColor, 0.5),
            animation: "aurora-horizontal 30s ease-in-out infinite",
          }}
        />
        <div
          className={cn(blobBase, "aurora-blob")}
          style={{
            background: blob(fifthColor, 0.75),
            transformOrigin: "calc(50% - 480px) calc(50% + 480px)",
            animation: "aurora-circle 28s ease-in-out infinite",
          }}
        />

        {interactive && (
          <div
            ref={pointerRef}
            className="absolute w-[60vmax] h-[60vmax] top-[calc(50%-30vmax)] left-[calc(50%-30vmax)] will-change-transform"
            style={{ background: blob(pointerColor, 0.45) }}
          />
        )}
      </div>

      {children && (
        <div className={cn("relative z-10", className)}>{children}</div>
      )}
    </div>
  );
};

export default BackgroundGradientAnimation;
