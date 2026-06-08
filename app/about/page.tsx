import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ServiceIcon, ArrowRight } from "@/components/Icons";
import { getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo";

export const revalidate = REVALIDATE;

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "FaPrompt is a creative and technology partner with 18+ years of experience — website development, application development, graphic design, artwork services, branding, business solutions, workflow automation and AI solutions.",
  path: "/about",
});

const JOURNEY = [
  { k: "18+ years", text: "For over 18 years, we have supported businesses through creative execution, digital experiences and reliable delivery." },
  { k: "Creative roots", text: "Our journey began in graphic design and production support — artwork services, vector conversion, virtual proofs, mockups, corporate identity and branding." },
  { k: "Digital growth", text: "As business needs evolved, our capabilities expanded into website development, application development and digital business solutions." },
  { k: "FaPrompt today", text: "FaPrompt is the natural evolution of that experience — bringing together creativity, technology and execution to help businesses grow with confidence." },
  { k: "Looking ahead", text: "We are expanding into AI-powered workflows, automation and intelligent business systems — with the same commitment to quality and reliability that defines our work." },
];

const TECH = ["Website Development", "Application Development", "Business Systems", "Workflow Automation", "AI Solutions (Growing)"];
const CREATIVE = ["Graphic Design", "Artwork Services", "Virtual Proofs", "Mockups", "Corporate Identity", "Branding"];

const ADVANTAGE = [
  { icon: "support" as const, title: "18+ Years of Experience", text: "Built through years of real client work." },
  { icon: "automation" as const, title: "Execution Focused", text: "Turning ideas into practical outcomes." },
  { icon: "branding" as const, title: "Creative + Technology", text: "Combining design thinking with modern systems." },
  { icon: "ai" as const, title: "Future Ready", text: "Growing into automation and AI." },
];

const STATS = [
  { value: "18+", label: "Years Experience" },
  { value: "1000+", label: "Projects Supported" },
  { value: "US + India", label: "Business Presence" },
  { value: "Long-Term", label: "Client Relationships" },
];

const FAQ = [
  { q: "What services does FaPrompt provide?", a: "Creative services (graphic design, artwork, branding, corporate identity) and technology services (website development, application development, business solutions, workflow automation and AI solutions)." },
  { q: "Do you work with international clients?", a: "Yes. With a presence across the US and India, we support businesses globally and are comfortable working across time zones." },
  { q: "Do you offer custom website development?", a: "Absolutely — from modern marketing sites to full-stack applications, built around your brand and goals." },
  { q: "Can you support branding and design?", a: "Yes. Branding, visual identity, artwork services and production-ready design are core strengths built over 18+ years." },
  { q: "Do you provide AI and automation solutions?", a: "Yes — a growing part of our work. We build AI-powered workflows and automation that simplify real business processes." },
  { q: "How can we get started?", a: "Share what you need on our contact page. We'll review it and suggest the right mix of creative and technology services." },
];

