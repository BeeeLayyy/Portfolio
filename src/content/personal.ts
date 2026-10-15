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
  intro: "",
  interests: [],
  favorites: [],
  photos: [],
};
