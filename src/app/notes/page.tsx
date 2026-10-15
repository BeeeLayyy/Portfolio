import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Container, PageHeader } from "@/components/ui";
import { formatNoteDate, publishedNotes } from "@/content/notes";
import { pageDescriptions } from "@/content/site";

export const metadata: Metadata = {
  title: "Notes",
  description: pageDescriptions.notes,
  alternates: { types: { "application/rss+xml": "/notes/feed.xml" } },
};

// Notes (D20): Brandon's thoughts and ideas, newest first. Each row shows
// the date, title and summary; the arrow slides in on hover.
export default function NotesPage() {
  return (
    <>
      <PageHeader eyebrow="Notes" title="Thoughts and ideas" intro={pageDescriptions.notes} />
      <Container className="pb-24">
        {publishedNotes.length === 0 ? (
          <p className="border-t border-rule pt-10 text-lg text-ink-muted">The first note is on its way.</p>
        ) : (
          <ol className="border-t border-rule">
            {publishedNotes.map((n, i) => (
              <li key={n.slug} data-reveal="rise" style={{ "--i": i } as CSSProperties}>
                <Link
                  href={`/notes/${n.slug}`}
                  className="group grid gap-3 border-b border-rule py-8 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-10"
                >
                  <time dateTime={n.date} className="font-mono text-sm text-ink-muted">
                    {formatNoteDate(n.date)}
                  </time>
                  <span>
                    <span className="block font-serif text-2xl transition-colors duration-(--duration-quick) group-hover:text-accent">
                      {n.title}
                    </span>
                    <span className="mt-2 block text-ink-muted">{n.summary}</span>
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden
                    className="hidden size-5 text-accent transition-transform duration-(--duration-base) ease-out-soft md:block pointer-fine:-translate-x-2 pointer-fine:group-hover:translate-x-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 8h12M9 3l5 5-5 5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-10 text-sm text-ink-muted">
          Follow along with the{" "}
          <a href="/notes/feed.xml" className="underline-draw inline-block py-1 text-ink">
            RSS feed
          </a>
          .
        </p>
      </Container>
    </>
  );
}
