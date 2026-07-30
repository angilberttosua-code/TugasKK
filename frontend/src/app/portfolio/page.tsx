export default function PortfolioPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Beberapa project yang pernah saya kerjakan selama belajar di
              jurusan RPL.
            </p>
          </div>

          {/* Ini grid project */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="w-full h-40 rounded-xl bg-gray-800/50 mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Preview</span>
                </div>
                <h3 className="text-white font-semibold mb-1">
                  Project {item}
                </h3>
                <p className="text-gray-400 text-sm">
                  Deskripsi singkat tentang project ini.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}