"use client";

import { useState } from "react";
import content from "@/data/content";
import Section, { SectionHeading, SectionSubheading } from "./Section";
import AtomModel from "./AtomModel";

function FeatureItem({ feature, index, activeIndex, setActive }) {
  const isActive = activeIndex === index;

  return (
    <div
      className="feature-item"
      onClick={() => setActive(isActive ? null : index)}
      style={{
        padding: "clamp(18px, 2.8vw, 28px) clamp(16px, 3vw, 32px)",
        borderLeft: `2px solid ${isActive ? "#00d4ff" : "rgba(0,212,255,0.1)"}`,
        background: isActive
          ? "rgba(0,212,255,0.04)"
          : "transparent",
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginBottom: "2px",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderLeftColor = "rgba(0,212,255,0.4)";
          e.currentTarget.style.background = "rgba(0,212,255,0.02)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderLeftColor = "rgba(0,212,255,0.1)";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isActive ? "12px" : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: isActive ? "#00d4ff" : "rgba(0,212,255,0.3)",
              letterSpacing: "0.2em",
              transition: "color 0.3s",
            }}
          >
            {`0${index + 1}`}
          </span>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(13px, 1.5vw, 16px)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isActive ? "#ffffff" : "rgba(180,210,255,0.7)",
              transition: "color 0.3s",
            }}
          >
            {feature.label}
          </h3>
        </div>

        <span
          style={{
            color: isActive ? "#00d4ff" : "rgba(0,212,255,0.3)",
            fontSize: "18px",
            fontWeight: 300,
            transition: "all 0.3s",
            transform: isActive ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </div>

      {isActive && (
        <p
          className="feature-description"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "13px",
            color: "rgba(180,210,255,0.5)",
            lineHeight: 1.8,
            paddingLeft: "clamp(14px, 4vw, 32px)",
            animation: "expandIn 0.3s ease",
          }}
        >
          {feature.description}
        </p>
      )}
    </div>
  );
}

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="features" label="Capabilities" index={2}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.95fr 1.25fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="features-grid"
      >
        {/* Left: accordion */}
        <div>
          <SectionHeading accent="Capabilities">
            Core
          </SectionHeading>
          <SectionSubheading>
            Technologies that redefine the perimeter. Built for adversarial
            environments.
          </SectionSubheading>

          <div>
            {content.features.map((feature, i) => (
              <FeatureItem
                key={feature.id}
                feature={feature}
                index={i}
                activeIndex={activeIndex}
                setActive={setActiveIndex}
              />
            ))}
          </div>
        </div>

        {/* Right: diagram */}
        <div>
          <AtomModel />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #features .features-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          #features .feature-item {
            margin-bottom: 0 !important;
          }
        }

        @media (max-width: 560px) {
          #features .features-grid {
            gap: 28px !important;
          }

          #features .feature-description {
            font-size: 12px !important;
            line-height: 1.7 !important;
          }
        }
      `}</style>
    </Section>
  );
}