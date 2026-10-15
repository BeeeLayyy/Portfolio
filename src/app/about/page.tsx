import type { Metadata } from "next";
import { Container, PageHeader, Section, Tag } from "@/components/ui";
import { goals } from "@/content/now";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" intro={site.bio[0]} />
      <Container>
        <div className="max-w-prose space-y-6 text-lg text-paper-muted">
          {site.bio.slice(1).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
      <Section title="Goals">
        <ul className="grid gap-8 md:grid-cols-2">
          {goals.map((g, i) => (
            <li key={`${g.title}-${i}`}>
              <h3 className="text-lg font-medium">{g.title}</h3>
              <p className="mt-2 text-paper-muted">{g.detail}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Toolkit">
        <div className="flex flex-wrap gap-2">
          {site.toolkit.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </>
  );
}
