"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  variant?: "default" | "nav-active" | "nav-inactive" | "glass" | "purple";
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(
  (
    {
      text,
      children,
      href,
      onClick,
      variant = "default",
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const displayText =
      text ?? (typeof children === "string" ? children : "Button");

    const defaultIcon = (
      <ArrowRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    );

    let outerStyles = "";
    let dotStyles = "";
    let textIdleStyles = "";
    let textHoverStyles = "";

    switch (variant) {
      case "nav-inactive":
        outerStyles =
          "border-white/30 hover:border-transparent bg-white/10 text-white backdrop-blur-md shadow-sm";
        dotStyles =
          "bg-white group-hover:bg-gradient-to-r group-hover:from-[#AD4BFF] group-hover:to-[#6828EA]";
        textIdleStyles = "text-white";
        textHoverStyles = "text-white";
        break;

      case "nav-active":
        outerStyles =
          "border-primary/25 hover:border-transparent bg-primary/5 text-primary shadow-sm";
        dotStyles =
          "bg-primary group-hover:bg-[#AD4BFF] group-hover:shadow-[0_0_20px_rgba(173,75,255,0.45)]";
        textIdleStyles = "text-primary";
        textHoverStyles = "text-white";
        break;

      case "purple":
        outerStyles =
          "border-[#AD4BFF]/50 hover:border-transparent bg-[#AD4BFF]/10 text-white";
        dotStyles = "bg-[#AD4BFF] group-hover:bg-[#AD4BFF]";
        textIdleStyles = "text-white";
        textHoverStyles = "text-white";
        break;

      case "glass":
        outerStyles =
          "border-white/20 hover:border-transparent bg-white/10 text-white backdrop-blur-md";
        dotStyles = "bg-white group-hover:bg-[#AD4BFF]";
        textIdleStyles = "text-white";
        textHoverStyles = "text-white";
        break;

      case "default":
      default:
        outerStyles =
          "border-input hover:border-transparent bg-background text-foreground";
        dotStyles = "bg-primary group-hover:bg-primary";
        textIdleStyles = "text-foreground";
        textHoverStyles = "text-primary-foreground";
        break;
    }

    const buttonBody = (
      <>
        {/* Idle layout: expanding dot + sliding text */}
        <div className="relative z-0 flex items-center gap-2 px-1">
          <div
            className={cn(
              "h-2 w-2 shrink-0 rounded-full transition-all duration-500 ease-out",
              "group-hover:scale-[45] group-hover:shadow-[0_0_24px_rgba(173,75,255,0.5)]",
              dotStyles
            )}
          />
          <span
            className={cn(
              "inline-block whitespace-nowrap text-sm font-semibold transition-all duration-300 ease-out",
              "group-hover:translate-x-12 group-hover:opacity-0",
              textIdleStyles
            )}
          >
            {displayText}
          </span>
        </div>

        {/* Hover layout: centered text + arrow icon */}
        <div
          className={cn(
            "absolute inset-0 z-10 flex h-full w-full translate-x-8 items-center justify-center gap-2",
            "opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100",
            textHoverStyles
          )}
        >
          <span className="whitespace-nowrap text-sm font-semibold">
            {displayText}
          </span>
          {icon ?? defaultIcon}
        </div>
      </>
    );

    const commonClasses = cn(
      "group relative inline-flex h-10 min-w-[136px] items-center justify-center cursor-pointer",
      "overflow-hidden rounded-full border px-4 py-2 font-secondary font-semibold select-none",
      "transition-all duration-300 ease-out hover:border-transparent",
      outerStyles,
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          onClick={onClick as any}
          className={commonClasses}
        >
          {buttonBody}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={commonClasses}
        {...props}
      >
        {buttonBody}
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
export default InteractiveHoverButton;
