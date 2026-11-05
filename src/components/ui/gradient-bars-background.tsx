"use client";

import React from "react";

export interface GradientBarsProps {
  numBars?: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  animationDuration?: number;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
}

export const GradientBars: React.FC<GradientBarsProps> = ({
  numBars = 15,
  gradientFrom = "rgba(173, 75, 255, 0.68)",
  gradientVia = "rgba(124, 58, 237, 0.34)",
  gradientTo = "transparent",
  animationDuration = 3.2,
  minHeight = 24,
  maxHeight = 66,
  className = "",
}) => {
  const calculateHeight = (index: number, total: number) => {
    if (total <= 1) return maxHeight;
    const position = index / (total - 1);

    const center = 0.5;
    const distanceFromCenter = Math.abs(position - center);
    const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2);

    return minHeight + (maxHeight - minHeight) * heightPercentage;
  };

  const backgroundGradient = gradientVia
    ? `linear-gradient(to top, ${gradientFrom} 0%, ${gradientVia} 48%, ${gradientTo} 100%)`
    : `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`;

  return (
    <>
      <style>{`
        @keyframes pulseBar {
          0% {
            transform: scaleY(var(--initial-scale));
            opacity: 0.95;
          }
          100% {
            transform: scaleY(calc(var(--initial-scale) * 0.68));
            opacity: 0.62;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className={`absolute inset-0 z-0 overflow-hidden pointer-events-none select-none ${className}`}
      >
        <div
          className="flex h-full"
          style={{
            width: "100%",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {Array.from({ length: numBars }).map((_, index) => {
            const height = calculateHeight(index, numBars);
            return (
              <div
                key={index}
                style={
                  {
                    flex: `1 0 calc(100% / ${numBars})`,
                    maxWidth: `calc(100% / ${numBars})`,
                    height: "100%",
                    background: backgroundGradient,
                    transform: `scaleY(${height / 100})`,
                    transformOrigin: "bottom",
                    transition: "transform 0.5s ease-in-out",
                    animation: `pulseBar ${animationDuration}s ease-in-out infinite alternate`,
                    animationDelay: `${index * 0.14}s`,
                    outline: "1px solid rgba(0, 0, 0, 0)",
                    boxSizing: "border-box",
                    willChange: "transform, opacity",
                    "--initial-scale": height / 100,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export interface ComponentProps {
  numBars?: number;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  animationDuration?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export default function Component({
  numBars = 15,
  gradientFrom = "rgba(173, 75, 255, 0.55)",
  gradientVia = "rgba(118, 58, 245, 0.26)",
  gradientTo = "transparent",
  animationDuration = 3.2,
  backgroundColor = "#12052C",
  children,
}: ComponentProps) {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <GradientBars
        numBars={numBars}
        gradientFrom={gradientFrom}
        gradientVia={gradientVia}
        gradientTo={gradientTo}
        animationDuration={animationDuration}
      />

      {children && (
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
          {children}
        </div>
      )}
    </section>
  );
}

export { Component };
