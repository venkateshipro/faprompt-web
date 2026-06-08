import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ArrowRight } from "@/components/Icons";
import { getPosts, getPost, getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata, articleJsonLd } from "@/lib/seo";

export const revalidate = REVALIDATE;
export const dynamicParams = true; // allow new posts without a redeploy

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return buildMetadata({ title: "Article", path: `/blog/${params.slug}` });

  // TEMP debug: shows whether RankMath SEO fields came through or we fell back.
  const usingSeo = !!(post.seo && (post.seo.title || post.seo.description));
  console.log(usingSeo ? "[seo] RankMath active" : "[seo] fallback metadata");

  return buildMetadata({
    title: post.title,
    description: post.seo?.description || post.excerpt,
    path: `/blog/${post.slug}`,
    seo: post.seo,
    ogImage: post.seo?.ogImage || post.featuredImage || undefined,
  });
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [global, post] = await Promise.all([getGlobal(), getPost(params.slug)]);
  if (!post) notFound();

  const jsonLd = articleJsonLd({
    title: post.title,
    description: post.seo?.description || post.excerpt,
    path: `/blog/${post.slug}`,
    date: post.date,
    author: post.author,
    image: post.featuredImage,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav global={global} active="/blog" />

      {/* HERO */}
      <header className="dark" style={{ padding: "clamp(64px,9vw,112px) 0 clamp(48px,6vw,80px)" }}>
        <div className="grid-overlay" />
        <div className="glow" style={{ width: 420, height: 420, background: "#4F46E5", top: -160, left: "35%", opacity: 0.22 }} />
        <div className="wrap" style={{ position: "relative" }}>
          <nav className="svc-breadcrumb reveal" style={{ marginBottom: 22, fontSize: 13 }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: "var(--d-ink-faint)" }}>Home</Link>
            <span style={{ color: "var(--d-ink-faint)", margin: "0 8px" }}>/</span>
            <Link href="/blog" style={{ color: "var(--d-ink-faint)" }}>Blog</Link>
            <span style={{ color: "var(--d-ink-faint)", margin: "0 8px" }}>/</span>
            {post.category && (
              <>
                {post.categorySlug ? (
                  <Link href={`/blog/category/${post.categorySlug}`} style={{ color: "var(--d-ink-faint)" }}>{post.category}</Link>
                ) : (
                  <span style={{ color: "var(--d-ink-faint)" }}>{post.category}</span>
                )}
                <span style={{ color: "var(--d-ink-faint)", margin: "0 8px" }}>/</span>
              </>
            )}
            <span style={{ color: "var(--indigo-300)" }}>{post.title}</span>
          </nav>
          <div className="sec-head reveal" style={{ maxWidth: 820 }}>
            <p className="eyebrow dim">
              {formatDate(post.date)}
              {post.readingTime ? ` · ${post.readingTime}` : ""}
              {post.category ? ` · ${post.category}` : ""}
            </p>
            <h1 style={{ fontSize: "clamp(30px,4.4vw,52px)", marginTop: 12 }}>{post.title}</h1>
          </div>
        </div>
      </header>

      {/* BODY */}
      <article className="section">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {post.featuredImage && (
              <div className="reveal" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: 40, border: "1px solid var(--line)" }}>
                <Image src={post.featuredImage} alt={post.featuredImageAlt || post.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 820px) 100vw, 760px" priority />
              </div>
            )}
            <div className="post-body reveal" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/blog" className="tlink" style={{ transform: "scaleX(-1)" }} aria-label="Back to blog">
                <ArrowRight size={16} />
              </Link>
              <Link href="/blog" className="tlink">All articles<ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </article>

      <CTA />
      <Footer global={global} />
    </>
  );
}
