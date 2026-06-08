import type { IconName } from "@/types";

/* ───────────────────────────────────────────────────────────────
   Hardcoded brand graphics & icons (NOT CMS-driven).
   The FaPrompt mark and all inline SVGs are preserved exactly
   from the approved v1 site.
   ─────────────────────────────────────────────────────────────── */

/** The FaPrompt prompt-cursor mark. `tone` picks the v1 colour pairings. */
export function Mark({
  size = 26,
  tone = "light",
}: {
  size?: number;
  tone?: "light" | "dark" | "accent" | "white";
}) {
  const map = {
    light: { chev: "#211C4E", cur: "#4F46E5" }, // on light bg
    dark: { chev: "#FFFFFF", cur: "#A7A9F4" }, // on dark bg
    accent: { chev: "#4F46E5", cur: "#6366F1" },
    white: { chev: "#FFFFFF", cur: "#FFFFFF" },
  }[tone];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M34 29 L56 50 L34 69" fill="none" stroke={map.chev} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="36" y1="82" x2="54" y2="82" stroke={map.cur} strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}

/** Wordmark "FaPrompt" — Fa medium, Prompt bold. */
export function Wordmark({ color }: { color?: string }) {
  return (
    <span className="wm" style={color ? { color } : undefined}>
      <span className="fa">Fa</span>
      <span className="pr">Prompt</span>
    </span>
  );
}

export function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** Service icon set, keyed by IconName. */
export function ServiceIcon({ name }: { name: IconName }) {
  const common = {
    width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "ai":
      return (<svg {...common}><path d="M12 3a3 3 0 0 1 3 3v1h1a3 3 0 0 1 0 6 3 3 0 0 1-3 3h-1v1a3 3 0 0 1-6 0v-1H5a3 3 0 0 1 0-6 3 3 0 0 1 3-3V6a3 3 0 0 1 3-3Z" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></svg>);
    case "saas":
      return (<svg {...common}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8" /></svg>);
    case "web":
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></svg>);
    case "automation":
      return (<svg {...common}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><circle cx="12" cy="12" r="3.2" /></svg>);
    case "branding":
      return (<svg {...common}><path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.5L12 21l-4.9 2.6.9-5.5-4-3.9 5.5-.8L12 3Z" transform="scale(.92) translate(1 1)" /></svg>);
    case "vector":
      return (<svg {...common}><path d="M4 16 16 4M8 4H4v4M4 16v4h4M20 8V4h-4M16 20h4v-4" /><circle cx="12" cy="12" r="2.2" /></svg>);
    case "support":
      return (<svg {...common}><path d="M3 17l5-5 4 4 8-8" /><path d="M21 8v5h-5" /></svg>);
  }
}

/** Decorative corner mark used on service cards. */
export function CornerMark() {
  return (
    <svg className="corner" width="150" height="150" viewBox="0 0 100 100">
      <path d="M34 29 L56 50 L34 69" fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="36" y1="82" x2="54" y2="82" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
    </svg>
  );
}
