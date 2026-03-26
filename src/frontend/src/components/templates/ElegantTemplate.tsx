import type { ResumeData } from "../../types/resume";

interface Props {
  data: ResumeData;
}

export default function ElegantTemplate({ data }: Props) {
  return (
    <div
      style={{
        width: "794px",
        backgroundColor: "#ffffff",
        display: "flex",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        boxSizing: "border-box",
        fontSize: "11px",
        lineHeight: "1.7",
      }}
    >
      <div
        style={{
          width: "200px",
          minHeight: "100%",
          backgroundColor: "#0D7A6B",
          padding: "48px 24px",
          boxSizing: "border-box",
          color: "#ffffff",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          {data.name.charAt(0)}
        </div>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "#fff",
            margin: "0 0 4px",
            lineHeight: "1.2",
          }}
        >
          {data.name}
        </h1>
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.75)",
            margin: "0 0 24px",
          }}
        >
          {data.title}
        </p>

        <ElegantSideSection title="Contact">
          <p
            style={{
              margin: "0 0 4px",
              color: "rgba(255,255,255,0.8)",
              fontSize: "9.5px",
            }}
          >
            {data.email}
          </p>
          <p
            style={{
              margin: "0 0 4px",
              color: "rgba(255,255,255,0.8)",
              fontSize: "9.5px",
            }}
          >
            {data.phone}
          </p>
          <p
            style={{
              margin: "0 0 4px",
              color: "rgba(255,255,255,0.8)",
              fontSize: "9.5px",
            }}
          >
            {data.location}
          </p>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.8)",
              fontSize: "9.5px",
            }}
          >
            {data.linkedin}
          </p>
        </ElegantSideSection>

        <ElegantSideSection title="Skills">
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {data.skills.map((s) => (
              <span
                key={s}
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  padding: "3px 10px",
                  fontSize: "9px",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </ElegantSideSection>
      </div>

      <div style={{ flex: 1, padding: "48px 40px", boxSizing: "border-box" }}>
        <ElegantSection title="About">
          <p style={{ margin: 0, color: "#555", lineHeight: "1.7" }}>
            {data.summary}
          </p>
        </ElegantSection>

        <ElegantSection title="Experience">
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
                    color: "#aaa",
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
                  color: "#0D7A6B",
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
        </ElegantSection>

        <ElegantSection title="Education">
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
        </ElegantSection>
      </div>
    </div>
  );
}

function ElegantSideSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <p
        style={{
          fontSize: "8.5px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "2px",
          color: "rgba(255,255,255,0.55)",
          margin: "0 0 8px",
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function ElegantSection({
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
          color: "#0D7A6B",
          margin: "0 0 8px",
          paddingBottom: "4px",
          borderBottom: "1.5px solid #0D7A6B",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
