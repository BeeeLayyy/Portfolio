"use client";

import { useEffect } from "react";

// Marks the hero entrance as played for this session once it finishes, so
// coming back to Home doesn't replay it. A timeout rather than an unmount
// cleanup, so React's dev double-mount doesn't cut the entrance short.
export function HeroPlayed() {
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    // Under the first-visit intro the entrance starts later (--intro-offset).
    const intro = document.documentElement.dataset.intro === "play" ? toMs(root.getPropertyValue("--intro-offset")) : 0;
    const ms = toMs(root.getPropertyValue("--duration-hero")) + intro;
    const timer = setTimeout(() => {
      document.documentElement.dataset.hero = "played";
      try {
        sessionStorage.setItem("hero-played", "1");
      } catch {
        // Storage blocked: the entrance just plays again next visit.
      }
    }, ms);
    return () => clearTimeout(timer);
  }, []);
  return null;
}

// The CSS minifier may rewrite "1100ms" as "1.1s", so read the unit.
function toMs(value: string) {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return 1100;
  return value.trim().endsWith("ms") ? n : n * 1000;
}
