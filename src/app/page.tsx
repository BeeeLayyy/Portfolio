import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { NowCard, ProjectRow, RoleItem } from "@/components/content-blocks";
import { HeroPlayed } from "@/components/hero-played";
import { HeroScene } from "@/components/hero-scene/hero-scene";
import { LetterRoll, RevealText } from "@/components/motion/reveal-text";
import { ButtonLink, Container, Section } from "@/components/ui";
import { roles } from "@/content/experience";
import { now } from "@/content/now";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

// Home, laid out like lusion.co's first screen (D16): a one-sentence title,
// the 3D card filling the rest of the screen, and a "scroll to explore" row.
// Below: a big two-line title, the featured project growing as it scrolls
// in, then Now, Projects and Experience. A blue ribbon draws itself down the
// page behind them. The intro, header and closing section live in the layout.
export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const showcase = featured.find((p) => p.image);
  const words = site.heroLine.split(" ");

  return (
    <>
      {/* Full width like Lusion's first screen: the title over the left of
          center, then the card filling the rest of the screen. */}
      <section aria-labelledby="hero-title" className="flex flex-col md:min-h-[calc(100svh-var(--spacing-header))]">
        <div className="mx-auto w-full max-w-hero px-4 pt-4 md:px-8 md:pt-2">
          <div className="md:grid md:grid-cols-12">
            {/* Starts at 1% opacity so Largest Contentful Paint counts at first paint (see globals.css). */}
            <h1
              id="hero-title"
              className="font-serif text-[clamp(2.75rem,5.6vw,6rem)] leading-[1] tracking-tight md:col-span-9 md:col-start-4"
            >
              {words.map((word, i) => (
                <span key={i}>
                  <span className="hero-word" style={{ "--i": i } as CSSProperties}>
                    {word}
                  </span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </h1>
          </div>
        </div>
        <HeroPlayed />
        <div className="mx-auto flex w-full max-w-hero flex-1 flex-col px-4 pt-6 md:px-8 md:pt-8">
          <div className="hero-rise flex min-h-0 flex-1 flex-col">
            <HeroScene className="aspect-[4/5] sm:aspect-[4/3] md:aspect-auto md:min-h-[26rem] md:flex-1" />
          </div>
          <div className="relative flex h-14 items-center justify-between md:h-16" aria-hidden>
            <span className="cross" />
            <span className="cross hidden md:block" />
            <span className="cue-window absolute left-1/2 -translate-x-1/2 font-mono text-sm tracking-wide text-ink-muted uppercase">
              <span className="cue-lines">
                <span>Scroll to explore</span>
                <span>Scroll to explore</span>
              </span>
            </span>
            <span className="cross hidden md:block" />
            <span className="cross" />
          </div>
        </div>
      </section>

      <div className="relative">
        {/* Lusion's ribbon: one line that draws itself as you scroll down. */}
        <svg
          aria-hidden
          className="ribbon pointer-events-none absolute inset-0 h-full w-full text-accent opacity-35"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M104 20 C 60 90, -6 150, 22 270 S 104 420, 74 520 S -6 690, 30 800 S 98 930, 60 1000"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative">
          <Container className="grid gap-10 py-24 md:grid-cols-12 md:py-36">
            {/* Words on the left, Brandon on the right: the title, a short
                intro, four quick facts and a link fill the left column, so
                the portrait never floats in empty space. */}
            <div className="md:col-span-7">
              <RevealText
                as="h2"
                lines={site.approach.title}
                className="text-[clamp(3rem,7vw,6.5rem)] leading-[1] font-medium tracking-tight"
              />
              <RevealText as="p" mode="fade-words" text={site.approach.line} className="mt-10 max-w-xl text-lg" />
              <dl className="mt-10 grid max-w-xl grid-cols-2 border-t border-rule">
                {site.approach.facts.map((fact, i) => (
                  <div
                    key={fact.label}
                    className="border-b border-rule py-4 odd:pr-4 even:border-l even:pl-4"
                    data-reveal="rise"
                    style={{ "--i": i } as CSSProperties}
                  >
                    <dt className="font-mono text-sm tracking-wide text-ink-muted uppercase">{fact.label}</dt>
                    <dd className="mt-1">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <ButtonLink href={site.approach.cta.href} variant="secondary">
                  {site.approach.cta.label}
                </ButtonLink>
              </div>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-4">
              <div className="group max-w-sm overflow-hidden rounded-media ring-1 ring-rule md:max-w-none" data-reveal="scale">
                <Image
                  src={site.headshot.src}
                  alt={site.headshot.alt}
                  width={800}
                  height={1000}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-(--duration-reveal) ease-out-soft pointer-fine:group-hover:scale-[1.04]"
                />
              </div>
            </div>
            <div className="hero-split grid border-t border-rule md:col-span-12 md:grid-cols-2">
              <div className="hero-half border-b border-rule py-8 md:border-r md:border-b-0 md:pr-12" data-reveal="rise">
                <h3 className="hero-title w-fit font-serif-italic text-3xl italic">{site.finance.title}</h3>
                <p className="mt-4 max-w-sm text-ink-muted">{site.finance.line}</p>
              </div>
              <div className="hero-half py-8 md:pl-12" data-reveal="rise" style={{ "--i": 1 } as CSSProperties}>
                <h3 className="hero-title w-fit font-sans text-3xl font-medium tracking-tight">{site.data.title}</h3>
                <p className="mt-4 max-w-sm text-ink-muted">{site.data.line}</p>
              </div>
            </div>
          </Container>

          {showcase?.image && (
            <Container className="pb-12">
              <div className="flex items-center justify-between" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="cross" />
                ))}
              </div>
              <Link
                href={`/projects/${showcase.slug}`}
                className="group roll-host relative my-6 block"
                aria-label={`${showcase.title}: ${showcase.oneLiner}`}
              >
                <div className="showcase-media relative aspect-[16/9] overflow-hidden rounded-media bg-surface ring-1 ring-rule">
                  <Image
                    src={showcase.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1152px) 1072px, 100vw"
                    className="object-cover object-top transition-transform duration-(--duration-reveal) ease-out-soft pointer-fine:group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-canvas/85 via-canvas/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-10">
                    <span className="text-[clamp(2.5rem,7vw,6rem)] leading-none font-medium tracking-tight">
                      <LetterRoll>{showcase.title}</LetterRoll>
                    </span>
                    <span className="pill pill-primary">
                      <span className="pill-dot" aria-hidden />
                      <span className="pill-text">View project</span>
                    </span>
                  </div>
                </div>
              </Link>
              <div className="flex items-center justify-between" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="cross" />
                ))}
              </div>
              <p className="mt-6 max-w-prose text-ink-muted">
                <span className="font-mono text-sm tracking-wide text-ink uppercase">Featured project</span>
                <span className="mx-3 text-rule" aria-hidden>/</span>
                {showcase.oneLiner}
              </p>
            </Container>
          )}

          <Section title="Now" href="/now" linkLabel="More on what I'm doing">
            <ul className="grid gap-4 md:grid-cols-3">
              {now.map((item, i) => (
                <NowCard key={item.title} item={item} index={i} />
              ))}
            </ul>
          </Section>

          <Section title="Projects" href="/projects" linkLabel="All projects">
            <ul className="-mt-8">
              {featured.map((p, i) => (
                <ProjectRow key={p.slug} project={p} index={i} />
              ))}
            </ul>
          </Section>

          <Section title="Experience" href="/experience" linkLabel="Full experience">
            <ul>
              {roles.slice(0, 2).map((r) => (
                <RoleItem key={`${r.company}-${r.team}`} role={r} />
              ))}
            </ul>
          </Section>

          <Container className="pb-24">
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/contact">Get in touch</ButtonLink>
              <ButtonLink href={site.resume.href} variant="secondary">
                {site.resume.label}
              </ButtonLink>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
