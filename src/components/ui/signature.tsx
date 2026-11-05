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
    const trailPathRefs = useRef<(SVGPathElement | null)[]>([]);
    const fillGroupRefs = useRef<(SVGGElement | null)[]>([]);

    const targetProgressRef = useRef<number>(progress ?? 0);
    const leadProgressRef = useRef<number>(progress ?? 0);
    const fillProgressRef = useRef<number>(progress ?? 0);
    const rafIdRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const glyphCountRef = useRef<number>(0);

    const renderFrameToDOM = useCallback(
      (leadGlobal: number, fillGlobal: number, count: number) => {
        if (count <= 0) return;

        // Overlap consecutive character strokes so cursive script flows naturally
        const overlap = 0.32;
        const effectiveTotal = count - overlap * (count - 1);
        const charWindow = 1 / Math.max(1, effectiveTotal);

        for (let i = 0; i < count; i++) {
          const charStart = i * (1 - overlap) * charWindow;

          const localLeadRaw = (leadGlobal - charStart) / charWindow;
          const localFillRaw = (fillGlobal - charStart) / charWindow;

          const charLead = smoothstep(0, 1, localLeadRaw);
          const charFill = smoothstep(0, 1, localFillRaw);

          // Velocity / motion-trail intensity based on lag between leading pen tip and ink fill
          const motionDelta = Math.min(1, Math.abs(charLead - charFill) * 3.2);

          const maskDashOffset = (1 - charFill).toFixed(4);
          const strokeDashOffset = (1 - charLead).toFixed(4);

          const maskOpacity = charFill > 0.002 ? "1" : "0";
          const strokeOpacity = charLead > 0.002 ? "1" : "0";

          const maskEl = maskPathRefs.current[i];
          if (maskEl) {
            maskEl.style.strokeDashoffset = maskDashOffset;
            maskEl.style.opacity = maskOpacity;
          }

          const strokeEl = strokePathRefs.current[i];
          if (strokeEl) {
            strokeEl.style.strokeDashoffset = strokeDashOffset;
            strokeEl.style.opacity = strokeOpacity;
          }

          // Glowing motion-trail stroke ("bekas pergerakan") that highlights active pen movement
          const trailEl = trailPathRefs.current[i];
          if (trailEl) {
            const trailHead = Math.max(charLead, charFill);
            const trailTail = Math.max(0, Math.min(charLead, charFill) - 0.18);
            const trailLen = Math.max(0, trailHead - trailTail);
            const trailOpacity =
              trailLen > 0.005
                ? Math.min(0.95, motionDelta * 0.9 + (charLead > 0 && charFill < 1 ? 0.35 : 0))
                : 0;

            trailEl.style.strokeDasharray = `${trailLen.toFixed(4)} 2`;
            trailEl.style.strokeDashoffset = `${(-trailTail).toFixed(4)}`;
            trailEl.style.opacity = trailOpacity.toFixed(3);
          }

          // Subtle micro-float on each letter as it settles into place
          const fillGroupEl = fillGroupRefs.current[i];
          if (fillGroupEl) {
            const settleOffset = (1 - charFill) * 5;
            fillGroupEl.style.transform = `translate3d(0, ${settleOffset.toFixed(2)}px, 0)`;
          }
        }
      },
      []
    );

    const startPhysicsLoop = useCallback(() => {
      if (rafIdRef.current !== null) return;
      lastTimeRef.current = performance.now();

      const tick = (now: number) => {
        const dtMs = Math.min(64, Math.max(1, now - lastTimeRef.current));
        lastTimeRef.current = now;
        const dtFrames = dtMs / 16.667;

        const target = targetProgressRef.current;
        const prevLead = leadProgressRef.current;
        const prevFill = fillProgressRef.current;

        // Smooth exponential damping:
        // - leadProgress follows scroll smoothly (pen tip)
        // - fillProgress lags gently behind leadProgress (ink trail / bekas pergerakan)
        const leadAlpha = 1 - Math.pow(1 - 0.14, dtFrames);
        const fillAlpha = 1 - Math.pow(1 - 0.075, dtFrames);

        const nextLead = prevLead + (target - prevLead) * leadAlpha;
        const nextFill = prevFill + (nextLead - prevFill) * fillAlpha;

        leadProgressRef.current = nextLead;
        fillProgressRef.current = nextFill;

        renderFrameToDOM(nextLead, nextFill, glyphCountRef.current);

        const remaining =
          Math.abs(target - nextLead) + Math.abs(nextLead - nextFill);

        if (remaining > 0.0004) {
          rafIdRef.current = requestAnimationFrame(tick);
        } else {
          leadProgressRef.current = target;
          fillProgressRef.current = target;
          renderFrameToDOM(target, target, glyphCountRef.current);
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(tick);
    }, [renderFrameToDOM]);

    useEffect(() => {
      return () => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        setProgress: (p: number) => {
          const clamped = Math.max(0, Math.min(1, p));
          targetProgressRef.current = clamped;
          startPhysicsLoop();
        },
      }),
      [startPhysicsLoop]
    );

    useEffect(() => {
      if (scrollDriven && typeof progress === "number") {
        targetProgressRef.current = Math.max(0, Math.min(1, progress));
        startPhysicsLoop();
      }
    }, [scrollDriven, progress, startPhysicsLoop]);

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
      glyphCountRef.current = glyphPaths.length;
      if (scrollDriven && glyphPaths.length > 0) {
        renderFrameToDOM(
          leadProgressRef.current,
          fillProgressRef.current,
          glyphPaths.length
        );
        startPhysicsLoop();
      }
    }, [scrollDriven, glyphPaths, renderFrameToDOM, startPhysicsLoop]);

    if (scrollDriven) {
      const glowFilterId = `${maskId}-glow`;
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
            <filter
              id={glowFilterId}
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
            >
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              {glyphPaths.map((d, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    maskPathRefs.current[i] = el;
                  }}
                  d={d}
                  stroke="white"
                  strokeWidth={fontSize * 0.25}
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

          {/* Leading pen outline stroke */}
          {glyphPaths.map((d, i) => (
            <path
              key={`stroke-${i}`}
              ref={(el) => {
                strokePathRefs.current[i] = el;
              }}
              d={d}
              stroke={color}
              strokeWidth={2}
              fill="none"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
              style={{ opacity: 0 }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Glowing motion trail ("bekas pergerakan") at the active pen tip */}
          {glyphPaths.map((d, i) => (
            <path
              key={`trail-${i}`}
              ref={(el) => {
                trailPathRefs.current[i] = el;
              }}
              d={d}
              stroke="#E9D5FF"
              strokeWidth={4.2}
              fill="none"
              pathLength={1}
              strokeDasharray="0 2"
              strokeDashoffset="0"
              filter={`url(#${glowFilterId})`}
              style={{ opacity: 0 }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Trailing calligraphy ink fill */}
          <g mask={`url(#${maskId})`}>
            {glyphPaths.map((d, i) => (
              <g
                key={`fill-${i}`}
                ref={(el) => {
                  fillGroupRefs.current[i] = el;
                }}
              >
                <path d={d} fill={color} />
              </g>
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
