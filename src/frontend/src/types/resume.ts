export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export type TemplateId =
  | "classic"
  | "modern-clean"
  | "minimalist"
  | "professional"
  | "sidebar"
  | "creative"
  | "executive"
  | "elegant";

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  subtitle: string;
  isPremium: boolean;
}
