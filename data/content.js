const content = {
  site: {
    name: "EnReach Solution",
    tagline: "Cyber Forensics & Digital Security",
    logo: "ENREACH://",
  },

  hero: {
    badge: "[ TRUSTED CYBER FORENSICS EXPERTS ]",
    headline: "Uncover.",
    headlineAccent: "Analyze. Secure.",
    subheadline:
      "Expert digital forensics and cyber fraud investigation services using cutting-edge tools and proven methodologies to combat cybercrime and protect digital assets.",
    cta: {
      primary: { label: "Get Consultation", href: "#contact" },
      secondary: { label: "Explore Services", href: "#services" },
    },
    stats: [
      { value: "100+", label: "Cases Investigated" },
      { value: "24/7", label: "Incident Support" },
      { value: "50+", label: "Clients Served" },
      { value: "Expert", label: "Certified Team" },
    ],
  },

  services: [
    {
      id: "svc-01",
      icon: "◈",
      title: "Digital Forensics",
      description:
        "Advanced investigation of digital devices and systems to uncover, preserve, and analyze evidence for legal and corporate cases.",
      tags: ["Evidence", "Investigation", "Recovery"],
    },
    {
      id: "svc-02",
      icon: "◉",
      title: "Cyber Fraud Investigation",
      description:
        "Detection and analysis of financial fraud, online scams, and cybercrime activities with actionable insights.",
      tags: ["Fraud Detection", "Analysis", "Cybercrime"],
    },
    {
      id: "svc-03",
      icon: "⬡",
      title: "Incident Response",
      description:
        "Rapid response to cyber incidents, minimizing damage and restoring operations with expert remediation strategies.",
      tags: ["Response", "Containment", "Recovery"],
    },
    {
      id: "svc-04",
      icon: "◇",
      title: "Mobile Forensics",
      description:
        "Extraction and analysis of data from mobile devices including deleted data recovery and app-level investigations.",
      tags: ["Mobile", "Data Recovery", "Analysis"],
    },
    {
      id: "svc-05",
      icon: "▲",
      title: "IP Theft Investigation",
      description:
        "Identify and track intellectual property theft, data leaks, and unauthorized access across digital platforms.",
      tags: ["IP Protection", "Tracking", "Security"],
    },
    {
      id: "svc-06",
      icon: "◎",
      title: "Security Assessment",
      description:
        "Proactive threat hunting and vulnerability assessments to strengthen organizational cybersecurity posture.",
      tags: ["Assessment", "Vulnerabilities", "Prevention"],
    },
  ],

  features: [
    {
      id: "feat-01",
      label: "Advanced Forensic Tools",
      description:
        "Utilizing cutting-edge digital forensic tools to uncover hidden, deleted, and encrypted data.",
    },
    {
      id: "feat-02",
      label: "Certified Experts",
      description:
        "Team of highly skilled professionals experienced in cyber investigations and legal compliance.",
    },
    {
      id: "feat-03",
      label: "End-to-End Investigation",
      description:
        "From evidence collection to reporting and expert testimony, we handle the complete investigation lifecycle.",
    },
    {
      id: "feat-04",
      label: "Discreet & Secure",
      description:
        "Ensuring confidentiality and data integrity throughout every investigation process.",
    },
  ],

  projects: [
    {
      id: "proj-01",
      code: "CASE::FRD-021",
      title: "Financial Fraud Case",
      category: "Cyber Fraud",
      description:
        "Investigated a large-scale online financial fraud operation, tracing digital transactions and identifying perpetrators.",
      outcome: "Fraud network identified",
      classification: "RESOLVED",
    },
    {
      id: "proj-02",
      code: "CASE::IP-014",
      title: "Intellectual Property Theft",
      category: "IP Investigation",
      description:
        "Tracked internal data leakage and identified unauthorized data transfers within an organization.",
      outcome: "Data breach contained",
      classification: "RESOLVED",
    },
    {
      id: "proj-03",
      code: "CASE::MOB-009",
      title: "Mobile Evidence Recovery",
      category: "Mobile Forensics",
      description:
        "Recovered deleted data from mobile devices used in a criminal investigation.",
      outcome: "Critical evidence recovered",
      classification: "RESOLVED",
    },
  ],

  contact: {
    headline: "Get in Touch",
    subheadline:
      "Reach out to our cybersecurity experts for digital forensic investigations, incident response, or consultation.",
    email: "hr@enreachsolution.com",
    phone: "+91 (Contact Available on Request)",
    pgp: "Secure Communication Available",
    locations: ["Delhi NCR, India"],
    cta: "Contact Us",
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Features", href: "#features" },
    { label: "Cases", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],

  footer: {
    copy: "© 2026 EnReach Solution. All rights reserved.",
    clearance: "Empowering Trust. Securing Tomorrow.",
  },
};

export default content;