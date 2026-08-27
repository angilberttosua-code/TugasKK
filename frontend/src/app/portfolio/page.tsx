"use client";

import { useState, useEffect } from "react";
import { fetchProjects } from "@/data/api";
import { Project } from "@/data/mockData";
import SkeletonCard from "@/components/SkeletonCard";

const categories = ["All", "Web Dev", "Mobile App", "UI/UX"];

export default function PortfolioPage() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjectsList(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Kumpulan proyek yang telah saya kerjakan dalam web development,
            mobile app development, dan desain UI/UX.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-gray-900/50 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} variant="project" />
            ))
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col h-full rounded-2xl bg-gray-900/50 border border-gray-800/50 overflow-hidden hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center border-b border-gray-800/50 group-hover:from-indigo-500/15 group-hover:to-violet-500/15 transition-all duration-300">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    🚀
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs rounded-md bg-gray-800 text-gray-300 border border-gray-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800/50 mt-auto">
                    <a
                      href={project.demoUrl}
                      className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors duration-300 flex items-center gap-1"
                    >
                      Live Demo <span className="text-xs">↗</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      className="text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                    >
                      GitHub <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}