"use client";

import { useEffect, useState, useMemo } from "react";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/data/api";
import { Project } from "@/data/mockData";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tech: "",
    demoUrl: "",
    githubUrl: "",
  });
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
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
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
    );
  }, [projects, searchQuery]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({ title: "", category: "", description: "", tech: "", demoUrl: "", githubUrl: "" });
    setShowModal(true);
  };

  const openEditModal = (p: Project) => {
    setEditing(p);
    setFormData({
      title: p.title,
      category: p.category || "",
      description: p.description || "",
      tech: (p.tech || []).join(", "),
      demoUrl: p.demoUrl || "",
      githubUrl: p.githubUrl || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    try {
      setSaving(true);
      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        tech: formData.tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        demoUrl: formData.demoUrl,
        githubUrl: formData.githubUrl,
      };
      if (editing) {
        await updateProject(editing.id, payload);
        showToast("success", `Proyek "${formData.title}" berhasil diperbarui!`);
      } else {
        await createProject(payload);
        showToast("success", `Proyek "${formData.title}" berhasil ditambahkan!`);
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
      await deleteProject(deleteTarget.id);
      showToast("success", `Proyek "${deleteTarget.title}" berhasil dihapus!`);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Kelola Data Proyek</h1>
          <p className="text-gray-400 mt-1">Tambah, edit, atau hapus proyek portofolio Anda.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-500/25 transition-all"
        >
          + Tambah Proyek
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau kategori proyek..."
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
                <th className="py-3.5 px-4">Judul Proyek</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Kategori</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Teknologi</th>
                <th className="py-3.5 px-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-6 mx-auto" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-40" /></td>
                    <td className="py-4 px-4 hidden sm:table-cell"><div className="h-4 bg-gray-800 rounded w-24" /></td>
                    <td className="py-4 px-4 hidden md:table-cell"><div className="h-4 bg-gray-800 rounded w-32" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-16 mx-auto" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    <div className="text-4xl mb-2">🗂️</div>
                    <p className="text-sm">Tidak ada proyek ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((p, index) => (
                  <tr key={p.id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="py-4 px-4 font-mono text-xs text-gray-500">{index + 1}</td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{p.title}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{p.description}</p>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {p.category || "-"}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-[220px]">
                        {(p.tech || []).slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-gray-800 text-gray-400 border border-gray-700">
                            {t}
                          </span>
                        ))}
                        {(p.tech || []).length > 3 && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-gray-800 text-gray-500 border border-gray-700">
                            +{(p.tech || []).length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all hover:scale-110"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
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
            Menampilkan <strong>{filtered.length}</strong> dari <strong>{projects.length}</strong> proyek
          </span>
          <span className="text-gray-500 hidden sm:inline">
            MySQL Table: <code>projects</code>
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
              {editing ? "Edit Proyek ✏️" : "Tambah Proyek Baru ➕"}
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Judul Proyek <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Aplikasi Manajemen Tugas"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Kategori</label>
              <input
                type="text"
                placeholder="Contoh: Web Development"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Deskripsi</label>
              <textarea
                rows={3}
                placeholder="Jelaskan singkat tentang proyek ini..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Teknologi (pisahkan dengan koma)</label>
              <input
                type="text"
                placeholder="Contoh: React, Node.js, MySQL"
                value={formData.tech}
                onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">🔗 URL Demo</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">🐙 URL GitHub</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
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
              <h3 className="text-lg font-bold text-white">Konfirmasi Hapus Proyek</h3>
              <p className="text-sm text-gray-400">
                Apakah Anda yakin ingin menghapus proyek{" "}
                <span className="font-semibold text-white">&quot;{deleteTarget.title}&quot;</span>?
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