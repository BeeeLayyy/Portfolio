import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { RevealText } from "@/components/motion/reveal-text";
import { Container, PageHeader } from "@/components/ui";
import { goals } from "@/content/now";
import { offTheClock } from "@/content/personal";
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

      {(offTheClock.interests.length > 0 || offTheClock.favorites.length > 0 || offTheClock.photos.length > 0) && (
        <OffTheClock />
      )}

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

// The personality part (D20), from src/content/personal.ts: interests as
// cards, favorites as a short ledger, and photos that tilt slightly and
// straighten on hover. Each piece shows only if it has content.
function OffTheClock() {
  const { intro, interests, favorites, photos } = offTheClock;
  return (
    <Container className="pb-20">
      <div className="border-b border-rule pb-4">
        <RevealText as="h2" text="Off the clock" className="font-serif text-3xl" />
        {intro && <p className="mt-3 max-w-2xl text-lg text-ink-muted">{intro}</p>}
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        {interests.length > 0 && (
          <ul className={`grid gap-4 sm:grid-cols-2 ${favorites.length ? "md:col-span-8" : "md:col-span-12 md:grid-cols-3"}`}>
            {interests.map((it, i) => (
              <li key={it.title} className="rounded-media bg-surface p-6 ring-1 ring-rule" data-reveal="scale" style={{ "--i": i } as CSSProperties}>
                <h3 className="text-lg font-medium">{it.title}</h3>
                <p className="mt-2 text-ink-muted">{it.detail}</p>
              </li>
            ))}
          </ul>
        )}
        {favorites.length > 0 && (
          <dl className={`border-t border-rule ${interests.length ? "md:col-span-4" : "md:col-span-6"}`}>
            {favorites.map((f, i) => (
              <div key={f.label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-rule py-4" data-reveal="rise" style={{ "--i": i } as CSSProperties}>
                <dt className="font-mono text-sm tracking-wide text-ink-muted uppercase">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {photos.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((ph, i) => (
            <figure key={ph.src} data-reveal="scale" style={{ "--i": i } as CSSProperties}>
              <div
                className={`overflow-hidden rounded-media ring-1 ring-rule transition-transform duration-(--duration-base) ease-out-soft pointer-fine:hover:rotate-0 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
              >
                <Image src={ph.src} alt={ph.alt} width={1200} height={900} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
              </div>
              <figcaption className="mt-3 font-mono text-sm text-ink-muted">{ph.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </Container>
  );
}

