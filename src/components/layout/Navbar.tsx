"use client";

import logo from "@/assets/logo.png";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import IconButton from "../IconButton";
import OutlineButton from "../OutlineButton";
import InteractiveHoverButton from "../ui/interactive-hover-button";

const navigationItems = [
  { label: "Beranda", href: "/#hero" },
  { label: "Karya", href: "/#project" },
  { label: "Testimoni", href: "/#testimonials" },
  { label: "Artikel", href: "/#article" },
  { label: "Tentang Kami", href: "/#about" },
];

export default function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false); 

    const isHashLink = href.includes("#");
    
    if (isHashLink) {
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
            behavior: "smooth"
          });
        }
      }
    }
  };

  const isActive = scrolled || isOpen;

  return (
    <nav
      className={`
        fixed top-0 z-50 left-0 right-0 
        transition-all duration-300 ease-in-out
        ${
          isActive
            ? `mx-4 mt-4 bg-white/80 backdrop-blur-md border border-white/20 text-primary shadow-xl py-4 ${
                isOpen
                  ? "rounded-t-2xl rounded-b-none border-b-0"
                  : "rounded-2xl"
              }`
            : "mx-0 mt-0 bg-transparent text-white py-6"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="z-50 flex items-center gap-2 font-primary text-xl font-bold"
        >
          <div
            className={`p-2 rounded-full transition-colors duration-300 ${
              isActive ? "bg-primary/10" : "bg-white/10"
            }`}
          >
            <Image
              src={logo}
              alt="Giterpal Logo"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full object-cover"
            />
          </div>
          <span className="font-primary tracking-wider">GITERPAL</span>
        </Link>

        <div className="hidden md:flex gap-8 font-secondary text-sm font-medium">
          {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover:w-full"></span>
              </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <InteractiveHoverButton
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            variant={isActive ? "nav-active" : "nav-inactive"}
          >
            Kontak Kami
          </InteractiveHoverButton>
        </div>

        <button
          className="md:hidden z-50 focus:outline-none p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`
            md:hidden absolute top-full left-0 w-full 
            bg-white/80 backdrop-blur-md
            border border-t-0 border-white/20
            shadow-xl overflow-hidden transition-all duration-300 ease-in-out
            rounded-b-2xl rounded-t-none
            -mt-[1px]

            ${
              isOpen
                ? "max-h-[500px] opacity-100 py-6"
                : "max-h-0 opacity-0 py-0 border-none"
            }
        `}
      >
        <div className="flex flex-col items-center gap-6 font-secondary text-primary">
          {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium hover:text-purple-600 transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
          ))}

          <hr className="w-1/2 border-gray-300/50" />

          <div className="flex flex-col gap-3 w-full px-8">
            <Link href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
              <OutlineButton
                className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Kontak Kami
              </OutlineButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}