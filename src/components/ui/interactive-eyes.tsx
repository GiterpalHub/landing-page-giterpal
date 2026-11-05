"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const MAX_PUPIL_OFFSET = 4.8; // Maximum translation radius in SVG coordinate space
const SENSITIVITY_RADIUS = 240; // Screen distance in px for pupil to reach full deflection

interface InteractiveEyesProps {
  className?: string;
  eyeClassName?: string;
  isVisible?: boolean;
  spawnDelayMs?: number;
}

export default function InteractiveEyes({
  className = "flex items-center gap-1.5 sm:gap-2 md:gap-2.5 shrink-0",
  eyeClassName = "w-11 sm:w-16 md:w-20 lg:w-24 xl:w-[104px] h-auto shrink-0 select-none cursor-pointer",
  isVisible = true,
  spawnDelayMs = 870,
}: InteractiveEyesProps) {
  const leftEyeRef = useRef<SVGSVGElement>(null);
  const rightEyeRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  // Separate blink states allow synchronized natural blinking as well as individual winking on click
  const [leftBlink, setLeftBlink] = useState(false);
  const [rightBlink, setRightBlink] = useState(false);

  // Physics animation state
  const leftPosRef = useRef({ x: 0, y: 0 });
  const rightPosRef = useRef({ x: 0, y: 0 });
  const targetsRef = useRef({
    leftX: 0,
    leftY: 0,
    rightX: 0,
    rightY: 0,
  });

  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Compute target pupil offset for an eye given mouse coords
  const computeEyeTarget = useCallback(
    (eyeEl: SVGSVGElement | null, mouseX: number, mouseY: number) => {
      if (!eyeEl) return { x: 0, y: 0 };
      const rect = eyeEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < 1) return { x: 0, y: 0 };

      const angle = Math.atan2(dy, dx);
      // Smooth asymptotic distance mapping so eyes don't abruptly snap
      const intensity = 1 - Math.exp(-dist / SENSITIVITY_RADIUS);
      const offset = MAX_PUPIL_OFFSET * intensity;

      return {
        x: Math.cos(angle) * offset,
        y: Math.sin(angle) * offset,
      };
    },
    []
  );

  // Animation frame loop with lerp damping for smooth, organic eye movement
  const startRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) return;

    const tick = () => {
      // Recompute targets if mouse position is known
      if (mousePosRef.current) {
        const { x: mx, y: my } = mousePosRef.current;
        const leftTarget = computeEyeTarget(leftEyeRef.current, mx, my);
        const rightTarget = computeEyeTarget(rightEyeRef.current, mx, my);

        targetsRef.current = {
          leftX: leftTarget.x,
          leftY: leftTarget.y,
          rightX: rightTarget.x,
          rightY: rightTarget.y,
        };
      }

      // Smooth lerp factor (0.18 = fast, silky responsiveness)
      const LERP = 0.18;
      const curL = leftPosRef.current;
      const curR = rightPosRef.current;
      const tgt = targetsRef.current;

      curL.x += (tgt.leftX - curL.x) * LERP;
      curL.y += (tgt.leftY - curL.y) * LERP;
      curR.x += (tgt.rightX - curR.x) * LERP;
      curR.y += (tgt.rightY - curR.y) * LERP;

      // Direct SVG attribute update for peak 120fps/60fps rendering without React re-renders
      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute("cx", (32 + curL.x).toFixed(2));
        leftPupilRef.current.setAttribute("cy", (19 + curL.y).toFixed(2));
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute("cx", (32 + curR.x).toFixed(2));
        rightPupilRef.current.setAttribute("cy", (19 + curR.y).toFixed(2));
      }

      const dl = Math.hypot(tgt.leftX - curL.x, tgt.leftY - curL.y);
      const dr = Math.hypot(tgt.rightX - curR.x, tgt.rightY - curR.y);

      // Keep running if there is still perceptible movement
      if (dl > 0.02 || dr > 0.02 || mousePosRef.current !== null) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [computeEyeTarget]);

  // Pointer tracking & scroll tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      startRafLoop();

      // Reset idle glance timer
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(triggerIdleGlance, 4500);
    };

    const handlePointerLeave = () => {
      mousePosRef.current = null;
      // Gently return eyes to neutral forward-looking position
      targetsRef.current = { leftX: 0, leftY: 0, rightX: 0, rightY: 0 };
      startRafLoop();
    };

    const handleScroll = () => {
      if (mousePosRef.current) {
        startRafLoop();
      }
    };

    const triggerIdleGlance = () => {
      // Pick a subtle, lifelike glancing direction when user is idle
      const glanceAngles = [0, Math.PI / 4, (3 * Math.PI) / 4, Math.PI, -Math.PI / 3, -Math.PI / 2];
      const randomAngle = glanceAngles[Math.floor(Math.random() * glanceAngles.length)];
      const randomDist = 1.2 + Math.random() * 2.2;

      targetsRef.current = {
        leftX: Math.cos(randomAngle) * randomDist,
        leftY: Math.sin(randomAngle) * randomDist,
        rightX: Math.cos(randomAngle) * randomDist,
        rightY: Math.sin(randomAngle) * randomDist,
      };
      startRafLoop();

      // Return to neutral after 1.8s
      idleTimeoutRef.current = setTimeout(() => {
        targetsRef.current = { leftX: 0, leftY: 0, rightX: 0, rightY: 0 };
        startRafLoop();
        idleTimeoutRef.current = setTimeout(triggerIdleGlance, 3500 + Math.random() * 3000);
      }, 1800);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial idle glance schedule
    idleTimeoutRef.current = setTimeout(triggerIdleGlance, 3500);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [computeEyeTarget, startRafLoop]);

  // Occasional natural blinking schedule
  useEffect(() => {
    let isCancelled = false;

    const scheduleNextBlink = () => {
      // Human blinking rhythm: every 2.8 to 6.0 seconds
      const delay = 2800 + Math.random() * 3200;

      blinkTimeoutRef.current = setTimeout(() => {
        if (isCancelled) return;

        // Synchronized blink for both eyes
        setLeftBlink(true);
        setRightBlink(true);

        // Close duration: 80ms
        setTimeout(() => {
          if (isCancelled) return;
          setLeftBlink(false);
          setRightBlink(false);

          // 18% chance of a double blink for realistic character animation
          if (Math.random() < 0.18) {
            setTimeout(() => {
              if (isCancelled) return;
              setLeftBlink(true);
              setRightBlink(true);
              setTimeout(() => {
                if (isCancelled) return;
                setLeftBlink(false);
                setRightBlink(false);
                scheduleNextBlink();
              }, 70);
            }, 100);
          } else {
            scheduleNextBlink();
          }
        }, 80);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      isCancelled = true;
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, []);

  // Easter egg: click to wink
  const handleLeftEyeClick = () => {
    setLeftBlink(true);
    setTimeout(() => setLeftBlink(false), 140);
  };

  const handleRightEyeClick = () => {
    setRightBlink(true);
    setTimeout(() => setRightBlink(false), 140);
  };

  return (
    <div className={className} aria-label="Sepasang mata interaktif">
      {/* Left Eye Pop Wrapper */}
      <span
        className="inline-flex shrink-0"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0)",
          animation: isVisible
            ? `contact-pop-in 840ms cubic-bezier(0.22, 1, 0.36, 1) ${spawnDelayMs}ms both`
            : "none",
        }}
      >
        <svg
          ref={leftEyeRef}
          onClick={handleLeftEyeClick}
          className={eyeClassName}
          viewBox="0 0 64 38"
          fill="none"
          aria-hidden="true"
          style={{
            transformOrigin: "center",
            transform: leftBlink ? "scaleY(0.06) scaleX(1.05)" : "scaleY(1) scaleX(1)",
            transition: leftBlink
              ? "transform 0.07s cubic-bezier(0.4, 0, 1, 1)"
              : "transform 0.14s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Outer purple almond shape */}
          <path
            d="M2 19C10 4.5 21.5 0 32 0C42.5 0 54 4.5 62 19C54 33.5 42.5 38 32 38C21.5 38 10 33.5 2 19Z"
            fill="#AD4BFF"
          />

          {/* Sclera & Pupil group - smoothly vanishes into the purple eyelid slit when closed */}
          <g
            style={{
              opacity: leftBlink ? 0 : 1,
              transition: leftBlink
                ? "opacity 0.05s ease-in"
                : "opacity 0.09s ease-out 0.03s",
            }}
          >
            {/* White eyeball */}
            <circle cx="32" cy="19" r="11.5" fill="#FFFFFF" />

            {/* Black pupil tracking mouse */}
            <circle
              ref={leftPupilRef}
              cx="32"
              cy="19"
              r="6"
              fill="#12062C"
            />
          </g>
        </svg>
      </span>

      {/* Right Eye Pop Wrapper */}
      <span
        className="inline-flex shrink-0"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0)",
          animation: isVisible
            ? `contact-pop-in 840ms cubic-bezier(0.22, 1, 0.36, 1) ${spawnDelayMs + 140}ms both`
            : "none",
        }}
      >
        <svg
          ref={rightEyeRef}
          onClick={handleRightEyeClick}
          className={eyeClassName}
          viewBox="0 0 64 38"
          fill="none"
          aria-hidden="true"
          style={{
            transformOrigin: "center",
            transform: rightBlink ? "scaleY(0.06) scaleX(1.05)" : "scaleY(1) scaleX(1)",
            transition: rightBlink
              ? "transform 0.07s cubic-bezier(0.4, 0, 1, 1)"
              : "transform 0.14s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Outer purple almond shape */}
          <path
            d="M2 19C10 4.5 21.5 0 32 0C42.5 0 54 4.5 62 19C54 33.5 42.5 38 32 38C21.5 38 10 33.5 2 19Z"
            fill="#AD4BFF"
          />

          {/* Sclera & Pupil group */}
          <g
            style={{
              opacity: rightBlink ? 0 : 1,
              transition: rightBlink
                ? "opacity 0.05s ease-in"
                : "opacity 0.09s ease-out 0.03s",
            }}
          >
            {/* White eyeball */}
            <circle cx="32" cy="19" r="11.5" fill="#FFFFFF" />

            {/* Black pupil tracking mouse */}
            <circle
              ref={rightPupilRef}
              cx="32"
              cy="19"
              r="6"
              fill="#12062C"
            />
          </g>
        </svg>
      </span>
    </div>
  );
}
