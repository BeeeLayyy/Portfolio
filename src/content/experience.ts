import type { Role } from "./types";

// D9 (Oct 15): name the team and the kind of work only. No project names,
// numbers, clients or data from any employer.
// TODO: dates for each role, and which tools were used where.

export const roles: Role[] = [
  {
    company: "SAP",
    team: "Americas Revenue Operations",
    title: "iXp Intern",
    start: "TODO",
    end: "Present",
    summary:
      "Data analysis and reporting for revenue operations across SAP's Americas business.",
    skills: ["Data analysis", "Reporting"],
  },
  {
    company: "JPMorgan Chase",
    team: "TCIO Financial Control, Global Finance & Business Management",
    title: "Intern",
    start: "TODO",
    end: "TODO",
    summary:
      "Financial control for the Treasury and Chief Investment Office, inside Global Finance & Business Management.",
    skills: ["Financial control"],
  },
  {
    company: "SAP",
    team: "Customer Engagement Advisory",
    title: "Intern",
    start: "TODO",
    end: "TODO",
    summary: "Advisory work with SAP's customer engagement team.",
    skills: [],
  },
  {
    company: "Colton Alexander",
    team: "Consulting",
    title: "Intern",
    start: "TODO",
    end: "TODO",
    summary: "Consulting work at a boutique firm.",
    skills: [],
  },
];
