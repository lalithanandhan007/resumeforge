import type { ResumeData } from "../../types/resume";

interface Props {
  data: ResumeData;
}

export default function ClassicTemplate({ data }: Props) {
  return (
    <div
      style={{
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: "'Times New Roman', Times, serif",
        padding: "56px 64px",
        boxSizing: "border-box",
        color: "#000000",
        fontSize: "11.5px",
        lineHeight: "1.65",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4px" }}>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            margin: 0,
          }}
        >
          {data.name}
        </h1>
        <p style={{ fontSize: "12px", color: "#444", margin: "4px 0 0" }}>
          {data.title}
        </p>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: "10.5px",
          color: "#333",
          marginTop: "6px",
          marginBottom: "10px",
        }}
      >
        {data.email} &nbsp;|&nbsp; {data.phone} &nbsp;|&nbsp; {data.location}{" "}
        &nbsp;|&nbsp; {data.linkedin}
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1.5px solid #000",
          margin: "0 0 12px",
        }}
      />

      <Section title="Summary">
        <p style={{ margin: 0 }}>{data.summary}</p>
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
              <span style={{ fontWeight: "bold", fontSize: "11.5px" }}>
                {exp.role} — {exp.company}
              </span>
              <span
                style={{
                  fontSize: "10.5px",
                  color: "#555",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  marginLeft: "12px",
                }}
              >
                {exp.period}
              </span>
            </div>
            <ul style={{ margin: "4px 0 0", paddingLeft: "18px" }}>
              {exp.bullets.map((b) => (
                <li key={b} style={{ marginBottom: "3px" }}>
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
            <span style={{ fontWeight: "bold" }}>
              {edu.degree} — {edu.school}
            </span>
            <span
              style={{
                color: "#555",
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
        <p style={{ margin: 0 }}>{data.skills.join(", ")}</p>
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
          fontSize: "11.5px",
          fontWeight: "bold",
          fontVariant: "small-caps",
          textTransform: "uppercase",
          letterSpacing: "1px",
          margin: "0 0 6px",
          borderBottom: "1px solid #000",
          paddingBottom: "3px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
