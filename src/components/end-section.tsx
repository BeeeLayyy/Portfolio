"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { RevealText } from "./motion/reveal-text";

// Lusion's closing section, on every page but Contact: the page warms from
// navy to the accent blue as it arrives, a huge "Let's work together" rises
// in, its rules draw from the left, and "Keep scrolling" rolls on a loop.
export function EndSection() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <section aria-labelledby="end-title" className="end-section overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 text-center md:px-10 md:pt-40">
        <div className="flex items-center justify-between" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="cross [&::after]:bg-ink [&::before]:bg-ink" />
          ))}
        </div>
        <p className="mt-10 font-mono text-sm tracking-wide text-ink uppercase">{site.end.eyebrow}</p>
        <h2 id="end-title" className="mt-6 text-[clamp(3.5rem,11vw,10rem)] leading-[0.95] font-medium tracking-tight">
          <Link href="/contact" className="group inline-block" data-reveal="words">
            <span className="relative block">
              <RevealText text={site.end.title[0]} />{" "}
              <span aria-hidden className="end-rule absolute right-[0.1em] bottom-[0.02em] left-[0.1em] h-[0.06em] bg-ink" />
            </span>
            <span className="relative block">
              <RevealText text={`${site.end.title[1]}!`} />
              <span aria-hidden className="end-rule absolute bottom-[0.02em] left-[0.1em] h-[0.06em] w-[0.9em] bg-ink" />
            </span>
          </Link>
        </h2>
        <div className="mt-20 flex items-center justify-center gap-4 font-mono text-sm text-ink uppercase" aria-hidden>
          <ArrowRoll />
          <span className="cue-window">
            <span className="cue-lines">
              <span>Keep scrolling</span>
              <span>Keep scrolling</span>
            </span>
          </span>
          <ArrowRoll />
        </div>
      </div>
    </section>
  );
}

function ArrowRoll() {
  return (
    <span className="arrow-window">
      <span className="arrow-lines">
        <Arrow />
        <Arrow />
      </span>
    </span>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="size-[1em] flex-none" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2v12M3 9l5 5 5-5" />
    </svg>
  );
}
