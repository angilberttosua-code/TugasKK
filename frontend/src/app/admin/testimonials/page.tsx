"use client";

import { useEffect, useState, useMemo } from "react";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/data/api";
import { Testimonial } from "@/data/mockData";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    avatar: "",
    stars: 5,
    quote: "",
  });
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchTestimonials();
      setTestimonials(data);
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
    return testimonials.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.company || "").toLowerCase().includes(q) ||
        (t.role || "").toLowerCase().includes(q)
    );
  }, [testimonials, searchQuery]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({ name: "", role: "", company: "", avatar: "", stars: 5, quote: "" });
    setShowModal(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditing(t);
    setFormData({
      name: t.name,
      role: t.role || "",
      company: t.company || "",
      avatar: t.avatar || "",
      stars: t.stars || 5,
      quote: t.quote,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;
    try {
      setSaving(true);
      if (editing) {
        await updateTestimonial(editing.id, formData);
        showToast("success", `Testimoni dari "${formData.name}" berhasil diperbarui!`);
      } else {
        await createTestimonial(formData);
        showToast("success", `Testimoni dari "${formData.name}" berhasil ditambahkan!`);
      }
      setShowModal(false);
      await loadData();
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteTestimonial(deleteTarget.id);
      showToast("success", `Testimoni dari "${deleteTarget.name}" berhasil dihapus!`);
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Kelola Data Testimoni</h1>
          <p className="text-gray-400 mt-1">Tambah, edit, atau hapus testimoni dari klien Anda.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-500/25 transition-all"
        >
          + Tambah Testimoni
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Cari berdasarkan nama, perusahaan, atau jabatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-gray-900/50 border border-gray-800/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-950/80 border-b border-gray-800/80 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="py-3.5 px-4 w-14 text-center">No</th>
                <th className="py-3.5 px-4">Nama</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Perusahaan</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Quote</th>
                <th className="py-3.5 px-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-6 mx-auto" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-32" /></td>
                    <td className="py-4 px-4 hidden sm:table-cell"><div className="h-4 bg-gray-800 rounded w-24" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-16" /></td>
                    <td className="py-4 px-4 hidden md:table-cell"><div className="h-4 bg-gray-800 rounded w-48" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-16 mx-auto" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-sm">Tidak ada testimoni ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((t, index) => (
                  <tr key={t.id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="py-4 px-4 font-mono text-xs text-gray-500">{index + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        {t.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-gray-700" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                            {t.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{t.name}</p>
                          {t.role && <p className="text-xs text-gray-500">{t.role}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell text-xs text-gray-400">{t.company || "-"}</td>
                    <td className="py-4 px-4">
                      <span className="text-amber-400 text-xs">
                        {"★".repeat(t.stars || 0)}
                        <span className="text-gray-700">{"★".repeat(5 - (t.stars || 0))}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell max-w-xs">
                      <p className="text-xs text-gray-400 truncate italic">&quot;{t.quote}&quot;</p>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openEditModal(t)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all hover:scale-110"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDeleteTarget(t)}
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
            Menampilkan <strong>{filtered.length}</strong> dari <strong>{testimonials.length}</strong> testimoni
          </span>
          <span className="text-gray-500 hidden sm:inline">
            MySQL Table: <code>testimonials</code>
          </span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl space-y-5 my-8"
          >
            <h3 className="text-lg font-bold text-white">
              {editing ? "Edit Testimoni ✏️" : "Tambah Testimoni Baru ➕"}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">
                  Nama <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Jabatan</label>
                <input
                  type="text"
                  placeholder="Contoh: Project Manager"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Perusahaan</label>
              <input
                type="text"
                placeholder="Contoh: PT Teknologi Indonesia"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">🖼️ URL Foto Avatar</label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Rating ({formData.stars} ★)</label>
              <input
                type="range"
                min={1}
                max={5}
                value={formData.stars}
                onChange={(e) => setFormData({ ...formData, stars: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Quote / Isi Testimoni <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan testimoni di sini..."
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <span>{editing ? "Perbarui" : "Simpan"} 💾</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mx-auto">
              ⚠️
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">Konfirmasi Hapus Testimoni</h3>
              <p className="text-sm text-gray-400">
                Apakah Anda yakin ingin menghapus testimoni dari{" "}
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