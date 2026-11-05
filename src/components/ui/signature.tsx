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
import * as opentype from "opentype.js";
import { cn } from "@/lib/utils";

export interface SignatureHandle {
  setProgress: (progress: number) => void;
}

export interface SignatureProps {
  /** Text to generate signature for */
  text?: string;
  /** Color of the signature path */
  color?: string;
  /** Font size of the signature */
  fontSize?: number;
  /** Animation duration in seconds (when not scroll-driven) */
  duration?: number;
  /** Delay before animation starts in seconds (when not scroll-driven) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate when in view */
  inView?: boolean;
  /** Only animate once */
  once?: boolean;
  /** Custom font URL to load */
  fontUrl?: string;
  /** Enable manual scroll-driven progress (0 to 1) via ref.setProgress or progress prop */
  scrollDriven?: boolean;
  /** Optional controlled progress (0 to 1) when scrollDriven is true */
  progress?: number;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export const Signature = forwardRef<SignatureHandle, SignatureProps>(
  function Signature(
    {
      text = "Signature",
      color = "currentColor",
      fontSize = 32,
      duration = 1.5,
      delay = 0,
      className,
      inView = false,
      once = true,
      fontUrl,
      scrollDriven = false,
      progress,
    },
    ref
  ) {
    // Store only non-empty character paths so spaces don't create dead time gaps
    const [glyphPaths, setGlyphPaths] = useState<string[]>([]);
    const [width, setWidth] = useState<number>(300);

    const height = fontSize * 3;
    const horizontalPadding = fontSize * 0.15;
    const topMargin = fontSize * 1.5;
    const baseline = topMargin;
    const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

    const maskPathRefs = useRef<(SVGPathElement | null)[]>([]);
    const strokePathRefs = useRef<(SVGPathElement | null)[]>([]);
    const currentProgressRef = useRef<number>(progress ?? 0);

    const applyProgressToDOM = useCallback(
      (rawProgress: number, count: number) => {
        const clamped = Math.max(0, Math.min(1, rawProgress));
        currentProgressRef.current = clamped;

        if (count <= 0) return;

        // Overlap consecutive character strokes slightly so cursive script flows naturally
        const overlap = 0.28;
        const effectiveTotal = count - overlap * (count - 1);
        const charWindow = 1 / Math.max(1, effectiveTotal);

        for (let i = 0; i < count; i++) {
          const charStart = i * (1 - overlap) * charWindow;
          const localRaw = (clamped - charStart) / charWindow;
          const charProgress = smoothstep(0, 1, localRaw);

          const dashOffset = (1 - charProgress).toFixed(4);
          const opacity = charProgress > 0.003 ? "1" : "0";

          const maskEl = maskPathRefs.current[i];
          if (maskEl) {
            maskEl.style.strokeDashoffset = dashOffset;
            maskEl.style.opacity = opacity;
          }

          const strokeEl = strokePathRefs.current[i];
          if (strokeEl) {
            strokeEl.style.strokeDashoffset = dashOffset;
            strokeEl.style.opacity = opacity;
          }
        }
      },
      []
    );

    useImperativeHandle(
      ref,
      () => ({
        setProgress: (p: number) => {
          applyProgressToDOM(p, glyphPaths.length);
        },
      }),
      [applyProgressToDOM, glyphPaths.length]
    );

    useEffect(() => {
      if (scrollDriven && typeof progress === "number") {
        applyProgressToDOM(progress, glyphPaths.length);
      }
    }, [scrollDriven, progress, glyphPaths.length, applyProgressToDOM]);

    useEffect(() => {
      let isCancelled = false;

      async function load() {
        try {
          let font: opentype.Font | undefined;
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
              font = opentype.parse(buffer);
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
          const nonEmptyPaths: string[] = [];

          for (const char of text) {
            const glyph = font.charToGlyph(char);
            const path = glyph.getPath(x, baseline, fontSize);
            const d = path.toPathData(3);
            if (d && d.trim().length > 0) {
              nonEmptyPaths.push(d);
            }

            const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
            x += advanceWidth * (fontSize / font.unitsPerEm);
          }

          if (!isCancelled) {
            setGlyphPaths(nonEmptyPaths);
            setWidth(Math.max(1, x + horizontalPadding));
          }
        } catch (error) {
          console.error("Signature component font load error:", error);
          if (!isCancelled) {
            setGlyphPaths([]);
            setWidth(text.length * fontSize * 0.6);
          }
        }
      }

      load();

      return () => {
        isCancelled = true;
      };
    }, [text, fontSize, baseline, horizontalPadding, fontUrl]);

    // Sync DOM immediately once glyphPaths are populated in scrollDriven mode
    useEffect(() => {
      if (scrollDriven && glyphPaths.length > 0) {
        applyProgressToDOM(currentProgressRef.current, glyphPaths.length);
      }
    }, [scrollDriven, glyphPaths, applyProgressToDOM]);

    if (scrollDriven) {
      return (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          aria-label={text}
          className={cn(
            "text-foreground overflow-visible max-w-full h-auto",
            className
          )}
        >
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              {glyphPaths.map((d, i) => (
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
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  style={{ opacity: 0 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </mask>
          </defs>

          {glyphPaths.map((d, i) => (
            <path
              key={i}
              ref={(el) => {
                strokePathRefs.current[i] = el;
              }}
              d={d}
              stroke={color}
              strokeWidth={2.2}
              fill="none"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
              style={{ opacity: 0 }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          <g mask={`url(#${maskId})`}>
            {glyphPaths.map((d, i) => (
              <path key={i} d={d} fill={color} />
            ))}
          </g>
        </svg>
      );
    }

    const variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: { pathLength: 1, opacity: 1 },
    };

    return (
      <motion.svg
        key={glyphPaths.length}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        aria-label={text}
        className={cn(
          "text-foreground overflow-visible max-w-full h-auto",
          className
        )}
        initial="hidden"
        whileInView={inView ? "visible" : undefined}
        animate={inView ? undefined : "visible"}
        viewport={{ once }}
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {glyphPaths.map((d, i) => (
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
            ))}
          </mask>
        </defs>

        {glyphPaths.map((d, i) => (
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
        ))}

        <g mask={`url(#${maskId})`}>
          {glyphPaths.map((d, i) => (
            <path key={i} d={d} fill={color} />
          ))}
        </g>
      </motion.svg>
    );
  }
);

export default Signature;
