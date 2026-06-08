import type { Config } from "tailwindcss";

/**
 * Tailwind is available for utility classes, but the FaPrompt design system
 * lives in app/globals.css (ported verbatim from v1). The brand tokens below
 * mirror the CSS custom properties so Tailwind utilities can reuse them if needed.
 * DO NOT change these values — they are the approved brand palette.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#211C4E",
        secondary: "#3A33A3",
        accent: "#4F46E5",
        highlight: "#6366F1",
        dark: "#16172A",
        soft: "#EDEBFF",
        "indigo-300": "#A7A9F4",
      },
      fontFamily: {
        grotesk: ['"Hanken Grotesk"', "Helvetica Neue", "Arial", "sans-serif"],
        mono: ['"Space Grotesk"', "Helvetica Neue", "monospace"],
      },
    },
  },
  // Theme is driven by [data-theme="dark"] on <html>, matching the v1 site.
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [],
};

export default config;
