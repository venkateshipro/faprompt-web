import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ServiceIcon, ArrowRight } from "@/components/Icons";
import { getServices, getServiceBySlug, getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import { SERVICE_DETAILS } from "@/lib/serviceContent";

export const revalidate = REVALIDATE;
export const dynamicParams = true; // allow new services added in WP without a redeploy

/** Pre-render all known services at build time (ISR fills in new ones). */
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return buildMetadata({ title: "Service", path: `/services/${params.slug}` });
  const detail = SERVICE_DETAILS[params.slug];
  return buildMetadata({
    title: service.title,
    description: service.description || detail?.description || service.excerpt,
    path: `/services/${service.slug}`,
    seo: service.seo,
  });
}

export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const [global, service] = await Promise.all([getGlobal(), getServiceBySlug(params.slug)]);
  if (!service) notFound();

  // Belt-and-braces: guarantee the SEO-rich sections render even if the data
  // layer didn't merge them. Pulls from SERVICE_DETAILS when body is empty.
  const detail = SERVICE_DETAILS[params.slug];
  const body = service.body && service.body.length ? service.body : detail?.body ?? [];
  const description = service.description || detail?.description || service.excerpt;

  const jsonLd = serviceJsonLd(service.title, description, `/services/${service.slug}`);
  const faqSection = body.find((s) => s.faq && s.items && s.items.length > 0);
  const faqLd = faqSection ? faqJsonLd(faqSection.items!) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <Nav global={global} active="/services" />

      {/* HERO */}
      <header className="dark" style={{ padding: "clamp(72px,10vw,128px) 0 clamp(56px,7vw,88px)" }}>
        <div className="grid-overlay" />
        <div className="glow" style={{ width: 420, height: 420, background: "#4F46E5", top: -160, left: "30%", opacity: 0.24 }} />
        <div className="wrap" style={{ position: "relative" }}>
          <nav className="svc-breadcrumb reveal" style={{ marginBottom: 22, fontSize: 13 }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: "var(--d-ink-faint)" }}>Home</Link>
            <span style={{ color: "var(--d-ink-faint)", margin: "0 8px" }}>/</span>
            <Link href="/services" style={{ color: "var(--d-ink-faint)" }}>Services</Link>
            <span style={{ color: "var(--d-ink-faint)", margin: "0 8px" }}>/</span>
            <span style={{ color: "var(--indigo-300)" }}>{service.title}</span>
          </nav>
          <div className="sec-head reveal" style={{ maxWidth: 860 }}>
            <div className="ic" style={{ marginBottom: 22, background: "rgba(167,169,244,.1)", color: "var(--indigo-300)" }}>
              <ServiceIcon name={service.icon} />
            </div>
            <p className="eyebrow dim">{service.number} · Service</p>
            <h1 style={{ fontSize: "clamp(30px,4.6vw,56px)", marginTop: 10 }}>{service.title}</h1>
            <p className="lead" style={{ marginTop: 22, fontSize: "clamp(17px,1.6vw,20px)", maxWidth: "60ch" }}>
              {description}
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-arrow">
                Start a project<span className="btn-arrow"><ArrowRight /></span>
              </Link>
              <Link href="/services" className="btn btn-ghost on-dark">All services</Link>
            </div>
          </div>
        </div>
      </header>

      {/* WHAT'S INCLUDED */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">What&apos;s included</p>
            <h2>How we help with {service.title.toLowerCase()}.</h2>
          </div>
          <div className="card-grid cards-2" style={{ marginTop: 44 }}>
            {service.features.map((f, i) => (
              <div className="feat reveal" key={f} data-delay={(i % 2) * 60} style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", padding: "26px 28px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ width: 34, height: 34, flex: "none", borderRadius: 9, background: "var(--soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <div>
                  <h3 style={{ fontSize: 18, color: "var(--primary)" }}>{f}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional rich sections (approach / use-cases / FAQ) */}
      {body.map((sec) => (
        <section className="section" key={sec.heading} style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <h2>{sec.heading}</h2>
              {sec.intro && <p className="lead" style={{ marginTop: 16 }}>{sec.intro}</p>}
            </div>
            {sec.items && sec.items.length > 0 && (
              <div className="card-grid cards-2" style={{ marginTop: 40 }}>
                {sec.items.map((it) => (
                  <div className="rel reveal" key={it.title} style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", padding: "26px 28px" }}>
                    <h3 style={{ fontSize: 18, color: "var(--primary)", marginBottom: 8 }}>{it.title}</h3>
                    <p style={{ color: "var(--ink-soft)", fontSize: 14.5 }}>{it.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <CTA title={<>Ready to get started with {service.title.toLowerCase()}?</>} text="Tell us what you need — we'll scope it and suggest the right approach." />
      <Footer global={global} />
    </>
  );
}
