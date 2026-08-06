export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
}

export interface Skill {
  name: string;
  level: string;
  percentage: number;
}

export interface SkillGroup {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  image?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  stars: number;
  quote: string;
}

// 1. Projects Data
const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Web Application",
    category: "Web Dev",
    description:"A full-featured e-commerce platform with cart, payment gateway, and admin panel.",
    tech: ["Next.js", "React", "Tailwind CSS", "Express.js", "MySQL"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Attendance App with GPS",
    category: "Mobile App",
    description:"Mobile application for employee attendance tracking with geo-tagging and face detection.",
    tech: ["React Native", "Expo", "Node.js", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "School Management System Dashboard",
    category: "UI/UX",
    description:"Intelligent UI/UX design prototype for managing school courses, students, and grading system.",
    tech: ["Figma", "UI Design", "Prototyping"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Personal Landing Page Portfolio",
    category: "Web Dev",
    description:"Highly responsive, premium dark-themed portfolio site built with speed and animations.",
    tech: ["HTML", "Vanilla JS", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "Task Management Mobile App",
    category: "Mobile App",
    description:"Cross-platform mobile app to track tasks, organize projects, and collaborate with team members.",
    tech: ["Flutter", "Dart", "Firebase"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Smart Home Control Interface",
    category: "UI/UX",
    description:"Modern dark-themed dashboard design for smart home appliance monitoring.",
    tech: ["Figma", "Interaction Design"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

// 2. Data Skills
const skillGroups: SkillGroup[] = [
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

// 3. Data Sertifikat
const certificates: Certificate[] = [
  {
    id: 1,
    title: "AI CLASS ASEAN",
    issuer: "ASEAN FOUNDATION",
    date: "July 2026",
    credentialId: "Asean foundation",
    verificationUrl: "#",
    image: "/certif.png",
  },
  {
    id: 2,
    title: "JavaScript Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "Juni 2026",
    credentialId: "Cisco",
    verificationUrl: "#",
    image: "/sertif.png",
  },
  {
    id: 3,
    title: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    date: "Maret 2025",
    credentialId: "FCC-RESPONSIVE-WD",
    verificationUrl: "#",
  },
  {
    id: 4,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "FreeCodeCamp",
    date: "April 2025",
    credentialId: "FCC-JS-ALGO",
    verificationUrl: "#",
  },
  {
    id: 5,
    title: "Junior Web Developer",
    issuer: "BNSP / LSP Informatika",
    date: "Mei 2025",
    credentialId: "BNSP-JWD-2025",
    verificationUrl: "#",
  },
];

// 4. Data Testimoni
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Drs. Eko Prasetyo",
    role: "Kepala Jurusan RPL",
    company: "SMK Negeri 1",
    avatar: "👨‍🏫",
    stars: 5,
    quote:
      "Egil menunjukkan performa luar biasa dalam setiap tugas dan proyek sekolah. Dia selalu menjadi leader dalam team project karena inisiatif dan tanggung jawabnya yang tinggi.",
  },
  {
    id: 2,
    name: "Rian Ardiansyah",
    role: "Teman Sekolah / Ketua Kelas",
    company: "XII RPL 1",
    avatar: "🧑‍💻",
    stars: 5,
    quote:
      "Belajar kelompok bareng Egil selalu asik. Dia pintar menjelaskan konsep pemrograman yang susah dengan bahasa yang gampang dimengerti oleh teman-teman.",
  },
  {
    id: 3,
    name: "Siti Rahmawati",
    role: "Guru Produktif Web & Mobile",
    company: "SMK Negeri 1",
    avatar: "👩‍🏫",
    stars: 5,
    quote:
      "Pemahaman Egil terhadap framework Next.js dan Tailwind CSS v4 di usianya sekarang sangat mengagumkan. Proyek-proyeknya dikerjakan dengan detail dan rapi.",
  },
];

// Simulasi delay untuk skeleton loading
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProjects(): Promise<Project[]> {
  await delay(1200);
  return projects;
}

export async function getSkills(): Promise<SkillGroup[]> {
  await delay(1000);
  return skillGroups;
}

export async function getCertificates(): Promise<Certificate[]> {
  await delay(1200);
  return certificates;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await delay(1000);
  return testimonials;
}