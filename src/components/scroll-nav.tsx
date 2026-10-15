"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav } from "@/content/site";

// Lusion's "keep scrolling" page change, at the very bottom of every page:
// the bar fills as you reach the end, and if you keep scrolling past it the
// next page opens. With a mouse only and never with reduced motion; it is
// always a plain link too, so keyboard and touch users just follow it.
const ORDER = [{ label: "Home", href: "/" }, ...nav];
const PUSH_TO_OPEN = 700; // px of extra wheel scrolling at the bottom

export function ScrollNav() {
  const pathname = usePathname();
  const router = useRouter();
  const section = useRef<HTMLElement>(null);
  const here = ORDER.findIndex((p) => p.href === pathname);
  const next = here === -1 ? null : ORDER[(here + 1) % ORDER.length];

  useEffect(() => {
    const el = section.current;
    if (!el || !next) return;
    let extra = 0;
    let frame = 0;
    let leaving = false;
    const auto =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const atBottom = () =>
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const draw = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const seen = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / rect.height));
      const progress = atBottom() ? 0.5 + 0.5 * Math.min(1, extra / PUSH_TO_OPEN) : seen * 0.5;
      el.style.setProperty("--progress", String(progress));
    };
    const onScroll = () => {
      if (!atBottom()) extra = 0;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onWheel = (event: WheelEvent) => {
      if (!auto || leaving || event.deltaY <= 0 || !atBottom()) return;
      extra += event.deltaY;
      if (extra >= PUSH_TO_OPEN) {
        leaving = true;
        router.push(next.href);
      }
      onScroll();
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(frame);
    };
  }, [next, router]);

  if (!next) return null;

  return (
    <section ref={section} aria-label="Next page" className="border-t border-rule">
      <Link href={next.href} className="group mx-auto block max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-sm tracking-wide text-ink-muted uppercase">Keep scrolling to</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <p className="text-[clamp(3rem,9vw,8rem)] leading-none font-medium tracking-tight transition-colors duration-(--duration-quick) group-hover:text-accent">
            {next.label}
          </p>
          <div className="w-full max-w-xs pb-3">
            <p className="font-mono text-sm tracking-wide text-ink-muted uppercase">Next page</p>
            <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-rule">
              <div className="scroll-nav-bar h-full bg-accent" />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
