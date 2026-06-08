# WordPress (headless) — setup guide

This guide configures WordPress as a **content-only backend** for the FaPrompt
Next.js frontend. Visitors never see WordPress — it only powers the GraphQL API.

```
cms.faprompt.com   → WordPress admin + /graphql   (this guide)
faprompt.com       → Next.js frontend             (see ../README.md)
```

---

## 1. Install WordPress

On a subdomain `cms.faprompt.com` (Hostinger: **Websites → Add Website → subdomain**,
then one-click WordPress). Use HTTPS.

## 2. Plugins (install + activate)

| Plugin | Purpose |
|---|---|
| **WPGraphQL** | Exposes a `/graphql` endpoint |
| **Advanced Custom Fields** (ACF) — free is fine, PRO adds repeaters/flexible | Custom content fields |
| **WPGraphQL for ACF** | Surfaces ACF fields in GraphQL |
| **Yoast SEO** (or Rank Math) | Editor-managed SEO |
| **WPGraphQL Yoast SEO** (or `WPGraphQL Rank Math`) | Exposes the `seo { … }` field used by the queries |

After activating WPGraphQL, confirm the endpoint loads: `https://cms.faprompt.com/graphql`.

## 3. Add the glue code

Copy **`functions-snippet.php`** (in this folder) into your theme's `functions.php`.
It registers the **Service**, **Project**, and **Testimonial** post types, opens CORS
for the frontend, and pings the frontend to revalidate on publish.

> Set a `REVALIDATE_SECRET` env var on the WP host that matches the one in the
> Next.js `.env.local`, so the publish→refresh webhook is authenticated.

## 4. Create the ACF field groups

For each group: **ACF → Field Groups → Add New**, add the fields, then in
**Settings** enable **Show in GraphQL = Yes** and set the **GraphQL Field Name**
exactly as shown (the queries depend on these names).

### Group: "Service Fields"  → location: Post Type = Service  → GraphQL name `serviceFields`
| Field label | Name | Type | Notes |
|---|---|---|---|
| Number | `number` | Text | "01" |
| Icon | `icon` | Select | choices: `ai, saas, web, automation, branding, vector, support` |
| Excerpt | `excerpt` | Text Area | card teaser |
| Description | `description` | Text Area | hero paragraph |
| Features | `features` | Repeater | one sub-field `feature` (Text) |
| CTA | `cta` | Text | optional |
| Sections | `sections` | Repeater | sub: `heading` (Text), `intro` (Textarea), `items` (Repeater: `title`, `text`) — optional rich content |

### Group: "Project Fields"  → Post Type = Project  → GraphQL name `projectFields`
| Field | Name | Type |
|---|---|---|
| Category | `category` | Text |
| Case label | `caseLabel` | Text |
| Summary | `summary` | Textarea |
| Cover from | `coverFrom` | Text (hex, e.g. `#211C4E`) |
| Cover to | `coverTo` | Text (hex) |
| Cover image | `coverImage` | Image (optional — replaces the gradient) |
| Results | `results` | Repeater (sub `result` Text) |

### Group: "Testimonial Fields"  → Post Type = Testimonial  → GraphQL name `testimonialFields`
| Field | Name | Type |
|---|---|---|
| Name | `name` | Text |
| Role | `role` | Text |
| Quote | `quote` | Textarea |

### (Optional) Global Settings → ACF **Options Page** → GraphQL name `siteFields`
Email, website, location, tagline, motto, legalName, ctaLabel, plus repeaters for
`nav` (label,url), `footerServices` (label,url), `social` (label,url).
Until you create this, the frontend uses the built-in defaults in `lib/content.ts`.

## 5. Seed the content

Recreate the current site copy (it lives in `lib/content.ts` as the fallback):

- **7 Services** — AI Solutions, SaaS Development, Web Development, Business
  Automation, Branding & Identity, Vector & Creative Services, Support & Growth.
  Use **slugs** matching the frontend: `ai-solutions`, `saas-development`,
  `web-development`, `business-automation`, `branding-identity`,
  `vector-creative-services`, `support-growth`. Set the **Order** (Page Attributes)
  01–07 so they sort correctly.
- **Projects** — ProfaCRM Lite, FaGrow, Standpipe Flow, Codejourney.
- **Testimonials** — Aarav Mehta, Priya Shah, Neel Rao.

## 6. Point the frontend at WordPress

In the Next.js project's `.env.local`:

```
WP_GRAPHQL_ENDPOINT=https://cms.faprompt.com/graphql
NEXT_PUBLIC_WP_IMAGE_HOST=cms.faprompt.com
REVALIDATE_SECRET=<same long random string as WP>
```

Redeploy. The site now renders from WordPress; with no/empty WP it falls back to
the built-in content automatically, so you can migrate page-by-page safely.

## 7. Verify

- Open `https://cms.faprompt.com/graphql` → run `{ services { nodes { slug title } } }`.
- Load the frontend — services/work/testimonials should now reflect WP edits.
- Publish an edit in WP → the matching page refreshes within seconds (webhook),
  or within 5 minutes (ISR) without it.
