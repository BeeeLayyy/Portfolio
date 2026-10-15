import type { Metadata } from "next";
import { ButtonLink, Container, PageHeader } from "@/components/ui";
import { site, socials, pageDescriptions } from "@/content/site";

export const metadata: Metadata = { title: "Contact", description: pageDescriptions.contact };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        intro="Recruiting for finance, product or data roles? I'd like to hear from you."
      />
      <Container className="pb-24">
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={`mailto:${site.email}`}>Email me</ButtonLink>
          <ButtonLink href={site.resume.href} variant="secondary">
            {site.resume.label}
          </ButtonLink>
        </div>
        <ul className="mt-12 space-y-2">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="inline-block py-1 underline decoration-rule underline-offset-4 hover:decoration-lamp">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
