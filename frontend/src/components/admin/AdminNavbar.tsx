"use client";

interface AdminNavbarProps {
  onMenuToggle: () => void;
}

export default function AdminNavbar({ onMenuToggle }: AdminNavbarProps) {
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Toggle Sidebar Button (Mobile) */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/60 border border-gray-800 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div>
          <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-400 hidden sm:block">
            {currentDate}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Online Backend Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          API Online (Port 5000)
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-sm font-bold">
            👤
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-white leading-none">
              Angilbert Tosua
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-none">
              Siswa XII RPL 1
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}