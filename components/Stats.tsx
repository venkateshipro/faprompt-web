import type { Stat } from "@/types";

export default function Stats({
  stats,
  eyebrow = "By the numbers",
  title = "Outcomes, not just output.",
}: {
  stats: Stat[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal" style={{ marginBottom: 46 }}>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="stats-cards">
          {stats.map((s, i) => (
            <div className="stat-card reveal" key={s.label} data-delay={i * 60}>
              <div className="n">{s.value}</div>
              <p className="l">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
