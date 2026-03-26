import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import type {
  EducationItem,
  ExperienceItem,
  ResumeData,
} from "../types/resume";

const SECTION_TABS = [
  { id: "personal", label: "Personal" },
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
] as const;

type SectionId = (typeof SECTION_TABS)[number]["id"];

const inputCls = `
  w-full rounded-lg px-3 py-2 text-sm
  bg-[oklch(0.16_0.028_255)] border border-[oklch(0.26_0.04_255)]
  text-white placeholder:text-[oklch(0.45_0.02_255)]
  focus:outline-none focus:ring-1 focus:ring-[oklch(0.58_0.22_260)]
  transition-all
`;

const labelCls =
  "block text-xs font-medium mb-1.5 text-[oklch(0.65_0.022_255)]";

function SectionHeader({
  title,
  gradient,
}: { title: string; gradient: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="h-0.5 flex-1 rounded-full"
        style={{ background: gradient }}
      />
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{
          background: gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </span>
      <div
        className="h-0.5 flex-1 rounded-full"
        style={{ background: gradient }}
      />
    </div>
  );
}

interface Props {
  resumeData: ResumeData;
  updatePersonal: (
    field: keyof Pick<
      ResumeData,
      "name" | "title" | "email" | "phone" | "location" | "linkedin"
    >,
    value: string,
  ) => void;
  updateSummary: (value: string) => void;
  updateExperience: (
    index: number,
    field: keyof ExperienceItem,
    value: string | string[],
  ) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateExpBullet: (
    expIndex: number,
    bulletIndex: number,
    value: string,
  ) => void;
  addExpBullet: (expIndex: number) => void;
  removeExpBullet: (expIndex: number, bulletIndex: number) => void;
  updateEducation: (
    index: number,
    field: keyof EducationItem,
    value: string,
  ) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
}

export default function ResumeFormPanel({
  resumeData,
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
}: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("personal");
  const [skillInput, setSkillInput] = useState("");

  const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    personal: null,
    summary: null,
    experience: null,
    education: null,
    skills: null,
  });

  function scrollTo(id: SectionId) {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleAddSkill() {
    addSkill(skillInput);
    setSkillInput("");
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: "oklch(0.13 0.028 255)" }}
    >
      {/* Section tabs */}
      <div
        className="flex-shrink-0 px-4 pt-4 pb-0"
        style={{ borderBottom: "1px solid oklch(0.22 0.035 255)" }}
      >
        <div
          className="flex gap-1 overflow-x-auto pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {SECTION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-ocid={`form.${tab.id}.tab`}
              onClick={() => scrollTo(tab.id)}
              className="flex-shrink-0 px-3 pb-3 pt-1 text-xs font-semibold transition-all border-b-2"
              style={{
                borderColor:
                  activeSection === tab.id
                    ? "oklch(0.58 0.22 260)"
                    : "transparent",
                color:
                  activeSection === tab.id
                    ? "oklch(0.82 0.12 260)"
                    : "oklch(0.55 0.02 255)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable form content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-8">
        {/* PERSONAL */}
        <div
          ref={(el) => {
            sectionRefs.current.personal = el;
          }}
        >
          <SectionHeader
            title="Personal Info"
            gradient="linear-gradient(90deg, oklch(0.58 0.22 260), oklch(0.65 0.22 280))"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={labelCls}>Full Name</p>
              <Input
                className={inputCls}
                data-ocid="form.name.input"
                value={resumeData.name}
                onChange={(e) => updatePersonal("name", e.target.value)}
                placeholder="Alex Johnson"
              />
            </div>
            <div>
              <p className={labelCls}>Job Title</p>
              <Input
                className={inputCls}
                data-ocid="form.title.input"
                value={resumeData.title}
                onChange={(e) => updatePersonal("title", e.target.value)}
                placeholder="Senior Software Engineer"
              />
            </div>
            <div>
              <p className={labelCls}>Email</p>
              <Input
                className={inputCls}
                data-ocid="form.email.input"
                type="email"
                value={resumeData.email}
                onChange={(e) => updatePersonal("email", e.target.value)}
                placeholder="alex@email.com"
              />
            </div>
            <div>
              <p className={labelCls}>Phone</p>
              <Input
                className={inputCls}
                data-ocid="form.phone.input"
                value={resumeData.phone}
                onChange={(e) => updatePersonal("phone", e.target.value)}
                placeholder="+1 (555) 234-5678"
              />
            </div>
            <div>
              <p className={labelCls}>Location</p>
              <Input
                className={inputCls}
                data-ocid="form.location.input"
                value={resumeData.location}
                onChange={(e) => updatePersonal("location", e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <p className={labelCls}>LinkedIn</p>
              <Input
                className={inputCls}
                data-ocid="form.linkedin.input"
                value={resumeData.linkedin}
                onChange={(e) => updatePersonal("linkedin", e.target.value)}
                placeholder="linkedin.com/in/username"
              />
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div
          ref={(el) => {
            sectionRefs.current.summary = el;
          }}
        >
          <SectionHeader
            title="Summary"
            gradient="linear-gradient(90deg, oklch(0.65 0.22 200), oklch(0.65 0.22 220))"
          />
          <Textarea
            className={inputCls}
            data-ocid="form.summary.textarea"
            rows={4}
            value={resumeData.summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Results-driven professional with..."
            style={{ resize: "vertical", minHeight: "100px" }}
          />
        </div>

        {/* EXPERIENCE */}
        <div
          ref={(el) => {
            sectionRefs.current.experience = el;
          }}
        >
          <SectionHeader
            title="Experience"
            gradient="linear-gradient(90deg, oklch(0.65 0.22 160), oklch(0.65 0.22 190))"
          />
          <div className="space-y-4">
            {resumeData.experience.map((exp, ei) => (
              <div
                key={`exp-${exp.company}-${ei}`}
                className="rounded-xl p-4 space-y-3"
                style={{
                  backgroundColor: "oklch(0.16 0.03 255)",
                  border: "1px solid oklch(0.24 0.04 255)",
                }}
                data-ocid={`form.experience.item.${ei + 1}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "oklch(0.65 0.12 260)" }}
                  >
                    Position {ei + 1}
                  </span>
                  <button
                    type="button"
                    data-ocid={`form.experience.delete_button.${ei + 1}`}
                    onClick={() => removeExperience(ei)}
                    className="p-1 rounded-lg transition-all"
                    style={{
                      color: "oklch(0.6 0.18 20)",
                      backgroundColor: "oklch(0.18 0.04 20)",
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={labelCls}>Role / Position</p>
                    <Input
                      className={inputCls}
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(ei, "role", e.target.value)
                      }
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <p className={labelCls}>Company</p>
                    <Input
                      className={inputCls}
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(ei, "company", e.target.value)
                      }
                      placeholder="TechCorp Inc."
                    />
                  </div>
                </div>
                <div>
                  <p className={labelCls}>Period</p>
                  <Input
                    className={inputCls}
                    value={exp.period}
                    onChange={(e) =>
                      updateExperience(ei, "period", e.target.value)
                    }
                    placeholder="2021 – Present"
                  />
                </div>
                <div>
                  <p className={labelCls}>Bullet Points</p>
                  <div className="space-y-2">
                    {exp.bullets.map((bullet, bi) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: bullets have no stable id
                        key={`bullet-${ei}-${bi}`}
                        className="flex items-center gap-2"
                      >
                        <span
                          style={{ color: "oklch(0.55 0.12 260)" }}
                          className="text-sm select-none"
                        >
                          •
                        </span>
                        <Input
                          className={`${inputCls} flex-1`}
                          value={bullet}
                          onChange={(e) =>
                            updateExpBullet(ei, bi, e.target.value)
                          }
                          placeholder="Describe your achievement..."
                        />
                        {exp.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExpBullet(ei, bi)}
                            className="p-1 rounded transition-all flex-shrink-0"
                            style={{ color: "oklch(0.55 0.1 20)" }}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addExpBullet(ei)}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all mt-1"
                      style={{
                        color: "oklch(0.68 0.16 260)",
                        backgroundColor: "oklch(0.18 0.04 260)",
                        border: "1px dashed oklch(0.3 0.06 260)",
                      }}
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              data-ocid="form.experience.add_button"
              onClick={addExperience}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                color: "oklch(0.68 0.16 260)",
                backgroundColor: "oklch(0.16 0.03 255)",
                border: "1px dashed oklch(0.3 0.06 260)",
              }}
            >
              <Plus className="w-4 h-4" /> Add Experience
            </button>
          </div>
        </div>

        {/* EDUCATION */}
        <div
          ref={(el) => {
            sectionRefs.current.education = el;
          }}
        >
          <SectionHeader
            title="Education"
            gradient="linear-gradient(90deg, oklch(0.65 0.2 120), oklch(0.65 0.2 150))"
          />
          <div className="space-y-4">
            {resumeData.education.map((edu, ei) => (
              <div
                key={`edu-${edu.school}-${ei}`}
                className="rounded-xl p-4 space-y-3"
                style={{
                  backgroundColor: "oklch(0.16 0.03 255)",
                  border: "1px solid oklch(0.24 0.04 255)",
                }}
                data-ocid={`form.education.item.${ei + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "oklch(0.65 0.12 150)" }}
                  >
                    Education {ei + 1}
                  </span>
                  <button
                    type="button"
                    data-ocid={`form.education.delete_button.${ei + 1}`}
                    onClick={() => removeEducation(ei)}
                    className="p-1 rounded-lg transition-all"
                    style={{
                      color: "oklch(0.6 0.18 20)",
                      backgroundColor: "oklch(0.18 0.04 20)",
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className={labelCls}>Degree</p>
                  <Input
                    className={inputCls}
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(ei, "degree", e.target.value)
                    }
                    placeholder="B.S. Computer Science"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={labelCls}>School / University</p>
                    <Input
                      className={inputCls}
                      value={edu.school}
                      onChange={(e) =>
                        updateEducation(ei, "school", e.target.value)
                      }
                      placeholder="UC Berkeley"
                    />
                  </div>
                  <div>
                    <p className={labelCls}>Year</p>
                    <Input
                      className={inputCls}
                      value={edu.year}
                      onChange={(e) =>
                        updateEducation(ei, "year", e.target.value)
                      }
                      placeholder="2018"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              data-ocid="form.education.add_button"
              onClick={addEducation}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                color: "oklch(0.68 0.18 140)",
                backgroundColor: "oklch(0.16 0.03 255)",
                border: "1px dashed oklch(0.3 0.06 140)",
              }}
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          </div>
        </div>

        {/* SKILLS */}
        <div
          ref={(el) => {
            sectionRefs.current.skills = el;
          }}
        >
          <SectionHeader
            title="Skills"
            gradient="linear-gradient(90deg, oklch(0.65 0.2 320), oklch(0.65 0.2 280))"
          />
          <div className="flex gap-2 mb-3">
            <Input
              className={`${inputCls} flex-1`}
              data-ocid="form.skills.input"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g. React, TypeScript..."
            />
            <button
              type="button"
              data-ocid="form.skills.add_button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 280), oklch(0.55 0.22 320))",
                color: "white",
              }}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, si) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: skills have no stable id
                key={`skill-${skill}-${si}`}
                data-ocid={`form.skills.item.${si + 1}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: "oklch(0.18 0.04 280)",
                  border: "1px solid oklch(0.3 0.08 280)",
                  color: "oklch(0.78 0.12 280)",
                }}
              >
                {skill}
                <button
                  type="button"
                  data-ocid={`form.skills.delete_button.${si + 1}`}
                  onClick={() => removeSkill(si)}
                  className="ml-0.5 rounded-full transition-all hover:opacity-70"
                  style={{ color: "oklch(0.6 0.1 280)" }}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {resumeData.skills.length === 0 && (
              <p className="text-xs" style={{ color: "oklch(0.45 0.02 255)" }}>
                No skills added yet.
              </p>
            )}
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-8" />
      </div>
    </div>
  );
}
