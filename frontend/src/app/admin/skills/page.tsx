"use client";

import { useEffect, useState, useMemo } from "react";
import {
  fetchSkillsFlat,
  fetchSkillGroups,
  createSkill,
  updateSkill,
  deleteSkill,
  createSkillGroup,
  SkillFlat,
  SkillGroupOption,
} from "@/data/api";

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillFlat[]>([]);
  const [groups, setGroups] = useState<SkillGroupOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<SkillFlat | null>(null);
  const [formData, setFormData] = useState({
    skill_group_id: "",
    name: "",
    level: "",
    percentage: 50,
  });
  const [saving, setSaving] = useState(false);

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupFormData, setGroupFormData] = useState({ title: "", icon: "" });
  const [savingGroup, setSavingGroup] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<SkillFlat | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [skillData, groupData] = await Promise.all([fetchSkillsFlat(), fetchSkillGroups()]);
      setSkills(skillData);
      setGroups(groupData);
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
    return skills.filter(
      (s) => s.name.toLowerCase().includes(q) || s.group_title.toLowerCase().includes(q)
    );
  }, [skills, searchQuery]);

  const openAddModal = () => {
    setEditing(null);
    setFormData({
      skill_group_id: groups[0] ? String(groups[0].id) : "",
      name: "",
      level: LEVEL_OPTIONS[0],
      percentage: 50,
    });
    setShowModal(true);
  };

  const openEditModal = (skill: SkillFlat) => {
    setEditing(skill);
    setFormData({
      skill_group_id: String(skill.skill_group_id),
      name: skill.name,
      level: skill.level,
      percentage: skill.percentage,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.skill_group_id) return;
    try {
      setSaving(true);
      const payload = {
        skill_group_id: Number(formData.skill_group_id),
        name: formData.name,
        level: formData.level,
        percentage: Number(formData.percentage),
      };
      if (editing) {
        await updateSkill(editing.id, payload);
        showToast("success", `Skill "${formData.name}" berhasil diperbarui!`);
      } else {
        await createSkill(payload);
        showToast("success", `Skill "${formData.name}" berhasil ditambahkan!`);
      }
      setShowModal(false);
      await loadData();
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const handleGroupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupFormData.title.trim()) return;
    try {
      setSavingGroup(true);
      await createSkillGroup(groupFormData);
      showToast("success", `Kategori "${groupFormData.title}" berhasil ditambahkan!`);
      setShowGroupModal(false);
      setGroupFormData({ title: "", icon: "" });
      await loadData();
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSavingGroup(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteSkill(deleteTarget.id);
      showToast("success", `Skill "${deleteTarget.name}" berhasil dihapus!`);
      setSkills((prev) => prev.filter((s) => s.id !== deleteTarget.id));
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Kelola Data Skill</h1>
          <p className="text-gray-400 mt-1">Tambah, edit, atau hapus skill dan kategori keahlian Anda.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGroupModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-medium transition-all"
          >
            📁 Kategori Baru
          </button>
          <button
            onClick={openAddModal}
            disabled={groups.length === 0}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
          >
            + Tambah Skill
          </button>
        </div>
      </div>

      {!loading && groups.length === 0 && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-sm">
          Belum ada kategori skill. Buat kategori terlebih dahulu sebelum menambah skill baru.
        </div>
      )}

      <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800/60">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Cari berdasarkan nama skill atau kategori..."
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
                <th className="py-3.5 px-4">Nama Skill</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">Level</th>
                <th className="py-3.5 px-4 hidden md:table-cell">Persentase</th>
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
                    <div className="text-4xl mb-2">⚡</div>
                    <p className="text-sm">Tidak ada skill ditemukan.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((skill, index) => (
                  <tr key={skill.id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="py-4 px-4 font-mono text-xs text-gray-500">{index + 1}</td>
                    <td className="py-4 px-4 font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span>{skill.group_icon || "📁"}</span>
                        {skill.group_title}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell text-xs text-gray-400">{skill.level}</td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 h-1.5 rounded-full bg-gray-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-9 text-right">{skill.percentage}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openEditModal(skill)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all hover:scale-110"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setDeleteTarget(skill)}
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
            Menampilkan <strong>{filtered.length}</strong> dari <strong>{skills.length}</strong> skill
          </span>
          <span className="text-gray-500 hidden sm:inline">
            MySQL Table: <code>skills</code>
          </span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl space-y-5"
          >
            <h3 className="text-lg font-bold text-white">
              {editing ? "Edit Skill ✏️" : "Tambah Skill Baru ➕"}
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Nama Skill <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: React.js"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Kategori <span className="text-rose-400">*</span>
              </label>
              <select
                required
                value={formData.skill_group_id}
                onChange={(e) => setFormData({ ...formData, skill_group_id: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              >
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.icon} {g.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                >
                  {LEVEL_OPTIONS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-200">
                  Persentase ({formData.percentage}%)
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: Number(e.target.value) })}
                  className="w-full mt-3.5 accent-emerald-500"
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

      {showGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form
            onSubmit={handleGroupSubmit}
            className="w-full max-w-md p-6 rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl space-y-5"
          >
            <h3 className="text-lg font-bold text-white">Tambah Kategori Skill 📁</h3>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">
                Nama Kategori <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Frontend Development"
                value={groupFormData.title}
                onChange={(e) => setGroupFormData({ ...groupFormData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200">Ikon (emoji)</label>
              <input
                type="text"
                placeholder="Contoh: 🎨"
                value={groupFormData.icon}
                onChange={(e) => setGroupFormData({ ...groupFormData, icon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={savingGroup}
                onClick={() => setShowGroupModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={savingGroup}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {savingGroup ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <span>Simpan 💾</span>
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
              <h3 className="text-lg font-bold text-white">Konfirmasi Hapus Skill</h3>
              <p className="text-sm text-gray-400">
                Apakah Anda yakin ingin menghapus skill{" "}
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