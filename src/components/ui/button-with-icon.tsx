import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonWithIconProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  className?: string;
  variant?: "glass" | "light" | "nav-active" | "nav-inactive";
  size?: "default" | "sm";
  badgeClassName?: string;
}

export default function ButtonWithIcon({
  children = "Lihat Semua",
  href,
  onClick,
  icon,
  className,
  variant = "glass",
  size = "default",
  badgeClassName,
  ...props
}: ButtonWithIconProps) {
  const isSm = size === "sm";

  const defaultIcon = (
    <ArrowUpRight
      size={isSm ? 14 : 18}
      className="transition-transform duration-500"
    />
  );

  let outerClasses = "";
  let badgeClasses = "";

  switch (variant) {
    case "light":
      outerClasses =
        "bg-white hover:bg-[#623CEA]/5 border border-[#8B5CF6]/50 text-[#110C4C] shadow-[0_4px_20px_rgba(17,12,76,0.06)] hover:border-[#623CEA] hover:shadow-[0_6px_25px_rgba(98,60,234,0.16)]";
      badgeClasses =
        "bg-[#623CEA] text-white shadow-[0_0_16px_rgba(98,60,234,0.4)] group-hover:bg-[#502bb5] group-hover:shadow-[0_0_24px_rgba(98,60,234,0.65)]";
      break;
    case "nav-active":
      outerClasses =
        "bg-primary/5 hover:bg-primary/10 border border-primary/25 text-primary shadow-sm hover:border-primary/50";
      badgeClasses =
        "bg-primary text-white shadow-[0_0_12px_rgba(17,12,76,0.25)] group-hover:bg-primary/90";
      break;
    case "nav-inactive":
      outerClasses =
        "bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md shadow-sm hover:border-white/50";
      badgeClasses =
        "bg-white text-primary shadow-[0_0_16px_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_24px_rgba(255,255,255,0.9)]";
      break;
    case "glass":
    default:
      outerClasses =
        "bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md shadow-[0_4px_24px_rgba(7,5,36,0.4)]";
      badgeClasses =
        "bg-white text-[#110C4C] shadow-[0_0_20px_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_28px_rgba(255,255,255,0.9)]";
      break;
  }

  const badgePosition = isSm
    ? "right-1 w-8 h-8 group-hover:right-[calc(100%-36px)]"
    : "right-1 w-10 h-10 group-hover:right-[calc(100%-44px)]";

  const paddingClasses = isSm
    ? "h-10 p-1 ps-5 pe-11 hover:ps-11 hover:pe-5 text-xs sm:text-sm"
    : "h-12 p-1 ps-6 pe-14 hover:ps-14 hover:pe-6 text-sm md:text-base";

  const innerContent = (
    <>
      <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
        {children}
      </span>
      <div
        className={cn(
          "absolute rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-45",
          badgePosition,
          badgeClasses,
          badgeClassName
        )}
      >
        {icon ?? defaultIcon}
      </div>
    </>
  );

  const baseClasses = cn(
    "relative inline-flex items-center justify-center font-secondary font-semibold",
    "rounded-full group transition-all duration-500 w-fit overflow-hidden cursor-pointer",
    paddingClasses,
    outerClasses,
    className
  );

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} onClick={onClick} className={baseClasses}>
          {innerContent}
        </Link>
      );
    }
    return (
      <a href={href} onClick={onClick} className={baseClasses}>
        {innerContent}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses} {...props}>
      {innerContent}
    </button>
  );
}
