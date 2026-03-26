import { useState } from "react";
import Header from "./components/Header";
import LivePreview from "./components/LivePreview";
import Sidebar from "./components/Sidebar";
import TemplateGallery from "./components/TemplateGallery";
import { mockResume, templates } from "./data/mockResume";
import type { TemplateId } from "./types/resume";

export default function App() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("classic");
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.12 0.025 255)" }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main area offset by sidebar */}
      <div style={{ marginLeft: "240px" }}>
        {/* Header */}
        <Header />

        {/* Content below header */}
        <div
          className="flex"
          style={{
            marginTop: "60px",
            height: "calc(100vh - 60px)",
            overflow: "hidden",
          }}
        >
          {/* Template Gallery */}
          <TemplateGallery
            templates={templates}
            selectedTemplate={selectedTemplate}
            resumeData={mockResume}
            onSelectTemplate={setSelectedTemplate}
          />

          {/* Live Preview */}
          <LivePreview
            selectedTemplate={selectedTemplate}
            resumeData={mockResume}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
          />
        </div>
      </div>

      {/* Footer */}
      <footer
        className="fixed bottom-0 right-0 z-30 px-4 py-1.5 text-[10px]"
        style={{ color: "oklch(0.45 0.03 255)" }}
      >
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "oklch(0.58 0.22 260)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
