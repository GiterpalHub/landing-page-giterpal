"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      autoRaf
      options={{
        lerp: 0.08, // Classic luxurious buttery inertia
        wheelMultiplier: 1.1, // Natural scroll distance per wheel notch
        touchMultiplier: 1.5,
        smoothWheel: true,
        syncTouch: false, // Keep native 1:1 hardware precision on trackpads/touch to eliminate jiggle
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}
