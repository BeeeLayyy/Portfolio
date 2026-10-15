// The content model: the shape of every piece of content on the site.
// Pages and components only read these types; the words live in the
// sibling files, so editing copy never means touching layout code.

export type Link = {
  label: string;
  href: string;
};

export type Project = {
  slug: string; // used in the URL: /projects/<slug>
  title: string;
  oneLiner: string; // shown in lists
  role: string; // what Brandon did
  year: string;
  stack: string[];
  problem: string;
  built: string;
  outcome: string;
  links: Link[];
  image?: Image; // lead screenshot on the project page, 16:9
  featured: boolean; // shown on the home page
};

export type Image = {
  src: string; // path under /public
  alt: string;
};

export type Role = {
  company: string;
  team: string;
  title: string;
  location: string;
  start: string;
  end: string; // "Present" for current roles
  summary: string; // one line, shown on the home page
  highlights: string[]; // shown on the Experience page
  skills: string[];
};

export type NowItem = {
  title: string;
  detail: string;
};

export type Goal = {
  title: string;
  detail: string;
};

// A note (blog post, D20). The words live in src/content/notes/<slug>.mdx;
// this is the listing info. Drafts never appear in lists, the nav or search
// results, but open by direct link so they can be read before publishing.
export type Note = {
  slug: string; // the .mdx file name and the URL: /notes/<slug>
  title: string;
  date: string; // YYYY-MM-DD
  summary: string; // one or two sentences, shown in the list and link previews
  draft?: boolean;
};

