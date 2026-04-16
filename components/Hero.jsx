"use client";

import content from "@/data/content";

export default function Hero() {
  const { hero } = content;

  const handleNavClick = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px clamp(16px, 4vw, 40px) 24px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >

      {/* Main headline */}
      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(32px, 5vw, 64px)",
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          margin: "0 0 8px 0",
          animation: "fadeUp 0.8s ease 0.6s both",
        }}
      >
        <span style={{ color: "#ffffff" }}>{hero.headline}</span>
      </h1>

      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(32px, 5vw, 64px)",
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          margin: "0 0 40px 0",
          animation: "fadeUp 0.8s ease 0.75s both",
          background: "linear-gradient(90deg, #00d4ff, #7850ff, #00d4ff)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "gradientShift 4s linear infinite, fadeUp 0.8s ease 0.75s both",
        }}
      >
        {hero.headlineAccent}
      </h1>

      {/* Subheadline */}
      <p
        style={{
          maxWidth: "600px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(13px, 1.5vw, 15px)",
          color: "rgba(180,210,255,0.55)",
          lineHeight: 1.8,
          letterSpacing: "0.05em",
          marginBottom: "48px",
          animation: "fadeUp 0.8s ease 1s both",
        }}
      >
        {hero.subheadline}
      </p>

      {/* CTAs */}
      <div
        className="hero-cta-row"
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "80px",
          animation: "fadeUp 0.8s ease 1.2s both",
        }}
      >
        <button
          onClick={() => handleNavClick(hero.cta.primary.href)}
          style={{
            padding: "14px 36px",
            background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(120,80,255,0.15))",
            border: "1px solid rgba(0,212,255,0.6)",
            color: "#00d4ff",
            fontFamily: "'Syne', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(0,212,255,0.25), rgba(120,80,255,0.25))";
            e.currentTarget.style.boxShadow =
              "0 0 30px rgba(0,212,255,0.3), inset 0 0 30px rgba(0,212,255,0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(120,80,255,0.15))";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {hero.cta.primary.label}
        </button>

        <button
          onClick={() => handleNavClick(hero.cta.secondary.href)}
          style={{
            padding: "14px 36px",
            background: "transparent",
            border: "1px solid rgba(180,210,255,0.2)",
            color: "rgba(180,210,255,0.6)",
            fontFamily: "'Syne', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(180,210,255,0.5)";
            e.currentTarget.style.color = "rgba(180,210,255,0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(180,210,255,0.2)";
            e.currentTarget.style.color = "rgba(180,210,255,0.6)";
          }}
        >
          {hero.cta.secondary.label}
        </button>
      </div>

      {/* Stats bar */}
      <div
        className="hero-stats"
        style={{
          display: "flex",
          gap: "0",
          flexWrap: "wrap",
          justifyContent: "center",
          borderTop: "1px solid rgba(0,212,255,0.08)",
          borderBottom: "1px solid rgba(0,212,255,0.08)",
          width: "100%",
          maxWidth: "800px",
          animation: "fadeUp 0.8s ease 1.4s both",
        }}
      >
        {hero.stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: "1 1 160px",
              padding: "20px 30px",
              borderRight:
                i < hero.stats.length - 1
                  ? "1px solid rgba(0,212,255,0.08)"
                  : "none",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                fontWeight: 700,
                color: "#00d4ff",
                marginBottom: "4px",
                textShadow: "0 0 20px rgba(0,212,255,0.4)",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                color: "rgba(180,210,255,0.4)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "fadeUp 0.8s ease 1.8s both",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            color: "rgba(0,212,255,0.3)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)",
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes scrollLine {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.5); opacity: 0.4; }
        }
        @media (max-width: 760px) {
          .hero-cta-row {
            width: 100%;
            gap: 10px !important;
          }

          .hero-cta-row button {
            width: 100%;
            max-width: 340px;
          }

          .hero-stats > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(0,212,255,0.08);
          }

          .hero-scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}