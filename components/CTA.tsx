import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/Icons";

/**
 * Large dark CTA band used near the foot of pages.
 * Headline/sub default to the approved home copy but accept overrides.
 */
export default function CTA({
  eyebrow = "Let's build",
  title = (
    <>
      Have an idea?
      <br />
      Let&apos;s build something meaningful.
    </>
  ),
  text = "Tell us what you're imagining — we'll help you shape, build and ship it with care.",
  email = "hello@faprompt.com",
}: {
  eyebrow?: string;
  title?: ReactNode;
  text?: string;
  email?: string;
}) {
  return (
    <section className="section-sm">
      <div className="wrap">
        <div className="cta-xl reveal">
          <div className="grid-overlay" style={{ opacity: 0.4 }} />
          <p className="eyebrow dim">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="lead">{text}</p>
          <div className="row">
            <Link href="/contact" className="btn btn-white btn-arrow">
              Start a Project<span className="btn-arrow"><ArrowRight /></span>
            </Link>
            <a href={`mailto:${email}`} className="btn btn-ghost on-dark">{email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
