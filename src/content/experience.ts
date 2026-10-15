import type { Role } from "./types";

// D9 (revised Oct 15): match the public resume and LinkedIn. Nothing beyond
// what the resume already says. Source: Brandon_Le_Resume.pdf.

export const roles: Role[] = [
  {
    company: "SAP",
    team: "Americas Revenue Operations",
    title: "Americas Revenue Operations Intern",
    location: "Newtown Square, PA",
    start: "Aug 2026",
    end: "Present",
    summary: "Business analysis and reporting for Global Revenue Operations leadership.",
    highlights: [
      "Built executive-facing analyses from large-scale sales data in Excel and Power BI, informing decisions for 10+ North America sales leaders.",
      "Standardized sales and post-sales reporting across 5+ regions, cutting distribution turnaround by 20% for 50+ stakeholders.",
      "Ran strategy-to-execution planning for a North America sales enablement initiative and surfaced 2 process improvements adopted team-wide.",
    ],
    skills: ["Excel", "Power BI"],
  },
  {
    company: "JPMorgan Chase",
    team: "Global Finance & Business Management",
    title: "Global Finance & Business Management Intern",
    location: "Newark, DE",
    start: "May 2026",
    end: "Jul 2026",
    summary: "Financial control for Treasury and the Chief Investment Office.",
    highlights: [
      "Substantiated balance sheets and reconciled GL accounts across 15+ legal entities with $2B+ in exposure, resolving 95% of breaks before reporting deadlines.",
      "Built an Alteryx and Tableau workflow that automated a recurring TCIO report, saving 8 hours a week and surfacing 200+ aging items for senior controllers.",
      "Led a deep dive on $500M+ of TCIO activity across 3 front-office systems, delivering 5+ process recommendations to Finance leadership.",
    ],
    skills: ["Alteryx", "Tableau", "Reconciliation"],
  },
  {
    company: "SAP",
    team: "Customer Engagement Advisory",
    title: "Product Analyst Intern",
    location: "Newtown Square, PA",
    start: "Jul 2025",
    end: "May 2026",
    summary: "Product support and usage analysis for SAP's enterprise customers.",
    highlights: [
      "Led intake of 20 to 40 client tickets a day across SAP's business product suite, working with global cloud teams on fixes that support ERP adoption.",
      "Analyzed product usage for enterprise accounts including Nike and Coca-Cola, closing adoption gaps and improving retention by 5%.",
      "Tracked client health KPIs across 200+ cloud subscriptions with 5+ global teams to standardize how clients get support.",
    ],
    skills: ["Product analysis", "Client health KPIs"],
  },
];

// Experience page, "By the numbers" (D19): figures straight from the
// highlights above, nothing new. They count up as they scroll in.
export const experienceStats = [
  { value: "$2B+", label: "in exposure reconciled across 15+ legal entities at JPMorgan Chase" },
  { value: "95%", label: "of breaks resolved before reporting deadlines" },
  { value: "8 hrs", label: "saved each week by one Alteryx and Tableau workflow" },
  { value: "20%", label: "faster report distribution for 50+ stakeholders at SAP" },
];

