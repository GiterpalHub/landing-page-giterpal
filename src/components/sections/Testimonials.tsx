export default function Testimonials() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Kata Mereka</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
                <div className="p-6 bg-white rounded-lg shadow">
                    <p className="italic">This product changed my life!</p>
                    <p className="mt-4 font-semibold">- John Doe</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <p className="italic">Highly recommend for anyone!</p>
                    <p className="mt-4 font-semibold">- Jane Smith</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <p className="italic">Great quality and amazing support.</p>
                    <p className="mt-4 font-semibold">- Alex Johnson</p>
                </div>
            </div>
        </div>
    )
}