"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchMessages, toggleMessageRead, deleteMessage, ContactMessage } from "@/data/api";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");

  const [viewing, setViewing] = useState<ContactMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<number | string | null>(null);

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchMessages();
      setMessages(data);
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return messages.filter((m) => {
      const matchesQuery =
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.subject || "").toLowerCase().includes(q);
      const isRead = Boolean(m.is_read);
      const matchesStatus =
        filterStatus === "all" || (filterStatus === "unread" ? !isRead : isRead);
      return matchesQuery && matchesStatus;
    });
  }, [messages, searchQuery, filterStatus]);

  const unreadCount = useMemo(() => messages.filter((m) => !m.is_read).length, [messages]);

  const openMessage = async (msg: ContactMessage) => {
    setViewing(msg);
    if (!msg.is_read) {
      try {
        setTogglingId(msg.id);
        await toggleMessageRead(msg.id, true);
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m)));
      } catch {
        // silent fail, not critical to the viewing experience
      } finally {
        setTogglingId(null);
      }
    }
  };

  const handleToggleRead = async (msg: ContactMessage) => {
    try {
      setTogglingId(msg.id);
      const nextState = !msg.is_read;
      await toggleMessageRead(msg.id, nextState);
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, is_read: nextState } : m)));
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteMessage(deleteTarget.id);
      showToast("success", `Pesan dari "${deleteTarget.name}" berhasil dihapus!`);
      setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      setDeleteTarget(null);
      if (viewing?.id === deleteTarget.id) setViewing(null);
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-md ${
            toast.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
              : "bg-red-950/90 border-red-500/50 text-red-200"
          }`}
        >
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          <p className="text-sm font-medium">{toast.text}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Kotak Pesan Masuk</h1>
          <p className="text-gray-400 mt-1">Pesan dari pengunjung melalui form kontak.</p>
        </div>
        {unreadCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
            ● {unreadCount} belum dibaca
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Cari berdasarkan nama, email, atau subjek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === f
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {f === "all" ? "Semua" : f === "unread" ? "Belum Dibaca" : "Sudah Dibaca"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gray-900/50 border border-gray-800/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-950/80 border-b border-gray-800/80 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="py-3.5 px-4 w-14 text-center">No</th>
                <th className="py-3.5 px-4 w-10"></th>
                <th className="py-3.5 px-4">Pengirim</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Subjek</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Tanggal</th>
                <th className="py-3.5 px-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-6 mx-auto" /></td>
                    <td className="py-4 px-4"><div className="h-2 w-2 bg-gray-800 rounded-full" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-40" /></td>
                    <td className="py-4 px-4 hidden sm:table-cell"><div className="h-4 bg-gray-800 rounded w-32" /></td>
                    <td className="py-4 px-4 hidden md:table-cell"><div className="h-4 bg-gray-800 rounded w-24" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-16 mx-auto" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="text-sm">Tidak ada pesan ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((msg, index) => (
                  <tr
                    key={msg.id}
                    onClick={() => openMessage(msg)}
                    className={`cursor-pointer hover:bg-gray-800/30 transition-colors group ${
                      !msg.is_read ? "bg-emerald-500/[0.03]" : ""
                    }`}
                  >
                    <td className="py-4 px-4 font-mono text-xs text-gray-500">{index + 1}</td>
                    <td className="py-4 px-4">
                      {!msg.is_read && <span className="block w-2 h-2 rounded-full bg-emerald-400" title="Belum dibaca" />}
                    </td>
                    <td className="py-4 px-4">
                      <p className={`font-semibold group-hover:text-emerald-400 transition-colors ${!msg.is_read ? "text-white" : "text-gray-300"}`}>
                        {msg.name}
                      </p>
                      <p className="text-xs text-gray-500">{msg.email}</p>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell text-xs text-gray-400 max-w-[200px] truncate">
                      {msg.subject || "(Tanpa subjek)"}
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell text-xs text-gray-500">
                      {msg.created_at ? new Date(msg.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}
                    </td>
                    <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleToggleRead(msg)}
                          disabled={togglingId === msg.id}
                          className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 transition-all hover:scale-110 disabled:opacity-50"
                          title={msg.is_read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                        >
                          {msg.is_read ? "📩" : "📨"}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(msg)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all hover:scale-110"
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-gray-950/60 border-t border-gray-800/60 text-xs text-gray-400 flex items-center justify-between">
          <span>
            Menampilkan <strong>{filtered.length}</strong> dari <strong>{messages.length}</strong> pesan
          </span>
          <span className="text-gray-500 hidden sm:inline">
            MySQL Table: <code>messages</code>
          </span>
        </div>
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{viewing.subject || "(Tanpa subjek)"}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {viewing.created_at
                    ? new Date(viewing.created_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })
                    : ""}
                </p>
              </div>
              <button
                onClick={() => setViewing(null)}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-950/60 border border-gray-800/60">
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold">
                {viewing.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{viewing.name}</p>
                <p className="text-xs text-gray-500">{viewing.email}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-950/40 border border-gray-800/40 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
              {viewing.message}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`mailto:${viewing.email}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-lg transition-all text-center"
              >
                ↩️ Balas via Email
              </a>
              <button
                onClick={() => {
                  setDeleteTarget(viewing);
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-medium text-sm transition-colors"
              >
                🗑️ Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mx-auto">
              ⚠️
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">Konfirmasi Hapus Pesan</h3>
              <p className="text-sm text-gray-400">
                Apakah Anda yakin ingin menghapus pesan dari{" "}
                <span className="font-semibold text-white">&quot;{deleteTarget.name}&quot;</span>?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold text-sm shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <span>Ya, Hapus</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}