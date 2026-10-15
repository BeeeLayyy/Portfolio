import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { RevealText } from "@/components/motion/reveal-text";
import { Container, PageHeader } from "@/components/ui";
import { goals } from "@/content/now";
import { site, pageDescriptions } from "@/content/site";

export const metadata: Metadata = { title: "About", description: pageDescriptions.about };

// About (D19): the story on the left with the portrait pinned beside it,
// then goals as numbered cards and the toolkit grouped by what each tool is
// for. Same two-column rhythm as Home's portrait section.
export default function AboutPage() {
  const [lead, ...rest] = site.bio;
  return (
    <>
      <PageHeader eyebrow="About" title="Hi, I'm Brandon" />

      <Container className="pb-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <RevealText as="p" mode="fade-words" text={lead} className="text-2xl leading-snug" />
            <div className="mt-10 space-y-6 text-lg text-ink-muted">
              {rest.map((p) => (
                <p key={p} data-reveal="rise">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <div className="md:sticky md:top-[calc(var(--spacing-header)+2rem)]">
              <div className="group max-w-sm overflow-hidden rounded-media ring-1 ring-rule md:max-w-none" data-reveal="scale">
                <Image
                  src={site.headshot.src}
                  alt={site.headshot.alt}
                  width={800}
                  height={1000}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-(--duration-reveal) ease-out-soft pointer-fine:group-hover:scale-[1.04]"
                  preload
                />
              </div>
              <p className="mt-4 font-mono text-sm text-ink-muted">{site.affiliation.join(" · ")}</p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-20">
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
          <RevealText as="h2" text="Goals" className="font-serif text-3xl" />
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {goals.map((g, i) => (
            <li
              key={`${g.title}-${i}`}
              className="rounded-media bg-surface p-6 ring-1 ring-rule"
              data-reveal="scale"
              style={{ "--i": i } as CSSProperties}
            >
              <p className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-lg font-medium">{g.title}</h3>
              <p className="mt-2 text-ink-muted">{g.detail}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="pb-24">
        <div className="border-b border-rule pb-4">
          <RevealText as="h2" text="Toolkit" className="font-serif text-3xl" />
        </div>
        <dl className="mt-4">
          {site.toolkit.map((t, i) => (
            <div
              key={t.group}
              className="grid gap-3 border-b border-rule py-6 md:grid-cols-[14rem_1fr] md:items-center"
              data-reveal="rise"
              style={{ "--i": i } as CSSProperties}
            >
              <dt className="font-mono text-sm tracking-wide text-ink-muted uppercase">{t.group}</dt>
              <dd className="flex flex-wrap gap-2">
                {t.tools.map((tool) => (
                  <span key={tool} className="rounded-pill bg-surface px-4 py-2 ring-1 ring-rule">
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
