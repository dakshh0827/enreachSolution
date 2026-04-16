"use client";

import { useState } from "react";
import content from "@/data/content";
import Section, { SectionHeading, SectionSubheading } from "./Section";

function InputField({
  label,
  id,
  type = "text",
  placeholder,
  multiline = false,
  value,
  onChange,
  required = false,
}) {
  const [focused, setFocused] = useState(false);

  const commonStyle = {
    width: "100%",
    background: "rgba(0,212,255,0.1)",
    border: `1px solid ${focused ? "rgba(0,212,255,0.25)" : "rgba(0,212,255,0.05)"}`,
    color: "#00d4ff",
    opacity: 1,
    fontFamily: "'Space Mono', monospace",
    fontSize: "13px",
    letterSpacing: "0.05em",
    padding: "14px 16px",
    outline: "none",
    resize: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxSizing: "border-box",
    boxShadow: focused ? "0 0 20px rgba(0,212,255,0.08)" : "none",
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: focused ? "rgba(0,212,255,0.9)" : "rgba(0,212,255,1)",
          marginBottom: "8px",
          transition: "color 0.3s",
        }}
      >
        &gt; {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={commonStyle}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={commonStyle}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const { contact } = content;
  const initialFormState = {
    name: "",
    email: "",
    org: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Message could not be sent right now.");
      }

      setSubmitted(true);
      setFormData(initialFormState);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong while sending.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" label="Contact" index={4}>
      <div
        className="contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* Left */}
        <div>
          <SectionHeading accent="Secure Channel">
            {contact.headline}
          </SectionHeading>
          <SectionSubheading>{contact.subheadline}</SectionSubheading>

          {/* Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { label: "EMAIL", value: contact.email },
              { label: "PHONE", value: contact.phone },
              { label: "PGP KEY", value: contact.pgp },
              {
                label: "LOCATIONS",
                value: contact.locations.join(" · "),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(0,212,255,0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    color: "rgba(0,212,255,0.4)",
                    letterSpacing: "0.25em",
                    minWidth: "80px",
                    paddingTop: "2px",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "12px",
                    color: "rgba(180,210,255,0.65)",
                    lineHeight: 1.6,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div>
          {submitted ? (
            <div
                className="contact-success"
              style={{
                padding: "60px 40px",
                border: "1px solid rgba(0,255,150,0.3)",
                background: "rgba(0,255,150,0.04)",
                textAlign: "center",
                animation: "fadeUp 0.5s ease",
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "14px",
                  color: "#00ff96",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Channel Established
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(180,210,255,0.4)",
                }}
              >
                Your message is encrypted and en route. Expect contact within
                24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                className="contact-form-shell"
                style={{
                  padding: "32px",
                  border: "1px solid rgba(0,212,255,0.1)",
                  background: "rgba(0,212,255,0.05)",
                }}
              >
                {/* Form header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "28px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid rgba(0,212,255,0.08)",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#00ff96",
                      boxShadow: "0 0 8px #00ff96",
                      animation: "blink 1.5s step-end infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      color: "#00d4ff",
                      letterSpacing: "0.2em",
                    }}
                  >
                    SECURE FORM 
                  </span>
                </div>

                <InputField
                  label="Designation / Name"
                  id="name"
                  placeholder="Agent designation..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Secure Email"
                  id="email"
                  type="email"
                  placeholder="your@secure-domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Organization"
                  id="org"
                  placeholder="Organization or clearance level..."
                  value={formData.org}
                  onChange={handleChange}
                />
                <InputField
                  label="Mission Brief"
                  id="message"
                  multiline
                  placeholder="Describe the threat or operation..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                {errorMessage ? (
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "11px",
                      color: "#ff6b8a",
                      marginTop: "-4px",
                      marginBottom: "12px",
                    }}
                  >
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background:
                      "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(120,80,255,0.12))",
                    border: "1px solid rgba(0,212,255,0.4)",
                    color: "#00d4ff",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    marginTop: "8px",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (isSubmitting) return;
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(120,80,255,0.2))";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(0,212,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(120,80,255,0.12))";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {isSubmitting ? "Transmitting..." : contact.cta}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          #contact .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }

        @media (max-width: 560px) {
          #contact .contact-form-shell {
            padding: 20px !important;
          }

          #contact .contact-success {
            padding: 34px 20px !important;
          }
        }
        ::placeholder {
          color: rgba(0,212,255,0.2);
          font-family: 'Space Mono', monospace;
        }
      `}</style>
    </Section>
  );
}