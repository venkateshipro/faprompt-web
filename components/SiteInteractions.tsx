"use client";

import { useEffect } from "react";

/**
 * Client-side interactions, ported verbatim from the v1 site.js.
 * Because every section renders the same class names as v1, this simply
 * attaches the same listeners on mount: nav shadow, theme toggle,
 * off-canvas menu, scroll reveal, parallax, hero drift, and the contact form.
 *
 * No-flash theme is handled separately by ThemeScript in app/layout.tsx.
 */
export default function SiteInteractions() {
  useEffect(() => {
    /* ---- nav shadow, theme toggle and off-canvas menu now live in the
            Nav client component (components/Nav.tsx) so they re-bind on every
            route change. This file handles page-content effects only. ---- */

    /* ---- scroll reveal ---- */
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const show = (el: HTMLElement) => {
      const d = el.getAttribute("data-delay");
      if (d) { el.style.transitionDelay = `${d}ms`; el.style.animationDelay = `${d}ms`; }
      el.classList.add("in");
    };
    const vh = window.innerHeight || document.documentElement.clientHeight;
    reveals.forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.92) show(el); });
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((en) => { if (en.isIntersecting) { show(en.target as HTMLElement); io?.unobserve(en.target); } }),
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      reveals.forEach((el) => { if (!el.classList.contains("in")) io?.observe(el); });
    } else {
      reveals.forEach(show);
    }
    const revealBackstop = setTimeout(() => reveals.forEach(show), 1600);

    /* ---- parallax ---- */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    const updatePx = () => {
      const h = window.innerHeight || document.documentElement.clientHeight;
      pxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax") || "0.08") || 0.08;
        const r = el.getBoundingClientRect();
        const off = (r.top + r.height / 2 - h / 2) * -speed;
        el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
      });
      ticking = false;
    };
    const onPxScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(updatePx); } };
    if (pxEls.length && !reduce) {
      window.addEventListener("scroll", onPxScroll, { passive: true });
      window.addEventListener("resize", onPxScroll, { passive: true });
      updatePx();
    }

    /* ---- hero pointer drift ---- */
    const stage = document.querySelector("[data-drift]") as HTMLElement | null;
    const driftLayers = stage ? Array.from(stage.querySelectorAll<HTMLElement>("[data-drift-depth]")) : [];
    const onDrift = (e: MouseEvent) => {
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      driftLayers.forEach((l) => {
        const depth = parseFloat(l.getAttribute("data-drift-depth") || "10") || 10;
        l.style.transform = `translate3d(${(dx * depth).toFixed(1)}px,${(dy * depth).toFixed(1)}px,0)`;
      });
    };
    const onDriftLeave = () => driftLayers.forEach((l) => (l.style.transform = "translate3d(0,0,0)"));
    if (stage && !reduce) {
      stage.addEventListener("mousemove", onDrift);
      stage.addEventListener("mouseleave", onDriftLeave);
    }

    /* ---- (contact form is now a self-contained client component:
            components/ContactForm.tsx — no DOM wiring needed here) ---- */

    /* ---- cleanup ---- */
    return () => {
      io?.disconnect();
      clearTimeout(revealBackstop);
      window.removeEventListener("scroll", onPxScroll);
      window.removeEventListener("resize", onPxScroll);
      stage?.removeEventListener("mousemove", onDrift);
      stage?.removeEventListener("mouseleave", onDriftLeave);
    };
  }, []);

  return null;
}
