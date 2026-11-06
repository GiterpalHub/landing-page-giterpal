"use client";

import Image from "next/image";

import Lanyard1 from "@/assets/lanyard1.webp";
import Lanyard2 from "@/assets/lanyard2.webp";
import Lanyard3 from "@/assets/lanyard3.webp";

export default function LanyardDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-0 z-30 pointer-events-none select-none"
    >
      {/* Lanyard 1: White ribbon tilted +8.5deg (moves back & forth along its tilt) */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[125vw] max-w-none rotate-[8.5deg] z-10 pointer-events-none">
        <div className="w-full animate-lanyard-1 will-change-transform drop-shadow-[0_4px_12px_rgba(17,12,76,0.15)]">
          <Image
            src={Lanyard1}
            alt=""
            width={8679}
            height={310}
            unoptimized
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* Lanyard 2: Solid purple ribbon tilted -8.5deg (moves back & forth along its tilt) */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[125vw] max-w-none -rotate-[8.5deg] z-20 pointer-events-none">
        <div className="w-full animate-lanyard-2 will-change-transform drop-shadow-[0_6px_16px_rgba(17,12,76,0.3)]">
          <Image
            src={Lanyard2}
            alt=""
            width={8679}
            height={310}
            unoptimized
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* Lanyard 3: Horizontal glowing center ribbon 0deg (sits directly on the Article/Contact boundary line) */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[125vw] max-w-none rotate-0 z-30 pointer-events-none">
        <div className="w-full animate-lanyard-3 will-change-transform drop-shadow-[0_8px_20px_rgba(17,12,76,0.35)]">
          <Image
            src={Lanyard3}
            alt=""
            width={8679}
            height={310}
            unoptimized
            className="w-full h-auto block"
          />
        </div>
      </div>
    </div>
  );
}
