import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/angilberttosua-code", label: "GitHub" },
  { href: "https://www.linkedin.com/in/angilbert-tosua-5b3ab1342/", label: "LinkedIn" },
  { href: "https://www.instagram.com/egilyiaaa/", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ini untuk brandnya */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-3">
              MyPortfolio
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Siswa XII RPL 1 yang passionate tentang di bidang web development.
              Membangun pengalaman melalui project nyata dan terus belajar
              teknologi terbaru.
            </p>
          </div>

          {/* Link linknya */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosial Medianya */}
          <div>
            <h4 className="text-white font-semibold mb-3">Social Media</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-400 text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tombol Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MyPortfolio. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}