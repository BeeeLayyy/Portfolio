import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { formatNoteDate, getNote, notes } from "@/content/notes";

// Like project pages, this awaits its slug so unknown slugs return a real
// 404 (streaming behind Suspense would turn them into 200s).
export const instant = false;

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    // Drafts open by link for review but stay out of search results.
    robots: note.draft ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", publishedTime: note.date },
  };
}

// One note (D20): date and title, then the post in a comfortable reading
// width, styled by src/mdx-components.tsx.
export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const { default: Post } = await import(`@/content/notes/${slug}.mdx`);
  const titleWords = note.title.split(" ");

  return (
    <article>
      <Container className="pt-10 pb-24 md:pt-16">
        <Link href="/notes" className="underline-draw inline-block py-1 text-sm text-ink-muted hover:text-accent">
          All notes
        </Link>
        <div className="mx-auto max-w-2xl">
          <p className="mt-10 font-mono text-sm tracking-wide text-ink-muted uppercase">
            <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
            {note.draft && <span className="ml-3 rounded-tag bg-surface px-2 py-1 text-accent">Draft</span>}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight">
            {titleWords.map((word, i) => (
              <span key={i}>
                <span className="title-word" style={{ "--i": i } as CSSProperties}>
                  {word}
                </span>
                {i < titleWords.length - 1 && " "}
              </span>
            ))}
          </h1>
          <p className="mt-6 text-xl text-ink-muted">{note.summary}</p>
          <div className="mt-10 border-t border-rule pt-4 text-lg leading-relaxed">
            <Post />
          </div>
        </div>
      </Container>
    </article>
  );
}
