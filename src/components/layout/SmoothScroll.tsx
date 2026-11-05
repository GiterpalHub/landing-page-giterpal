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
        lerp: 0.06, // True physics damping for a pronounced, velvety gliding momentum
        wheelMultiplier: 1.2, // Effortless glide distance per wheel tick
        touchMultiplier: 1.8,
        smoothWheel: true,
        syncTouch: true, // Smooth inertia on touchpads/trackpads
        syncTouchLerp: 0.07,
        touchInertiaExponent: 1.75,
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}
