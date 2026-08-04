export default function ContactPage() {
  return (
    <>
      {/* ini header */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Contact{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Me
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Punya pertanyaan atau ingin bekerja sama? Jangan ragu untuk
              menghubungi saya.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ini form kontak */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50">
              <h2 className="text-xl font-bold text-white mb-6">
                Kirim Pesan
              </h2>
              <form className="space-y-5">
                {/* Nama */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Masukkan nama anda"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="contoh@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors duration-300"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Tentang apa?"
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors duration-300"
                  />
                </div>

                {/* Pesan */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1.5"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tulis pesan anda di sini..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors duration-300"
                  />
                </div>

                {/* tombol submit */}
                <button
                  type="button"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold hover:from-indigo-400 hover:to-violet-400 transition-all duration-300"
                >
                  Kirim Pesan
                </button>
              </form>

              <p className="text-gray-500 text-xs mt-4 text-center">
                * Form ini belum fungsional. Akan dikoneksikan ke backend di
                pertemuan selanjutnya.
              </p>
            </div>

            {/* info kontak */}
            <div className="space-y-6">
              {/* Info Card */}
              {[
                {
                  icon: "📧",
                  title: "Email",
                  value: "angilberttosua@gmail.com",
                  description: "Kirim email kapan saja, saya akan membalas secepatnya.",
                },
                {
                  icon: "📞",
                  title: "Telepon",
                  value: "+62 819-9560-2753",
                  description: "Tersedia di jam sekolah (07.00 - 16.00 WITA).",
                },
                {
                  icon: "📍",
                  title: "Lokasi",
                  value: "Indonesia",
                  description: "Bisa bekerja sama secara remote maupun offline.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors duration-300">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-indigo-300 text-sm mt-0.5">
                        {item.value}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Media */}
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50">
                <h3 className="text-white font-semibold mb-4">Social Media</h3>
                <div className="flex gap-3">
                  {[
                    { label: "GitHub", href: "https://github.com/angilberttosua-code" },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/angilbert-tosua-5b3ab1342/" },
                    { label: "Instagram", href: "https://www.instagram.com/egilyiaaa/" },
                  ].map((social) => (
                    <a 
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 text-sm hover:text-white hover:border-indigo-500/30 transition-colors duration-300"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}