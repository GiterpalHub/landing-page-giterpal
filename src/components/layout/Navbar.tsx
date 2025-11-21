"use client";

import logo from "@/assets/logo.png";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import IconButton from "../IconButton";
import OutlineButton from "../OutlineButton";
export default function Navbar() {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          href="#hero"
          className="font-bold text-xl flex items-center gap-2 z-50"
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
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="tracking-wider">GITERPAL</span>
        </Link>

        <div className="hidden md:flex gap-8 font-secondary text-sm font-medium">
          {["Beranda", "Karya", "Testimoni", "Artikel", "Tentang Kami"].map(
            (item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="hover:text-purple-500 transition-colors relative group"
              >
                {item}

                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex space-x-3 items-center">
          <OutlineButton
            className={`${
              isActive
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-white text-white hover:bg-white hover:text-primary"
            }`}
          >
            Kontak Kami
          </OutlineButton>
          <IconButton
            className={`${
              isActive
                ? "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
                : "bg-white text-primary hover:bg-gray-200"
            }`}
          >
            <ArrowUpRight size={18} />
          </IconButton>
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
          {["Beranda", "Karya", "Testimoni", "Artikel", "Tentang Kami"].map(
            (item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-lg font-medium hover:text-purple-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            )
          )}

          <hr className="w-1/2 border-gray-300/50" />

          <div className="flex flex-col gap-3 w-full px-8">
            <OutlineButton
              className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsOpen(false)}
            >
              Kontak Kami
            </OutlineButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
