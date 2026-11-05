"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface DotBorderButtonProps {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  dotColor?: string;
  lineColor?: string;
  gridColor?: string;
  glowColor?: string;
}

export default function DotBorderButton({
  children = "KONTAK KAMI",
  href = "mailto:giterpal@gmail.com",
  onClick,
  className,
  icon,
  dotColor = "#AD4BFF",
  lineColor = "rgba(173, 75, 255, 0.85)",
  gridColor = "rgba(173, 75, 255, 0.25)",
  glowColor = "rgba(173, 75, 255, 0.9)",
}: DotBorderButtonProps) {
  const defaultIcon = (
    <svg
      className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4L20 12L5 20V4Z" />
      <path d="M5 12H13" />
    </svg>
  );

  const content = (
    <div
      className={cn(
        "dot-btn-wrapper group relative inline-flex items-center justify-center p-3 select-none transition-all duration-300",
        className
      )}
      style={
        {
          "--dot-size": "8px",
          "--line-weight": "1.5px",
          "--animation-speed": "0.35s",
          "--dot-color": dotColor,
          "--line-color": lineColor,
          "--grid-color": gridColor,
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
    >
      {/* 4 Dotted Perimeter Lines */}
      <div className="dot-line horizontal top" />
      <div className="dot-line vertical right" />
      <div className="dot-line horizontal bottom" />
      <div className="dot-line vertical left" />

      {/* 4 Corner Dots */}
      <div className="corner-dot top left" />
      <div className="corner-dot top right" />
      <div className="corner-dot bottom right" />
      <div className="corner-dot bottom left" />

      {/* Button Body (2 boxes with margin/gap) */}
      <div className="relative z-10 flex items-stretch gap-2 sm:gap-2.5 transition-all duration-300 group-hover:scale-[1.03]">
        <span className="flex items-center justify-center rounded-[12px] border border-[#AD4BFF]/60 bg-[#1B093C]/90 backdrop-blur-sm px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 font-secondary text-xs sm:text-sm md:text-[15px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 group-hover:border-[#AD4BFF] group-hover:bg-[#250E4F] group-hover:tracking-[0.18em]">
          {children}
        </span>
        <span className="flex items-center justify-center w-11 sm:w-12 md:w-14 rounded-[12px] bg-[#AD4BFF] text-white shadow-[0_0_28px_rgba(173,75,255,0.85)] transition-all duration-300 group-hover:bg-[#BC62FF] group-hover:shadow-[0_0_42px_rgba(173,75,255,1)] shrink-0">
          {icon ?? defaultIcon}
        </span>
      </div>

      <style jsx>{`
        .dot-btn-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            45deg,
            var(--grid-color) 0 1px,
            transparent 2px 6px
          );
          opacity: 0;
          z-index: 0;
          transition: opacity 0.3s ease;
        }

        .dot-btn-wrapper:hover::after {
          animation: grid-opacity-anim calc(var(--animation-speed) * 4) ease-in-out forwards;
        }

        @keyframes grid-opacity-anim {
          0%,
          70% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* 4 Corner Dots with glow */
        .corner-dot {
          position: absolute;
          width: var(--dot-size);
          height: var(--dot-size);
          border-radius: 2px;
          background-color: var(--dot-color);
          box-shadow: 0 0 12px var(--glow-color);
          transition: all 0.3s ease-in-out;
          opacity: 0;
          z-index: 20;
          pointer-events: none;
        }

        .dot-btn-wrapper:hover .corner-dot.top.left {
          animation: move-top-left var(--animation-speed) ease-in-out forwards;
        }
        @keyframes move-top-left {
          0% {
            top: 50%;
            left: 20%;
            opacity: 0;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            top: calc(var(--dot-size) * -0.5);
            left: calc(var(--dot-size) * -0.5);
            opacity: 1;
          }
        }

        .dot-btn-wrapper:hover .corner-dot.top.right {
          animation: move-top-right var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 0.6);
        }
        @keyframes move-top-right {
          0% {
            top: 50%;
            right: 20%;
            opacity: 0;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            top: calc(var(--dot-size) * -0.5);
            right: calc(var(--dot-size) * -0.5);
            opacity: 1;
          }
        }

        .dot-btn-wrapper:hover .corner-dot.bottom.right {
          animation: move-bottom-right var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 1.2);
        }
        @keyframes move-bottom-right {
          0% {
            bottom: 50%;
            right: 20%;
            opacity: 0;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            bottom: calc(var(--dot-size) * -0.5);
            right: calc(var(--dot-size) * -0.5);
            opacity: 1;
          }
        }

        .dot-btn-wrapper:hover .corner-dot.bottom.left {
          animation: move-bottom-left var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 1.8);
        }
        @keyframes move-bottom-left {
          0% {
            bottom: 50%;
            left: 20%;
            opacity: 0;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            bottom: calc(var(--dot-size) * -0.5);
            left: calc(var(--dot-size) * -0.5);
            opacity: 1;
          }
        }

        /* 4 Perimeter Dotted Lines */
        .dot-line {
          position: absolute;
          transition: all 0.3s ease-in-out;
          z-index: 15;
          pointer-events: none;
        }

        .dot-line.horizontal {
          height: var(--line-weight);
          width: 100%;
          background-image: repeating-linear-gradient(
            90deg,
            transparent 0 calc(var(--line-weight) * 2),
            var(--line-color) calc(var(--line-weight) * 2) calc(var(--line-weight) * 4)
          );
        }

        .dot-line.top {
          top: calc(var(--line-weight) * -0.5);
          left: 0;
          transform-origin: top left;
          transform: scaleX(0);
        }
        .dot-btn-wrapper:hover .dot-line.top {
          animation: draw-top var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 0.8);
        }
        @keyframes draw-top {
          100% {
            transform: scaleX(1);
          }
        }

        .dot-line.bottom {
          bottom: calc(var(--line-weight) * -0.5);
          left: 0;
          transform-origin: bottom right;
          transform: scaleX(0);
        }
        .dot-btn-wrapper:hover .dot-line.bottom {
          animation: draw-bottom var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 2);
        }
        @keyframes draw-bottom {
          100% {
            transform: scaleX(1);
          }
        }

        .dot-line.vertical {
          width: var(--line-weight);
          height: 100%;
          background-image: repeating-linear-gradient(
            0deg,
            transparent 0 calc(var(--line-weight) * 2),
            var(--line-color) calc(var(--line-weight) * 2) calc(var(--line-weight) * 4)
          );
        }

        .dot-line.left {
          left: calc(var(--line-weight) * -0.5);
          top: 0;
          transform-origin: bottom left;
          transform: scaleY(0);
        }
        .dot-btn-wrapper:hover .dot-line.left {
          animation: draw-left var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 2.4);
        }
        @keyframes draw-left {
          100% {
            transform: scaleY(1);
          }
        }

        .dot-line.right {
          right: calc(var(--line-weight) * -0.5);
          top: 0;
          transform-origin: top right;
          transform: scaleY(0);
        }
        .dot-btn-wrapper:hover .dot-line.right {
          animation: draw-right var(--animation-speed) ease-in-out forwards;
          animation-delay: calc(var(--animation-speed) * 1.4);
        }
        @keyframes draw-right {
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} onClick={onClick} className="inline-block">
          {content}
        </Link>
      );
    }
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent border-0 p-0">
      {content}
    </button>
  );
}
