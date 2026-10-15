import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHeader, Section, Tag } from "@/components/ui";
import { goals } from "@/content/now";
import { site, pageDescriptions } from "@/content/site";

export const metadata: Metadata = { title: "About", description: pageDescriptions.about };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" intro={site.bio[0]} />
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          <div className="order-2 max-w-prose space-y-6 text-lg text-ink-muted md:order-1">
            {site.bio.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Image
            src={site.headshot.src}
            alt={site.headshot.alt}
            width={800}
            height={1000}
            sizes="(min-width: 768px) 16rem, 12rem"
            className="order-1 w-48 rounded-media md:order-2 md:w-64"
          />
        </div>
      </Container>
      <Section title="Goals">
        <ul className="grid gap-8 md:grid-cols-2">
          {goals.map((g, i) => (
            <li key={`${g.title}-${i}`}>
              <h3 className="text-lg font-medium">{g.title}</h3>
              <p className="mt-2 text-ink-muted">{g.detail}</p>
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
