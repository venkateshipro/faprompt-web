import type { ProcessStep } from "@/types";

/**
 * "How we work" — the calm, deliberate process.
 * Rendered on a dark section (home) and a light section (about) via `dark`.
 */
export default function Process({
  steps,
  dark = true,
  eyebrow = "How we work",
  title = "A calm, deliberate process.",
  intro = "No chaos, no black boxes. Clear phases, shared docs, and steady momentum from kickoff to launch.",
}: {
  steps: ProcessStep[];
  dark?: boolean;
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className={dark ? "dark section" : "section"}>
      {dark && <div className="grid-overlay" />}
      <div className="wrap" style={{ position: "relative" }}>
        <div className="sec-head reveal">
          <p className={dark ? "eyebrow dim" : "eyebrow"}>{eyebrow}</p>
          <h2>{title}</h2>
          {intro && <p className="lead">{intro}</p>}
        </div>
        <div className="steps reveal" style={{ marginTop: 48 }}>
          {steps.map((s) => (
            <div className="step" key={s.number}>
              <div className="s-n">{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
