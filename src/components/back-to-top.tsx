"use client";

import { scrollToTop } from "./motion/smooth-scroll";

// Lusion's footer button: the arrow rolls up and a copy rolls in on hover.
export function BackToTop() {
  return (
    <button
      type="button"
      className="top-btn flex cursor-pointer items-center gap-2 py-2 uppercase hover:text-ink"
      onClick={() => {
        scrollToTop();
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      Back to top
      <span className="block size-4 overflow-hidden" aria-hidden>
        <span className="top-arrow flex flex-col">
          <Up />
          <Up />
        </span>
      </span>
    </button>
  );
}

function Up() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 flex-none" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M8 14V2M3 7l5-5 5 5" />
    </svg>
  );
}
