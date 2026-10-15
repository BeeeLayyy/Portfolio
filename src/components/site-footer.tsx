import { site, socials } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-paper-muted md:px-10">
        <p>{site.name}</p>
        <ul className="flex gap-6">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="hover:text-paper">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-paper">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
