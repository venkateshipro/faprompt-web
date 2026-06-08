import Link from "next/link";
import { Mark, Wordmark, ArrowRight } from "@/components/Icons";
import type { GlobalSettings } from "@/types";

/**
 * Site navigation + off-canvas mobile menu.
 * `dark` renders the nav-dark variant used on pages with a dark hero
 * (home, about). Behaviour (scroll shadow, theme toggle, burger) is wired
 * by SiteInteractions; markup/classes match v1 exactly.
 */
export default function Nav({
  global,
  active,
  dark = false,
}: {
  global: GlobalSettings;
  active: string;
  dark?: boolean;
}) {
  return (
    <>
      <nav className={`nav${dark ? " nav-dark" : ""}`}>
        <div className="wrap">
          <Link className="logo" href="/" aria-label="FaPrompt home">
            <Mark tone={dark ? "dark" : "light"} />
            <Wordmark color={dark ? "#fff" : "var(--primary)"} />
          </Link>
          <div className="nav-links">
            {global.nav.map((item) =>
              item.href === "/services" && global.servicesMenu?.length ? (
                <div className="nav-item has-sub" key={item.href}>
                  <Link href={item.href} className={active === item.href ? "active" : undefined}>
                    {item.label}
                    <svg className="nav-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  </Link>
                  <div className="nav-sub">
                    {global.servicesMenu.map((s) => (
                      <Link key={s.href} href={s.href} className={active === s.href ? "active" : undefined}>{s.label}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={active === item.href ? "active" : undefined}>
                  {item.label}
                </Link>
              )
            )}
          </div>
          <div className="nav-right">
            <button className="theme-toggle" type="button" aria-label="Toggle light and dark theme" title="Toggle theme">
              <svg className="i-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
              <svg className="i-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </button>
            <Link href="/contact" className="btn btn-primary btn-arrow">
              {global.ctaLabel}
              <span className="btn-arrow"><ArrowRight /></span>
            </Link>
            <button className="nav-burger" aria-label="Menu" aria-expanded="false">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="menu-backdrop" hidden />
      <div className="mobile-menu" aria-hidden="true">
        <div className="mobile-head">
          <Link className="logo" href="/" aria-label="FaPrompt home">
            <Mark tone="light" size={24} />
            <Wordmark color="var(--primary)" />
          </Link>
          <button className="menu-close" type="button" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        {global.nav.map((item) =>
          item.href === "/services" && global.servicesMenu?.length ? (
            <div key={item.href}>
              <Link href={item.href} className={active === item.href ? "active" : undefined}>{item.label}</Link>
              <div className="m-sub">
                {global.servicesMenu.map((s) => (
                  <Link key={s.href} href={s.href} className={active === s.href ? "active" : undefined}>{s.label}</Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={item.href} href={item.href} className={active === item.href ? "active" : undefined}>
              {item.label}
            </Link>
          )
        )}
        <Link href="/contact" className="btn btn-primary">{global.ctaLabel}</Link>
      </div>
    </>
  );
}
