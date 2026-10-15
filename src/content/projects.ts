import type { Project } from "./types";

// Placeholder write-ups. Which projects lead, and how each is framed, is
// decision D10 in the build plan (due by Phase 2).

const placeholder = "Placeholder. Real write-up comes in Phase 2.";

export const projects: Project[] = [
  {
    slug: "courtside",
    title: "Courtside",
    oneLiner: "NBA scouting and analytics web app.",
    role: "Designer and developer",
    year: "2026",
    stack: ["Next.js"],
    problem: placeholder,
    built: placeholder,
    outcome: placeholder,
    links: [],
    featured: true,
  },
  {
    slug: "pulse",
    title: "Pulse",
    oneLiner: "Stock market dashboard.",
    role: "Designer and developer",
    year: "2026",
    stack: [],
    problem: placeholder,
    built: placeholder,
    outcome: placeholder,
    links: [],
    featured: true,
  },
  {
    slug: "task-board",
    title: "Task Board",
    oneLiner: "Personal task dashboard desktop app.",
    role: "Designer and developer",
    year: "2026",
    stack: [],
    problem: placeholder,
    built: placeholder,
    outcome: placeholder,
    links: [],
    featured: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
