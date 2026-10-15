import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { RevealText } from "@/components/motion/reveal-text";
import { Container, PageHeader } from "@/components/ui";
import { now, nowUpdated } from "@/content/now";
import { pageDescriptions } from "@/content/site";

export const metadata: Metadata = { title: "Now", description: pageDescriptions.now };

// Now (D19): a numbered list in big type, like a ledger of what's on the
// desk this season. Each row rises in as it scrolls into view.
export default function NowPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Updated ${nowUpdated}`}
        title="Now"
        intro="What I'm focused on this season."
      />
      <Container className="pb-24">
        <ol className="border-t border-rule">
          {now.map((item, i) => (
            <li
              key={item.title}
              className="grid gap-3 border-b border-rule py-10 md:grid-cols-[6rem_1fr_1fr] md:items-baseline md:gap-10"
              data-reveal="rise"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <RevealText as="h2" text={item.title} className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight" />
              <p className="text-lg text-ink-muted">{item.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
