import type { Image } from "./types";

// "Off the clock" on the About page (D20): the personality part. Fill in any
// of these and the section appears; leave them all empty and it stays hidden.
// Photos go in public/images/ (about 1200px wide is plenty).
export const offTheClock: {
  intro: string; // one line under the heading
  interests: { title: string; detail: string }[];
  favorites: { label: string; value: string }[]; // e.g. Team, Reading, Listening to, Watching
  photos: (Image & { caption: string })[];
} = {
  // Started from what's already on the site (Oct 15); swap in your own.
  intro: "When I'm not at work or in class.",
  interests: [
    { title: "NBA basketball", detail: "I follow it closely enough that I built Courtside to make sense of the numbers." },
    { title: "Building products", detail: "Courtside and this site, both planned and shipped like real launches." },
    { title: "Automating the busywork", detail: "Turning the reports people rebuild by hand into workflows that run themselves." },
  ],
  favorites: [],
  photos: [],
};
