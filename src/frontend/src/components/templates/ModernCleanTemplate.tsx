import type { ResumeData } from "../../types/resume";

interface Props {
  data: ResumeData;
}

export default function ModernCleanTemplate({ data }: Props) {
  return (
    <div
      style={{
        width: "794px",
        backgroundColor: "#ffffff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        padding: "56px 64px",
        boxSizing: "border-box",
        color: "#1a1a2e",
        fontSize: "11px",
        lineHeight: "1.65",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1a1a2e",
            margin: 0,
          }}
        >
          {data.name}
        </h1>
        <p style={{ fontSize: "13px", color: "#555", margin: "4px 0 8px" }}>
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
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
          <span>{data.linkedin}</span>
        </div>
      </div>

      <div
        style={{
          height: "2px",
          background: "linear-gradient(90deg, #2D7FF9, #7C3AED)",
          marginBottom: "24px",
          borderRadius: "1px",
        }}
      />

      <Section title="Summary">
        <p style={{ margin: 0, color: "#333" }}>{data.summary}</p>
      </Section>

      <Section title="Experience">
        {data.experience.map((exp) => (
          <div
            key={exp.company}
            style={{ marginBottom: "14px", pageBreakInside: "avoid" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "12px",
                  color: "#1a1a2e",
                }}
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
                margin: "1px 0 4px",
                color: "#2D7FF9",
                fontSize: "10px",
                fontWeight: "600",
              }}
            >
              {exp.company}
            </p>
            <ul style={{ margin: "4px 0 0", paddingLeft: "16px" }}>
              {exp.bullets.map((b) => (
                <li key={b} style={{ marginBottom: "3px", color: "#333" }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education">
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
              <span style={{ color: "#666", marginLeft: "6px" }}>
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
      </Section>

      <Section title="Skills">
        <p style={{ margin: 0, color: "#333" }}>{data.skills.join(" · ")}</p>
      </Section>
    </div>
  );
}

function Section({
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
          fontSize: "10px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "#2D7FF9",
          margin: "0 0 8px",
          paddingLeft: "10px",
          borderLeft: "3px solid #2D7FF9",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
