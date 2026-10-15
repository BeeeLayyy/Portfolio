import { site, socials } from "@/content/site";
import { BackToTop } from "./back-to-top";

// Lusion-style footer: who and where on the left, links that underline from
// the left on hover, and a back-to-top button whose arrow rolls up.
export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 text-sm md:grid-cols-3 md:px-10">
        <div className="text-ink-muted">
          <p className="text-ink">{site.name}</p>
          {site.affiliation.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <ul className="space-y-1">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="underline-draw inline-block py-1">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <p className="font-mono text-ink-muted uppercase">Email</p>
          <a href={`mailto:${site.email}`} className="underline-draw mt-1 inline-block py-1">
            {site.email}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-t border-rule px-6 py-5 font-mono text-sm text-ink-muted md:px-10">
        <p>&copy; {site.name}</p>
        <BackToTop />
      </div>
    </footer>
  );
}
