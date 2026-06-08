import type { MetadataRoute } from "next";
import { getServices } from "@/lib/wordpress";
import { SITE_URL } from "@/lib/seo";

/**
 * XML sitemap — static routes + every service detail page.
 * Regenerates with ISR, so newly published services appear automatically.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["", "/services", "/work", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const services = await getServices();
  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
