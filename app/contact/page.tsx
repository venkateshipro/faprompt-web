import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo";

export const revalidate = REVALIDATE;

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Start a project with FaPrompt. Email hello@faprompt.com or use the form — we reply within two working days.",
  path: "/contact",
});

export default async function ContactPage() {
  const global = await getGlobal();

  return (
    <>
      <Nav global={global} active="/contact" />

      <section className="section-sm" style={{ paddingTop: "clamp(56px,7vw,84px)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "clamp(36px,6vw,72px)", alignItems: "start" }} className="contact-grid">
            {/* LEFT */}
            <div className="reveal">
              <p className="eyebrow">Contact</p>
              <h1 style={{ fontSize: "clamp(34px,4.6vw,54px)", marginTop: 14 }}>Let&apos;s start your project.</h1>
              <p className="lead" style={{ marginTop: 20, maxWidth: "44ch" }}>
                Tell us a little about what you&apos;re building. We&apos;ll reply within two working days with next steps.
              </p>

              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 22 }}>
                <a href={`mailto:${global.email}`} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span className="c-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg></span>
                  <span><span className="c-k">Email</span><span className="c-v">{global.email}</span></span>
                </a>
                <a href={`https://${global.website}`} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span className="c-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></svg></span>
                  <span><span className="c-k">Website</span><span className="c-v">{global.website}</span></span>
                </a>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span className="c-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg></span>
                  <span><span className="c-k">India</span><span className="c-v" style={{ lineHeight: 1.5 }}>RR Towers IV, Thiru Vi Ka Industrial Estate,<br />Guindy, Chennai, 600032</span></span>
                </div>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span className="c-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg></span>
                  <span><span className="c-k">USA</span><span className="c-v" style={{ lineHeight: 1.5 }}>iStone LLC, 1525 S Higley Rd. Suite 104 PMB 1047,<br />Gilbert, AZ 85296</span></span>
                </div>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="reveal" data-delay="60" style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", padding: "clamp(26px,3vw,38px)", boxShadow: "0 24px 60px -36px rgba(33,28,78,.4)" }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer global={global} />
    </>
  );
}
