import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CopyEmail } from "@/components/copy-email";
import { PageHeader, Container } from "@/components/ui";
import { site, socials, pageDescriptions } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: pageDescriptions.contact };

// Contact (D19), Lusion's closing style: the email in huge type with a copy
// button, then each profile as a big row whose arrow slides in on hover.
export default function ContactPage() {
  const links = [...socials, { label: site.resume.label, href: site.resume.href }];
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        intro="Recruiting for finance, product or data roles? I'd like to hear from you."
      />
      <Container className="pb-24">
        <CopyEmail email={site.email} />
        <ul className="mt-20 border-t border-rule">
          {links.map((l, i) => (
            <li key={l.href} data-reveal="rise" style={{ "--i": i } as CSSProperties}>
              <a
                href={l.href}
                className="group flex items-center justify-between gap-6 border-b border-rule py-6 text-[clamp(1.5rem,3vw,2.25rem)] transition-colors duration-(--duration-quick) hover:text-accent"
              >
                {l.label}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="size-6 flex-none transition-transform duration-(--duration-base) ease-out-soft pointer-fine:-translate-x-2 pointer-fine:group-hover:translate-x-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 12 12 4M5 4h7v7" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
