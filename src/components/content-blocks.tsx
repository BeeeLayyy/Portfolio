import { projectImageTransition } from "@/content/projects";
import { ProjectRowLink } from "./project-row-link";
import type { NowItem, Project, Role } from "@/content/types";
import { Tag } from "./ui";

// One row in the projects list. Phase 3 adds the image that follows the
// cursor on hover (from the inspiration notes).
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="border-b border-rule">
      <ProjectRowLink
        href={`/projects/${project.slug}`}
        image={project.image}
        transitionName={projectImageTransition(project.slug)}
        className="group grid gap-2 py-6 md:grid-cols-[1fr_2fr_auto] md:items-baseline md:gap-8"
      >
        <span className="font-serif text-xl transition-colors duration-(--duration-quick) group-hover:text-accent">
          {project.title}
        </span>
        <span className="text-ink-muted">{project.oneLiner}</span>
        <span className="font-mono text-sm text-ink-muted">{project.year}</span>
      </ProjectRowLink>
    </li>
  );
}

// On Home these sit under a section heading (h2), so they're h3. On their own
// page they sit right under the page title, so pass headingLevel={2}.
export function RoleItem({
  role,
  detailed = false,
  headingLevel = 3,
}: {
  role: Role;
  detailed?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <li className="grid gap-3 border-b border-rule py-8 md:grid-cols-[12rem_1fr] md:gap-8">
      <p className="font-mono text-sm text-ink-muted">
        {role.start} to {role.end}
      </p>
      <div>
        <Heading className="text-lg font-medium">
          {role.title}, {role.company}
        </Heading>
        <p className="text-ink-muted">
          {role.team === role.title.replace(/ Intern$/, "") ? role.location : `${role.team}, ${role.location}`}
        </p>
        {detailed ? (
          <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 marker:text-ink-muted">
            {role.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 max-w-prose">{role.summary}</p>
        )}
        {role.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {role.skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export function NowCard({ item, headingLevel = 3 }: { item: NowItem; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <li className="rounded-media bg-surface p-6">
      <Heading className="text-lg font-medium">{item.title}</Heading>
      <p className="mt-2 text-ink-muted">{item.detail}</p>
    </li>
  );
}
