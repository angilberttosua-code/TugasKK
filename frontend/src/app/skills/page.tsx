const skillGroups = [
  {
    title: "Frontend Development",
    icon: "💻",
    skills: [
      { name: "HTML5 / CSS3", level: "Advanced", percentage: 90 },
      { name: "JavaScript (ES6+)", level: "Advanced", percentage: 85 },
      { name: "React.js", level: "Intermediate", percentage: 75 },
      { name: "Next.js (App Router)", level: "Intermediate", percentage: 70 },
      { name: "Tailwind CSS", level: "Advanced", percentage: 90 },
    ],
  },
  {
    title: "Backend & Database",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: "Intermediate", percentage: 70 },
      { name: "Express.js", level: "Intermediate", percentage: 75 },
      { name: "MySQL", level: "Intermediate", percentage: 80 },
      { name: "RESTful API Development", level: "Intermediate", percentage: 80 },
    ],
  },
  {
    title: "Tools & Platform",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", level: "Advanced", percentage: 85 },
      { name: "Figma (UI/UX)", level: "Intermediate", percentage: 70 },
      { name: "Postman", level: "Advanced", percentage: 80 },
      { name: "VS Code", level: "Advanced", percentage: 95 },
    ],
  },
];

export default function SkillsPage() {
  return (
    <section className="py-16 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headernya ini */}
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

        {/* Skill Groups Grid nya ini */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50"
            >
              {/* Group Headernya ini */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800/50">
                <span className="text-3xl">{group.icon}</span>
                <h2 className="text-xl font-bold text-white">{group.title}</h2>
              </div>

              {/* Skills list nya ini */}
              <div className="space-y-6">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    {/* Skill Info nya ini */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-white">
                        {skill.name}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
                        {skill.level}
                      </span>
                    </div>

                    {/* Progress Bar track nya ini */}
                    <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                      {/* Progress Bar Indicator nya ini */}
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