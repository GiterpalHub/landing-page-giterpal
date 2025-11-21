import { BicepsFlexed, Newspaper, Sparkles, SproutIcon } from "lucide-react";
import cloudImage from '@/assets/cloud.png';
import CardMission from "../CardMission";
import GlowButton from "../GlowButton";
import Dicoding from "@/assets/dicoding.png";
import StarTrail from "@/assets/star-trail.svg";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="min-h-screen text-white bg-[#110C4C]">
            <div className="h-screen space-y-8 flex flex-col items-center justify-center
                            bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]
                            from-[#8F39C1] to-[#110C4C] to-80%">

                <div className="space-y-4 text-center">
                    <p className="font-primary text-7xl font-bold">GITERPAL HUB</p>
                    <p className="font-secondary text-xl text-center">
                        Together We Learn, Together We Grow!
                    </p>
                </div>
                <GlowButton>
                    <p>MULAI</p>
                </GlowButton>

                <div className="absolute bottom-8 left-24 text-left">
                    <h2 className="font-secondary mb-2 text-md">Bagian dari</h2>
                    <Image src={Dicoding} width={250} alt="dicoding" />
                </div>
            </div>

            <div className="h-[120vh] flex flex-col items-center justify-center">
                <div className="text-center max-w-xl space-y-6">
                    <h2 className="font-primary text-5xl font-bold">Visi</h2>
                    <p className="text-xl">
                        Membangun komunitas tempat <span className="text-[#FF5FFA]">mahasiswa TRPL</span> mengasah <span className="text-[#6BECFF]">skill</span>, memperluas <span className="text-[#6BECFF]">koneksi</span>, dan menyiapkan diri menghadapi <span className="text-[#FF5FFA]">tantangan</span> dunia <span className="text-[#6BECFF]">kerja nyata</span>.
                    </p>
                </div>
            </div>

            <div className="min-h-[160vh] relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#110C4C] to-[#267FAB] to-[110%]">

                <div>
                    <Image src={StarTrail} alt="star"
                        fill
                        className="object-cover z-10 animate-spin-slow mt-64" />
                </div>

                <div className="relative z-10 text-center space-y-6 px-4">
                    <h2 className="font-primary text-5xl font-bold">Misi</h2>
                    <div className="flex justify-center space-x-6">
                        <CardMission
                            number="01"
                            icon={<SproutIcon className="w-12 h-12" />}
                            description="Meningkatkan skill, Bukan Hanya Teori."
                        />
                        <CardMission
                            number="02"
                            icon={<Newspaper className="w-12 h-12" />}
                            description="Memberikan informasi terbaru dan cepat."
                        />
                        <CardMission
                            number="03"
                            icon={<BicepsFlexed className="w-12 h-12" />}
                            description="Memberikan tantangan dan studi kasus."
                        />
                        <CardMission
                            number="04"
                            icon={<Sparkles className="w-12 h-12" />}
                            description="Setiap Studi kasus setidaknya berstandar."
                        />
                    </div>
                </div>

                <div className="absolute z-10 bottom-0 left-0 w-full pointer-events-none">
                    <Image
                        src={cloudImage}
                        alt="cloud"
                        className="w-full h-auto object-cover"
                        sizes="100vw"
                    />
                </div>
            </div>

        </div>
    )
}