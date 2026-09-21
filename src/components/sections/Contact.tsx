"use client";

import {
  MessageSquare,
  ThumbsUp,
  ToggleRight,
  Eye,
  Send,
  Github,
  Instagram,
  Globe,
  MoveRight,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

const StarDecoration = ({
  className,
  delay,
}: {
  className: string;
  delay: string;
}) => (
  <div
    className={`absolute text-white/60 animate-pulse ${className}`}
    style={{ animationDelay: delay }}
  >
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  </div>
);

export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 15 - 7.5,
        y: (e.clientY / window.innerHeight) * 15 - 7.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#100C36] overflow-hidden font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#2E1065_0%,_#100C36_50%,_#050415_100%)]" />

        <div className="absolute bottom-0 left-0 right-0 h-[500px] overflow-hidden">
          <div className="absolute bottom-[-100px] left-[-10%] w-[50%] h-[400px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />

          <div className="absolute bottom-[-100px] right-[-10%] w-[50%] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-700" />

          <div className="absolute bottom-[-50px] left-[30%] w-[40%] h-[300px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <StarDecoration
          className="top-32 sm:top-3/4 left-10 md:left-32 w-8 h-8 md:w-12 md:h-12"
          delay="0s"
        />

        <StarDecoration
          className="top-1/3 right-5 md:right-20 w-6 h-6 md:w-10 md:h-10 "
          delay="1.5s"
        />

        <StarDecoration
          className="top-2/4 left-8 md:left-20 w-10 h-10"
          delay="0.5s"
        />

        <StarDecoration
          className="top-32 right-10 md:right-40 w-5 h-5 md:w-8 md:h-8"
          delay="2s"
        />

        <StarDecoration className="top-1/4 left-10 w-6 h-6 " delay="1s" />
      </div>

      <div className="absolute bottom-[43%] sm:bottom-80 w-full opacity-20 pointer-events-none z-0 select-none mix-blend-overlay">
        <Marquee speed={60} gradient={false} direction="left">
          <span className="text-[8rem] md:text-[14rem] font-black text-white px-10 font-primary leading-none tracking-tighter">
            GITERPAL HUB COMMUNITY — DISCUSS — COLLABORATE — CREATE —
          </span>
        </Marquee>
      </div>

      <div
        className="relative h-screen sm:h-[150vh] z-10 flex-grow flex flex-col items-center justify-center px-4 py-20 text-center space-y-12"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="font-extrabold mt-40 text-white tracking-tight leading-tight select-none drop-shadow-2xl">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-3 md:mb-6">
            <span className="text-4xl md:text-7xl lg:text-8xl font-primary">
              INGIN
            </span>

            <div className="bg-[#8B5CF6] p-3 md:p-5 rounded-[2rem] rotate-6 hover:rotate-0 transition-transform shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              <MessageSquare className="w-6 h-6 md:w-10 md:h-10 text-white fill-white" />
            </div>

            <div className="bg-white p-3 md:p-5 rounded-[1.5rem] -rotate-6 hover:rotate-0 transition-transform">
              <ThumbsUp className="w-6 h-6 md:w-10 md:h-10 text-[#100C36] fill-[#100C36]" />
            </div>
          </div>

          <div className="flex items-center justify-center mb-3 md:mb-6">
            <span className="text-4xl md:text-7xl lg:text-8xl font-primary text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              MENDISKUSIKAN
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-3 md:mb-6">
            <div className="border-[3px] border-[#8B5CF6] rounded-full px-4 py-1 md:px-6 md:py-2">
              <ToggleRight className="w-8 h-8 md:w-14 md:h-14 text-[#8B5CF6]" />
            </div>

            <span className="text-4xl md:text-7xl lg:text-8xl font-primary">
              SEBUAH
            </span>

            <div className="flex gap-2">
              <div className="bg-[#8B5CF6] p-2 md:p-3 rounded-full animate-bounce">
                <Eye className="w-6 h-6 md:w-10 md:h-10 text-white fill-black" />
              </div>
              <div
                className="bg-[#8B5CF6] p-2 md:p-3 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              >
                <Eye className="w-6 h-6 md:w-10 md:h-10 text-white fill-black" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            <MoveRight className="w-10 h-10 md:w-20 md:h-20 text-[#D946EF] animate-pulse" />
            <span className="text-4xl md:text-7xl lg:text-8xl font-primary italic text-[#D946EF]">
              PROJEK?
            </span>
          </div>
        </div>

        <div className="pt-6">
          <button className="group relative flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 text-lg md:text-xl font-bold text-white bg-[#2E1065] border border-[#8B5CF6]/50 rounded-full overflow-hidden hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.7)]">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <span>KONTAK KAMI</span>
            <div className="bg-[#8B5CF6] p-2 rounded-full group-hover:rotate-45 transition-transform duration-300">
              <Send className="w-5 h-5 md:w-6 md:h-6 fill-white" />
            </div>
          </button>
        </div>
      </div>

      <div className="relative z-20 bg-[#050415]/60 backdrop-blur-md border-t border-white/5 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Giterpal<span className="text-[#8B5CF6]">.</span>
              </h3>
              <p className="max-w-sm leading-relaxed text-gray-400">
                Wadah kolaborasi mahasiswa TRPL untuk menciptakan inovasi
                teknologi yang berdampak.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Menu</h4>
              <ul className="space-y-2">
                {[
                  ["Beranda", "#hero"],
                  ["Karya", "#project"],
                  ["Artikel", "#article"],
                  ["Tentang Kami", "#about"],
                ].map(([item, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="hover:text-[#8B5CF6] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Hubungi</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:giterpal@gmail.com"
                    className="transition-colors hover:text-white"
                  >
                    giterpal@gmail.com
                  </a>
                </li>
                <li>Whatsapp Community</li>
                <li>Discord Community</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 gap-4">
            <div className="flex gap-4">
              {[
                { Icon: Github, href: "https://github.com/GiterpalHub", label: "GitHub Giterpal" },
                { Icon: Instagram, href: "#contact", label: "Instagram Giterpal (URL segera ditambahkan)" },
                { Icon: Globe, href: "#contact", label: "Kanal komunitas Giterpal" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 bg-white/5 rounded-full hover:bg-[#8B5CF6] hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p>&copy; 2025 Giterpal Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
