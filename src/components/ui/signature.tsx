"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import type { Font } from "opentype.js";
import { cn } from "@/lib/utils";

export interface SignatureRef {
  setProgress: (progress: number) => void;
}

export interface SignatureProps {
  /** Text to generate signature for */
  text?: string;
  /** Color of the signature path */
  color?: string;
  /** Font size of the signature */
  fontSize?: number;
  /** Animation duration in seconds (for time-based animation) */
  duration?: number;
  /** Delay before animation starts in seconds (for time-based animation) */
  delay?: number;
  /** Direct scroll progress between 0 and 1 (enables scroll-driven animation) */
  scrollProgress?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate when in view (for time-based animation) */
  inView?: boolean;
  /** Only animate once (for time-based animation) */
  once?: boolean;
  /** Custom font URL to load */
  fontUrl?: string;
}

export const Signature = forwardRef<SignatureRef, SignatureProps>(
  (
    {
      text = "Signature",
      color = "currentColor",
      fontSize = 32,
      duration = 1.5,
      delay = 0,
      scrollProgress,
      className,
      inView = false,
      once = true,
      fontUrl,
    },
    ref
  ) => {
    const [paths, setPaths] = useState<string[]>([]);
    const [width, setWidth] = useState<number>(300);
    const height = fontSize * 3;
    const horizontalPadding = fontSize * 0.15;
    const topMargin = fontSize * 1.5;
    const baseline = topMargin;
    const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

    const isScrollDriven = scrollProgress !== undefined || ref !== null;

    const maskPathRefs = useRef<(SVGPathElement | null)[]>([]);
    const outlinePathRefs = useRef<(SVGPathElement | null)[]>([]);
    const validIndicesRef = useRef<number[]>([]);
    const currentProgressRef = useRef<number>(scrollProgress ?? 0);

    const applyProgress = useCallback((p: number) => {
      currentProgressRef.current = p;
      const valid = validIndicesRef.current;
      const count = valid.length;
      if (count === 0) return;

      const clampedP = Math.max(0, Math.min(1, p));
      const charSpan = 1.35 / count;

      valid.forEach((charIndex, i) => {
        const startI = (i / count) * (1 - charSpan * 0.25);
        const charP = Math.max(0, Math.min(1, (clampedP - startI) / charSpan));
        const offset = (1 - charP).toFixed(4);
        const opacity = charP > 0.005 ? "1" : "0";

        const maskEl = maskPathRefs.current[charIndex];
        if (maskEl) {
          maskEl.style.strokeDashoffset = offset;
          maskEl.style.opacity = opacity;
        }

        const outlineEl = outlinePathRefs.current[charIndex];
        if (outlineEl) {
          outlineEl.style.strokeDashoffset = offset;
          outlineEl.style.opacity = opacity;
        }
      });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        setProgress: (p: number) => {
          applyProgress(p);
        },
      }),
      [applyProgress]
    );

    useEffect(() => {
      if (scrollProgress !== undefined) {
        applyProgress(scrollProgress);
      }
    }, [scrollProgress, applyProgress]);

    useEffect(() => {
      let isCancelled = false;

      async function load() {
        try {
          const otModule = await import("opentype.js");
          const otUnknown: unknown = otModule;
          const otDefault = (
            otUnknown as { default?: { parse?: (buffer: ArrayBuffer) => Font } }
          )?.default;
          const parseFont =
            otDefault?.parse ??
            (otUnknown as { parse?: (buffer: ArrayBuffer) => Font }).parse;

          if (!parseFont) {
            throw new Error("opentype parse function not found");
          }

          let font: Font | undefined;
          const fontPaths = fontUrl
            ? [fontUrl]
            : [
                "/LastoriaBoldRegular.otf",
                "https://www.componentry.fun/LastoriaBoldRegular.otf",
              ];

          for (const path of fontPaths) {
            try {
              const res = await fetch(path);
              if (!res.ok) continue;
              const buffer = await res.arrayBuffer();
              font = parseFont(buffer);
              if (font) break;
            } catch {
              // Try next fallback path
            }
          }

          if (!font) {
            throw new Error("Font could not be loaded from any path");
          }

          if (isCancelled) return;

          let x = horizontalPadding;
          const newPaths: string[] = [];
          const validIndices: number[] = [];

          for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const glyph = font.charToGlyph(char);
            const path = glyph.getPath(x, baseline, fontSize);
            const pathData = path.toPathData(3);
            newPaths.push(pathData);

            if (pathData && pathData.trim().length > 0) {
              validIndices.push(i);
            }

            const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
            x += advanceWidth * (fontSize / font.unitsPerEm);
          }

          if (!isCancelled) {
            validIndicesRef.current = validIndices;
            setPaths(newPaths);
            setWidth(Math.max(1, x + horizontalPadding));
          }
        } catch (error) {
          console.error("Signature component font load error:", error);
          if (!isCancelled) {
            setPaths([]);
            setWidth(text.length * fontSize * 0.6);
          }
        }
      }

      load();

      return () => {
        isCancelled = true;
      };
    }, [text, fontSize, baseline, horizontalPadding, fontUrl]);

    // Apply latest progress whenever paths finish loading
    useEffect(() => {
      if (paths.length > 0 && isScrollDriven) {
        applyProgress(currentProgressRef.current);
      }
    }, [paths, isScrollDriven, applyProgress]);

    const variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: { pathLength: 1, opacity: 1 },
    };

    if (isScrollDriven) {
      return (
        <svg
          key={paths.length}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          className={cn(
            "text-foreground overflow-visible max-w-full h-auto select-none pointer-events-none",
            className
          )}
        >
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              {paths.map((d, i) => {
                if (!d) return null;
                return (
                  <path
                    key={i}
                    ref={(el) => {
                      maskPathRefs.current[i] = el;
                    }}
                    d={d}
                    stroke="white"
                    strokeWidth={fontSize * 0.24}
                    fill="none"
                    pathLength={1}
                    strokeDasharray="1 1"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDashoffset: 1,
                      opacity: 0,
                    }}
                  />
                );
              })}
            </mask>
          </defs>

          {/* Leading pen outline strokes */}
          {paths.map((d, i) => {
            if (!d) return null;
            return (
              <path
                key={i}
                ref={(el) => {
                  outlinePathRefs.current[i] = el;
                }}
                d={d}
                stroke={color}
                strokeWidth={2}
                fill="none"
                pathLength={1}
                strokeDasharray="1 1"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="butt"
                strokeLinejoin="round"
                style={{
                  strokeDashoffset: 1,
                  opacity: 0,
                }}
              />
            );
          })}

          {/* Masked filled cursive letters */}
          <g mask={`url(#${maskId})`}>
            {paths.map((d, i) => {
              if (!d) return null;
              return <path key={i} d={d} fill={color} />;
            })}
          </g>
        </svg>
      );
    }

    // Default time-based animation mode
    return (
      <motion.svg
        key={paths.length}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className={cn(
          "text-foreground overflow-visible max-w-full h-auto select-none pointer-events-none",
          className
        )}
        initial="hidden"
        whileInView={inView ? "visible" : undefined}
        animate={inView ? undefined : "visible"}
        viewport={{ once }}
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {paths.map((d, i) => {
              if (!d) return null;
              return (
                <motion.path
                  key={i}
                  d={d}
                  stroke="white"
                  strokeWidth={fontSize * 0.22}
                  fill="none"
                  variants={variants}
                  transition={{
                    pathLength: {
                      delay: delay + i * 0.14,
                      duration,
                      ease: "easeInOut",
                    },
                    opacity: {
                      delay: delay + i * 0.14 + 0.01,
                      duration: 0.01,
                    },
                  }}
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}
          </mask>
        </defs>

        {paths.map((d, i) => {
          if (!d) return null;
          return (
            <motion.path
              key={i}
              d={d}
              stroke={color}
              strokeWidth={2}
              fill="none"
              variants={variants}
              transition={{
                pathLength: {
                  delay: delay + i * 0.14,
                  duration,
                  ease: "easeInOut",
                },
                opacity: {
                  delay: delay + i * 0.14 + 0.01,
                  duration: 0.01,
                },
              }}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="butt"
              strokeLinejoin="round"
            />
          );
        })}

        <g mask={`url(#${maskId})`}>
          {paths.map((d, i) => {
            if (!d) return null;
            return <path key={i} d={d} fill={color} />;
          })}
        </g>
      </motion.svg>
    );
  }
);

Signature.displayName = "Signature";

export default Signature;
