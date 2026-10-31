import Link from "next/link";
import { Github, Globe, Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 w-full bg-[#050415]/80 backdrop-blur-xl border-t border-white/10 text-gray-400 text-sm mt-auto overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6F2ED6]/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#6BECFF]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12">
          <div className="md:col-span-5">
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
              Giterpal<span className="text-[#8B5CF6] animate-pulse">.</span>
            </h3>
            <p className="max-w-sm leading-relaxed text-gray-400/90 text-[15px]">
              Wadah kolaborasi mahasiswa TRPL untuk menciptakan inovasi teknologi yang berdampak. Membangun masa depan melalui kode dan kreativitas.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Menu Navigasi</h4>
            <ul className="space-y-4">
              {[
                ["Beranda", "/"],
                ["Karya", "/projects"],
                ["Artikel", "/articles"],
                ["Tentang Kami", "/#about"],
              ].map(([item, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 w-fit hover:text-white transition-all duration-300"
                  >
                    <span className="h-[1px] w-0 bg-[#8B5CF6] transition-all duration-300 group-hover:w-4"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Hubungi Kami</h4>
            <ul className="space-y-4">
              {[
                ["Email", "mailto:giterpal@gmail.com"],
                ["Whatsapp", "https://chat.whatsapp.com/DPuMAYoX5sXLh44SFeLxlW"],
                ["Discord", "https://discord.gg/qwpvGNu69"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    target={href.startsWith("http") ? "_blank" : "_self"}
                    rel={href.startsWith("http") ? "noopener noreferrer" : ""}
                    href={href}
                    className="group flex items-center justify-between w-fit gap-2 transition-all duration-300 hover:text-[#6BECFF]"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <p className="text-gray-500 font-medium tracking-wide text-xs md:text-sm">
            &copy; {currentYear} Giterpal Hub. All rights reserved.
          </p>

          <div className="flex gap-4">
            {[
              { Icon: Github, href: "https://github.com/GiterpalHub", label: "GitHub Giterpal" },
              { Icon: Instagram, href: "https://www.instagram.com/giterpal.community?exln=MWJkYWQzOWVjNm16dw==", label: "Instagram Giterpal" },
              { Icon: Globe, href: "/", label: "Website Komunitas Giterpal" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href !== "#" ? "_blank" : "_self"}
                rel={href !== "#" ? "noopener noreferrer" : ""}
                aria-label={label}
                className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#8B5CF6] hover:border-[#8B5CF6] hover:text-white hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}