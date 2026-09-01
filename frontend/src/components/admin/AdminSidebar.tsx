"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: "🏠" },
  { href: "/admin/projects", label: "Projects", icon: "📁" },
  { href: "/admin/skills", label: "Skills", icon: "⚡" },
  { href: "/admin/certificates", label: "Certificates", icon: "🏅" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "💬" },
  { href: "/admin/messages", label: "Messages", icon: "✉️" },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/80 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-gray-800/60">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
              MP
            </span>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">
                MyPortfolio
              </h2>
              <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Menu Utama
          </div>

          {adminNavItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section: Link to Public Website */}
        <div className="p-4 border-t border-gray-800/60">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gray-800/60 hover:bg-gray-800 text-gray-300 hover:text-white transition-colors duration-300"
          >
            <span>🌐</span>
            <span>Lihat Website Publik</span>
          </Link>
        </div>
      </aside>
    </>
  );
}