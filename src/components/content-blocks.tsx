import Link from "next/link";
import type { NowItem, Project, Role } from "@/content/types";
import { Tag } from "./ui";

// One row in the projects list. Phase 3 adds the image that follows the
// cursor on hover (from the inspiration notes).
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="border-b border-rule">
      <Link
        href={`/projects/${project.slug}`}
        className="group grid gap-2 py-6 md:grid-cols-[1fr_2fr_auto] md:items-baseline md:gap-8"
      >
        <span className="font-serif text-xl transition-colors duration-(--duration-quick) group-hover:text-lamp">
          {project.title}
        </span>
        <span className="text-paper-muted">{project.oneLiner}</span>
        <span className="text-sm text-paper-muted">{project.year}</span>
      </Link>
    </li>
  );
}

export function RoleItem({ role }: { role: Role }) {
  return (
    <li className="grid gap-3 border-b border-rule py-8 md:grid-cols-[12rem_1fr] md:gap-8">
      <p className="text-sm text-paper-muted">
        {role.start} to {role.end}
      </p>
      <div>
        <h3 className="text-lg font-medium">
          {role.title}, {role.company}
        </h3>
        <p className="text-paper-muted">{role.team}</p>
        <p className="mt-3 max-w-prose">{role.summary}</p>
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

export function NowCard({ item }: { item: NowItem }) {
  return (
    <li className="rounded-media bg-ledger-raised p-6">
      <h3 className="text-lg font-medium">{item.title}</h3>
      <p className="mt-2 text-paper-muted">{item.detail}</p>
    </li>
  );
}
