/**
 * Shared content types.
 * These mirror the ACF field groups defined in /wordpress/SETUP.md so the
 * GraphQL responses and the built-in fallback content share one shape.
 */

export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface ServiceFeature {
  label: string;
}

export interface Service {
  slug: string;
  number: string;            // "01"
  title: string;             // "AI Solutions"
  excerpt: string;           // short teaser used on cards
  description: string;       // hero / intro paragraph on the detail page
  icon: IconName;            // which inline SVG icon to render (hardcoded set)
  features: string[];        // bullet list
  cta?: string;              // optional custom CTA label
  body?: ServiceSection[];   // optional rich sections (approach, use-cases, faq)
  seo?: SeoMeta;
}

export interface ServiceSection {
  heading: string;
  intro?: string;
  items?: { title: string; text: string }[];
  faq?: boolean;   // when true, items render as Q&A and emit FAQPage JSON-LD
}

export interface Project {
  slug: string;
  title: string;            // "ProfaCRM Lite"
  category: string;         // "CRM Platform"
  caseLabel?: string;       // "Case study 01 · CRM"
  summary: string;
  coverFrom: string;        // gradient start (preserves v1 look without an image)
  coverTo: string;          // gradient end
  coverImage?: string | null;
  results?: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials?: string;
}

export interface WpPage {
  slug: string;
  title: string;
  content: string;
}

export interface WpPageLink {
  slug: string;
  title: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;        // plain-text teaser
  content: string;        // rendered HTML body
  date: string;           // ISO date
  author?: string;
  readingTime?: string;
  category?: string;
  categorySlug?: string;
  featuredImage?: string | null;
  featuredImageAlt?: string;
  seo?: SeoMeta;
}

export interface ProcessStep {
  number: string;
  title: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface GlobalSettings {
  email: string;
  website: string;
  location: string;
  tagline: string;        // "AI · Products · Experiences"
  motto: string;          // "Building digital products with care."
  legalName: string;      // "FaPrompt Labs OPC Pvt Ltd"
  ctaLabel: string;
  nav: NavItem[];
  servicesMenu: NavItem[];
  footerServices: NavItem[];
  social?: { label: string; href: string }[];
}

export interface PageContent {
  slug: string;
  title: string;
  seo?: SeoMeta;
  // free-form blocks keyed by section, resolved per-page
  blocks?: Record<string, unknown>;
}

export type IconName =
  | "ai"
  | "saas"
  | "web"
  | "automation"
  | "branding"
  | "vector"
  | "support";
