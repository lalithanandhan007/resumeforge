import type { ResumeData } from "../../types/resume";

interface Props {
  data: ResumeData;
}

export default function SidebarTemplate({ data }: Props) {
  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        display: "flex",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        boxSizing: "border-box",
        fontSize: "11px",
        lineHeight: "1.6",
      }}
    >
      <div
        style={{
          width: "240px",
          minHeight: "1123px",
          backgroundColor: "#0F1A2B",
          padding: "48px 28px",
          boxSizing: "border-box",
          color: "#ffffff",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#2D7FF9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          {data.name.charAt(0)}
        </div>
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 4px",
          }}
        >
          {data.name}
        </h1>
        <p style={{ fontSize: "11px", color: "#9AA9BF", margin: "0 0 24px" }}>
          {data.title}
        </p>

        <SidebarSection title="Contact">
          <p style={{ margin: "0 0 4px", color: "#ccd", fontSize: "10px" }}>
            {data.email}
          </p>
          <p style={{ margin: "0 0 4px", color: "#ccd", fontSize: "10px" }}>
            {data.phone}
          </p>
          <p style={{ margin: "0 0 4px", color: "#ccd", fontSize: "10px" }}>
            {data.location}
          </p>
          <p style={{ margin: 0, color: "#ccd", fontSize: "10px" }}>
            {data.linkedin}
          </p>
        </SidebarSection>

        <SidebarSection title="Skills">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {data.skills.map((s) => (
              <span
                key={s}
                style={{
                  backgroundColor: "rgba(45,127,249,0.25)",
                  border: "1px solid rgba(45,127,249,0.4)",
                  borderRadius: "12px",
                  padding: "2px 8px",
                  fontSize: "9px",
                  color: "#9FC9FF",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </SidebarSection>
      </div>

      <div style={{ flex: 1, padding: "48px 40px", boxSizing: "border-box" }}>
        <MainSection title="About Me">
          <p style={{ margin: 0, color: "#444" }}>{data.summary}</p>
        </MainSection>

        <MainSection title="Experience">
          {data.experience.map((exp) => (
            <div
              key={exp.company}
              style={{ marginBottom: "16px", pageBreakInside: "avoid" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{ fontWeight: "700", fontSize: "12px", color: "#111" }}
                >
                  {exp.role}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#888",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    marginLeft: "12px",
                  }}
                >
                  {exp.period}
                </span>
              </div>
              <p
                style={{
                  margin: "2px 0 4px",
                  color: "#2D7FF9",
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                {exp.company}
              </p>
              <ul style={{ margin: 0, paddingLeft: "16px" }}>
                {exp.bullets.map((b) => (
                  <li key={b} style={{ marginBottom: "3px", color: "#333" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </MainSection>

        <MainSection title="Education">
          {data.education.map((edu) => (
            <div key={edu.school} style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: "700", fontSize: "12px" }}>
                {edu.degree}
              </span>
              <p style={{ margin: "2px 0 0", color: "#666", fontSize: "10px" }}>
                {edu.school} · {edu.year}
              </p>
            </div>
          ))}
        </MainSection>
      </div>
    </div>
  );
}

function SidebarSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <p
        style={{
          fontSize: "9px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "#9AA9BF",
          margin: "0 0 8px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "4px",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function MainSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: "20px",
        pageBreakInside: "avoid",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "12px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#2D7FF9",
          margin: "0 0 8px",
          paddingBottom: "4px",
          borderBottom: "2px solid #2D7FF9",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
