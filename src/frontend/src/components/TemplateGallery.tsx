import { CheckCircle2, Lock, Sparkles } from "lucide-react";
import type { ResumeData, TemplateId, TemplateInfo } from "../types/resume";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import ModernCleanTemplate from "./templates/ModernCleanTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import SidebarTemplate from "./templates/SidebarTemplate";

const THUMB_SCALE = 0.22;
const THUMB_WIDTH = Math.round(794 * THUMB_SCALE);
const THUMB_HEIGHT = Math.round(1123 * THUMB_SCALE);

const templateComponents: Record<
  TemplateId,
  React.ComponentType<{ data: ResumeData }>
> = {
  classic: ClassicTemplate,
  "modern-clean": ModernCleanTemplate,
  minimalist: MinimalistTemplate,
  professional: ProfessionalTemplate,
  sidebar: SidebarTemplate,
  creative: CreativeTemplate,
  executive: ExecutiveTemplate,
  elegant: ElegantTemplate,
};

function TemplateThumbnail({ id, data }: { id: TemplateId; data: ResumeData }) {
  const Comp = templateComponents[id];
  return (
    <div
      style={{
        width: `${THUMB_WIDTH}px`,
        height: `${THUMB_HEIGHT}px`,
        overflow: "hidden",
        position: "relative",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          width: "794px",
          height: "1123px",
          transform: `scale(${THUMB_SCALE})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      >
        <Comp data={data} />
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: TemplateInfo;
  isSelected: boolean;
  resumeData: ResumeData;
  onSelect: (id: TemplateId) => void;
}

function TemplateCard({
  template,
  isSelected,
  resumeData,
  onSelect,
}: TemplateCardProps) {
  return (
    <article
      className="relative rounded-xl overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: "oklch(0.155 0.028 255)",
        border: isSelected
          ? "2px solid oklch(0.58 0.22 260)"
          : "2px solid oklch(0.22 0.035 255)",
        boxShadow: isSelected ? "0 0 20px rgba(45,127,249,0.25)" : "none",
      }}
    >
      {/* Badge */}
      <div className="absolute top-2 right-2 z-10 pointer-events-none">
        {template.isPremium ? (
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#D97706", color: "#FEF3C7" }}
          >
            PREMIUM
          </span>
        ) : (
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#059669", color: "#D1FAE5" }}
          >
            FREE
          </span>
        )}
      </div>

      {isSelected && (
        <div className="absolute top-2 left-2 z-10 pointer-events-none">
          <CheckCircle2 className="w-4 h-4" style={{ color: "#2D7FF9" }} />
        </div>
      )}

      {/* Thumbnail (clicking it selects) */}
      <button
        type="button"
        aria-label={`Select ${template.name} template`}
        className="block w-full p-2 pt-3 cursor-pointer"
        style={{ background: "none", border: "none", padding: "8px 8px 0" }}
        onClick={() => onSelect(template.id)}
      >
        <TemplateThumbnail id={template.id} data={resumeData} />
      </button>

      <div className="px-3 pb-3">
        <p className="text-white font-semibold text-xs mb-0.5">
          {template.name}
        </p>
        <p
          className="text-[10px] mb-2"
          style={{ color: "oklch(0.65 0.022 255)" }}
        >
          {template.subtitle}
        </p>
        <button
          type="button"
          data-ocid={`templates.${template.id}.button`}
          onClick={() => onSelect(template.id)}
          className="w-full py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
          style={
            isSelected
              ? {
                  background: "linear-gradient(135deg, #2D7FF9, #7C3AED)",
                  color: "#fff",
                }
              : {
                  backgroundColor: "oklch(0.22 0.035 255)",
                  color: "oklch(0.75 0.02 255)",
                  border: "1px solid oklch(0.28 0.04 255)",
                }
          }
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </article>
  );
}

interface Props {
  templates: TemplateInfo[];
  selectedTemplate: TemplateId;
  resumeData: ResumeData;
  onSelectTemplate: (id: TemplateId) => void;
}

export default function TemplateGallery({
  templates,
  selectedTemplate,
  resumeData,
  onSelectTemplate,
}: Props) {
  const freeTemplates = templates.filter((t) => !t.isPremium);
  const premiumTemplates = templates.filter((t) => t.isPremium);

  return (
    <div
      className="flex-1 min-w-0 overflow-y-auto"
      style={{ paddingRight: "2px" }}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Select Your Style
        </h1>

        {/* Free Templates */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" style={{ color: "#4ADE80" }} />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "oklch(0.65 0.022 255)" }}
            >
              ATS-Friendly Templates
            </span>
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full ml-1"
              style={{
                backgroundColor: "rgba(74,222,128,0.15)",
                color: "#4ADE80",
              }}
            >
              FREE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {freeTemplates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                isSelected={selectedTemplate === t.id}
                resumeData={resumeData}
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
        </div>

        {/* Premium Templates */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4" style={{ color: "#F59E0B" }} />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "oklch(0.65 0.022 255)" }}
            >
              Premium Modern Templates
            </span>
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full ml-1"
              style={{
                backgroundColor: "rgba(245,158,11,0.15)",
                color: "#F59E0B",
              }}
            >
              PREMIUM
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {premiumTemplates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                isSelected={selectedTemplate === t.id}
                resumeData={resumeData}
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
