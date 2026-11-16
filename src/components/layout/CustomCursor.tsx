"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import cursorIdle from "@/assets/cursor_icon/CursorIdle.webp";
import cursorHover from "@/assets/cursor_icon/CursorHover.webp";
import cursorClick from "@/assets/cursor_icon/CursorClick.webp";
import cursorLoading from "@/assets/cursor_icon/CursorStillLazyLoading.webp";

type CursorState = "idle" | "hover" | "click" | "loading";

const LOADING_SELECTOR = [
  "[data-cursor='loading']",
  "[aria-busy='true']",
  ".cursor-wait",
  ".cursor-progress",
].join(", ");

const HOVER_SELECTOR = [
  "a[href]",
  "button:not(:disabled)",
  "[role='button']:not([aria-disabled='true'])",
  "summary",
  "select:not(:disabled)",
  "input[type='button']:not(:disabled)",
  "input[type='submit']:not(:disabled)",
  "input[type='reset']:not(:disabled)",
  "input[type='checkbox']:not(:disabled)",
  "input[type='radio']:not(:disabled)",
  "label[for]",
  "[data-cursor='hover']",
  ".cursor-pointer",
].join(", ");

const CURSOR_CONFIG: Record<
  CursorState,
  {
    src: string;
    hotspotTransform: string;
    alt: string;
  }
> = {
  idle: {
    src: cursorIdle.src,
    hotspotTransform: "translate(-10%, -10%)",
    alt: "Cursor idle",
  },
  hover: {
    src: cursorHover.src,
    hotspotTransform: "translate(-34%, -6%)",
    alt: "Cursor hover",
  },
  click: {
    src: cursorClick.src,
    hotspotTransform: "translate(-50%, -50%)",
    alt: "Cursor click",
  },
  loading: {
    src: cursorLoading.src,
    hotspotTransform: "translate(-50%, -50%)",
    alt: "Cursor loading",
  },
};

function resolveTargetState(target: EventTarget | null): "loading" | "hover" | "idle" {
  if (!(target instanceof Element)) return "idle";

  if (
    document.body.dataset.cursorLoading === "true" ||
    target.closest(LOADING_SELECTOR)
  ) {
    return "loading";
  }

  if (target.closest(HOVER_SELECTOR)) {
    return "hover";
  }

  return "idle";
}

export default function CustomCursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const isPressedRef = useRef(false);
  const isNavigatingRef = useRef(false);
  const navTimerRef = useRef<number | null>(null);
  const lastTargetRef = useRef<EventTarget | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("idle");

  // Clear navigation loading state once route change completes
  useEffect(() => {
    isNavigatingRef.current = false;
    if (navTimerRef.current !== null) {
      window.clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }
    setCursorState((prev) => (prev === "loading" ? "idle" : prev));
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");

    const updateEnabled = () => {
      const isFinePointer = mediaQuery.matches;
      setEnabled(isFinePointer);
      document.documentElement.classList.toggle(
        "custom-cursor-active",
        isFinePointer
      );
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Preload all cursor state icons to prevent flicker on state switch
    Object.values(CURSOR_CONFIG).forEach(({ src }) => {
      const img = new window.Image();
      img.src = src;
    });

    const syncState = (target: EventTarget | null) => {
      const hovered = resolveTargetState(target);
      if (isNavigatingRef.current || hovered === "loading") {
        setCursorState("loading");
        return;
      }
      if (isPressedRef.current) {
        setCursorState("click");
        return;
      }
      setCursorState(hovered);
    };

    const schedulePositionUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        if (cursorRef.current) {
          const { x, y } = posRef.current;
          cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      lastTargetRef.current = e.target;
      setVisible(true);
      schedulePositionUpdate();
      syncState(e.target);
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isPressedRef.current = true;
      lastTargetRef.current = e.target;
      syncState(e.target);
    };

    const handleMouseUp = (e: MouseEvent) => {
      isPressedRef.current = false;
      lastTargetRef.current = e.target;
      syncState(e.target);
    };

    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!(e.target instanceof Element)) return;

      const anchor = e.target.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");
      if (!href || targetAttr === "_blank" || anchor.hasAttribute("download")) {
        return;
      }
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.origin);
        if (
          url.origin === window.location.origin &&
          url.pathname !== window.location.pathname
        ) {
          isNavigatingRef.current = true;
          setCursorState("loading");
          if (navTimerRef.current !== null) {
            window.clearTimeout(navTimerRef.current);
          }
          navTimerRef.current = window.setTimeout(() => {
            isNavigatingRef.current = false;
            syncState(lastTargetRef.current);
          }, 4000);
        }
      } catch {
        // Ignore malformed URLs
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleBlur = () => {
      isPressedRef.current = false;
      setVisible(false);
    };

    // Observe body[data-cursor-loading] changes for programmatic loading states
    const observer = new MutationObserver(() => {
      syncState(lastTargetRef.current);
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-cursor-loading"],
    });

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleBlur);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("click", handleClick);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      window.removeEventListener("blur", handleBlur);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      if (navTimerRef.current !== null) {
        window.clearTimeout(navTimerRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  const current = CURSOR_CONFIG[cursorState];

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 120ms ease-out",
      }}
    >
      <div style={{ transform: current.hotspotTransform }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          draggable={false}
          className={
            cursorState === "loading"
              ? "block select-none animate-cursor-spin"
              : cursorState === "click"
                ? "block select-none scale-95 transition-transform duration-75"
                : "block select-none transition-transform duration-100"
          }
          style={{
            height: "28px",
            width: "auto",
            maxWidth: "none",
            objectFit: "contain",
            filter: "drop-shadow(0 2px 6px rgba(15, 23, 42, 0.22))",
          }}
        />
      </div>
    </div>
  );
}
