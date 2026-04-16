"use client";

import { useState, useEffect } from "react";
import content from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="site-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled
          ? "12px clamp(16px, 4vw, 40px)"
          : "20px clamp(16px, 4vw, 40px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(2,12,22,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <div className="site-nav-brand" style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            color: "#00d4ff",
            fontSize: "10px",
            letterSpacing: "0.1em",
            opacity: 0.6,
          }}
        >
          <img src="logo/logo32.png" alt="Enreach Solution" />
        </span>
        <span
          className="site-nav-title"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "#ffffff",
            fontSize: "clamp(11px, 2.4vw, 16px)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {content.site.name}
        </span>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00d4ff",
            boxShadow: "0 0 8px #00d4ff",
            animation: "pulse 2s infinite",
          }}
        />
      </div>

      {/* Desktop Nav */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          alignItems: "center",
        }}
        className="desktop-nav"
      >
        {content.nav.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.href)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 18px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(180,210,255,0.65)",
              transition: "color 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#00d4ff")}
            onMouseLeave={(e) =>
              (e.target.style.color = "rgba(180,210,255,0.65)")
            }
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={() => handleNavClick("#contact")}
          style={{
            marginLeft: "16px",
            padding: "8px 20px",
            background: "transparent",
            border: "1px solid rgba(0,212,255,0.5)",
            color: "#00d4ff",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,212,255,0.1)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          [ Secure Connect ]
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          flexDirection: "column",
          gap: "5px",
          padding: "4px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: i === 1 ? "20px" : "28px",
              height: "1.5px",
              background: "#00d4ff",
              transition: "all 0.3s",
              marginLeft: i === 1 ? "auto" : 0,
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(2,12,22,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0,212,255,0.15)",
            padding: "20px clamp(16px, 4vw, 40px)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {content.nav.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "12px 0",
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(180,210,255,0.7)",
                textAlign: "left",
                borderBottom: "1px solid rgba(0,212,255,0.06)",
              }}
            >
              &gt; {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1100px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 560px) {
          .site-nav-brand img {
            width: 28px;
            height: 28px;
          }

          .site-nav-title {
            max-width: 58vw;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #00d4ff; }
          50% { opacity: 0.4; box-shadow: 0 0 3px #00d4ff; }
        }
      `}</style>
    </nav>
  );
}