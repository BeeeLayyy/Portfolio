import type { Link } from "./types";

export const site = {
  name: "Brandon Le",
  url: "https://brandonle.site", // D7. Share links and the share image use it.
  description:
    "Finance and MIS at Villanova. Work, projects, and what I'm building now.",
  // Home hero title (D18, shortened Oct 15).
  heroLine: "Brandon Le's portfolio",
  // The section after the hero: a two-line title, a short paragraph, a link.
  approach: {
    title: ["Finance,", "built on data"],
    line: "I study Finance and MIS at Villanova and graduate in May 2027. I like the work between the numbers and the systems that produce them.",
    cta: { label: "About me", href: "/about" },
    // Quick facts beside the portrait, ledger style.
    facts: [
      { label: "Now", value: "Revenue operations, SAP" },
      { label: "Before", value: "Global Finance, JPMorgan Chase" },
      { label: "Building", value: "Courtside, NBA analytics" },
      { label: "Graduating", value: "May 2027, Villanova" },
    ],
  },
  // Closing section on every page but Contact.
  end: {
    eyebrow: "Open to finance, product and data roles",
    title: ["Let's work", "together"],
  },
  finance: {
    title: "Finance",
    line: "Reconciled balance sheets for Treasury at JPMorgan Chase. Learned to read what the numbers say.",
  },
  data: {
    title: "Data & technology",
    line: "Revenue operations at SAP. Building the systems that produce them.",
  },
  // About page bio. The first paragraph is the page intro.
  bio: [
    "I'm a senior at Villanova studying Finance and MIS. I like the work between the numbers and the systems that produce them.",
    "This summer I was on JPMorgan Chase's Global Finance & Business Management team, reconciling balance sheets for Treasury and the Chief Investment Office. Now I'm in revenue operations at SAP, building the reporting North America sales leaders use to make decisions. Before that I spent ten months as a product analyst at SAP, working with enterprise customers like Nike and Coca-Cola.",
    "Outside of work I'm building Courtside, an NBA analytics site that turns official stats into scouting reports.",
  ],
  headshot: {
    src: "/images/brandon-le.webp",
    alt: "Brandon Le in a navy suit, white shirt and striped tie",
  },
  // Footer, under the name.
  affiliation: ["Finance and MIS, Villanova University", "Class of 2027"],
  email: "ble02@villanova.edu",
  // The public copy has the phone number removed (D12, revised Oct 15). When the
  // resume changes, export a new PDF without the phone line and replace this file.
  resume: { label: "Resume (PDF)", href: "/Brandon_Le_Resume.pdf" },
  // About page toolkit, grouped by what each tool is for (D19).
  toolkit: [
    { group: "Analysis", tools: ["SQL", "Python", "Excel", "Alteryx", "Databricks"] },
    { group: "Reporting", tools: ["Power BI", "Tableau", "PowerPoint"] },
    { group: "Enterprise systems", tools: ["SAP S/4HANA", "Salesforce"] },
    { group: "Design and building", tools: ["Figma", "Claude"] },
  ],
};

// One line per page for search results and link previews.
export const pageDescriptions = {
  about: "Brandon Le, a Finance and MIS senior at Villanova: background, goals and toolkit.",
  experience: "Internships at JPMorgan Chase and SAP, across finance and revenue operations.",
  projects: "Courtside, an NBA analytics site Brandon planned, designed and built.",
  now: "What Brandon is focused on this season.",
  contact: "Email or LinkedIn. Open to finance, product and data roles.",
  notes: "Thoughts and ideas on finance, data, basketball and building things.",
};

export const nav: Link[] = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
  { label: "Notes", href: "/notes" }, // D20: in the menu from the start (Brandon, Oct 15)
  { label: "Contact", href: "/contact" },
];

export const socials: Link[] = [
  { label: "GitHub", href: "https://github.com/BeeeLayyy" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/brandonle-vu/" },
];
