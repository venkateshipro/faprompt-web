import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WorkCard } from "@/components/Projects";
import { ArrowRight } from "@/components/Icons";
import { getProjects, getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo";

export const revalidate = REVALIDATE;

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: "Selected product systems, platforms and digital experiences built by FaPrompt — CRM, growth automation, operations software and learning products.",
  path: "/work",
});

export default async function WorkPage() {
  const [global, projects] = await Promise.all([getGlobal(), getProjects()]);

  return (
    <>
      <Nav global={global} active="/work" />

      <section className="section-sm" style={{ paddingTop: "clamp(56px,7vw,84px)" }}>
        <div className="wrap">
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
            <div className="sec-head" style={{ margin: 0 }}>
              <p className="eyebrow">Work</p>
              <h1 style={{ fontSize: "clamp(36px,5.2vw,60px)" }}>
                Selected product systems, platforms and digital experiences.
              </h1>
              <p className="lead" style={{ marginTop: 20 }}>
                A focused look at the kinds of practical, polished outcomes FaPrompt creates with founders and teams.
              </p>
            </div>
            <span className="mono" style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
              Case studies
            </span>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div className="wrap">
          <div className="work-grid reveal" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {projects.map((p) => (
              <WorkCard key={p.slug} project={p} />
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 36, border: "1px dashed var(--line)", borderRadius: "var(--radius)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: 14.5 }}>
              Have a project that belongs here? <b style={{ color: "var(--ink)" }}>Let&apos;s make it.</b>
            </p>
            <Link href="/contact" className="tlink">Start a project<ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="dark section-sm">
        <div className="grid-overlay" />
        <div className="wrap" style={{ position: "relative" }}>
          <div className="stats reveal">
            <div className="stat"><div className="n">AI</div><div className="l">Chatbots, assistants, integrations</div></div>
            <div className="stat"><div className="n">SaaS</div><div className="l">MVPs to scalable platforms</div></div>
            <div className="stat"><div className="n">Web</div><div className="l">Sites &amp; full-stack apps</div></div>
            <div className="stat"><div className="n">Brand</div><div className="l">Identity &amp; design systems</div></div>
          </div>
        </div>
      </section>

      <Footer global={global} />
    </>
  );
}
