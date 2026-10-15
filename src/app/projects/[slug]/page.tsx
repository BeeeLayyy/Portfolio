import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type CSSProperties, type ReactNode } from "react";
import { notFound } from "next/navigation";
import { RevealText } from "@/components/motion/reveal-text";
import { ButtonLink, Container, Tag } from "@/components/ui";
import { getProject, projectImageTransition, projects } from "@/content/projects";

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

// A project page in the Home style (D19): a big title with the one-liner and
// facts beside it, the lead screenshot at full width, then numbered chapters
// with the label pinned on the left and the story in large type on the
// right, so no column sits empty. Layout only: the words come from
// src/content/projects.ts.
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const titleWords = project.title.split(" ");
  const chapters = [
    { title: "The problem", body: project.problem },
    { title: "What I built", body: project.built },
    { title: "What came of it", body: project.outcome },
  ];

  return (
    <article>
      <Container className="pt-10 pb-12 md:pt-16">
        <Link href="/projects" className="underline-draw inline-block py-1 text-sm text-ink-muted hover:text-accent">
          All projects
        </Link>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-sm tracking-wide text-ink-muted uppercase">
              Project <span aria-hidden>·</span> {project.year}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(3.5rem,11vw,9rem)] leading-[0.95] tracking-tight">
              {titleWords.map((word, i) => (
                <span key={i}>
                  <span className="title-word" style={{ "--i": i } as CSSProperties}>
                    {word}
                  </span>
                  {i < titleWords.length - 1 && " "}
                </span>
              ))}
            </h1>
          </div>
          {/* The one-liner and facts sit beside the title, not under it. */}
          <div className="md:col-span-5 md:self-end">
            <RevealText as="p" mode="fade-words" text={project.oneLiner} className="text-xl" />
            <dl className="mt-8 border-t border-rule">
              <Fact label="Role">{project.role}</Fact>
              <Fact label="Year">
                <span className="font-mono">{project.year}</span>
              </Fact>
              <Fact label="Built with">
                <span className="flex flex-wrap gap-2">
                  {project.stack.length ? project.stack.map((s) => <Tag key={s}>{s}</Tag>) : "To be added"}
                </span>
              </Fact>
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
          </div>
        </div>
      </Container>

      {/* The lead screenshot, full width like Home's card. It still morphs in
          from the Projects row (view transition). */}
      <div className="mx-auto w-full max-w-hero px-4 md:px-8">
        <Crosses />
        <div className="media-settle my-6">
          {project.image ? (
            <ViewTransition name={projectImageTransition(project.slug)} share="morph" default="none">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={1600}
                height={900}
                sizes="(min-width: 1920px) 1856px, 100vw"
                className="aspect-video w-full rounded-media bg-surface object-cover object-top ring-1 ring-rule"
                preload
              />
            </ViewTransition>
          ) : (
            <div className="aspect-video rounded-media bg-surface" role="img" aria-label={`${project.title} preview, coming soon`} />
          )}
        </div>
        <Crosses />
      </div>

      <Container className="py-20 md:py-28">
        <div className="space-y-20 md:space-y-28">
          {chapters.map((c, i) => (
            <section key={c.title} className="grid gap-6 border-t border-rule pt-8 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-[calc(var(--spacing-header)+2rem)]">
                  <p className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <RevealText as="h2" text={c.title} className="mt-2 font-serif text-3xl" />
                </div>
              </div>
              <div className="md:col-span-8">
                {/* The whole paragraph rises in. Word-by-word brightening suits
                    short intros, but long text would sit dim near the bottom of
                    the screen until scrolled further. */}
                <p className="text-xl leading-relaxed md:text-2xl md:leading-relaxed" data-reveal="rise">
                  {c.body}
                </p>
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-rule py-4">
      <dt className="font-mono text-sm tracking-wide text-ink-muted uppercase">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Crosses() {
  return (
    <div className="flex items-center justify-between" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="cross" />
      ))}
    </div>
  );
}
