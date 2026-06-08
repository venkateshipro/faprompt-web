import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ArrowRight } from "@/components/Icons";
import { getPostsByCategory, getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo";
import type { Post } from "@/types";

export const revalidate = REVALIDATE;
export const dynamicParams = true;

function titleCase(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const name = titleCase(params.slug);
  return buildMetadata({
    title: `${name} — Blog`,
    description: `Articles from the FaPrompt studio in ${name}.`,
    path: `/blog/category/${params.slug}`,
  });
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="work reveal" style={{ display: "block" }}>
      <div className="thumb" style={{ background: "linear-gradient(135deg,#211C4E,#3A33A3)" }}>
        {post.category && <span className="mono-tag">{post.category}</span>}
        {post.featuredImage ? (
          <Image src={post.featuredImage} alt={post.featuredImageAlt || post.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 680px) 100vw, 50vw" />
        ) : (
          <svg width="90" height="90" viewBox="0 0 100 100" style={{ opacity: 0.9 }}>
            <path d="M34 29 L56 50 L34 69" fill="none" stroke="#A7A9F4" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="36" y1="82" x2="54" y2="82" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <div className="meta">
        <span className="cat">{formatDate(post.date)}{post.readingTime ? ` · ${post.readingTime}` : ""}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="tlink" style={{ marginTop: 14 }}>Read article<ArrowRight size={16} /></span>
      </div>
    </Link>
  );
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [global, posts] = await Promise.all([getGlobal(), getPostsByCategory(params.slug)]);
  if (!posts.length) notFound();

  const name = posts[0].category || titleCase(params.slug);

  return (
    <>
      <Nav global={global} active="/blog" />

      <section className="section-sm" style={{ paddingTop: "clamp(56px,7vw,84px)" }}>
        <div className="wrap">
          <nav className="svc-breadcrumb reveal" style={{ marginBottom: 18, fontSize: 13 }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: "var(--ink-faint)" }}>Home</Link>
            <span style={{ color: "var(--ink-faint)", margin: "0 8px" }}>/</span>
            <Link href="/blog" style={{ color: "var(--ink-faint)" }}>Blog</Link>
            <span style={{ color: "var(--ink-faint)", margin: "0 8px" }}>/</span>
            <span style={{ color: "var(--accent)" }}>{name}</span>
          </nav>
          <div className="sec-head reveal">
            <p className="eyebrow">Category</p>
            <h1 style={{ fontSize: "clamp(34px,5vw,60px)" }}>{name}</h1>
            <p className="lead" style={{ marginTop: 20 }}>
              Articles from the FaPrompt studio filed under {name}.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div className="wrap">
          <div className="work-grid reveal" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 32 }}>
            <Link href="/blog" className="tlink" style={{ transform: "scaleX(-1)" }} aria-label="Back to all articles">
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
      <Footer global={global} />
    </>
  );
}
