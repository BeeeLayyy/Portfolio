import type { Goal, NowItem } from "./types";

// Written Oct 15 with design:ux-copy. Facts come from the public resume (D9).
// Update the Courtside item after the Oct 28 public launch.

export const nowUpdated = "October 2026";

export const now: NowItem[] = [
  { title: "Senior year at Villanova", detail: "Last year of Finance and MIS." },
  {
    title: "Revenue operations at SAP",
    detail: "Building executive reporting in Excel and Power BI for North America sales leadership.",
  },
  {
    title: "Launching Courtside",
    detail: "Opening night on October 20 is the first real test of live win chances. Public launch is October 28.",
  },
];

export const goals: Goal[] = [
  {
    title: "A full-time role where finance meets data",
    detail: "Starting after I graduate in May 2027, in finance, product or data.",
  },
  {
    title: "Grow Courtside past launch",
    detail: "Turn launch-week visitors into fans who come back every week, and let that number decide what I build next.",
  },
  {
    title: "Automate the reports people rebuild by hand",
    detail: "One Alteryx workflow at JPMorgan saved 8 hours a week. I want to find more of those.",
  },
];
