import Link from "next/link";
import { Mark, Wordmark } from "@/components/Icons";
import type { GlobalSettings } from "@/types";

export default function Footer({ global }: { global: GlobalSettings }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="ftop">
          <div>
            <Link className="logo" href="/">
              <Mark tone="dark" size={28} />
              <Wordmark />
            </Link>
            <p className="f-tag">{global.tagline}</p>
            <p className="f-desc">
              An AI-first product studio building software, automation, branding and digital products with care.
            </p>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {global.footerServices.map((s) => (
                <li key={s.href}><Link href={s.href}>{s.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`mailto:${global.email}`}>{global.email}</a></li>
              <li><a href={`https://${global.website}`}>{global.website}</a></li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <span>© {new Date().getFullYear()} {global.legalName}. All rights reserved.</span>
          <span className="mono">{global.motto}</span>
        </div>
      </div>
    </footer>
  );
}
