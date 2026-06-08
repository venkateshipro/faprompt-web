"use client";

import { useState } from "react";

/**
 * Self-contained contact form (client component).
 * Owns its own state for service chips + submission, so it is reliably
 * interactive as soon as React hydrates — no dependence on the global
 * SiteInteractions DOM wiring (which caused chips to be dead on first load
 * and the form to do a native submit/reload before JS was ready).
 */
const SERVICE_CHIPS = ["AI Solutions", "Web Development", "Automation", "Branding", "Vector / Creative", "Support", "Anything else"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleChip(c: string) {
    setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot
    if (fd.get("company_website")) { setStatus("sent"); return; }

    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      budget: String(fd.get("budget") || "").trim(),
      services: selected.join(", "),
      message: String(fd.get("message") || "").trim(),
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) setStatus("sent");
      else {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please email hello@faprompt.com.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please email hello@faprompt.com.");
    }
  }

  const disabled = status === "sending" || status === "sent";

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* honeypot — hidden from users, blocks bots */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

      <div className="form-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
        <div className="field"><label>Name <span className="req">*</span></label><input type="text" name="name" placeholder="Your name" required disabled={disabled} /></div>
        <div className="field"><label>Email <span className="req">*</span></label><input type="email" name="email" placeholder="you@company.com" required disabled={disabled} /></div>
      </div>
      <div className="form-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
        <div className="field"><label>Company</label><input type="text" name="company" placeholder="Company / project" disabled={disabled} /></div>
        <div className="field"><label>Budget</label>
          <select name="budget" defaultValue="" disabled={disabled}>
            <option value="">Select range</option>
            <option>Under ₹2L</option><option>₹2L – ₹5L</option><option>₹5L – ₹15L</option><option>₹15L+</option><option>Not sure yet</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label>What do you need? <span className="req">*</span></label>
        <div className="chips">
          {SERVICE_CHIPS.map((c) => (
            <button
              type="button"
              key={c}
              className={`chip${selected.includes(c) ? " sel" : ""}`}
              aria-pressed={selected.includes(c)}
              onClick={() => toggleChip(c)}
              disabled={disabled}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="field"><label>Tell us about it <span className="req">*</span></label><textarea name="message" placeholder="A few lines about your idea, timeline and goals…" required disabled={disabled}></textarea></div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
        <span className="form-note">We&apos;ll reply within 2 working days.</span>
        <button type="submit" className="btn btn-primary btn-arrow" disabled={disabled}>
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send message"}
          {status === "idle" && <span className="btn-arrow"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>}
        </button>
      </div>

      {status === "sent" && (
        <div className="form-success" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, padding: "14px 16px", borderRadius: 11, background: "var(--soft)", color: "var(--secondary)", fontSize: 14 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          Thanks — your message is in. We&apos;ll be in touch shortly.
        </div>
      )}
      {status === "error" && (
        <div className="form-error" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, padding: "14px 16px", borderRadius: 11, background: "#FDECEC", color: "#C0392B", fontSize: 14 }}>
          {errorMsg}
        </div>
      )}
    </form>
  );
}
