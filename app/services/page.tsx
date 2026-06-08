import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ServiceCard } from "@/components/Services";
import { ArrowRight } from "@/components/Icons";
import { getServices, getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo";

export const revalidate = REVALIDATE;

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "AI solutions, SaaS development, web development, business automation, branding, vector services and long-term support — one studio for the full product journey.",
  path: "/services",
});

export default async function ServicesPage() {
  const [global, services] = await Promise.all([getGlobal(), getServices()]);

  return (
    <>
      <Nav global={global} active="/services" />

      <section className="section-sm" style={{ paddingTop: "clamp(56px,7vw,84px)" }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Services</p>
            <h1 style={{ fontSize: "clamp(27px,5vw,60px)" }}>
              Everything to design, build &amp; grow your product.
            </h1>
            <p className="lead" style={{ marginTop: 20 }}>
              Seven connected service lines — from AI and SaaS to branding and long-term support —
              delivered by one team that owns the whole journey.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div className="wrap">
          <div className="card-grid cards-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} delay={(i % 3) * 60} />
            ))}

            {/* inline CTA tile to fill the 8th cell */}
            <article
              className="scard reveal"
              data-delay="50"
              style={{ background: "var(--primary)", borderColor: "var(--primary)", display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <h3 style={{ color: "#fff", fontSize: 22 }}>Not sure where to start?</h3>
              <p className="desc" style={{ color: "var(--indigo-200)", marginBottom: 22 }}>
                Tell us the problem — we&apos;ll suggest the right mix of services.
              </p>
              <Link href="/contact" className="btn btn-white btn-arrow" style={{ alignSelf: "flex-start" }}>
                Talk to us<span className="btn-arrow"><ArrowRight /></span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <Footer global={global} />
    </>
  );
}
