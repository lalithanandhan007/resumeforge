import { BookMarked, ChevronRight, Plus } from "lucide-react";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-[240px] right-0 z-10 flex items-center justify-between px-6"
      style={{
        height: "60px",
        backgroundColor: "oklch(0.13 0.028 255 / 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.22 0.035 255)",
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm">
        <span style={{ color: "oklch(0.65 0.022 255)" }}>Resume Builder</span>
        <ChevronRight
          className="w-3.5 h-3.5"
          style={{ color: "oklch(0.45 0.03 255)" }}
        />
        <span
          className="font-semibold"
          style={{ color: "oklch(0.92 0.015 255)" }}
        >
          Template Gallery
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-ocid="header.drafts.button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
          style={{
            color: "oklch(0.65 0.022 255)",
            border: "1px solid oklch(0.25 0.04 255)",
          }}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>Saved Drafts</span>
        </button>

        <button
          type="button"
          data-ocid="header.create_new.button"
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all"
          style={{ background: "linear-gradient(135deg, #2D7FF9, #7C3AED)" }}
        >
          <Plus className="w-4 h-4" />
          <span>Create New</span>
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer"
          style={{ background: "linear-gradient(135deg, #2D7FF9, #7C3AED)" }}
        >
          AJ
        </div>
      </div>
    </header>
  );
}
