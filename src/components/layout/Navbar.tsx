"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OutlineButton from "../OutlineButton";
import IconButton from "../IconButton";
import { ArrowUpRight, User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav
      className={`
    fixed top-0 z-50 left-0 right-0 
    transition-all duration-300
    
    ${scrolled
         
          ? "px-8 m-4 rounded-full bg-white/70 backdrop-blur-md border border-white/20 text-primary shadow-xl"

          : "px-8 m-0 bg-transparent text-white"
        }
  `}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 
                grid grid-cols-4 items-center">

        <Link href="#hero" className="font-bold text-xl col-span-1">
          <User />
        </Link>

        <div className="flex justify-center gap-8 col-span-2 font-secondary">
          <Link href="#project">
            Beranda
          </Link>
          <Link href="#testimonials">
            Karya
          </Link>
          <Link href="#article">
            Testimoni
          </Link>
          <Link href="#article">
            Artikel
          </Link>
          <Link href="#contact">
            Tentang Kami
          </Link>
        </div>

        <div className="flex justify-end space-x-2 col-span-1">
          <OutlineButton className={`${scrolled ? "bg-transparent hover:bg-primary hover:text-white border border-primary text-primary" : "bg-transparent text-white"
            }`}>
            Kontak Kami
          </OutlineButton>
          <IconButton className={`${scrolled ? "bg-transparent hover:bg-primary hover:text-white border border-primary text-primary" : "bg-white text-primary"
            }`}>
            <ArrowUpRight />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}