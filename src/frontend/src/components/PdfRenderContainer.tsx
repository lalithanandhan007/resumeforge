import { forwardRef } from "react";
import type { ResumeData, TemplateId } from "../types/resume";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import ModernCleanTemplate from "./templates/ModernCleanTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import SidebarTemplate from "./templates/SidebarTemplate";

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

interface Props {
  templateId: TemplateId;
  data: ResumeData;
}

const PdfRenderContainer = forwardRef<HTMLDivElement, Props>(
  ({ templateId, data }, ref) => {
    const Comp = templateComponents[templateId];
    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "794px",
          backgroundColor: "#ffffff",
          zIndex: -1,
        }}
      >
        <Comp data={data} />
      </div>
    );
  },
);
PdfRenderContainer.displayName = "PdfRenderContainer";
export default PdfRenderContainer;
