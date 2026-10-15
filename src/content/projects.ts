import type { Project } from "./types";

// D10 (Oct 15): Courtside is the one featured project.
// TODO after the Oct 28 public launch: swap the link to the real domain and
// add real numbers (weekly returning visitors) to `outcome`.

export const projects: Project[] = [
  {
    slug: "courtside",
    title: "Courtside",
    oneLiner:
      "An NBA analytics site that turns official stats into scouting reports, shot charts and live win chances.",
    role: "Product, design and build",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    problem:
      "Good NBA analysis is scattered across box scores, paywalled sites and spreadsheets. I wanted one place where a fan could look up any player or team and understand what the numbers actually say, the way a scout would.",
    built:
      "A site built on real stats.nba.com data: player pages with shot charts, recent form and players with similar profiles, team scouting reports, rankings, lineup and on/off splits, projections and playoff odds, plus live scores with win chances during games. I ran it like a product launch, with an audit of the live site and code, an eight-milestone plan, and a readiness tracker covering the 17 areas a professional team checks before going public. I build it with Claude Code, using teams of agents working in parallel branches.",
    outcome:
      "Courtside launches with the NBA season. Opening night on October 20 is the first real test of the live features, and the public launch follows on October 28. Analytics are privacy-first, with no cookies and no IP addresses, and the number I track is fans who come back each week.",
    links: [{ label: "Visit Courtside", href: "https://courtside-ecru.vercel.app" }],
    // Taken Oct 15, before opening night. Retake after the Oct 28 launch.
    image: {
      src: "/images/courtside.webp",
      alt: "Courtside home page previewing opening night: Thunder at Spurs with each team's win chance and projected top scorers.",
    },
    featured: true,
  },
];

// The view-transition name a project's screenshot carries on every page, so
// the browser can morph it from the Projects row into the project page.
export function projectImageTransition(slug: string) {
  return `project-image-${slug}`;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
