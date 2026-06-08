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
    /* ---- nav shadow on scroll ---- */
    const nav = document.querySelector(".nav");
    const onNavScroll = () => {
      if (!nav) return;
      if (window.scrollY > 12) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();

    /* ---- theme toggle ---- */
    const root = document.documentElement;
    const isDark = () => root.getAttribute("data-theme") === "dark";
    const applyTheme = (dark: boolean) => {
      if (dark) root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      try { localStorage.setItem("fp-theme", dark ? "dark" : "light"); } catch {}
      document.querySelectorAll(".theme-toggle").forEach((b) =>
        b.setAttribute("aria-pressed", dark ? "true" : "false")
      );
    };
    const themeBtns = Array.from(document.querySelectorAll(".theme-toggle"));
    const themeHandlers = themeBtns.map((b) => {
      b.setAttribute("aria-pressed", isDark() ? "true" : "false");
      const h = () => applyTheme(!isDark());
      b.addEventListener("click", h);
      return { b, h };
    });

    /* ---- off-canvas mobile menu ---- */
    const burger = document.querySelector(".nav-burger");
    const menu = document.querySelector(".mobile-menu");
    const backdrop = document.querySelector(".menu-backdrop") as HTMLElement | null;
    const closeBtn = document.querySelector(".menu-close");
    const openMenu = () => {
      menu?.classList.add("open");
      if (backdrop) { backdrop.hidden = false; requestAnimationFrame(() => backdrop.classList.add("open")); }
      document.body.classList.add("menu-lock");
      menu?.setAttribute("aria-hidden", "false");
      burger?.setAttribute("aria-expanded", "true");
    };
    const closeMenu = () => {
      menu?.classList.remove("open");
      if (backdrop) { backdrop.classList.remove("open"); setTimeout(() => (backdrop.hidden = true), 320); }
      document.body.classList.remove("menu-lock");
      menu?.setAttribute("aria-hidden", "true");
      burger?.setAttribute("aria-expanded", "false");
    };
    const onBurger = () => (menu?.classList.contains("open") ? closeMenu() : openMenu());
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && menu?.classList.contains("open")) closeMenu(); };
    burger?.addEventListener("click", onBurger);
    closeBtn?.addEventListener("click", closeMenu);
    backdrop?.addEventListener("click", closeMenu);
    menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", onKey);

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

    /* ---- contact form: chips + submit ---- */
    const chipEls = Array.from(document.querySelectorAll(".chip"));
    const onChip = (chip: Element) => () => {
      chip.classList.toggle("sel");
      const hidden = document.querySelector<HTMLInputElement>('input[name="services"]');
      if (hidden) hidden.value = Array.from(document.querySelectorAll(".chip.sel")).map((c) => c.textContent?.trim()).join(", ");
    };
    const chipHandlers = chipEls.map((chip) => { const h = onChip(chip); chip.addEventListener("click", h); return { chip, h }; });

    const form = document.querySelector<HTMLFormElement>("form[data-fp-form]");
    const onSubmit = (e: Event) => {
      e.preventDefault();
      if (!form) return;
      const btn = form.querySelector<HTMLButtonElement>('[type="submit"]');
      const done = form.querySelector<HTMLElement>(".form-success");
      const errEl = form.querySelector<HTMLElement>(".form-error");
      const succeed = () => {
        if (btn) { btn.textContent = "Sent ✓"; btn.disabled = true; }
        if (errEl) errEl.style.display = "none";
        if (done) done.style.display = "flex";
        form.querySelectorAll<HTMLInputElement>("input,textarea,select").forEach((f) => { if (f.type !== "hidden") f.setAttribute("disabled", "true"); });
      };
      const fail = (msg: string) => {
        if (btn) { btn.textContent = "Send message"; btn.disabled = false; }
        if (errEl) { errEl.textContent = msg; errEl.style.display = "flex"; }
      };
      const data: Record<string, string> = {};
      form.querySelectorAll<HTMLInputElement>("input,textarea,select").forEach((f) => { if (f.name) data[f.name] = f.value; });
      if (btn) { btn.textContent = "Sending…"; btn.disabled = true; }
      fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(async (r) => {
          const j = await r.json().catch(() => ({}));
          if (r.ok && j.ok) succeed();
          else fail(j.error || "Something went wrong. Please email hello@faprompt.com.");
        })
        .catch(() => fail("Network error. Please email hello@faprompt.com."));
    };
    form?.addEventListener("submit", onSubmit);

    /* ---- cleanup ---- */
    return () => {
      window.removeEventListener("scroll", onNavScroll);
      themeHandlers.forEach(({ b, h }) => b.removeEventListener("click", h));
      burger?.removeEventListener("click", onBurger);
      closeBtn?.removeEventListener("click", closeMenu);
      backdrop?.removeEventListener("click", closeMenu);
      document.removeEventListener("keydown", onKey);
      io?.disconnect();
      clearTimeout(revealBackstop);
      window.removeEventListener("scroll", onPxScroll);
      window.removeEventListener("resize", onPxScroll);
      stage?.removeEventListener("mousemove", onDrift);
      stage?.removeEventListener("mouseleave", onDriftLeave);
      chipHandlers.forEach(({ chip, h }) => chip.removeEventListener("click", h));
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);

  return null;
}
