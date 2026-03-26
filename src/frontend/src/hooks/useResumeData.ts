import { useState } from "react";
import { mockResume } from "../data/mockResume";
import type {
  EducationItem,
  ExperienceItem,
  ResumeData,
} from "../types/resume";

const emptyResume: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  summary: "",
  experience: [{ role: "", company: "", period: "", bullets: [""] }],
  education: [{ degree: "", school: "", year: "" }],
  skills: [],
};

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(mockResume);

  function loadResume(data: ResumeData) {
    setResumeData(data);
  }

  function resetResume() {
    setResumeData(emptyResume);
  }

  function updatePersonal(
    field: keyof Pick<
      ResumeData,
      "name" | "title" | "email" | "phone" | "location" | "linkedin"
    >,
    value: string,
  ) {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  }

  function updateSummary(value: string) {
    setResumeData((prev) => ({ ...prev, summary: value }));
  }

  function updateExperience(
    index: number,
    field: keyof ExperienceItem,
    value: string | string[],
  ) {
    setResumeData((prev) => {
      const exp = prev.experience.map((e, i) =>
        i === index ? { ...e, [field]: value } : e,
      );
      return { ...prev, experience: exp };
    });
  }

  function addExperience() {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { role: "", company: "", period: "", bullets: [""] },
      ],
    }));
  }

  function removeExperience(index: number) {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }

  function updateExpBullet(
    expIndex: number,
    bulletIndex: number,
    value: string,
  ) {
    setResumeData((prev) => {
      const exp = prev.experience.map((e, i) => {
        if (i !== expIndex) return e;
        const bullets = e.bullets.map((b, bi) =>
          bi === bulletIndex ? value : b,
        );
        return { ...e, bullets };
      });
      return { ...prev, experience: exp };
    });
  }

  function addExpBullet(expIndex: number) {
    setResumeData((prev) => {
      const exp = prev.experience.map((e, i) =>
        i === expIndex ? { ...e, bullets: [...e.bullets, ""] } : e,
      );
      return { ...prev, experience: exp };
    });
  }

  function removeExpBullet(expIndex: number, bulletIndex: number) {
    setResumeData((prev) => {
      const exp = prev.experience.map((e, i) => {
        if (i !== expIndex) return e;
        return {
          ...e,
          bullets: e.bullets.filter((_, bi) => bi !== bulletIndex),
        };
      });
      return { ...prev, experience: exp };
    });
  }

  function updateEducation(
    index: number,
    field: keyof EducationItem,
    value: string,
  ) {
    setResumeData((prev) => {
      const education = prev.education.map((e, i) =>
        i === index ? { ...e, [field]: value } : e,
      );
      return { ...prev, education };
    });
  }

  function addEducation() {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "" }],
    }));
  }

  function removeEducation(index: number) {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setResumeData((prev) => {
      if (prev.skills.includes(trimmed)) return prev;
      return { ...prev, skills: [...prev.skills, trimmed] };
    });
  }

  function removeSkill(index: number) {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }

  return {
    resumeData,
    loadResume,
    resetResume,
    updatePersonal,
    updateSummary,
    updateExperience,
    addExperience,
    removeExperience,
    updateExpBullet,
    addExpBullet,
    removeExpBullet,
    updateEducation,
    addEducation,
    removeEducation,
    addSkill,
    removeSkill,
  };
}
