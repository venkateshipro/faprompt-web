import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/Icons";
import type { Project } from "@/types";

/** A single work/project card — preserves the v1 gradient-thumb look. */
export function WorkCard({ project }: { project: Project }) {
  return (
    <article className="work">
      <div className="thumb" style={{ background: `linear-gradient(135deg, ${project.coverFrom}, ${project.coverTo})` }}>
        <span className="mono-tag">{project.category}</span>
        {project.coverImage ? (
          <Image src={project.coverImage} alt={project.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 680px) 100vw, 50vw" />
        ) : (
          <svg width="90" height="90" viewBox="0 0 100 100" style={{ opacity: 0.9 }}>
            <path d="M34 29 L56 50 L34 69" fill="none" stroke="#A7A9F4" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="36" y1="82" x2="54" y2="82" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <div className="meta">
        {project.caseLabel && <span className="cat">{project.caseLabel}</span>}
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
    </article>
  );
}

/** Home "Selected work" teaser — first two projects + link to all. */
export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <div className="sec-head" style={{ margin: 0 }}>
            <p className="eyebrow">Selected work</p>
            <h2>Things we love building.</h2>
          </div>
          <Link href="/work" className="tlink">
            View all work<ArrowRight size={16} />
          </Link>
        </div>
        <div className="work-grid reveal" style={{ marginTop: 44 }}>
          {projects.slice(0, 2).map((p) => (
            <WorkCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
