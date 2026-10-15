import type { Metadata } from "next";
import { PageHeader, Section, Tag } from "@/components/ui";
import { goals } from "@/content/now";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        intro="Senior at Villanova studying Finance and MIS. Placeholder bio, written in Phase 2."
      />
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
