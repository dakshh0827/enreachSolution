"use client";

import { useState } from "react";
import content from "@/data/content";
import Section, { SectionHeading, SectionSubheading } from "./Section";

function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="service-card"
      style={{
        position: "relative",
        padding: "clamp(20px, 3vw, 32px)",
        border: `1px solid ${hovered ? "rgba(0,212,255,0.7)" : "rgba(0,212,255,0.25)"}`,
        background: hovered
          ? "rgba(0,212,255,0.04)"
          : "rgba(255,255,255,0.01)",
        transition: "all 0.35s ease",
        cursor: "default",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 20px 60px rgba(0,212,255,0.08)" : "none",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40px",
          height: "1px",
          background: hovered ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.2)",
          transition: "all 0.3s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "40px",
          background: hovered ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.2)",
          transition: "all 0.3s",
        }}
      />

      {/* ID + Icon row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: "rgba(0,212,255,0.35)",
            letterSpacing: "0.2em",
          }}
        >
          {service.id}
        </span>
        <span
          style={{
            fontSize: "24px",
            color: hovered ? "#00d4ff" : "rgba(0,212,255,0.4)",
            transition: "all 0.3s",
            textShadow: hovered ? "0 0 20px rgba(0,212,255,0.6)" : "none",
          }}
        >
          {service.icon}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "16px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? "#ffffff" : "rgba(220,235,255,0.85)",
          marginBottom: "12px",
          transition: "color 0.3s",
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "12px",
          color: "rgba(180,210,255,0.45)",
          lineHeight: 1.8,
          marginBottom: "24px",
        }}
      >
        {service.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "3px 10px",
              border: "1px solid rgba(0,212,255,0.15)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "rgba(0,212,255,0.5)",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover scan line */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(0,212,255,0.6), transparent)",
            animation: "scanService 1.5s linear infinite",
          }}
        />
      )}

      <style>{`
        @keyframes scanService {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Services() {
  return (
    <Section id="services" label="Services" index={1}>
      <SectionHeading accent="Our Arsenal">What We Deploy</SectionHeading>
      <SectionSubheading>
        End-to-end cybersecurity capabilities engineered for modern threat
        landscapes. Each service is a precision instrument.
      </SectionSubheading>

      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1px",
          background: "rgba(0,212,255,0.05)",
          border: "1px solid rgba(0,212,255,0.05)",
        }}
      >
        {content.services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #services .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 560px) {
          #services .services-grid {
            grid-template-columns: 1fr !important;
          }

          #services .service-card {
            transform: none !important;
            box-shadow: none !important;
          }

          #services .service-card p {
            font-size: 11px !important;
          }
        }
      `}</style>
    </Section>
  );
}