import type { ResumeData } from "../../types/resume";

interface Props {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: Props) {
  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: "'Arial', Helvetica, sans-serif",
        boxSizing: "border-box",
        color: "#222",
        fontSize: "11px",
        lineHeight: "1.65",
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "32px 56px 24px",
          borderBottom: "2px solid #ddd",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#111",
            margin: 0,
          }}
        >
          {data.name}
        </h1>
        <p style={{ fontSize: "12px", color: "#555", margin: "4px 0 10px" }}>
          {data.title}
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "10px",
            color: "#666",
            flexWrap: "wrap",
          }}
        >
          <span>✉ {data.email}</span>
          <span>📞 {data.phone}</span>
          <span>📍 {data.location}</span>
          <span>🔗 {data.linkedin}</span>
        </div>
      </div>

      <div style={{ padding: "28px 56px", boxSizing: "border-box" }}>
        <ProfSection title="Professional Summary">
          <p style={{ margin: 0, color: "#444" }}>{data.summary}</p>
        </ProfSection>

        <ProfSection title="Work Experience">
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
                    color: "#fff",
                    backgroundColor: "#555",
                    padding: "1px 7px",
                    borderRadius: "3px",
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
                  color: "#666",
                  fontSize: "11px",
                  fontStyle: "italic",
                }}
              >
                {exp.company}
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "16px",
                  listStyleType: "square",
                }}
              >
                {exp.bullets.map((b) => (
                  <li key={b} style={{ marginBottom: "3px", color: "#333" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ProfSection>

        <ProfSection title="Education">
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
                <span style={{ color: "#666", marginLeft: "8px" }}>
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
        </ProfSection>

        <ProfSection title="Technical Skills">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {data.skills.map((s) => (
              <span
                key={s}
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ddd",
                  borderRadius: "3px",
                  padding: "2px 8px",
                  fontSize: "10px",
                  color: "#333",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </ProfSection>
      </div>
    </div>
  );
}

function ProfSection({
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
          fontSize: "11px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#fff",
          backgroundColor: "#444",
          margin: "0 0 8px",
          padding: "4px 8px",
          borderRadius: "2px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
