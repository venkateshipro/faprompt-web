import type {
  Service,
  Project,
  Testimonial,
  Post,
  ProcessStep,
  Stat,
  GlobalSettings,
} from "@/types";

/**
 * BUILT-IN FALLBACK CONTENT
 * ─────────────────────────
 * This is the exact copy from the approved v1 site. The data layer
 * (lib/wordpress.ts) returns this whenever WordPress is not configured
 * or unreachable, so the frontend runs and looks identical before/while
 * WP is being connected. Once WP is live, these become the editable
 * source of truth in the CMS and this file is the safety net.
 */

export const GLOBAL: GlobalSettings = {
  email: "hello@faprompt.com",
  website: "www.faprompt.com",
  location: "Guindy, Chennai",
  tagline: "AI · Products · Experiences",
  motto: "Building digital products with care.",
  legalName: "FaPrompt Labs OPC Pvt Ltd",
  ctaLabel: "Start a project",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  servicesMenu: [
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Business Automation", href: "/services/business-automation" },
    { label: "Branding & Identity", href: "/services/branding-identity" },
    { label: "Vector & Creative Services", href: "/services/vector-creative-services" },
    { label: "Support & Growth", href: "/services/support-growth" },
  ],
  footerServices: [
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Automation", href: "/services/business-automation" },
  ],
};

export const PROCESS: ProcessStep[] = [
  { number: "01", title: "Discover", text: "We map the problem, users and constraints — then agree on what “done” looks like." },
  { number: "02", title: "Design", text: "Brand, UX and architecture come together as one system, not separate handoffs." },
  { number: "03", title: "Build", text: "We engineer and automate in tight loops, shipping working software you can try." },
  { number: "04", title: "Launch", text: "We ship with confidence — tested, polished and ready for real users." },
  { number: "05", title: "Grow", text: "Launch is the start — we maintain, measure and optimize for the long term." },
];

export const STATS: Stat[] = [
  { value: "30+", label: "Products & platforms shipped" },
  { value: "150+", label: "Clients & teams served" },
  { value: "98%", label: "Client satisfaction" },
  { value: "10K", label: "Graphics delivered" },
];

export const TESTIMONIALS: Testimonial[] = [
  { initials: "EH", name: "Eddie Horowitz", role: "Founder, City Inc", quote: "FaPrompt moved with the care of a studio and the speed of a product team. The result felt premium, practical and deeply thought through." },
  { initials: "PS", name: "Priya Shah", role: "Operations Director", quote: "They translated a messy internal process into software our team actually enjoys using. The AI layer felt useful from day one." },
  { initials: "SB", name: "Senthil Babu", role: "Product Lead", quote: "The branding and web experience finally matched the ambition of our product. Sharp thinking, beautiful execution." },
];

export const PROJECTS: Project[] = [
  { slug: "profacrm-lite", title: "ProfaCRM Lite", category: "CRM Platform", caseLabel: "Case study 01 · CRM", summary: "A focused CRM experience for small teams that need faster lead visibility and calmer daily workflows.", coverFrom: "#211C4E", coverTo: "#3A33A3" },
  { slug: "fagrow", title: "FaGrow", category: "Growth Automation", caseLabel: "Case study 02 · Automation", summary: "Automated campaign operations, performance loops and content systems for modern service teams.", coverFrom: "#4F46E5", coverTo: "#6366F1" },
  { slug: "standpipe-flow", title: "Standpipe Flow", category: "Operations Software", caseLabel: "Case study 03 · Operations", summary: "A technical workflow platform turning field inputs into clear operational intelligence.", coverFrom: "#16172A", coverTo: "#211C4E" },
  { slug: "codejourney", title: "Codejourney", category: "Learning Product", caseLabel: "Case study 04 · Learning", summary: "A digital learning experience designed around progress, clarity and guided practice.", coverFrom: "#3A33A3", coverTo: "#6366F1" },
];

export const SERVICES: Service[] = [
  {
    slug: "ai-solutions", number: "01", title: "AI Solutions", icon: "ai",
    excerpt: "Chatbots, custom assistants and AI woven into your real workflows.",
    description: "Practical AI that plugs into how you already work — not science projects.",
    features: ["AI chatbots", "Custom assistants", "AI integrations", "Workflow automation"],
  },
  {
    slug: "web-development", number: "02", title: "Web Development", icon: "web",
    excerpt: "Modern sites and full-stack apps that are fast, accessible and on-brand.",
    description: "Fast, accessible, on-brand sites and full-stack applications.",
    features: ["Modern websites", "Landing pages", "Full-stack applications"],
  },
  {
    slug: "business-automation", number: "03", title: "Business Automation", icon: "automation",
    excerpt: "Replace repetitive ops with reliable, automated systems.",
    description: "Replace repetitive ops with reliable, automated systems.",
    features: ["CRM", "HRMS", "Internal tools", "Operations automation"],
  },
  {
    slug: "branding-identity", number: "04", title: "Branding & Identity", icon: "branding",
    excerpt: "Cohesive brand systems that make products feel considered.",
    description: "Cohesive brand systems that make products feel considered.",
    features: ["Brand systems", "Logo design", "Visual identity", "Design strategy"],
  },
  {
    slug: "vector-creative-services", number: "05", title: "Vector & Creative Services", icon: "vector",
    excerpt: "Crisp, print-ready artwork and clean production assets.",
    description: "Crisp, print-ready artwork and clean production assets.",
    features: ["Vector conversion", "Production artwork", "Print-ready assets", "Graphic cleanup"],
  },
  {
    slug: "support-growth", number: "06", title: "Support & Growth", icon: "support",
    excerpt: "We stay on after launch — keeping things fast, stable and improving.",
    description: "We stay on after launch — keeping things fast, stable and improving.",
    features: ["Maintenance", "Performance", "Optimization", "Long-term support"],
  },
];

/**
 * Fallback blog posts — shown only when WordPress is NOT configured
 * (WP_GRAPHQL_ENDPOINT unset/unreachable). Once WP is connected, real posts
 * take over; if WP returns zero posts, the blog shows its premium empty state.
 */
export const POSTS: Post[] = [
  {
    slug: "shipping-ai-products-with-care",
    title: "Shipping AI products with care",
    excerpt: "How we keep AI features useful, reliable and human — from first prompt to production.",
    content:
      "<p>AI is only as good as the product around it. We design the workflow first, then let automation and models do the heavy lifting where they genuinely help.</p><p>This is placeholder content. Publish real posts in WordPress and they will replace this automatically.</p>",
    date: "2026-05-20T09:00:00",
    author: "FaPrompt",
    category: "AI",
    readingTime: "3 min read",
    featuredImage: null,
  },
  {
    slug: "from-prompt-to-product",
    title: "From prompt to product: our build loop",
    excerpt: "A look at the tight, calm loop we use to turn an idea into working software.",
    content:
      "<p>Discover, design, build, launch, grow — in short, honest cycles. Each loop ends with something you can actually try.</p><p>This is placeholder content for local development.</p>",
    date: "2026-04-08T09:00:00",
    author: "FaPrompt",
    category: "Process",
    readingTime: "4 min read",
    featuredImage: null,
  },
];
