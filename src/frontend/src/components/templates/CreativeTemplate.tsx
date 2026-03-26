import type { ResumeData } from "../../types/resume";

interface Props {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: Props) {
  return (
    <div
      style={{
        width: "794px",
        backgroundColor: "#ffffff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        boxSizing: "border-box",
        color: "#1a1a2e",
        fontSize: "11px",
        lineHeight: "1.7",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #2D7FF9 0%, #7C3AED 100%)",
          padding: "44px 56px 36px",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "800",
            margin: 0,
            letterSpacing: "0.5px",
          }}
        >
          {data.name}
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.85)",
            margin: "6px 0 16px",
            fontWeight: "300",
            letterSpacing: "1px",
          }}
        >
          {data.title}
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            fontSize: "10px",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <span>✉ {data.email}</span>
          <span>📞 {data.phone}</span>
          <span>📍 {data.location}</span>
          <span>🔗 {data.linkedin}</span>
        </div>
      </div>

      <div style={{ padding: "32px 56px", boxSizing: "border-box" }}>
        <CreSection title="Profile">
          <p style={{ margin: 0, color: "#444" }}>{data.summary}</p>
        </CreSection>

        <CreSection title="Experience">
          {data.experience.map((exp) => (
            <div
              key={exp.company}
              style={{
                marginBottom: "16px",
                padding: "12px 16px",
                backgroundColor: "#fafafa",
                borderRadius: "6px",
                borderLeft: "3px solid #7C3AED",
                pageBreakInside: "avoid",
                boxSizing: "border-box",
              }}
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
                  margin: "2px 0 6px",
                  color: "#7C3AED",
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                {exp.company}
              </p>
              <ul style={{ margin: 0, paddingLeft: "14px" }}>
                {exp.bullets.map((b) => (
                  <li key={b} style={{ marginBottom: "3px", color: "#444" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CreSection>

        <CreSection title="Education">
          {data.education.map((edu) => (
            <div
              key={edu.school}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <div>
                <span style={{ fontWeight: "700", fontSize: "12px" }}>
                  {edu.degree}
                </span>
                <span
                  style={{ color: "#666", marginLeft: "8px", fontSize: "10px" }}
                >
                  {edu.school}
                </span>
              </div>
              <span
                style={{
                  color: "#888",
                  fontSize: "10px",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  marginLeft: "12px",
                }}
              >
                {edu.year}
              </span>
            </div>
          ))}
        </CreSection>

        <CreSection title="Skills">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {data.skills.map((s) => (
              <span
                key={s}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(45,127,249,0.1), rgba(124,58,237,0.1))",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "12px",
                  padding: "3px 10px",
                  fontSize: "10px",
                  color: "#7C3AED",
                  fontWeight: "600",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </CreSection>
      </div>
    </div>
  );
}

function CreSection({
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
          letterSpacing: "2px",
          color: "#7C3AED",
          margin: "0 0 8px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
