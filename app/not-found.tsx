import Link from "next/link";
import { GLOBAL } from "@/lib/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav global={GLOBAL} active="" dark />
      <header className="dark" style={{ padding: "clamp(120px,18vw,200px) 0", textAlign: "center" }}>
        <div className="grid-overlay" />
        <div className="wrap" style={{ position: "relative" }}>
          <p className="eyebrow dim" style={{ justifyContent: "center" }}>404</p>
          <h1 style={{ marginTop: 14 }}>This page wandered off.</h1>
          <p className="lead" style={{ margin: "20px auto 0", maxWidth: "44ch" }}>
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 34, flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-white">Back home</Link>
            <Link href="/services" className="btn btn-ghost on-dark">Explore services</Link>
          </div>
        </div>
      </header>
      <Footer global={GLOBAL} />
    </>
  );
}
