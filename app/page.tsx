import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServicesTeaser from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { getServices, getTestimonials, getGlobal, REVALIDATE } from "@/lib/wordpress";
import { PROCESS, STATS } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = REVALIDATE; // ISR — 300s

export const metadata: Metadata = buildMetadata({ path: "/" });

export default async function HomePage() {
  const [global, services, testimonials] = await Promise.all([
    getGlobal(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <Nav global={global} active="/" dark />
      <Hero />
      <ServicesTeaser services={services} />
      <Process steps={PROCESS} dark intro="No chaos, no black boxes. Four clear phases, shared docs, and steady momentum from kickoff to launch." />
      <Stats stats={STATS} />
      <Testimonials testimonials={testimonials} />
      <CTA />
      <Footer global={global} />
    </>
  );
}
