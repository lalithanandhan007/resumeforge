import type { ResumeData } from "../../types/resume";

interface Props {
  data: ResumeData;
}

export default function ExecutiveTemplate({ data }: Props) {
  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#FAF8F2",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        boxSizing: "border-box",
        color: "#2a2018",
        fontSize: "11px",
        lineHeight: "1.7",
      }}
    >
      <div
        style={{
          backgroundColor: "#1C1810",
          padding: "40px 60px",
          borderBottom: "3px solid #D4A843",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#D4A843",
            margin: 0,
            letterSpacing: "1px",
            fontFamily: "Georgia, serif",
          }}
        >
          {data.name}
        </h1>
        <p
          style={{
            fontSize: "12px",
            color: "rgba(212,168,67,0.7)",
            margin: "6px 0 14px",
            fontStyle: "italic",
            letterSpacing: "0.5px",
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
            color: "#9A8A6A",
          }}
        >
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.location}</span>
          <span>{data.linkedin}</span>
        </div>
      </div>

      <div style={{ padding: "32px 60px", boxSizing: "border-box" }}>
        <ExecSection title="Executive Summary">
          <p
            style={{
              margin: 0,
              color: "#3a2a18",
              fontStyle: "italic",
              lineHeight: "1.7",
            }}
          >
            {data.summary}
          </p>
        </ExecSection>

        <ExecSection title="Professional Experience">
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
                  style={{
                    fontWeight: "700",
                    fontSize: "12px",
                    color: "#1C1810",
                  }}
                >
                  {exp.role}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: "#D4A843",
                    fontStyle: "italic",
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
                  color: "#8A6A30",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                {exp.company}
              </p>
              <ul style={{ margin: 0, paddingLeft: "16px" }}>
                {exp.bullets.map((b) => (
                  <li key={b} style={{ marginBottom: "3px", color: "#3a2a18" }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ExecSection>

        <ExecSection title="Education">
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
                <span style={{ color: "#7A6A4A", marginLeft: "8px" }}>
                  {edu.school}
                </span>
              </div>
              <span
                style={{
                  color: "#D4A843",
                  fontSize: "10px",
                  fontStyle: "italic",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  marginLeft: "12px",
                }}
              >
                {edu.year}
              </span>
            </div>
          ))}
        </ExecSection>

        <ExecSection title="Core Competencies">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {data.skills.map((s) => (
              <span
                key={s}
                style={{
                  border: "1px solid #D4A843",
                  borderRadius: "2px",
                  padding: "2px 10px",
                  fontSize: "10px",
                  color: "#8A6A30",
                  backgroundColor: "rgba(212,168,67,0.06)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </ExecSection>
      </div>
    </div>
  );
}

function ExecSection({
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
          letterSpacing: "2px",
          color: "#D4A843",
          margin: "0 0 6px",
          paddingBottom: "4px",
          borderBottom: "1px solid rgba(212,168,67,0.3)",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
