"use client";

import { useState, useEffect } from "react";
import { getSkills, SkillGroup } from "@/data/mockData";

export default function SkillsPage() {
  const [skillGroupsList, setSkillGroupsList] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        const data = await getSkills();
        setSkillGroupsList(data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  return (
    <section className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Kombinasi keahlian teknis dan kakas bantu yang saya gunakan untuk
            mewujudkan konsep menjadi website yang fungsional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-gray-900/40 border border-gray-800/40 animate-pulse"
                >
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800/40">
                    <div className="w-8 h-8 rounded bg-gray-800" />
                    <div className="h-6 bg-gray-800 rounded w-1/2" />
                  </div>

                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="h-4 bg-gray-800 rounded w-1/3" />
                          <div className="h-4 bg-gray-800 rounded w-12" />
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : skillGroupsList.map((group) => (
                <div
                  key={group.title}
                  className="p-6 sm:p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50"
                >
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800/50">
                    <span className="text-3xl">{group.icon}</span>
                    <h2 className="text-xl font-bold text-white">{group.title}</h2>
                  </div>

                  <div className="space-y-6">
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-white">
                            {skill.name}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                            {skill.level}
                          </span>
                        </div>

                        <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                          {/* Progress Bar Indicator */}
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}