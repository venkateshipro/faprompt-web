import {
  SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  PROJECTS_QUERY,
  TESTIMONIALS_QUERY,
  POSTS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  POST_BY_SLUG_QUERY,
  POST_BY_SLUG_WITH_SEO_QUERY,
  PAGE_BY_SLUG_QUERY,
  PAGES_QUERY,
} from "@/lib/graphql";
import {
  SERVICES,
  PROJECTS,
  TESTIMONIALS,
  POSTS,
  GLOBAL,
} from "@/lib/content";
import { SERVICE_DETAILS } from "@/lib/serviceContent";
import type { Service, Project, Testimonial, Post, WpPage, WpPageLink, GlobalSettings } from "@/types";

/**
 * Headless WordPress data layer.
 *
 * Strategy:
 *  • Every getter tries WPGraphQL first (ISR-cached, revalidate = 300).
 *  • If WP_GRAPHQL_ENDPOINT is unset OR the request fails, it falls back to
 *    the built-in content in lib/content.ts — so the site never breaks and
 *    looks identical before WP is connected.
 *
 * This makes the migration phased and safe (Phases 1→3 in the brief).
 */

const ENDPOINT = process.env.WP_GRAPHQL_ENDPOINT;
export const REVALIDATE = 300; // ISR: regenerate at most every 5 minutes

export async function wpFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> {
  if (!ENDPOINT) return null; // not configured yet → use fallback
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`WPGraphQL ${res.status}`);
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data as T;
  } catch (err) {
    console.warn("[wordpress] falling back to local content:", (err as Error).message);
    return null;
  }
}

/* ----------------------------------------------------------------------- */
/* Mappers: WPGraphQL shape → app types                                    */
/* ----------------------------------------------------------------------- */

function mapService(node: any): Service {
  const f = node.serviceFields ?? {};
  return {
    slug: node.slug,
    title: node.title,
    number: f.number ?? "",
    icon: f.icon ?? "ai",
    excerpt: f.excerpt ?? "",
    description: f.description ?? "",
    features: (f.features ?? []).map((x: any) => x.feature),
    cta: f.cta ?? undefined,
    body: (f.sections ?? []).map((s: any) => ({
      heading: s.heading,
      intro: s.intro,
      items: s.items ?? [],
    })),
    seo: node.seo
      ? {
          title: node.seo.title,
          description: node.seo.metaDesc,
          canonical: node.seo.canonical,
          ogImage: node.seo.opengraphImage?.sourceUrl,
        }
      : undefined,
  };
}

function mapProject(node: any): Project {
  const f = node.projectFields ?? {};
  return {
    slug: node.slug,
    title: node.title,
    category: f.category ?? "",
    caseLabel: f.caseLabel ?? undefined,
    summary: f.summary ?? "",
    coverFrom: f.coverFrom ?? "#211C4E",
    coverTo: f.coverTo ?? "#3A33A3",
    coverImage: f.coverImage?.node?.sourceUrl ?? null,
    results: (f.results ?? []).map((x: any) => x.result),
  };
}

/* ----------------------------------------------------------------------- */
/* Public getters (used by pages)                                          */
/* ----------------------------------------------------------------------- */

export async function getServices(): Promise<Service[]> {
  const data = await wpFetch<{ services: { nodes: any[] } }>(SERVICES_QUERY);
  const nodes = data?.services?.nodes;
  if (!nodes?.length) return SERVICES;
  return nodes.map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await wpFetch<{ service: any }>(SERVICE_BY_SLUG_QUERY, { slug });
  let svc: Service | null = data?.service ? mapService(data.service) : SERVICES.find((s) => s.slug === slug) ?? null;
  // Enrich with SEO-rich detail sections when the service has no body of its own
  // (applies to the local fallback and any not-yet-detailed WordPress service).
  if (svc && (!svc.body || svc.body.length === 0)) {
    const d = SERVICE_DETAILS[slug];
    if (d) svc = { ...svc, description: d.description || svc.description, body: d.body };
  }
  return svc;
}

export async function getProjects(): Promise<Project[]> {
  const data = await wpFetch<{ projects: { nodes: any[] } }>(PROJECTS_QUERY);
  const nodes = data?.projects?.nodes;
  if (!nodes?.length) return PROJECTS;
  return nodes.map(mapProject);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await wpFetch<{ testimonials: { nodes: any[] } }>(TESTIMONIALS_QUERY);
  const nodes = data?.testimonials?.nodes;
  if (!nodes?.length) return TESTIMONIALS;
  return nodes.map((n: any) => {
    const f = n.testimonialFields ?? {};
    const name: string = f.name ?? n.title ?? "";
    return {
      name,
      role: f.role ?? "",
      quote: f.quote ?? "",
      initials: name.split(" ").map((w: string) => w[0]).slice(0, 2).join(""),
    };
  });
}

