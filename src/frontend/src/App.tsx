import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import type { Resume } from "./backend.d";
import Dashboard from "./components/Dashboard";
import { resumeToFormData } from "./components/Dashboard";
import Header from "./components/Header";
import LivePreview from "./components/LivePreview";
import LoginScreen from "./components/LoginScreen";
import ResumeFormPanel from "./components/ResumeFormPanel";
import Sidebar from "./components/Sidebar";
import TemplateGallery from "./components/TemplateGallery";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { templates } from "./data/mockResume";
import { useActor } from "./hooks/useActor";
import { useResumeData } from "./hooks/useResumeData";
import type { TemplateId } from "./types/resume";

type View = "builder" | "dashboard";

function AppInner() {
  const { isAuthenticated, isLoading } = useAuth();
  const { actor, isFetching: isActorFetching } = useActor();
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("classic");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<"build" | "templates">("build");
  const [view, setView] = useState<View>("dashboard");

  const resumeHook = useResumeData();
  const { resumeData } = resumeHook;

  // Increment visitor count once per browser session
  useEffect(() => {
    if (!actor || isActorFetching || !isAuthenticated) return;
    if (sessionStorage.getItem("rf_visited")) return;
    sessionStorage.setItem("rf_visited", "1");
    try {
      (actor as any).incrementVisitorCount();
    } catch (err) {
      console.error("Failed to increment visitor count:", err);
    }
  }, [actor, isActorFetching, isAuthenticated]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "oklch(0.12 0.025 255)" }}
      >
        <div className="text-sm" style={{ color: "oklch(0.55 0.022 255)" }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  function handleEditResume(resume: Resume) {
    const formData = resumeToFormData(resume);
    resumeHook.loadResume(formData);
    setSelectedTemplate((resume.template as TemplateId) || "classic");
    setView("builder");
    setActiveTab("build");
  }

  function handleCreateNew() {
    resumeHook.resetResume();
    setView("builder");
    setActiveTab("build");
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.12 0.025 255)" }}
    >
      <Sidebar view={view} setView={setView} />

      <div style={{ marginLeft: "240px" }}>
        <Header
          onCreateNew={handleCreateNew}
          onSavedDrafts={() => setView("dashboard")}
        />

        <div
          className="flex"
          style={{
            marginTop: "60px",
            height: "calc(100vh - 60px)",
            overflow: "hidden",
          }}
        >
          {view === "dashboard" ? (
            <Dashboard
              onEditResume={handleEditResume}
              onCreateNew={handleCreateNew}
            />
          ) : (
            <>
              {/* Left: tabbed content area */}
              <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
                {/* Tab switcher */}
                <div
                  className="flex-shrink-0 flex items-center gap-1 px-5 py-3"
                  style={{ borderBottom: "1px solid oklch(0.22 0.035 255)" }}
                >
                  <button
                    type="button"
                    data-ocid="nav.build.tab"
                    onClick={() => setActiveTab("build")}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      backgroundColor:
                        activeTab === "build"
                          ? "oklch(0.22 0.05 260)"
                          : "transparent",
                      color:
                        activeTab === "build"
                          ? "oklch(0.82 0.12 260)"
                          : "oklch(0.55 0.02 255)",
                      border:
                        activeTab === "build"
                          ? "1px solid oklch(0.35 0.1 260)"
                          : "1px solid transparent",
                    }}
                  >
                    ✏️ Build Resume
                  </button>
                  <button
                    type="button"
                    data-ocid="nav.templates.tab"
                    onClick={() => setActiveTab("templates")}
                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      backgroundColor:
                        activeTab === "templates"
                          ? "oklch(0.22 0.05 260)"
                          : "transparent",
                      color:
                        activeTab === "templates"
                          ? "oklch(0.82 0.12 260)"
                          : "oklch(0.55 0.02 255)",
                      border:
                        activeTab === "templates"
                          ? "1px solid oklch(0.35 0.1 260)"
                          : "1px solid transparent",
                    }}
                  >
                    🎨 Templates
                  </button>
                </div>

                {/* Tab content */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  {activeTab === "build" ? (
                    <ResumeFormPanel
                      resumeData={resumeData}
                      updatePersonal={resumeHook.updatePersonal}
                      updateSummary={resumeHook.updateSummary}
                      updateExperience={resumeHook.updateExperience}
                      addExperience={resumeHook.addExperience}
                      removeExperience={resumeHook.removeExperience}
                      updateExpBullet={resumeHook.updateExpBullet}
                      addExpBullet={resumeHook.addExpBullet}
                      removeExpBullet={resumeHook.removeExpBullet}
                      updateEducation={resumeHook.updateEducation}
                      addEducation={resumeHook.addEducation}
                      removeEducation={resumeHook.removeEducation}
                      addSkill={resumeHook.addSkill}
                      removeSkill={resumeHook.removeSkill}
                    />
                  ) : (
                    <TemplateGallery
                      templates={templates}
                      selectedTemplate={selectedTemplate}
                      resumeData={resumeData}
                      onSelectTemplate={setSelectedTemplate}
                    />
                  )}
                </div>
              </div>

              {/* Live Preview */}
              <LivePreview
                selectedTemplate={selectedTemplate}
                resumeData={resumeData}
                zoomLevel={zoomLevel}
                onZoomChange={setZoomLevel}
              />
            </>
          )}
        </div>
      </div>

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

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
