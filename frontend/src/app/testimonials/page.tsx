const testimonials = [
  {
    id: 1,
    name: "Drs. Eko Prasetyo",
    role: "Kepala Jurusan RPL",
    company: "SMK Telkom",
    avatar: "👨‍🏫",
    stars: 5,
    quote:
      "Angilbert menunjukkan performa luar biasa dalam setiap tugas dan proyek sekolah. Dia selalu menjadi leader dalam team project karena inisiatif dan tanggung jawabnya yang tinggi.",
  },
  {
    id: 2,
    name: "Rian Ardiansyah",
    role: "Teman Sekolah / Ketua Kelas",
    company: "XII RPL 1",
    avatar: "🧑‍💻",
    stars: 5,
    quote:
      "Belajar kelompok bareng Angilbert selalu asik. Dia pintar menjelaskan konsep pemrograman yang susah dengan bahasa yang gampang dimengerti oleh teman-teman.",
  },
  {
    id: 3,
    name: "Siti Rahmawati",
    role: "Guru Produktif Web & Mobile",
    company: "SMK Telkom",
    avatar: "👩‍🏫",
    stars: 5,
    quote:
      "Pemahaman Angilbert terhadap framework Next.js dan Tailwind CSS v4 di usianya sekarang sangat mengagumkan. Proyek-proyeknya dikerjakan dengan detail dan rapi.",
  },
];

export default function TestimonialPage() {
  return (
    <section className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header nya ini */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Testimonials
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Apa pendapat para guru dan rekan sekelas mengenai dedikasi,
            keterampilan, dan etos kerja saya selama berkolaborasi.
          </p>
        </div>

        {/* Testimonials Grid nya ini */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-6 sm:p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-indigo-500/30 transition-all duration-300 flex flex-col"
            >
              {/* Stars nya ini */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: test.stars }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote Text nya ini */}
              <blockquote className="text-gray-300 italic leading-relaxed text-sm sm:text-base mb-8">
                &quot;{test.quote}&quot;
              </blockquote>

              {/* Reviewer Meta nya ini */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-800/50 mt-auto">
                {/* Avatar nya ini */}
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-2xl shrink-0 border border-gray-800/50">
                  {test.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">
                    {test.name}
                  </h4>
                  <p className="text-xs text-indigo-400 mt-1.5 leading-none">
                    {test.role}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-none">
                    {test.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}