import type { Metadata } from "next";
import type { SeoMeta } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://faprompt.com";
const SITE_NAME = "FaPrompt";
const DEFAULT_DESC =
  "FaPrompt is an AI-first product studio building software, automation, branding and digital products with care.";
const DEFAULT_OG = "/og-default.png";

/**
 * Build a Next.js Metadata object from CMS SEO fields (with sensible defaults).
 * Editors manage title/description/canonical/OG image in WordPress (Yoast/RankMath),
 * which flow through here so every page is SEO-complete.
 */
export function buildMetadata(opts: {
  title?: string;
  description?: string;
  path?: string;
  seo?: SeoMeta;
  ogImage?: string;
}): Metadata {
  const title = opts.seo?.title || opts.title || SITE_NAME;
  const description = opts.seo?.description || opts.description || DEFAULT_DESC;
  const path = opts.path || "/";
  const canonical = opts.seo?.canonical || `${SITE_URL}${path}`;
  const ogImage = opts.seo?.ogImage || opts.ogImage || DEFAULT_OG;
  const fullTitle = title === SITE_NAME ? `${SITE_NAME} — AI · Products · Experiences` : `${title} · ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical },
    robots: opts.seo?.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/** Organization JSON-LD for the site root. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FaPrompt Labs OPC Pvt Ltd",
    alternateName: "FaPrompt",
    url: SITE_URL,
    email: "hello@faprompt.com",
    description: DEFAULT_DESC,
    slogan: "Building digital products with care.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guindy, Chennai",
      addressCountry: "IN",
    },
  };
}

/** Service JSON-LD for a service detail page. */
export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: "FaPrompt", url: SITE_URL },
    url: `${SITE_URL}${path}`,
    areaServed: "Worldwide",
  };
}

/** FAQPage JSON-LD from a list of Q&As. */
export function faqJsonLd(items: { title: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.title,
      acceptedAnswer: { "@type": "Answer", text: q.text },
    })),
  };
}

/** Article JSON-LD for a blog post. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  date: string;
  author?: string;
  image?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    author: { "@type": opts.author && opts.author !== "FaPrompt" ? "Person" : "Organization", name: opts.author || "FaPrompt" },
    publisher: { "@type": "Organization", name: "FaPrompt", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
    url: `${SITE_URL}${opts.path}`,
    ...(opts.image ? { image: [opts.image] } : {}),
  };
}

export { SITE_URL, SITE_NAME };
