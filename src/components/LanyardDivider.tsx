"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

import Lanyard1 from "@/assets/lanyard1.png";
import Lanyard2 from "@/assets/lanyard2.png";
import Lanyard3 from "@/assets/lanyard3.png";

export default function LanyardDivider() {
  return (
    <div className="relative w-full h-60 overflow-hidden bg-transparent z-30 -mt-20 -mb-32 pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[120%] bg-[#110C4C] py-2 shadow-2xl rotate-[6deg] z-10 border-y-2 border-white/10">
          <Marquee speed={35} gradient={false} direction="right">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="relative w-[300px] h-[55px] mx-0 opacity-80"
              >
                <Image
                  src={Lanyard1}
                  alt="Lanyard Pattern"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </Marquee>
        </div>

        <div className="absolute w-[120%] bg-[#623CEA] py-2 shadow-2xl -rotate-[8deg] z-20 border-y-2 border-white/20">
          <Marquee speed={55} gradient={false} direction="left">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="relative w-[300px] h-[55px] mx-0">
                <Image
                  src={Lanyard2}
                  alt="Lanyard Pattern"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </Marquee>
        </div>

        <div className="absolute w-[120%] bg-[#FF5FFA] py-2 shadow-2xl -rotate-[2deg] scale-105 z-30 border-y-2 border-white/20">
          <Marquee speed={45} gradient={false} direction="right">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="relative w-[300px] h-[55px] mx-0">
                <Image
                  src={Lanyard3}
                  alt="Lanyard Pattern"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
