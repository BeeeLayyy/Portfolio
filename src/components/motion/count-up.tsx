"use client";

import { useEffect, useRef } from "react";

// A figure that counts up from zero when it scrolls into view, like a ticker
// settling. Handles a prefix and suffix around the number ("$2B+", "20%",
// "8 hrs"). The real value is in the HTML from the start, so search, screen
// readers and no-JS visitors always get it; the count only runs for sighted
// visitors without reduced motion. Tabular figures keep the width steady.
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
    const format = (n: number) =>
      prefix + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--duration-count")) || 1200;
    // Start from zero only if it's below the fold at load (no visible jump).
    if (el.getBoundingClientRect().top > window.innerHeight) el.textContent = format(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = format(target * (1 - Math.pow(1 - t, 4))); // fast start, gentle landing
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden>
        {value}
      </span>
    </span>
  );
}