/* ── Blog posts (standard WPGraphQL Post type) ─────────────────────────── */

const stripHtml = (s: string) => (s || "").replace(/<[^>]*>/g, "").trim();

function mapPost(node: any): Post {
  const words = stripHtml(node.content ?? node.excerpt ?? "").split(/\s+/).filter(Boolean).length;
  return {
    slug: node.slug,
    title: node.title,
    excerpt: stripHtml(node.excerpt ?? ""),
    content: node.content ?? "",
    date: node.date,
    author: node.author?.node?.name ?? undefined,
    category: node.categories?.nodes?.[0]?.name ?? undefined,
    categorySlug: node.categories?.nodes?.[0]?.slug ?? undefined,
    readingTime: words ? `${Math.max(1, Math.round(words / 200))} min read` : undefined,
    featuredImage: node.featuredImage?.node?.sourceUrl ?? null,
    featuredImageAlt: node.featuredImage?.node?.altText ?? "",
    // RankMath SEO (via "WPGraphQL for Rank Math SEO"). Falls back per-field:
    //   seo.title        → post.title
    //   seo.description  → post.excerpt → default (handled in buildMetadata)
    //   seo OG image     → featured image
    seo: node.seo
      ? {
          title: node.seo.title || undefined,
          description: node.seo.description || undefined,
          canonical: node.seo.canonicalUrl || undefined,
          ogImage:
            node.seo.openGraph?.image?.url ||
            node.featuredImage?.node?.sourceUrl ||
            undefined,
        }
      : undefined,
  };
}

export async function getPosts(): Promise<Post[]> {
  const data = await wpFetch<{ posts: { nodes: any[] } }>(POSTS_QUERY, { first: 24 });
  const nodes = data?.posts?.nodes;
  if (nodes == null) return POSTS;       // WP not configured → fallback
  return nodes.map(mapPost);             // WP configured (may be an empty array → real empty state)
}

export async function getPostsByCategory(slug: string): Promise<Post[]> {
  // WPGraphQL's `categoryName` filter matches on the category SLUG.
  const data = await wpFetch<{ posts: { nodes: any[] } }>(POSTS_BY_CATEGORY_QUERY, { slug, first: 24 });
  const nodes = data?.posts?.nodes;
  if (nodes == null) return POSTS.filter((p) => p.categorySlug === slug); // WP down → fallback
  return nodes.map(mapPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  // 1) Try WITH RankMath SEO fields.
  let data = await wpFetch<{ post: any }>(POST_BY_SLUG_WITH_SEO_QUERY, { slug });
  // 2) If that failed (SEO extension not active → GraphQL error → null, OR WP
  //    down), retry WITHOUT seo so the page still renders from core fields.
  if (!data?.post) {
    data = await wpFetch<{ post: any }>(POST_BY_SLUG_QUERY, { slug });
  }
  if (data?.post) return mapPost(data.post);
  // null data = WP unreachable → use fallback; otherwise genuinely not found
  if (data === null) return POSTS.find((p) => p.slug === slug) ?? null;
  return null;
}

export async function getPage(slug: string): Promise<WpPage | null> {
  // WordPress resolves pages by URI; "/slug/" is the reliable form.
  const data = await wpFetch<{ page: any }>(PAGE_BY_SLUG_QUERY, { slug: `/${slug}/` });
  if (data?.page) {
    return { slug: data.page.slug, title: data.page.title, content: data.page.content ?? "" };
  }
  return null; // not found (or WP down) → caller shows existing 404
}

export async function getPages(): Promise<WpPageLink[]> {
  const data = await wpFetch<{ pages: { nodes: any[] } }>(PAGES_QUERY, { first: 50 });
  const nodes = data?.pages?.nodes;
  if (nodes == null) return []; // WP not configured → no dynamic page links
  return nodes
    .filter((n: any) => !n.isFrontPage)
    .map((n: any) => ({ slug: n.slug, title: n.title }));
}

export async function getGlobal(): Promise<GlobalSettings> {
  // Global settings are small and rarely change; fallback covers them fully.
  // Wire GLOBAL_QUERY here once the ACF options page is created.
  return GLOBAL;
}
