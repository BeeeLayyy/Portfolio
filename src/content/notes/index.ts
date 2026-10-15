import type { Note } from "../types";

// The notes (blog, D20). To publish a post:
// 1. Write it as src/content/notes/<slug>.mdx (plain Markdown is fine).
// 2. Add an entry below with the same slug. Leave draft: true to read it by
//    its link first; delete that line to publish.
// Until one is published, the Notes page says the first note is on its way.
export const notes: Note[] = [
  {
    slug: "how-i-built-this-site",
    title: "How I built this site",
    date: "2026-10-15",
    summary: "A portfolio built like a product: a design system, a 3D hero of the things I work with, and a decision log for every choice.",
    draft: true,
  },
];

// Newest first, drafts left out.
export const publishedNotes = notes
  .filter((n) => !n.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}

// "Oct 15, 2026" from "2026-10-15", without time-zone surprises.
export function formatNoteDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
