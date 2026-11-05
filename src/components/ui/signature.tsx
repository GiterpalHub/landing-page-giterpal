"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import opentype from "opentype.js";
import { cn } from "@/lib/utils";

export interface SignatureProps {
  /** Text to generate signature for */
  text?: string;
  /** Color of the signature path */
  color?: string;
  /** Font size of the signature */
  fontSize?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate when in view */
  inView?: boolean;
  /** Only animate once */
  once?: boolean;
  /** Custom font URL to load */
  fontUrl?: string;
}

export function Signature({
  text = "Signature",
  color = "currentColor",
  fontSize = 32,
  duration = 1.5,
  delay = 0,
  className,
  inView = false,
  once = true,
  fontUrl,
}: SignatureProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  const height = fontSize * 3; // Clearance for script font loops & descenders
  const horizontalPadding = fontSize * 0.15;
  const topMargin = fontSize * 1.5;
  const baseline = topMargin;
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

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
        const newPaths: string[] = [];

        for (const char of text) {
          const glyph = font.charToGlyph(char);
          const path = glyph.getPath(x, baseline, fontSize);
          newPaths.push(path.toPathData(3));

          const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
          x += advanceWidth * (fontSize / font.unitsPerEm);
        }

        if (!isCancelled) {
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

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.svg
      key={paths.length}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={cn("text-foreground overflow-visible max-w-full h-auto", className)}
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

export default Signature;
