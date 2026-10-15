import type { Metadata } from "next";
import { pageDescriptions } from "@/content/site";
import { ProjectRow } from "@/components/content-blocks";
import { Container, PageHeader } from "@/components/ui";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects", description: pageDescriptions.projects };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        intro="What I build on my own time, planned and shipped like a real product."
      />
      <Container className="pb-24">
        <ul className="border-t border-rule">
          {projects.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </ul>
      </Container>
    </>
  );
}