export default async function AboutPage() {
  const global = await getGlobal();

  return (
    <>
      <Nav global={global} active="/about" dark />

      {/* 1 — HERO */}
      <header className="dark" style={{ padding: "clamp(72px,10vw,128px) 0 clamp(64px,8vw,104px)" }}>
        <div className="grid-overlay" />
        <div className="glow" style={{ width: 440, height: 440, background: "#4F46E5", top: -160, left: "30%", opacity: 0.26 }} />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="sec-head reveal" style={{ maxWidth: 880 }}>
            <p className="eyebrow dim">About FaPrompt</p>
            <h1>Built on Faith.<br />Delivered with Promise.</h1>
            <p className="lead" style={{ marginTop: 24, fontSize: "clamp(17px,1.6vw,20px)", maxWidth: "60ch" }}>
              Helping businesses transform ideas into execution through design, websites, applications
              and modern digital solutions.
            </p>
          </div>
        </div>
      </header>

      {/* 2 — OUR JOURNEY */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Our journey</p>
            <h2>An experienced studio, evolving forward.</h2>
          </div>
          <div className="card-grid cards-2" style={{ marginTop: 48 }}>
            {JOURNEY.map((j, i) => (
              <div className="reveal" key={j.k} data-delay={(i % 2) * 50} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 22 }}>
                <p className="mono" style={{ fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>{j.k}</p>
                <p style={{ color: "var(--ink-soft)", fontSize: 15.5, lineHeight: 1.65, margin: 0 }}>{j.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — WHAT WE DO */}
      <section className="dark section">
        <div className="grid-overlay" />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="sec-head reveal">
            <p className="eyebrow dim">What we do</p>
            <h2>Creative craft meets modern technology.</h2>
          </div>
          <div className="card-grid cards-2" style={{ marginTop: 48 }}>
            <div className="reveal" style={{ border: "1px solid var(--d-line)", borderRadius: "var(--radius-lg)", padding: "32px 30px", background: "var(--d-card)" }}>
              <div className="ic" style={{ background: "rgba(167,169,244,.1)", color: "var(--indigo-300)" }}><ServiceIcon name="web" /></div>
              <h3 style={{ color: "#fff", marginTop: 16 }}>Technology</h3>
              <p style={{ color: "var(--d-ink-soft)", fontSize: 13.5, margin: "6px 0 0" }}>Website &amp; application development, business systems and automation.</p>
              <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {TECH.map((t) => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--d-ink)", fontSize: 14.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--indigo-300)", flex: "none" }} />{t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" data-delay="50" style={{ border: "1px solid var(--d-line)", borderRadius: "var(--radius-lg)", padding: "32px 30px", background: "var(--d-card)" }}>
              <div className="ic" style={{ background: "rgba(167,169,244,.1)", color: "var(--indigo-300)" }}><ServiceIcon name="branding" /></div>
              <h3 style={{ color: "#fff", marginTop: 16 }}>Creative</h3>
              <p style={{ color: "var(--d-ink-soft)", fontSize: 13.5, margin: "6px 0 0" }}>Graphic design, artwork services, corporate identity and branding.</p>
              <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {CREATIVE.map((c) => (
                  <li key={c} style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--d-ink)", fontSize: 14.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--indigo-300)", flex: "none" }} />{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — OUR ADVANTAGE */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Our advantage</p>
            <h2>Why businesses choose FaPrompt.</h2>
          </div>
          <div className="card-grid cards-2" style={{ marginTop: 48 }}>
            {ADVANTAGE.map((a, i) => (
              <div className="scard reveal" key={a.title} data-delay={(i % 2) * 50}>
                <div className="ic"><ServiceIcon name={a.icon} /></div>
                <h3>{a.title}</h3>
                <p className="desc" style={{ marginBottom: 0 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — TRUST INDICATORS */}
      <section className="dark section-sm">
        <div className="grid-overlay" />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="stats reveal">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className="n">{s.value}</div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — VISION */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal center" style={{ textAlign: "center" }}>
            <p className="eyebrow">Our vision</p>
            <h2 style={{ maxWidth: "20ch", margin: "0 auto" }}>A trusted creative &amp; technology partner.</h2>
            <p className="lead" style={{ marginTop: 20, maxWidth: "60ch", marginLeft: "auto", marginRight: "auto" }}>
              To help businesses simplify processes, strengthen their brand and embrace the future
              through practical innovation.
            </p>
          </div>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="section faq-center" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">FAQ</p>
            <h2>Questions, answered.</h2>
          </div>
          <div className="reveal faq-list" style={{ marginTop: 40, maxWidth: 820 }}>
            {FAQ.map((f) => (
              <details className="about-faq" key={f.q}>
                <summary>
                  {f.q}
                  <span className="about-faq-ic" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — FINAL CTA */}
      <section className="section-sm">
        <div className="wrap">
          <div className="cta-xl reveal">
            <div className="grid-overlay" style={{ opacity: 0.4 }} />
            <p className="eyebrow dim">Let&apos;s work together</p>
            <h2>Let&apos;s build what your business needs.</h2>
            <p className="lead">
              Whether you&apos;re looking for creative support, digital solutions or future-ready systems —
              we&apos;re here to help.
            </p>
            <div className="row">
              <Link href="/services" className="btn btn-white btn-arrow">
                Explore Services<span className="btn-arrow"><ArrowRight /></span>
              </Link>
              <Link href="/contact" className="btn btn-ghost on-dark">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer global={global} />
    </>
  );
}
