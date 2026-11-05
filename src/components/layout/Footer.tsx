"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";

export default function Footer() {
  const lenis = useLenis();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes("#")) {
      const targetId = href.split("#")[1];
      const elem = document.getElementById(targetId);

      if (elem) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(elem, { offset: -20, duration: 1.2 });
        } else {
          const elementPosition = elem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <footer className="relative z-20 w-full bg-[#231B42] text-white overflow-hidden">
      {/* Subtle bottom-center purple/magenta glow matching design */}
      <div
        aria-hidden="true"
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[520px] h-[180px] bg-[#B44CFF]/35 blur-[80px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 pt-10 md:pt-12 pb-6 md:pb-7">
        {/* Top Row: Brand on left, 2 link columns on right */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pb-8 md:pb-10">
          <Link
            href="/#hero"
            onClick={(e) => handleNavClick(e, "/#hero")}
            className="inline-flex flex-col items-end group"
          >
            <span className="font-primary text-3xl sm:text-4xl font-bold tracking-tight text-white leading-none">
              Giterpal.
            </span>
            <span className="font-secondary text-xs sm:text-sm text-white/75 mt-1 mr-1">
              Hub
            </span>
          </Link>

          <div className="flex gap-12 sm:gap-16 md:gap-20 font-secondary text-xs sm:text-sm text-white/85">
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#hero"
                  onClick={(e) => handleNavClick(e, "/#hero")}
                  className="hover:text-white transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-white transition-colors"
                >
                  Karya
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-white transition-colors"
                >
                  Artikel
                </Link>
              </li>
            </ul>

            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact")}
                  className="hover:text-white transition-colors"
                >
                  Term of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/GiterpalHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full border-t border-white/30" />

        {/* Bottom Bar: Social Icons & Email */}
        <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5 text-white">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/giterpal.community"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Giterpal"
            className="text-white/90 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok Giterpal"
            className="text-white/90 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Giterpal"
            className="text-white/90 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/GiterpalHub"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Giterpal"
            className="text-white/90 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:giterpal@gmail.com"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-secondary text-white/90 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>giterpal@gmail.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
