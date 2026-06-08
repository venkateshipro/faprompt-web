import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getPage, getPages, getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo";

export const revalidate = REVALIDATE;
export const dynamicParams = true; // render new WP pages without a redeploy

/**
 * Catch-all WordPress Page route. Next.js matches more-specific routes first
 * (/, /about, /services, /work, /blog, /contact), so this only handles
 * top-level slugs that map to a WordPress Page. Unknown slugs → existing 404.
 */
export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPage(params.slug);
  if (!page) return buildMetadata({ title: "Page", path: `/${params.slug}` });
  return buildMetadata({ title: page.title, path: `/${page.slug}` });
}

export default async function WpPageRoute({ params }: { params: { slug: string } }) {
  const [global, page] = await Promise.all([getGlobal(), getPage(params.slug)]);
  if (!page) notFound(); // preserves existing 404

  return (
    <>
      <Nav global={global} active={`/${page.slug}`} />

      <header className="section-sm" style={{ paddingTop: "clamp(56px,7vw,84px)", paddingBottom: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">FaPrompt</p>
            <h1 style={{ fontSize: "clamp(34px,5vw,60px)" }}>{page.title}</h1>
          </div>
        </div>
      </header>

      <article className="section">
        <div className="wrap">
          <div className="post-body reveal" style={{ maxWidth: 760 }} dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      </article>

      <Footer global={global} />
    </>
  );
}
