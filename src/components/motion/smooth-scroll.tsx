"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Lusion's eased scrolling (D16): the wheel glides instead of stepping, via
// Lenis, which still moves the real page scroll (so links, find-in-page and
// the keyboard behave normally). Mouse and trackpad only: touch keeps the
// phone's own scrolling, and reduced motion keeps plain scrolling.
//
// Also draws the scroll indicator on the right edge: a short thumb that
// tracks the page and stretches with scroll speed.
export function SmoothScroll() {
  const pathname = usePathname();
  const thumb = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = window.matchMedia("(pointer: fine)").matches;
    let lenis: Lenis | null = null;
    let cancelled = false;
    // Loaded on demand, so phones and reduced motion never download it.
    if (mouse && !reduce) {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });
        lenisRef.current = lenis;
      });
    }

    let stretch = 0;
    let lastY = window.scrollY;
    let frame = 0;
    const draw = () => {
      frame = 0;
      const el = thumb.current;
      const tr = track.current;
      if (!el || !tr) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      tr.dataset.hidden = String(max < 40);
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const speed = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      stretch += (Math.min(speed / 40, 1.5) - stretch) * 0.3;
      const room = tr.clientHeight - el.clientHeight;
      el.style.transform = `translateY(${progress * room}px) scaleY(${1 + stretch})`;
      if (stretch > 0.01) frame = requestAnimationFrame(draw); // settle back
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A new page starts at the top, without gliding there.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.dispatchEvent(new Event("scroll"));
  }, [pathname]);

  return (
    <div
      ref={track}
      aria-hidden
      data-hidden="true"
      className="pointer-events-none fixed top-[40vh] right-1.5 z-40 h-[20vh] w-0.5 rounded-full bg-rule data-[hidden=true]:opacity-0 md:right-3 md:w-1"
    >
      <div ref={thumb} className="scroll-thumb h-1/5 w-full rounded-full bg-ink-muted" />
    </div>
  );
}
