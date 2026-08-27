import { Project, SkillGroup, Certificate, Testimonial } from "./mockData";

const API_BASE = "http://localhost:5000/api";

// 1. Fetch Project
export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE}/projects`);
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Gagal mengambil data proyek");
  }

  return json.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    description: item.description,
    tech: typeof item.tech === "string" ? JSON.parse(item.tech) : item.tech,
    demoUrl: item.demo_url,
    githubUrl: item.github_url,
  }));
}

// 2. Fetch Skills
export async function fetchSkills(): Promise<SkillGroup[]> {
  const response = await fetch(`${API_BASE}/skills`);
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Gagal mengambil data skill");
  }

  const groupMap = new Map<string, SkillGroup>();

  json.data.forEach((item: any) => {
    const key = item.group_title;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        title: item.group_title,
        icon: item.group_icon,
        skills: [],
      });
    }

    groupMap.get(key)!.skills.push({
      name: item.name,
      level: item.level,
      percentage: item.percentage,
    });
  });

  return Array.from(groupMap.values());
}

// 3. Fetch Sertifikat
export async function fetchCertificates(): Promise<Certificate[]> {
  const response = await fetch(`${API_BASE}/certificates`);
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Gagal mengambil data sertifikat");
  }

  return json.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    issuer: item.issuer,
    date: item.date,
    credentialId: item.credential_id,
    verificationUrl: item.verification_url,
    image: item.image_url,
  }));
}

// 4. Fetch Testimonial
export async function fetchTestimonials(): Promise<Testimonial[]> {
  const response = await fetch(`${API_BASE}/testimonials`);
  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Gagal mengambil data testimoni");
  }

  return json.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    company: item.company,
    avatar: item.avatar,
    stars: item.stars,
    quote: item.quote,
  }));
}

// 5. Fetch Pesan Kontak
export async function sendContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
}