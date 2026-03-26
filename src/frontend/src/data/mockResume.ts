import type { ResumeData, TemplateInfo } from "../types/resume";

export const mockResume: ResumeData = {
  name: "Alex Johnson",
  title: "Senior Software Engineer",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexjohnson",
  summary:
    "Results-driven software engineer with 7+ years of experience building scalable web applications. Proven track record of delivering high-quality solutions and leading cross-functional teams.",
  experience: [
    {
      role: "Senior Software Engineer",
      company: "TechCorp Inc.",
      period: "2021 – Present",
      bullets: [
        "Led migration of legacy monolith to microservices, reducing latency by 40%",
        "Mentored team of 5 engineers and conducted code reviews",
        "Architected real-time event-driven system handling 1M+ events/day",
      ],
    },
    {
      role: "Software Engineer",
      company: "StartupXYZ",
      period: "2018 – 2021",
      bullets: [
        "Built React dashboard used by 50k+ users",
        "Reduced API response times by 60% through caching strategies",
        "Integrated third-party payment APIs (Stripe, PayPal)",
      ],
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of California, Berkeley",
      year: "2018",
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
    "PostgreSQL",
  ],
};

export const templates: TemplateInfo[] = [
  {
    id: "classic",
    name: "Classic",
    subtitle: "ATS Optimized",
    isPremium: false,
  },
  {
    id: "modern-clean",
    name: "Modern Clean",
    subtitle: "ATS Optimized",
    isPremium: false,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    subtitle: "ATS Optimized",
    isPremium: false,
  },
  {
    id: "professional",
    name: "Professional",
    subtitle: "ATS Optimized",
    isPremium: false,
  },
  {
    id: "sidebar",
    name: "Sidebar Pro",
    subtitle: "Premium Design",
    isPremium: true,
  },
  {
    id: "creative",
    name: "Creative",
    subtitle: "Premium Design",
    isPremium: true,
  },
  {
    id: "executive",
    name: "Executive",
    subtitle: "Premium Design",
    isPremium: true,
  },
  {
    id: "elegant",
    name: "Elegant",
    subtitle: "Premium Design",
    isPremium: true,
  },
];
