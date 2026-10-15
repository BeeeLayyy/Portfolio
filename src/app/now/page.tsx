import type { Metadata } from "next";
import { pageDescriptions } from "@/content/site";
import { NowCard } from "@/components/content-blocks";
import { Container, PageHeader } from "@/components/ui";
import { now, nowUpdated } from "@/content/now";

export const metadata: Metadata = { title: "Now", description: pageDescriptions.now };

export default function NowPage() {
  return (
    <>
      <PageHeader title="Now" intro={`What I'm focused on this season. Updated ${nowUpdated}.`} />
      <Container className="pb-24">
        <ul className="grid gap-4 md:grid-cols-2">
          {now.map((item) => (
            <NowCard key={item.title} item={item} headingLevel={2} />
          ))}
        </ul>
      </Container>
    </>
  );
}
