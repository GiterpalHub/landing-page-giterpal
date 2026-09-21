
export default function About() {
  return (
    <section className="relative overflow-hidden bg-[#110C4C] px-6 py-24 text-white md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-4 font-secondary text-sm font-semibold uppercase tracking-[0.2em] text-[#6BECFF]">
            Tentang Giterpal
          </p>
          <h2 className="max-w-3xl font-primary text-4xl font-bold leading-tight md:text-6xl">
            Belajar bersama, tumbuh melalui karya nyata.
          </h2>
          <p className="mt-6 max-w-2xl font-secondary text-lg leading-relaxed text-white/75">
            Giterpal adalah ruang kolaborasi mahasiswa Teknologi Rekayasa
            Perangkat Lunak untuk bertukar pengetahuan, mengembangkan proyek,
            dan mempersiapkan diri menghadapi dunia teknologi.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["01", "Eksplorasi", "Mencoba teknologi dan cara kerja baru."],
            ["02", "Kolaborasi", "Membangun solusi melalui kerja tim."],
            ["03", "Berbagi", "Membantu anggota belajar lebih cepat."],
            ["04", "Berdampak", "Mengubah ide menjadi karya yang berguna."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
            >
              <span className="font-primary text-2xl font-bold text-[#FF5FFA]">
                {number}
              </span>
              <h3 className="mt-5 font-primary text-xl font-bold">{title}</h3>
              <p className="mt-2 font-secondary text-sm leading-relaxed text-white/65">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}