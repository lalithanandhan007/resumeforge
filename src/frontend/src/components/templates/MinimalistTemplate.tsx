import type { ResumeData } from "../../types/resume";

interface Props {
  data: ResumeData;
}

export default function MinimalistTemplate({ data }: Props) {
  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        padding: "64px 72px",
        boxSizing: "border-box",
        color: "#222",
        fontSize: "11px",
        lineHeight: "1.75",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "300",
          letterSpacing: "2px",
          color: "#111",
          margin: "0 0 4px",
          textTransform: "uppercase",
        }}
      >
        {data.name}
      </h1>
      <p
        style={{
          fontSize: "12px",
          color: "#888",
          fontWeight: "400",
          margin: "0 0 16px",
          letterSpacing: "0.5px",
        }}
      >
        {data.title}
      </p>
      <div
        style={{
          display: "flex",
          gap: "20px",
          fontSize: "10px",
          color: "#999",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}
      >
        <span>{data.email}</span>
        <span>{data.phone}</span>
        <span>{data.location}</span>
        <span>{data.linkedin}</span>
      </div>

      <MinSection title="About">
        <p style={{ margin: 0, color: "#444", lineHeight: "1.75" }}>
          {data.summary}
        </p>
      </MinSection>

      <MinSection title="Experience">
        {data.experience.map((exp) => (
          <div
            key={exp.company}
            style={{ marginBottom: "18px", pageBreakInside: "avoid" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span
                style={{ fontWeight: "600", fontSize: "12px", color: "#111" }}
              >
                {exp.role}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "#aaa",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  marginLeft: "12px",
                }}
              >
                {exp.period}
              </span>
            </div>
            <p style={{ margin: "2px 0 6px", color: "#888", fontSize: "10px" }}>
              {exp.company}
            </p>
            <ul style={{ margin: 0, paddingLeft: "16px" }}>
              {exp.bullets.map((b) => (
                <li key={b} style={{ color: "#555", marginBottom: "3px" }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </MinSection>

      <MinSection title="Education">
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
              <span style={{ fontWeight: "600", fontSize: "12px" }}>
                {edu.degree}
              </span>
              <span
                style={{ color: "#888", marginLeft: "8px", fontSize: "10px" }}
              >
                {edu.school}
              </span>
            </div>
            <span
              style={{
                color: "#aaa",
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
      </MinSection>

      <MinSection title="Skills">
        <p style={{ margin: 0, color: "#555" }}>{data.skills.join("  ·  ")}</p>
      </MinSection>
    </div>
  );
}

function MinSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: "24px",
        pageBreakInside: "avoid",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          fontSize: "9px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "2.5px",
          color: "#bbb",
          margin: "0 0 12px",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
