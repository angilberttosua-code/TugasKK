"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import {
  fetchCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  uploadCertificateImage,
} from "@/data/api";
import { Certificate } from "@/data/mockData";

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    credentialId: "",
    verificationUrl: "",
    image: "",
  });
  const [saving, setSaving] = useState(false);

  // ✅ State baru untuk upload gambar
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [viewTarget, setViewTarget] = useState<Certificate | null>(null);

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchCertificates();
      setCertificates(data);
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return certificates.filter(
      (c) => c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q)
    );
  }, [certificates, searchQuery]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({ title: "", issuer: "", date: "", credentialId: "", verificationUrl: "", image: "" });
    setShowModal(true);
  };

  const openEditModal = (cert: Certificate) => {
    setEditing(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      credentialId: cert.credentialId,
      verificationUrl: cert.verificationUrl,
      image: cert.image || "",
    });
    setShowModal(true);
  };

  // ✅ Handler baru: dipanggil saat user memilih file di input
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadCertificateImage(file);
      setFormData((prev) => ({ ...prev, image: url }));
      showToast("success", "Gambar berhasil diunggah!");
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.issuer.trim()) return;
    try {
      setSaving(true);
      if (editing) {
        await updateCertificate(editing.id, formData);
        showToast("success", `Sertifikat "${formData.title}" berhasil diperbarui!`);
      } else {
        await createCertificate(formData);
        showToast("success", `Sertifikat "${formData.title}" berhasil ditambahkan!`);
      }
      setShowModal(false);
      await loadData();
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteCertificate(deleteTarget.id);
      showToast("success", `Sertifikat "${deleteTarget.title}" berhasil dihapus!`);
      setCertificates((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      showToast("error", err.message);
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
          <span>{toast.type === "success" ? "✓" : "⚠"}</span>
          <p className="text-sm font-medium">{toast.text}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Kelola Data Sertifikat
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Tambah, edit, atau hapus sertifikat kompetensi Anda.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all"
        >
          <span>➕</span>
          Tambah Sertifikat
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau penerbit sertifikat..."
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
                <th className="py-3.5 px-4">Judul Sertifikat</th>
                <th className="py-3.5 px-4">Penerbit</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Tanggal</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Credential ID</th>
                <th className="py-3.5 px-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-6 mx-auto" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-40" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-28" /></td>
                    <td className="py-4 px-4 hidden sm:table-cell"><div className="h-4 bg-gray-800 rounded w-20" /></td>
                    <td className="py-4 px-4 hidden md:table-cell"><div className="h-4 bg-gray-800 rounded w-24" /></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-800 rounded w-16 mx-auto" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="text-sm">Tidak ada sertifikat ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((cert, index) => (
                  <tr key={cert.id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="py-4 px-4 text-center font-mono text-xs">{index + 1}</td>
                    <td className="py-4 px-4 font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      <button
                        type="button"
                        onClick={() => setViewTarget(cert)}
                        className="text-left hover:text-emerald-400 hover:underline underline-offset-2 transition-colors cursor-pointer"
                        title="Klik untuk melihat sertifikat"
                      >
                        {cert.title}
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {cert.issuer}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell text-xs text-gray-400">{cert.date || "-"}</td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="font-mono text-xs text-gray-500">{cert.credentialId || "-"}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openEditModal(cert)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all hover:scale-110"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDeleteTarget(cert)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all hover:scale-110"
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
            Menampilkan <strong>{filtered.length}</strong> dari <strong>{certificates.length}</strong> sertifikat
          </span>
          <span className="text-gray-500 hidden sm:inline">
            MySQL Table: <code>certificates</code>
          </span>
        </div>
      </div>

      {viewTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setViewTarget(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewTarget(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-800/80 text-white flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
              aria-label="Tutup"
            >
              ✕
            </button>

            {viewTarget.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={viewTarget.image}
                alt={viewTarget.title}
                className="w-full max-h-[60vh] object-contain bg-gray-950"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-gray-950 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Gambar sertifikat belum tersedia.</p>
              </div>
            )}

            <div className="p-6 border-t border-gray-800 space-y-2">
              <h3 className="text-lg font-bold text-white">{viewTarget.title}</h3>
              <p className="text-emerald-300 text-sm font-semibold">{viewTarget.issuer}</p>
              <p className="text-gray-500 text-xs">
                Diterbitkan: {viewTarget.date || "-"} · ID: {viewTarget.credentialId || "-"}
              </p>
              {viewTarget.verificationUrl && (
                <a
                  href={viewTarget.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors pt-2"
                >
                  🔗 Lihat Verifikasi
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
              {editing ? "Edit Sertifikat ✏️" : "Tambah Sertifikat Baru ✨"}
            </h3>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Judul Sertifikat <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Belajar Dasar Pemrograman Web"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">
                  Penerbit <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dicoding Indonesia"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Tanggal</label>
              <input
                type="text"
                placeholder="Contoh: Januari 2025"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Credential ID</label>
              <input
                type="text"
                placeholder="Contoh: DICODING-12345"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">🔗 URL Verifikasi</label>
              <input
                type="url"
                placeholder="https://www.dicoding.com/certificates/..."
                value={formData.verificationUrl}
                onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* ✅ Upload Gambar Sertifikat */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">🖼️ Gambar Sertifikat</label>

              {formData.image && (
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-950 border border-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.image}
                    alt="Preview sertifikat"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors text-xs"
                    title="Hapus gambar"
                  >
                    ✕
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 disabled:opacity-50 cursor-pointer"
              />

              {uploading && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  Mengunggah gambar...
                </p>
              )}
              <p className="text-xs text-gray-500">Format: JPG, PNG, atau WEBP. Maksimal 5MB.</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <span>{editing ? "Perbarui" : "Simpan"} ✨</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-2xl flex items-center justify-center mx-auto">
              ⚠️
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">Konfirmasi Hapus Sertifikat</h3>
              <p className="text-sm text-gray-400">
                Apakah Anda yakin ingin menghapus sertifikat{" "}
                <span className="font-semibold text-white">"{deleteTarget.title}"</span>?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
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
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold text-sm shadow-lg transition-all disabled:opacity-50"
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