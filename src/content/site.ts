import type { Link } from "./types";

// Placeholder values are marked TODO and get replaced in Phase 2.

export const site = {
  name: "Brandon Le",
  description:
    "Finance and MIS at Villanova. Work, projects, and what I'm building now.",
  finance: {
    title: "Finance",
    line: "Financial control at JPMorgan Chase. Reading what the numbers say.",
  },
  data: {
    title: "Data & technology",
    line: "Revenue operations at SAP. Building the systems that produce them.",
  },
  email: "ble02@villanova.edu",
  resumeHref: "/resume.pdf", // TODO: add the PDF to /public
  toolkit: ["SQL", "Python", "Excel", "Power BI", "Tableau", "Alteryx", "Databricks", "SAP S/4HANA", "Salesforce", "Figma", "PowerPoint", "Claude"],
};

export const nav: Link[] = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/contact" },
];

export const socials: Link[] = [
  { label: "GitHub", href: "https://github.com/BeeeLayyy" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/brandonle-vu/" },
];
