import Link from "next/link";
import { Mark, ArrowRight } from "@/components/Icons";

const CAPABILITIES = [
  "AI Solutions", "SaaS Development", "Web Development", "Business Automation",
  "Branding & Identity", "Vector & Creative", "Support & Growth",
];

/**
 * Home hero — dark, with the abstract product sculpture and capability marquee.
 * Hardcoded graphics/motion (per brief); only the headline/sub could be made
 * CMS-driven later via the Home page fields.
 */
export default function Hero() {
  return (
    <header className="dark" style={{ padding: "clamp(90px,14vw,168px) 0 clamp(72px,9vw,120px)" }}>
      <div className="grid-overlay" />
      <div className="glow" style={{ width: 520, height: 520, background: "#4F46E5", top: -160, left: "50%", transform: "translateX(-50%)", opacity: 0.32 }} />
      <div className="glow" style={{ width: 360, height: 360, background: "#6366F1", bottom: -180, right: -60, opacity: 0.22 }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="hero-grid">
          <div>
            <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 14px 7px 8px", border: "1px solid var(--d-line)", borderRadius: 999, background: "rgba(167,169,244,.06)", marginBottom: 30 }}>
              <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: 6, background: "var(--accent)", alignItems: "center", justifyContent: "center" }}>
                <svg width="13" height="13" viewBox="0 0 100 100"><path d="M34 29 L56 50 L34 69" fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" /><line x1="37" y1="83" x2="53" y2="83" stroke="#EDEBFF" strokeWidth="12" strokeLinecap="round" /></svg>
              </span>
              <span className="mono" style={{ fontSize: 12.5, letterSpacing: ".06em", color: "var(--d-ink-soft)", whiteSpace: "nowrap" }}>AI-first product studio</span>
            </div>

            <h1 className="reveal hero-title" data-delay="60">
              We build <span style={{ color: "var(--indigo-300)" }}>software</span>,<br />automation &amp; brands<br />that ship with care.
            </h1>

            <p className="lead reveal" data-delay="120" style={{ marginTop: 26, maxWidth: "54ch", fontSize: "clamp(17px,1.6vw,20px)" }}>
              FaPrompt turns prompts into products — AI solutions, SaaS platforms, websites and
              identity systems, designed and engineered end-to-end for teams who care how things are made.
            </p>

            <div className="reveal" data-delay="180" style={{ display: "flex", gap: 14, marginTop: 38, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-arrow">
                Start a project<span className="btn-arrow"><ArrowRight /></span>
              </Link>
              <Link href="/services" className="btn btn-ghost on-dark">Explore services</Link>
            </div>
          </div>

          {/* abstract product sculpture (hardcoded graphic) */}
          <div className="sculpt reveal" data-delay="220" data-drift>
            <div className="ring r1" data-drift-depth="6" />
            <div className="ring r2" data-drift-depth="10" />
            <div className="ring r3" data-drift-depth="14" />
            <div className="orbit"><span className="dot" /></div>
            <div className="orbit rev"><span className="dot" /></div>
            <div className="core" data-drift-depth="22">
              <svg width="66" height="66" viewBox="0 0 100 100"><path d="M34 29 L56 50 L34 69" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" /><line x1="36" y1="82" x2="54" y2="82" stroke="#C7C8FA" strokeWidth="11" strokeLinecap="round" /></svg>
            </div>
            <div className="panel chip-1" data-drift-depth="30">
              <span className="tick"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
              <span className="mono">shipped &amp; live</span>
            </div>
            <div className="panel chip-2" data-drift-depth="26">
              <span className="mono" style={{ color: "var(--indigo-300)" }}>&gt;</span>
              <span className="mono">prompt → product</span>
            </div>
          </div>
        </div>
      </div>

      {/* capability marquee */}
      <div className="marquee" style={{ marginTop: "clamp(56px,8vw,96px)" }}>
        <div className="marquee-track">
          {[...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
            <span className="marquee-item" key={i}>{c}</span>
          ))}
        </div>
      </div>
    </header>
  );
}
