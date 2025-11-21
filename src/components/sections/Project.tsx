import CardProject from "../CardProject";
import DigitalMarketing from "@/assets/projects/sample-1.png";
import TeamCreator from "@/assets/projects/sample-2.png";
import PointOfSales from "@/assets/projects/sample-3.png";
import WalletApp from "@/assets/projects/sample-4.png";
import Marquee from "react-fast-marquee";

import OutlineButton from "../OutlineButton";
import IconButton from "../IconButton";
import { ArrowUpRight } from "lucide-react";

import GridTexture from '@/assets/textures/grid.png'
import Image from "next/image";

const projects = [
    { title: "DIGITAL MARKETING BEHANCE", image: DigitalMarketing, rotate: "rotate-3" },
    { title: "TEAM CREATOR", image: TeamCreator, rotate: "rotate-0" },
    { title: "POINT OF SALES APP", image: PointOfSales, rotate: "-rotate-3" },
    { title: "E-WALLET MOBILE APP", image: WalletApp, rotate: "rotate-2" },
];

export default function Project() {
    return (
        <div className="relative h-[140vh] flex flex-col items-center justify-center bg-[#110C4C] overflow-hidden">
            <Image
                src={GridTexture}
                alt="texture"
                fill
                className="object-cover z-10"
            />
            
            <div className="relative z-10 flex justify-between items-end text-white w-full px-8 mt-12 max-w-7xl mx-auto">
                <h2 className="text-6xl font-primary">Karya Kami</h2>
                <p className="text-md font-secondary text-right max-w-lg">
                    Jelajahi kreasi karya komunitas kami apalah gatau kata katanya kek gimana  itu copywirternya giliran isi
                </p>
            </div>

            <div className="relative z-10 w-full py-10">
                <Marquee
                    speed={50}
                    pauseOnHover={true}
                >
                    <div className="flex gap-24 pr-24 py-10">
                        {projects.map((project, index) => (
                            <div key={index} className="w-[400px] flex-shrink-0">
                                <CardProject
                                    title={project.title}
                                    image={project.image}
                                    rotate={project.rotate}
                                />
                            </div>
                        ))}
                    </div>
                </Marquee>
            </div>

            <div className="relative z-10 flex justify-end space-x-2 col-span-1 mb-12">
                <OutlineButton>
                    Lihat Semua
                </OutlineButton>
                <IconButton className="shadow-[0_0_20px_theme(colors.white/70)] transition-all duration-300 focus:outline-none hover:bg-white/90">
                    <ArrowUpRight />
                </IconButton>
            </div>
        </div>
    )
}