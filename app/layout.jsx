import "@/styles/globals.css";
import { Space_Grotesk, Space_Mono, Syne } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

export const metadata = {
  title: "HackVector — Cyber Intelligence Platform",
  description:
    "Advanced cyber intelligence, digital forensics, and threat detection for enterprises at the edge of tomorrow.",
  keywords: [
    "cybersecurity",
    "digital forensics",
    "threat intelligence",
    "penetration testing",
    "incident response",
  ],
  themeColor: "#010810",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${syne.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
