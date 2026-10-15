import type { Metadata } from "next";
import { ByTheNumbers } from "@/components/content-blocks";
import { RevealText } from "@/components/motion/reveal-text";
import { Container, PageHeader, Tag } from "@/components/ui";
import { roles } from "@/content/experience";
import { pageDescriptions } from "@/content/site";

export const metadata: Metadata = { title: "Experience", description: pageDescriptions.experience };

// Experience (D19): the numbers first, counting up like a ticker, then a
// timeline whose line draws itself as you scroll. Each role is a card; its
// dates and company stay pinned on the left on desktop while you read.
export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Finance and data, in practice"
        intro="Finance roles, data roles, and the places they overlap."
      />

      <Container>
        <div className="border-t border-rule pt-10">
          <ByTheNumbers />
        </div>
      </Container>

      <Container className="py-24">
        <ol className="timeline relative">
          <span aria-hidden className="timeline-line absolute top-2 bottom-2 left-[0.3125rem] w-px bg-accent md:left-[calc(14rem+0.3125rem)]" />
          {roles.map((r) => (
            <li key={`${r.company}-${r.team}`} className="relative grid gap-4 pb-16 pl-8 last:pb-0 md:grid-cols-[14rem_1fr] md:gap-10 md:pl-0">
              <span
                aria-hidden
                className="absolute top-2 left-0 size-2.5 rounded-full bg-canvas ring-2 ring-accent md:left-56"
              />
              <div className="md:sticky md:top-[calc(var(--spacing-header)+2rem)] md:self-start md:pr-8">
                <p className="font-mono text-sm text-ink-muted">
                  {r.start} to {r.end}
                </p>
                <p className="mt-2 font-serif text-2xl">{r.company}</p>
              </div>
              <div className="rounded-media bg-surface p-6 ring-1 ring-rule md:ml-10 md:p-8" data-reveal="rise">
                <RevealText as="h2" text={r.title} className="text-xl font-medium" />
                <p className="mt-1 text-ink-muted">
                  {r.team === r.title.replace(/ Intern$/, "") ? r.location : `${r.team}, ${r.location}`}
                </p>
                <ul className="mt-6 space-y-3">
                  {r.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[1rem_1fr] gap-2">
                      <span aria-hidden className="mt-2.5 h-px w-2.5 bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {r.skills.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {r.skills.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
