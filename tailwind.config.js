/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: "#00d4ff",
          purple: "#7850ff",
          dark: "#010810",
          navy: "#04111e",
        },
      },

      fontFamily: {
        body: ["Space Grotesk", "sans-serif"],
        display: ["Syne", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};