import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* ini hero section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* ini badgenya */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for projects
          </div>

          {/* ini headingnya */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Halo, saya </span>
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Angilbert Tosua
            </span>
          </h1>

          {/* ini taglinenya */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Siswa XII RPL 1 yang passionate dalam{" "}
            <span className="text-indigo-300">Web Development</span>. Membangun
            pengalaman melalui project nyata dan terus belajar teknologi terbaru.
          </p>

          {/* Ini tombol CTA nya */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/portfolio"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:from-indigo-400 hover:to-violet-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
            >
              Lihat Portfolio
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      </section>

      {/* Ini section highlightsnya */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ini headernya */}
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Apa yang Saya Lakukan
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Beberapa keahlian dan bidang yang saya tekuni selama belajar di
              jurusan RPL.
            </p>
          </div>

          {/* Ini cardsnya */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* card 1 */}
            <div className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors duration-300">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Frontend Development
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Membangun antarmuka web yang responsif dan interaktif
                menggunakan React, Next.js, dan Tailwind CSS.
              </p>
            </div>

            {/* card 2 */}
            <div className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors duration-300">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Backend Development
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Mengembangkan API dan server-side logic dengan Express.js
                dan mengelola database MySQL.
              </p>
            </div>

            {/* card 3 */}
            <div className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors duration-300">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                UI/UX Design
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Mendesain pengalaman pengguna yang intuitif dan tampilan
                visual yang modern dan menarik.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}