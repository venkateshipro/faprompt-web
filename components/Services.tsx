import Link from "next/link";
import { ServiceIcon, ArrowUpRight, ArrowRight, CornerMark } from "@/components/Icons";
import type { Service } from "@/types";

/** A single service card — used on the home teaser and the services index. */
export function ServiceCard({ service, delay }: { service: Service; delay?: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="scard reveal" data-delay={delay}>
      <span className="num">{service.number}</span>
      <span className="arr"><ArrowUpRight /></span>
      <div className="ic"><ServiceIcon name={service.icon} /></div>
      <h3>{service.title}</h3>
      <p className="desc">{service.excerpt}</p>
      <ul>
        {service.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <CornerMark />
    </Link>
  );
}

/** Home "What we do" teaser — first 3 services + link to all. */
export default function ServicesTeaser({ services }: { services: Service[] }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow">What we do</p>
          <h2>One studio, the full product journey.</h2>
          <p className="lead">
            From the first prompt to long-term growth — strategy, design, engineering and automation
            under one roof, so nothing gets lost in handoffs.
          </p>
        </div>

        <div className="card-grid cards-3" style={{ marginTop: 52 }}>
          {services.slice(0, 3).map((s, i) => (
            <ServiceCard key={s.slug} service={s} delay={i * 60} />
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <Link href="/services" className="tlink">
            See all 6 services<ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
