import type { Testimonial } from "@/types";

export default function Testimonials({
  testimonials,
  eyebrow = "What partners say",
  title = "Trusted for thoughtful execution.",
}: {
  testimonials: Testimonial[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="dark section">
      <div className="grid-overlay" />
      <div className="glow" style={{ width: 420, height: 420, background: "#4F46E5", top: -160, left: -80, opacity: 0.2 }} />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="sec-head reveal">
          <p className="eyebrow dim">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="quote-grid reveal" style={{ marginTop: 48 }}>
          {testimonials.map((t) => (
            <figure className="quote" style={{ margin: 0 }} key={t.name}>
              <div className="mark">&ldquo;</div>
              <p>{t.quote}</p>
              <figcaption className="by">
                <span className="av">{t.initials}</span>
                <span>
                  <span className="nm">{t.name}</span>
                  <br />
                  <span className="rl">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
