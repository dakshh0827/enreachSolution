"use client";

import { useState } from "react";
import content from "@/data/content";
import Section, { SectionHeading, SectionSubheading } from "./Section";

const classificationColors = {
  RESOLVED: { bg: "rgba(0,255,150,0.08)", border: "rgba(0,255,150,0.3)", text: "#00ff96" },
  ACTIVE: { bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.3)", text: "#00d4ff" },
  CLASSIFIED: { bg: "rgba(255,80,80,0.08)", border: "rgba(255,80,80,0.3)", text: "#ff5050" },
};

function CaseCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const cls = classificationColors[project.classification] || classificationColors.ACTIVE;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="case-card"
      style={{
        position: "relative",
        padding: "clamp(22px, 3vw, 40px)",
        border: `1px solid ${hovered ? "rgba(0,212,255,0.7)" : "rgba(0,212,255,0.25)"}`,
        background: hovered ? "rgba(0,212,255,0.03)" : "transparent",
        transition: "all 0.35s ease",
        overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "32px",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: "rgba(0,212,255,0.4)",
              letterSpacing: "0.25em",
              display: "block",
              marginBottom: "6px",
            }}
          >
            {project.code}
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: "rgba(180,210,255,0.35)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </span>
        </div>

        <span
          style={{
            padding: "4px 12px",
            border: `1px solid ${cls.border}`,
            background: cls.bg,
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: cls.text,
            textTransform: "uppercase",
          }}
        >
          ● {project.classification}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(18px, 2.5vw, 26px)",
          fontWeight: 800,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#ffffff",
          marginBottom: "16px",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "12px",
          color: "rgba(180,210,255,0.45)",
          lineHeight: 1.9,
          marginBottom: "28px",
        }}
      >
        {project.description}
      </p>

      {/* Outcome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(0,212,255,0.07)",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            color: "rgba(0,212,255,0.4)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Outcome:
        </span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: cls.text,
          }}
        >
          {project.outcome}
        </span>
      </div>

      {/* Case number watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "20px",
          fontFamily: "'Syne', sans-serif",
          fontSize: "80px",
          fontWeight: 900,
          color: "rgba(0,212,255,0.025)",
          letterSpacing: "-0.05em",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <Section id="work" label="Case Files" index={3}>
      <SectionHeading accent="Operations">Active Case Files</SectionHeading>
      <SectionSubheading>
        Redacted mission dossiers. Real targets, real outcomes, real impact.
        Names classified. Results are not.
      </SectionSubheading>

      <div
        className="work-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "1px",
          background: "rgba(0,212,255,0.04)",
          border: "1px solid rgba(0,212,255,0.04)",
        }}
      >
        {content.projects.map((project, i) => (
          <CaseCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          marginTop: "48px",
          textAlign: "center",
        }}
      >
        <button
          style={{
            padding: "12px 32px",
            background: "transparent",
            border: "1px solid rgba(0,212,255,0.2)",
            color: "rgba(0,212,255,0.5)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)";
            e.currentTarget.style.color = "#00d4ff";
            e.currentTarget.style.background = "rgba(0,212,255,0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)";
            e.currentTarget.style.color = "rgba(0,212,255,0.5)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          [ Request Full Dossier ]
        </button>
      </div>

      <style>{`
        @media (max-width: 560px) {
          #work .case-card {
            transform: none !important;
          }

          #work .case-card h3 {
            font-size: 20px !important;
          }

          #work .case-card p {
            font-size: 11px !important;
            line-height: 1.75 !important;
          }
        }
      `}</style>
    </Section>
  );
}