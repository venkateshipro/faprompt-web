import type { ServiceSection } from "@/types";

/**
 * SEO-rich detail content per service (approach · use cases · FAQ).
 * Merged into a Service in lib/wordpress.ts whenever the service has no
 * `body` of its own (so both the local fallback and a not-yet-detailed
 * WordPress service get this depth). Editing the service in WordPress later
 * overrides it automatically. Design is unchanged — the detail page already
 * renders these sections.
 */
export const SERVICE_DETAILS: Record<string, { description?: string; body: ServiceSection[] }> = {
  "ai-solutions": {
    description:
      "We design and build practical AI solutions — chatbots, custom AI assistants, and AI integrations — that plug into your real workflows and deliver measurable results, not demos.",
    body: [
      {
        heading: "An AI development approach built for real outcomes",
        intro:
          "FaPrompt builds AI products that are useful on day one. We start from your workflow and data, then apply the right model — LLMs, retrieval (RAG), or classic automation — so the AI earns its place instead of adding noise.",
        items: [
          { title: "Workflow-first design", text: "We map where AI genuinely saves time or unlocks value before writing a line of code, so every feature has a clear ROI." },
          { title: "Your data, grounded answers", text: "Retrieval-augmented generation keeps assistants accurate and on-brand, answering from your documents, policies and product knowledge." },
          { title: "Human-in-the-loop safety", text: "Guardrails, review steps and fallbacks keep automated decisions trustworthy and auditable." },
          { title: "Built to integrate", text: "We connect to your CRM, helpdesk, database and internal tools so AI acts inside the systems you already use." },
        ],
      },
      {
        heading: "What you can build with FaPrompt AI",
        intro:
          "From customer-facing chatbots to internal copilots, we ship AI features that scale with your business.",
        items: [
          { title: "AI customer support chatbots", text: "24/7 assistants that resolve common questions, deflect tickets and hand off cleanly to your team." },
          { title: "Custom AI assistants & copilots", text: "Internal tools that draft, summarise, search and automate the repetitive parts of your team's day." },
          { title: "AI workflow automation", text: "Trigger-based pipelines that classify, route, enrich and act on data without manual steps." },
          { title: "AI integrations & APIs", text: "Add intelligence to an existing product with secure, well-documented endpoints." },
        ],
      },
      {
        heading: "AI Solutions — FAQs",
        faq: true,
        items: [
          { title: "What types of AI solutions does FaPrompt build?", text: "AI chatbots, custom assistants and copilots, AI workflow automation, and AI integrations into existing software — always tailored to your use case and data." },
          { title: "Can the AI use our own data and documents?", text: "Yes. We use retrieval-augmented generation (RAG) so the AI answers from your knowledge base, keeping responses accurate, current and on-brand." },
          { title: "How long does an AI project take?", text: "A focused chatbot or assistant MVP typically ships in a few weeks; larger platforms run in short, iterative phases so you see working software early." },
        ],
      },
    ],
  },

  "web-development": {
    description:
      "Modern web development — fast, accessible, SEO-ready websites, landing pages and full-stack applications, engineered to perform and built around your brand.",
    body: [
      {
        heading: "Web development that's fast, accessible and on-brand",
        intro:
          "We build websites and web apps that score well on Core Web Vitals, rank in search, and feel considered on every screen — from marketing sites to complex full-stack products.",
        items: [
          { title: "Performance-first", text: "Optimised loading, images and rendering for top Lighthouse scores and happy visitors." },
          { title: "SEO foundations built in", text: "Semantic markup, metadata, structured data and clean URLs so you're discoverable from launch." },
          { title: "Accessible & responsive", text: "WCAG-minded, mobile-first builds that work for everyone on every device." },
          { title: "Headless & modern", text: "Next.js and headless CMS options give editors freedom without sacrificing speed." },
        ],
      },
      {
        heading: "What we build for the web",
        items: [
          { title: "Modern marketing websites", text: "Premium, conversion-focused sites that represent your brand with clarity and polish." },
          { title: "High-converting landing pages", text: "Focused pages designed and tested to turn visitors into leads and customers." },
          { title: "Full-stack web applications", text: "Interactive, data-driven apps with secure backends and clean, maintainable code." },
          { title: "Headless CMS websites", text: "Edit content freely in a CMS while the frontend stays fast and SEO-friendly." },
        ],
      },
      {
        heading: "Web Development — FAQs",
        faq: true,
        items: [
          { title: "Will my website be SEO-friendly?", text: "Yes. We build with semantic HTML, fast performance, metadata, sitemaps and structured data so search engines can crawl and rank your pages." },
          { title: "Can you connect a CMS so we can edit content?", text: "Absolutely — we build headless setups (e.g. WordPress or similar) so your team edits content while the site stays fast and secure." },
          { title: "Do you handle both design and development?", text: "Yes, design and engineering are one team here, so your site is cohesive from brand to code." },
        ],
      },
    ],
  },

  "business-automation": {
    description:
      "Business process automation that removes repetitive work — CRM, HRMS, internal tools and operations automation that save hours every day and reduce costly errors.",
    body: [
      {
        heading: "Automate the busywork, keep the judgement",
        intro:
          "We find the repetitive, error-prone tasks draining your team and replace them with reliable automated systems — connected to the tools you already run.",
        items: [
          { title: "Process mapping first", text: "We document how work really flows, then automate the steps that don't need a human." },
          { title: "Connected systems", text: "Your CRM, email, spreadsheets and internal tools talk to each other instead of living in silos." },
          { title: "Fewer errors, more speed", text: "Automated validation and handoffs cut mistakes and shrink turnaround times." },
          { title: "Clear visibility", text: "Dashboards and alerts give managers a live view of operations." },
        ],
      },
      {
        heading: "What we automate",
        items: [
          { title: "CRM & sales workflows", text: "Lead capture, routing, follow-ups and reporting handled automatically." },
          { title: "HRMS & people ops", text: "Onboarding, approvals and records management without the paperwork." },
          { title: "Internal tools", text: "Custom apps that replace fragile spreadsheets and manual steps." },
          { title: "Operations automation", text: "Order, inventory and back-office pipelines that run themselves." },
        ],
      },
      {
        heading: "Business Automation — FAQs",
        faq: true,
        items: [
          { title: "What business processes can be automated?", text: "Most repetitive, rules-based work — lead management, approvals, data entry, reporting, onboarding and operational handoffs." },
          { title: "Will automation work with our existing tools?", text: "Yes. We integrate with your current CRM, HRMS and software rather than forcing a rip-and-replace." },
          { title: "How quickly do we see results?", text: "Many automations pay back within weeks by removing hours of manual work and reducing errors." },
        ],
      },
    ],
  },

  "branding-identity": {
    description:
      "Branding and identity design — cohesive brand systems, logo design, visual identity and design strategy that make your product feel considered and trustworthy.",
    body: [
      {
        heading: "Brand systems, not just logos",
        intro:
          "We build complete visual identities — logo, colour, type, components and guidelines — so your brand is consistent and recognisable across product, web, social and print.",
        items: [
          { title: "Strategy-led", text: "We define what your brand stands for before we design how it looks." },
          { title: "A real system", text: "Tokens, components and rules so the brand holds up everywhere it's used." },
          { title: "Product-aware", text: "Identities designed by a team that also builds software, so they work in the UI." },
          { title: "Guidelines that ship", text: "Clear, usable brand guidelines your team and partners can actually follow." },
        ],
      },
      {
        heading: "What's included",
        items: [
          { title: "Brand identity systems", text: "Logo, palette, typography and usage rules as one coherent system." },
          { title: "Logo design", text: "Distinctive, scalable marks that work from favicon to billboard." },
          { title: "Visual identity", text: "Iconography, imagery and components that extend the brand consistently." },
          { title: "Design strategy", text: "Positioning and direction that align the brand with business goals." },
        ],
      },
      {
        heading: "Branding & Identity — FAQs",
        faq: true,
        items: [
          { title: "Do you deliver brand guidelines?", text: "Yes — every identity ships with guidelines covering logo usage, colour, type, spacing and dos and don'ts." },
          { title: "Can you rebrand an existing product?", text: "We do both new brands and refreshes, evolving what works while raising the overall quality and consistency." },
          { title: "Will the brand work in our app and website?", text: "Because we also build software, we design identities as systems that translate cleanly into real UI." },
        ],
      },
    ],
  },

  "vector-creative-services": {
    description:
      "Vector and creative services — vector conversion, production artwork, print-ready assets and graphic cleanup, delivered crisp, accurate and ready to use.",
    body: [
      {
        heading: "Crisp, production-ready creative",
        intro:
          "We turn rough or raster art into clean, scalable vector assets and press-ready files — accurate, on-brand and ready for any size or medium.",
        items: [
          { title: "True vector quality", text: "Hand-refined paths, not auto-traces, so artwork stays sharp at any scale." },
          { title: "Print-ready output", text: "Correct colour modes, bleeds and formats so files work first time at the printer." },
          { title: "Brand-accurate", text: "We match colours, proportions and detail precisely to your identity." },
          { title: "Fast turnaround", text: "Reliable delivery for one-off assets or ongoing production needs." },
        ],
      },
      {
        heading: "What we deliver",
        items: [
          { title: "Vector conversion", text: "Raster logos and graphics rebuilt as clean, editable vector files (SVG, AI, EPS, PDF)." },
          { title: "Production artwork", text: "Layouts and assets prepared correctly for print and digital output." },
          { title: "Print-ready assets", text: "Business cards, brochures, packaging and signage files set up to spec." },
          { title: "Graphic cleanup", text: "Tidying, redrawing and optimising existing artwork to a professional standard." },
        ],
      },
      {
        heading: "Vector & Creative — FAQs",
        faq: true,
        items: [
          { title: "Can you convert my logo to vector?", text: "Yes — we redraw raster logos into clean vector files that scale perfectly and are ready for print and web." },
          { title: "What file formats do you deliver?", text: "Typically SVG, AI, EPS and print-ready PDF, plus PNGs — whatever your workflow needs." },
          { title: "Are the files print-ready?", text: "Yes, with correct colour modes, bleed and resolution so they work at the printer without rework." },
        ],
      },
    ],
  },

  "support-growth": {
    description:
      "Ongoing support and growth — maintenance, performance optimization and long-term support that keep your product fast, secure and improving after launch.",
    body: [
      {
        heading: "Launch is the beginning, not the finish line",
        intro:
          "We stay on after go-live to keep your software healthy and moving forward — fixing, tuning and improving so your product keeps delivering value.",
        items: [
          { title: "Proactive maintenance", text: "Updates, monitoring and fixes that prevent problems instead of reacting to them." },
          { title: "Performance tuning", text: "Ongoing speed, reliability and Core Web Vitals improvements." },
          { title: "Continuous improvement", text: "Steady, prioritised enhancements based on real usage and goals." },
          { title: "A dependable partner", text: "Clear SLAs and a team that already knows your product." },
        ],
      },
      {
        heading: "How we support & grow your product",
        items: [
          { title: "Maintenance & updates", text: "Dependencies, security patches and bug fixes handled on a steady cadence." },
          { title: "Performance optimization", text: "Faster pages, leaner code and better infrastructure efficiency." },
          { title: "Optimization & experiments", text: "Conversion, UX and SEO improvements informed by data." },
          { title: "Long-term support", text: "A reliable retainer so you always have experts on call." },
        ],
      },
      {
        heading: "Support & Growth — FAQs",
        faq: true,
        items: [
          { title: "Do you offer ongoing maintenance plans?", text: "Yes — flexible retainers cover maintenance, monitoring, performance and continuous improvements." },
          { title: "Can you support a product you didn't build?", text: "Often yes. We start with an audit to understand the codebase, then take over maintenance and growth safely." },
          { title: "What does long-term support include?", text: "Updates, security, performance tuning, bug fixes and a prioritised stream of improvements aligned to your goals." },
        ],
      },
    ],
  },
};
