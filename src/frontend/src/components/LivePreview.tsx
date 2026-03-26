import { Download, Eye, Loader2, Share2, ZoomIn, ZoomOut } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePdfDownload } from "../hooks/usePdfDownload";
import type { ResumeData, TemplateId } from "../types/resume";
import PdfGeneratingOverlay from "./PdfGeneratingOverlay";
import PdfRenderContainer from "./PdfRenderContainer";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import ModernCleanTemplate from "./templates/ModernCleanTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import SidebarTemplate from "./templates/SidebarTemplate";

const RESUME_WIDTH = 794;
const RESUME_HEIGHT = 1123;

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
  selectedTemplate: TemplateId;
  resumeData: ResumeData;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

export default function LivePreview({
  selectedTemplate,
  resumeData,
  zoomLevel,
  onZoomChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(0.6);
  const { isGenerating, downloadPdf } = usePdfDownload();

  useEffect(() => {
    function calcFit() {
      if (containerRef.current) {
        const availW = containerRef.current.clientWidth - 48;
        setFitScale(availW / RESUME_WIDTH);
      }
    }
    calcFit();
    const ro = new ResizeObserver(calcFit);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const scale = fitScale * zoomLevel;
  const Comp = templateComponents[selectedTemplate];

  async function handleDownload() {
    if (!pdfContainerRef.current) return;
    const filename = `resume-${resumeData.name.toLowerCase().replace(/\s+/g, "-")}.pdf`;
    await downloadPdf(pdfContainerRef.current, filename);
  }

  return (
    <>
      <div
        className="flex flex-col"
        style={{
          width: "420px",
          flexShrink: 0,
          borderLeft: "1px solid oklch(0.22 0.035 255)",
          height: "calc(100vh - 60px)",
          position: "sticky",
          top: "60px",
          overflow: "hidden",
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-5 py-3.5 flex-shrink-0"
          style={{ borderBottom: "1px solid oklch(0.22 0.035 255)" }}
        >
          <div className="flex items-center gap-2">
            <Eye
              className="w-4 h-4"
              style={{ color: "oklch(0.65 0.022 255)" }}
            />
            <span className="font-semibold text-sm text-white">
              Live Preview
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#4ADE80" }}
            />
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(74,222,128,0.1)",
                color: "#4ADE80",
                border: "1px solid rgba(74,222,128,0.2)",
              }}
            >
              Preview Mode
            </span>
          </div>
        </div>

        {/* Resume canvas */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-6"
          style={{ backgroundColor: "oklch(0.10 0.02 255)" }}
        >
          <div
            style={{
              width: `${RESUME_WIDTH * scale}px`,
              minHeight: `${RESUME_HEIGHT * scale}px`,
              height: "auto",
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
              borderRadius: "2px",
            }}
          >
            <div
              style={{
                width: `${RESUME_WIDTH}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            >
              <Comp data={resumeData} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div
          className="flex-shrink-0 px-5 py-4 space-y-3"
          style={{ borderTop: "1px solid oklch(0.22 0.035 255)" }}
        >
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              data-ocid="preview.zoom_out.button"
              onClick={() => onZoomChange(Math.max(0.5, zoomLevel - 0.1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                backgroundColor: "oklch(0.22 0.035 255)",
                color: "oklch(0.75 0.02 255)",
              }}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span
              className="text-sm font-mono font-semibold min-w-[52px] text-center"
              style={{ color: "oklch(0.85 0.015 255)" }}
            >
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              type="button"
              data-ocid="preview.zoom_in.button"
              onClick={() => onZoomChange(Math.min(2, zoomLevel + 0.1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                backgroundColor: "oklch(0.22 0.035 255)",
                color: "oklch(0.75 0.02 255)",
              }}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              data-ocid="preview.download.button"
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #2D7FF9, #7C3AED)",
              }}
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isGenerating ? "Generating..." : "Download PDF"}
            </button>
            <button
              type="button"
              data-ocid="preview.export.button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                backgroundColor: "transparent",
                color: "oklch(0.75 0.02 255)",
                border: "1px solid oklch(0.28 0.04 255)",
              }}
            >
              <Share2 className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Hidden PDF render target */}
      <PdfRenderContainer
        ref={pdfContainerRef}
        templateId={selectedTemplate}
        data={resumeData}
      />

      {/* Full-screen overlay while generating */}
      <AnimatePresence>
        {isGenerating && <PdfGeneratingOverlay />}
      </AnimatePresence>
    </>
  );
}
