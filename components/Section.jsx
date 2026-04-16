"use client";

import { useEffect, useRef, useState } from "react";

export default function Section({
  id,
  children,
  style = {},
  innerStyle = {},
  label,
  index,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        position: "relative",
        padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 40px)",
        zIndex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        ...style,
      }}
    >
      {/* Section label */}
      {label && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "64px",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: "rgba(0,212,255,0.4)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {index ? `00${index}. ` : ""}
            {label}
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background:
                "linear-gradient(to right, rgba(0,212,255,0.2), transparent)",
            }}
          />
        </div>
      )}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </section>
  );
}

// ─── Sub-components exported from Section ────

export function SectionHeading({ children, accent }) {
  return (
    <h2
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(28px, 4vw, 52px)",
        fontWeight: 800,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#ffffff",
        marginBottom: "16px",
        lineHeight: 1.1,
      }}
    >
      {children}
      {accent && (
        <span
          style={{
            display: "block",
            background: "linear-gradient(90deg, #00d4ff, #7850ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {accent}
        </span>
      )}
    </h2>
  );
}

export function SectionSubheading({ children }) {
  return (
    <p
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "clamp(13px, 1.5vw, 15px)",
        color: "rgba(180,210,255,0.5)",
        lineHeight: 1.8,
        maxWidth: "520px",
        marginBottom: "64px",
      }}
    >
      {children}
    </p>
  );
}