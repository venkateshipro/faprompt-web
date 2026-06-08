import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { ArrowRight } from "@/components/Icons";
import { getPosts, getGlobal, REVALIDATE } from "@/lib/wordpress";
import { buildMetadata } from "@/lib/seo";
import type { Post } from "@/types";

export const revalidate = REVALIDATE;

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Notes from the FaPrompt studio — AI, product, automation and the craft of shipping software with care.",
  path: "/blog",
});

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
        <span className="cat">
          {formatDate(post.date)}
          {post.readingTime ? ` · ${post.readingTime}` : ""}
        </span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="tlink" style={{ marginTop: 14 }}>
          Read article<ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div
      className="reveal"
      style={{
        border: "1px dashed var(--line)",
        borderRadius: "var(--radius-lg)",
        padding: "clamp(48px,8vw,88px) 32px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <span style={{ width: 58, height: 58, borderRadius: 16, background: "var(--soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="26" height="26" viewBox="0 0 100 100"><path d="M34 29 L56 50 L34 69" fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" /><line x1="36" y1="82" x2="54" y2="82" stroke="currentColor" strokeWidth="11" strokeLinecap="round" /></svg>
      </span>
      <h2 style={{ fontSize: "clamp(24px,3vw,34px)" }}>Words are on the way.</h2>
      <p className="lead" style={{ maxWidth: "46ch", margin: 0 }}>
        We&apos;re writing our first notes on AI, product and the craft of shipping with care. Check back soon — or start a conversation in the meantime.
      </p>
      <Link href="/contact" className="btn btn-primary btn-arrow" style={{ marginTop: 6 }}>
        Start a project<span className="btn-arrow"><ArrowRight /></span>
      </Link>
    </div>
  );
}

export default async function BlogPage() {
  const [global, posts] = await Promise.all([getGlobal(), getPosts()]);

  return (
    <>
      <Nav global={global} active="/blog" />

      <section className="section-sm" style={{ paddingTop: "clamp(56px,7vw,84px)" }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <p className="eyebrow">Blog</p>
            <h1 style={{ fontSize: "clamp(34px,5vw,60px)" }}>Notes from the studio.</h1>
            <p className="lead" style={{ marginTop: 20 }}>
              Thinking on AI, product, automation and the craft of shipping software with care.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "clamp(72px,10vw,120px)" }}>
        <div className="wrap">
          {posts.length > 0 ? (
            <div className="work-grid reveal" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      <CTA />
      <Footer global={global} />
    </>
  );
}
