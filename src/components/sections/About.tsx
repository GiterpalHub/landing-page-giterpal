
import { CarouselSize } from "../organism/Carousel"

export default function About() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-600 px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Pameran</h2>
            <div className="max-w-5xl">
                <CarouselSize />
            </div>
        </div>
    )
}