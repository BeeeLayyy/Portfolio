import { publishedNotes } from "@/content/notes";
import { site } from "@/content/site";

// RSS feed of published notes (D20), so readers can follow along in a feed
// reader. Built at build time like the rest of the site.
export function GET() {
  const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const items = publishedNotes
    .map(
      (n) => `    <item>
      <title>${escape(n.title)}</title>
      <link>${site.url}/notes/${n.slug}</link>
      <guid>${site.url}/notes/${n.slug}</guid>
      <pubDate>${new Date(`${n.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(n.summary)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(site.name)}: Notes</title>
    <link>${site.url}/notes</link>
    <description>Thoughts and ideas from ${escape(site.name)}.</description>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
