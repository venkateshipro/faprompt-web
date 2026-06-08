# FaPrompt — Website (Next.js + Headless WordPress)

The FaPrompt studio site, refactored into a **headless architecture**:

- **Frontend:** Next.js 14 (App Router) · TypeScript · Tailwind · ISR
- **Backend (content):** Headless WordPress via **WPGraphQL**
- **Design:** the approved v1 system, preserved verbatim — **not** redesigned

```
faprompt.com       → this Next.js app          (Hostinger Node.js hosting)
cms.faprompt.com   → WordPress admin + GraphQL  (see wordpress/SETUP.md)
```

> **Runs before WordPress exists.** Every data getter falls back to built-in
> content (`lib/content.ts`, the exact v1 copy) when `WP_GRAPHQL_ENDPOINT` is
> unset or unreachable. So you can run and deploy the frontend today, then wire
> WordPress section-by-section with zero downtime.

---

## Quick start (local)

```bash
# 1. Node 18.18+ required
npm install

# 2. environment
cp .env.example .env.local      # WP endpoint optional — omit to use fallback content

# 3. run
npm run dev                     # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start                   # serves the production build
```

---

## How it's wired

### Rendering — ISR (static-first, SEO-friendly)
Every page exports `export const revalidate = 300`. Pages are statically generated
and refreshed at most every 5 minutes — or **instantly** when WordPress publishes
(via the `/api/revalidate` webhook). No SSR-per-request.

### Data layer (`lib/wordpress.ts`)
```
getServices() · getServiceBySlug() · getProjects() · getTestimonials() · getGlobal()
```
Each tries WPGraphQL first, then falls back to `lib/content.ts`. Mapping from the
WP/ACF shape to app types happens here.

### Design system
`app/globals.css` is the v1 stylesheet **ported verbatim** (Tailwind layered on
top for optional utilities). All components emit the same class names, so the
look, spacing, animations, dark/light theme and off-canvas menu are identical.
Client behaviour lives in `components/SiteInteractions.tsx` (ported from v1 `site.js`).

### SEO
- Per-page `generateMetadata()` via `lib/seo.ts` (title, description, canonical, OG, Twitter)
- Editor-managed SEO flows from WordPress (Yoast/Rank Math) through the `seo { … }` GraphQL field
- `app/sitemap.ts` (static + every service) and `app/robots.ts`
- JSON-LD: Organization (site-wide) + Service (per service page)

---

## Project structure

```
app/
  layout.tsx              root layout, fonts, no-flash theme, Organization JSON-LD
  page.tsx                Home (ISR)
  about/ contact/ work/   pages (ISR)
  services/page.tsx       services index
  services/[slug]/page.tsx service detail (generateStaticParams + ISR)
  api/contact/route.ts    contact form endpoint
  api/revalidate/route.ts WP publish → on-demand ISR
  sitemap.ts  robots.ts   SEO
  globals.css             design system (ported verbatim)
components/                Hero, Services, Process, Stats, Projects,
                           Testimonials, CTA, Nav, Footer, Icons, SiteInteractions
lib/
  wordpress.ts            data getters (WPGraphQL + fallback)
  graphql.ts              query documents
  content.ts              built-in fallback content (v1 copy)
  seo.ts                  metadata + JSON-LD builders
graphql/                  .graphql files (reference copies of the queries)
types/                    shared TypeScript types
wordpress/
  SETUP.md                WordPress + WPGraphQL + ACF setup
  functions-snippet.php   CPTs, CORS, revalidation webhook
public/assets/            favicon + logo
```

---

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `WP_GRAPHQL_ENDPOINT` | no (fallback if unset) | WordPress GraphQL URL |
| `NEXT_PUBLIC_WP_IMAGE_HOST` | for WP images | host allowed for `next/image` |
| `NEXT_PUBLIC_SITE_URL` | recommended | canonical/OG/sitemap base |
| `REVALIDATE_SECRET` | for instant updates | shared secret for the WP webhook |

---

## Deploying to Hostinger

### Frontend → Hostinger Node.js App Hosting
1. Push this folder to a Git repo (or upload it).
2. In hPanel: **Hosting → Node.js** → create app.
   - **Application root:** the project folder
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm run start` (binds to Hostinger's `$PORT`)
   - **Node version:** 18+
3. Add the env vars above in the Node.js app's **Environment Variables**.
4. Map the domain **faprompt.com** to the app.

> Notes: ISR/on-demand revalidation and `next/image` need the **Node.js runtime**
> (this setup) — not static export. Keep it running as a Node app, not a static site.

### Backend → WordPress on a subdomain
Follow **`wordpress/SETUP.md`** to stand up `cms.faprompt.com`, install the plugins,
add `functions-snippet.php`, and create the ACF field groups. Then set
`WP_GRAPHQL_ENDPOINT` on the frontend and redeploy.

---

## Migration phases (per the brief)

1. **Port to Next.js** — ✅ done (this repo; runs on fallback content)
2. **Connect WordPress** — install per `wordpress/SETUP.md`, set `WP_GRAPHQL_ENDPOINT`
3. **Convert editable sections** — seed Services/Projects/Testimonials in WP; they take over automatically
4. **Add blog** — add a `post`-backed `/blog` route + query (scaffolding patterns already in place)
5. **Optimize & launch** — Lighthouse pass, OG image, analytics, final QA

---

## Performance / Lighthouse 90+ checklist

- [x] ISR static-first rendering
- [x] `next/image` for CMS media (remote patterns set in `next.config.mjs`)
- [x] Fonts via `display=swap` + preconnect
- [x] No render-blocking client JS beyond the small interactions bundle
- [x] Metadata, sitemap, robots, JSON-LD
- [ ] Add a real `/public/og-default.png` (1200×630) for social cards
- [ ] Run `npm run build` and Lighthouse on the deployed URL

© 2026 FaPrompt Labs OPC Pvt Ltd · Building digital products with care.
