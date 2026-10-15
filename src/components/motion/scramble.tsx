"use client";

import { useEffect, useRef } from "react";

// Lusion's hover decode: when the row is hovered, the text re-types itself
// left to right with a few random characters running ahead of it. The real
// text is always in the DOM for screen readers (aria-label); mouse only.
const LETTERS_PER_SECOND = 60;
const RANDOM_AHEAD = 4;

export function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest(".group");
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      const shown = Math.floor(((now - start) / 1000) * LETTERS_PER_SECOND);
      const fixed = Math.min(text.length, shown - RANDOM_AHEAD);
      let out = text.slice(0, Math.max(0, fixed));
      for (let i = Math.max(0, fixed); i < Math.min(text.length, shown); i++) {
        out += text[i] === " " ? " " : String.fromCharCode(33 + Math.floor(Math.random() * 93));
      }
      el.textContent = out;
      frame = fixed < text.length ? requestAnimationFrame(tick) : 0;
    };
    const onEnter = (event: Event) => {
      if ((event as PointerEvent).pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      start = performance.now();
      frame = requestAnimationFrame(tick);
    };
    host.addEventListener("pointerenter", onEnter);
    return () => {
      host.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(frame);
      el.textContent = text;
    };
  }, [text]);

  return (
    <span aria-label={text} className={className}>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
