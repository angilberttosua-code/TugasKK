"use client";

import { useState } from "react";

const categories = ["All", "Web Dev", "Mobile App", "UI/UX"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Web Application",
    category: "Web Dev",
    description:
      "A full-featured e-commerce platform with cart, payment gateway, and admin panel.",
    tech: ["Next.js", "React", "Tailwind CSS", "Express.js", "MySQL"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Attendance App with GPS",
    category: "Mobile App",
    description:
      "Mobile application for employee attendance tracking with geo-tagging and face detection.",
    tech: ["React Native", "Expo", "Node.js", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "School Management System Dashboard",
    category: "UI/UX",
    description:
      "Intelligent UI/UX design prototype for managing school courses, students, and grading system.",
    tech: ["Figma", "UI Design", "Prototyping"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Personal Landing Page Portfolio",
    category: "Web Dev",
    description:
      "Highly responsive, premium dark-themed portfolio site built with speed and animations.",
    tech: ["HTML", "Vanilla JS", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Task Management Mobile App",
    category: "Mobile App",
    description:
      "Cross-platform mobile app to track tasks, organize projects, and collaborate with team members.",
    tech: ["Flutter", "Dart", "Firebase"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Smart Home Control Interface",
    category: "UI/UX",
    description:
      "Modern dark-themed dashboard design for smart home appliance monitoring.",
    tech: ["Figma", "Interaction Design"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Tab filternya ini */}
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

        {/* Grid Project ini */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col h-full rounded-2xl bg-gray-900/50 border border-gray-800/50 overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Thumbnail Ini */}
              <div className="aspect-video bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center border-b border-gray-800/50">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  🚀
                </span>
              </div>

              {/* Bodynya ini */}
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

                {/* Tech Tags Ini */}
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

                {/* Linksnya ini */}
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
          ))}
        </div>
      </div>
    </section>
  );
}