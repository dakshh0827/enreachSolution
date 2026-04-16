"use client";

import content from "@/data/content";

export default function Footer() {
  const { footer, site, nav } = content;

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(0,212,255,0.08)",
        padding: "clamp(32px, 6vw, 48px) clamp(16px, 4vw, 40px)",
        background: "rgba(1,8,16,0.6)",
      }}
    >
      <div
        className="footer-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              color: "#00d4ff",
              fontSize: "12px",
              opacity: 0.5,
            }}
          >
            <img src="logo/logo32.png" alt="Enreach Solution" />
          </span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              color: "rgba(220,235,255,0.5)",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                color: "rgba(180,210,255,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "rgba(0,212,255,0.7)")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(180,210,255,0.3)")}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-copy" style={{ textAlign: "right" }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: "rgba(180,210,255,0.2)",
              letterSpacing: "0.1em",
              marginBottom: "4px",
            }}
          >
            {footer.copy}
          </p>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              color: "rgba(0,212,255,0.2)",
              letterSpacing: "0.12em",
            }}
          >
            {footer.clearance}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .footer-grid {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 18px !important;
          }

          .footer-copy {
            text-align: left !important;
          }
        }
      `}</style>
    </footer>
  );
}