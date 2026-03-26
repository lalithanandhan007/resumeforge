import {
  BarChart2,
  FileText,
  HelpCircle,
  Layout,
  LayoutDashboard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: FileText, label: "My Resumes", active: false },
  { icon: Layout, label: "Templates", active: true },
  { icon: BarChart2, label: "Analytics", active: false },
  { icon: User, label: "Profile", active: false },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-[240px] flex flex-col z-20"
      style={{
        backgroundColor: "oklch(0.13 0.028 255)",
        borderRight: "1px solid oklch(0.22 0.035 255)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5 border-b"
        style={{ borderColor: "oklch(0.22 0.035 255)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #2D7FF9, #7C3AED)" }}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold text-base tracking-tight">
          ResumeForge
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.label}
            data-ocid={`sidebar.${item.label.toLowerCase().replace(" ", "_")}.link`}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
            style={{
              background: item.active
                ? "linear-gradient(135deg, rgba(45,127,249,0.2), rgba(124,58,237,0.2))"
                : "transparent",
              color: item.active ? "#93C5FD" : "oklch(0.65 0.022 255)",
              border: item.active
                ? "1px solid rgba(45,127,249,0.3)"
                : "1px solid transparent",
            }}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div
        className="px-3 py-4 border-t space-y-1"
        style={{ borderColor: "oklch(0.22 0.035 255)" }}
      >
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
          style={{ color: "oklch(0.65 0.022 255)" }}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Help</span>
        </button>
        <button
          type="button"
          data-ocid="sidebar.logout.button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
          style={{ color: "oklch(0.65 0.022 255)" }}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
