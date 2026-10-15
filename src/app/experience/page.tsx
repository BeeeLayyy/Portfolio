import type { Metadata } from "next";
import { pageDescriptions } from "@/content/site";
import { RoleItem } from "@/components/content-blocks";
import { Container, PageHeader } from "@/components/ui";
import { roles } from "@/content/experience";

export const metadata: Metadata = { title: "Experience", description: pageDescriptions.experience };

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        title="Experience"
        intro="Finance roles, data roles, and the places they overlap."
      />
      <Container className="pb-24">
        <ul className="border-t border-rule">
          {roles.map((r) => (
            <RoleItem key={`${r.company}-${r.team}`} role={r} detailed headingLevel={2} />
          ))}
        </ul>
      </Container>
    </>
  );
}
