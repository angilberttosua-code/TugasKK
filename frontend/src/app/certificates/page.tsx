const certificates = [
  {
    id: 1,
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "Januari 2025",
    credentialId: "DICODING-109203",
    verificationUrl: "https://canva.link/dumrk3blgvbgkwe",
  },
  {
    id: 2,
    title: "Belajar Membuat Aplikasi Back-End Pemula",
    issuer: "Dicoding Indonesia",
    date: "Februari 2025",
    credentialId: "DICODING-209173",
    verificationUrl: "#",
  },
  {
    id: 3,
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    date: "Maret 2025",
    credentialId: "FCC-RESPONSIVE-WD",
    verificationUrl: "#",
  },
  {
    id: 4,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "FreeCodeCamp",
    date: "April 2025",
    credentialId: "FCC-JS-ALGO",
    verificationUrl: "#",
  },
  {
    id: 5,
    title: "Junior Web Developer",
    issuer: "BNSP / LSP Informatika",
    date: "Mei 2025",
    credentialId: "BNSP-JWD-2025",
    verificationUrl: "#",
  },
];

export default function CertificatePage() {
  return (
    <section className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header nya ini */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Certificates
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Sertifikasi keahlian dan pencapaian akademik yang saya raih
            selama menempuh pendidikan di bidang Informatika.
          </p>
        </div>

        {/* Certificates Grid nya ini */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Ribbon Icon nya ini */}
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors duration-300">
                <span className="text-2xl">🏅</span>
              </div>

              {/* Certificate title nya ini */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300 leading-snug">
                {cert.title}
              </h3>

              {/* Issuer nya ini */}
              <p className="text-indigo-300 text-sm font-semibold mb-4">
                {cert.issuer}
              </p>

              {/* Meta details nya ini */}
              <div className="space-y-1.5 text-xs text-gray-500">
                <div>
                  <span className="font-medium text-gray-400">Diterbitkan:</span>{" "}
                  {cert.date}
                </div>
                <div>
                  <span className="font-medium text-gray-400">ID Kredensial:</span>{" "}
                  {cert.credentialId}
                </div>
              </div>

              {/* Action Link nya ini */}
              <div className="mt-6 pt-4 border-t border-gray-800/50">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-indigo-400 transition-colors duration-300"
                >
                  Lihat Kredensial <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}