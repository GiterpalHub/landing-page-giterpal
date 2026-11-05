"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface BlurOutUpProps {
  text?: string;
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  staggerDelay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  speed?: number;
  fps?: number;
  durationInFrames?: number;
  background?: string;
  className?: string;
  autoExit?: boolean;
  once?: boolean;
}

export const BlurOutUp = ({
  text,
  children,
  as: Component = "span",
  staggerDelay = 3,
  fontSize,
  color,
  fontWeight,
  speed = 1,
  fps = 30,
  durationInFrames = 90,
  background,
  className,
  autoExit = false,
  once = true,
}: BlurOutUpProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const rawText = text ?? (typeof children === "string" ? children : "");
  const words = rawText.trim() ? rawText.trim().split(/\s+/) : [];

  const durationMs = (durationInFrames / fps) * 1000;
  const safeSpeed = Math.max(0.01, speed);
  const frameMs = 1000 / fps;

  const enterMs = (18 * frameMs) / safeSpeed;
  const exitMs = (14 * frameMs) / safeSpeed;
  const staggerMs = (staggerDelay * frameMs) / safeSpeed;

  const exitStartMs = Math.max(
    0,
    durationMs - exitMs - (words.length - 1) * staggerMs
  );

  const inlineStyles: CSSProperties = {
    color,
    fontSize,
    fontWeight,
    backgroundColor: background,
  };

  const Comp = Component as React.ElementType;

  return (
    <Comp
      ref={containerRef}
      className={cn("inline-block", className)}
      style={inlineStyles}
    >
      <style>{`
        @keyframes framecn-bou-in {
          0% {
            opacity: 0;
            transform: translateY(14px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @keyframes framecn-bou-out {
          0% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-14px);
            filter: blur(8px);
          }
        }
      `}</style>

      {words.length > 0 ? (
        words.map((word, i) => {
          const inAnim = isVisible
            ? `framecn-bou-in ${enterMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${
                i * staggerMs
              }ms forwards`
            : "none";
          const outAnim =
            isVisible && autoExit
              ? `, framecn-bou-out ${exitMs}ms cubic-bezier(0.64, 0, 0.78, 0) ${
                  exitStartMs + i * staggerMs
                }ms forwards`
              : "";

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: i === words.length - 1 ? 0 : "0.28em",
                opacity: 0,
                transform: "translateY(14px)",
                filter: "blur(8px)",
                animation: isVisible ? `${inAnim}${outAnim}` : "none",
                willChange: "transform, opacity, filter",
              }}
            >
              {word}
            </span>
          );
        })
      ) : (
        children
      )}
    </Comp>
  );
};

export default BlurOutUp;
