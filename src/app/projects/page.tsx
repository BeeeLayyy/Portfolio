import type { Metadata } from "next";
import { ProjectRow } from "@/components/content-blocks";
import { Container, PageHeader } from "@/components/ui";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        intro="Things I've built on my own time, mostly where finance and data meet."
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
