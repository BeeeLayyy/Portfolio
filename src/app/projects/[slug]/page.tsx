import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Container, Tag } from "@/components/ui";
import { getProject, projects } from "@/content/projects";

// This page awaits its slug before rendering so unknown slugs return a real
// 404. Streaming behind <Suspense> would make navigation instant but turn
// those 404s into 200s (dynamicParams isn't available with Cache Components).
// Known projects are still prerendered below, so the wait is short.
export const instant = false;

// Build one static page per project at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.oneLiner } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = [
    { heading: "The problem", body: project.problem },
    { heading: "What I built", body: project.built },
    { heading: "What came of it", body: project.outcome },
  ];

  return (
    <article>
      <Container className="pt-16 pb-12 md:pt-24">
        <Link href="/projects" className="inline-block py-1 text-sm text-paper-muted hover:text-lamp">
          All projects
        </Link>
        <h1 className="mt-6 font-serif text-3xl">{project.title}</h1>
        <p className="mt-6 max-w-prose text-lg text-paper-muted">{project.oneLiner}</p>
        <dl className="mt-10 grid gap-6 border-y border-rule py-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-paper-muted">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
          <div>
            <dt className="text-paper-muted">Year</dt>
            <dd className="mt-1">{project.year}</dd>
          </div>
          <div>
            <dt className="text-paper-muted">Built with</dt>
            <dd className="mt-1 flex flex-wrap gap-2">
              {project.stack.length ? project.stack.map((s) => <Tag key={s}>{s}</Tag>) : "To be added"}
            </dd>
          </div>
        </dl>
        {project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.links.map((l, i) => (
              <ButtonLink key={l.href} href={l.href} variant={i === 0 ? "primary" : "secondary"}>
                {l.label}
              </ButtonLink>
            ))}
          </div>
        )}
      </Container>

      <Container>
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={1600}
            height={900}
            sizes="(min-width: 1280px) 1072px, 100vw"
            className="aspect-video w-full rounded-media bg-ledger-raised"
            preload
          />
        ) : (
          <div className="aspect-video rounded-media bg-ledger-raised" role="img" aria-label={`${project.title} preview, coming soon`} />
        )}
      </Container>

      <Container className="py-20">
        <div className="max-w-prose space-y-14">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-serif text-2xl">{s.heading}</h2>
              <p className="mt-4">{s.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
