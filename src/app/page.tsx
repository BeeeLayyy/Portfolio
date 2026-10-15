import { NowCard, ProjectRow, RoleItem } from "@/components/content-blocks";
import { ButtonLink, Container, Section } from "@/components/ui";
import { roles } from "@/content/experience";
import { now } from "@/content/now";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* Split hero: finance in serif on the left, data in sans on the right.
          Phase 3 animates the name and lets the divide follow the cursor. */}
      <section aria-labelledby="hero-name" className="relative border-b border-rule">
        <h1
          id="hero-name"
          className="overflow-hidden whitespace-nowrap px-6 pt-16 pb-8 text-center font-serif text-display md:pt-24 md:pb-4"
        >
          {site.name}
        </h1>
        <div className="grid md:grid-cols-2">
          <div className="border-b border-rule p-6 md:border-r md:border-b-0 md:p-16">
            <h2 className="font-serif text-3xl italic">{site.finance.title}</h2>
            <p className="mt-4 max-w-sm text-paper-muted">{site.finance.line}</p>
          </div>
          <div className="p-6 md:p-16">
            <h2 className="font-sans text-3xl font-medium tracking-tight">{site.data.title}</h2>
            <p className="mt-4 max-w-sm text-paper-muted">{site.data.line}</p>
          </div>
        </div>
      </section>

      <Section title="Now" href="/now" linkLabel="More on what I'm doing">
        <ul className="grid gap-4 md:grid-cols-3">
          {now.map((item) => (
            <NowCard key={item.title} item={item} />
          ))}
        </ul>
      </Section>

      <Section title="Projects" href="/projects" linkLabel="All projects">
        <ul className="-mt-8">
          {featured.map((p) => (
            <ProjectRow key={p.slug} project={p} />
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
          <ButtonLink href={site.resumeHref} variant="secondary">
            Download resume
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
