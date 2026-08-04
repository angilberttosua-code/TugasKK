"use client";

import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const pathname = usePathname(); 
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950/80 text-white z-50 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
              className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors duration-300">
            myportfolio
          </Link>

          {/* Navigasi untuk Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Tombol Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Menu untuk Layar Mobile */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-1 bg-gray-950/95 backdrop-blur-xl border-t border-gray-800/50">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}