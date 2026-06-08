import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact form endpoint — delivers via Hostinger SMTP (Nodemailer).
 *
 * Required env vars (.env.local locally, and in Hostinger Node app settings):
 *   SMTP_HOST=smtp.hostinger.com
 *   SMTP_PORT=465
 *   SMTP_USER=hello@faprompt.com        (a real mailbox on your domain)
 *   SMTP_PASS=your-mailbox-password
 *   CONTACT_TO=hello@faprompt.com       (where leads land; can be same as SMTP_USER)
 *   CONTACT_FROM=hello@faprompt.com     (optional; defaults to SMTP_USER)
 *
 * Notes:
 *   • Port 465 = SSL (secure:true). Port 587 = STARTTLS (secure:false).
 *   • The "from" must be your own mailbox/domain or Hostinger will reject it;
 *     the visitor's address goes into replyTo so you can just hit Reply.
 *   • Honeypot field "company_website" blocks basic bots.
 */

export const runtime = "nodejs"; // nodemailer needs the Node runtime, not Edge

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s: string) =>
  String(s ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user, pass },
    // Hostinger (and many shared hosts) present a cert that Node flags as
    // self-signed in the chain. Relaxing this for the SMTP connection is
    // the standard fix and does not affect site security.
    tls: { rejectUnauthorized: false },
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // honeypot — real users never fill this hidden field
    if (data.company_website) return NextResponse.json({ ok: true });

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();
    const company = String(data.company || "").trim();
    const budget = String(data.budget || "").trim();
    const services = String(data.services || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Please fill in your name, email and message." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const transport = getTransport();
    if (!transport) {
      console.error("[contact] SMTP env vars missing — set SMTP_HOST/USER/PASS.");
      return NextResponse.json({ ok: false, error: "Email is not configured yet." }, { status: 500 });
    }

    const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER!;

    const rows: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["Company", company || "—"],
      ["Budget", budget || "—"],
      ["Needs", services || "—"],
    ];
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1b1c2b">
        <h2 style="color:#211C4E;margin:0 0 16px">New enquiry — faprompt.com</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows.map(([k, v]) => `<tr><td style="padding:8px 0;color:#6b6d80;width:120px;vertical-align:top">${k}</td><td style="padding:8px 0;color:#1b1c2b">${esc(v)}</td></tr>`).join("")}
        </table>
        <p style="margin:18px 0 6px;color:#6b6d80;font-size:14px">Message</p>
        <p style="margin:0;padding:14px 16px;background:#EDEBFF;border-radius:10px;color:#211C4E;font-size:15px;line-height:1.6">${esc(message).replace(/\n/g, "<br>")}</p>
      </div>`;
    const text = `New enquiry — faprompt.com\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${message}\n`;

    // 1) notification to FaPrompt
    await transport.sendMail({
      from: `"FaPrompt Website" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text,
      html,
    });

    // 2) auto-reply to the sender (best-effort — don't fail the request if this errors)
    try {
      await transport.sendMail({
        from: `"FaPrompt" <${from}>`,
        to: email,
        subject: "Thanks for reaching out to FaPrompt",
        text: `Hi ${name},\n\nThanks for getting in touch with FaPrompt. We've received your message and will reply within two working days.\n\n— FaPrompt\nBuilding digital products with care.\nhello@faprompt.com`,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#1b1c2b">
          <p>Hi ${esc(name)},</p>
          <p>Thanks for getting in touch with <b>FaPrompt</b>. We've received your message and will reply within two working days.</p>
          <p style="margin-top:22px;color:#6b6d80;font-size:13px">— FaPrompt · Building digital products with care.<br>hello@faprompt.com</p>
        </div>`,
      });
    } catch (e) {
      console.warn("[contact] auto-reply failed:", (e as Error).message);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error:", (err as Error).message);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please email us directly." }, { status: 500 });
  }
}
