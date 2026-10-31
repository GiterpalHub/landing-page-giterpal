"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const filters = ["Semua", "Web", "Mobile"];

  const filteredProjects = projects.filter((project) =>
    activeFilter === "Semua" ? true : project.category === activeFilter
  );

  return (
    <div className="relative z-10 max-w-7xl mx-auto mt-4 md:mt-0">
      
      <div className="flex flex-col flex-wrap md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
            Pameran Project
          </h1>
          <p className="text-gray-300 text-sm md:text-base tracking-wide max-w-xl">
            Kumpulan karya terbaik yang dipamerkan bulan ini.
          </p>
        </div>

        <div className="flex flex-wrap justify-end ml-auto gap-3 bg-black/20 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {filters.map((filter, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  : "bg-transparent text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, i) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug ?? i}
            className="group relative flex flex-col rounded-[32px] border border-white/20 bg-white/10 p-3 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:bg-white/15 hover:shadow-[0_0_61px_rgba(255,255,255,0.35)]"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[24px] bg-black/20">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}

              <span className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#110C4C] shadow-lg transition-all duration-300 group-hover:bg-[#6F2ED6] group-hover:text-white">
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>

              <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-4 py-1.5 text-xs font-bold text-[#110C4C] shadow-lg backdrop-blur-md">
                {project.category}
              </span>
            </div>

            <div className="px-3 pb-3 pt-5">
              <h3 className="text-xl font-semibold text-white md:text-2xl font-primary">
                {project.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/70 md:text-sm">
                {project.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}