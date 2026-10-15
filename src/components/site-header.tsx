"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { nav, site } from "@/content/site";
import { TextRoll } from "./motion/reveal-text";

// Lusion-style header (D16): fixed, transparent over the top of the page and
// frosted once you scroll. The name on the left; on the right a "Let's talk"
// pill and a Menu pill that opens a card of page links. Both pills pop in.
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Close on page change.
  const [shownFor, setShownFor] = useState(pathname);
  if (shownFor !== pathname) {
    setShownFor(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape or a click outside closes the menu; opening it moves focus in.
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50" data-scrolled={scrolled || open}>
      <div className="mx-auto flex h-header max-w-hero items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="roll-host font-serif text-lg whitespace-nowrap min-[24rem]:text-xl">
          <TextRoll>{site.name}</TextRoll>
        </Link>
        <div className="relative flex items-center gap-2">
          <Link
            href="/contact"
            className="header-pill talk-pill header-pop"
            style={{ "--i": 0 } as CSSProperties}
          >
            <svg viewBox="0 0 16 16" className="talk-arrow" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
            <span className="talk-text">Let&apos;s talk</span>
            <span className="talk-dots" aria-hidden>
              <span />
            </span>
          </Link>
          <button
            ref={button}
            type="button"
            className="header-pill menu-pill header-pop cursor-pointer"
            style={{ "--i": 1 } as CSSProperties}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="roll">
              <span className="roll-text">Menu</span>
              <span className="roll-clone" aria-hidden>
                Close
              </span>
            </span>
            <span className="menu-dots" aria-hidden>
              <span />
              <span />
            </span>
          </button>

          <div
            ref={panel}
            id={menuId}
            data-open={open}
            className="menu-panel absolute top-[calc(100%+0.5rem)] right-0 w-[min(22rem,calc(100vw-3rem))] rounded-media bg-surface p-3 shadow-2xl ring-1 ring-rule"
          >
            <nav aria-label="Main">
              <ul>
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        tabIndex={open ? undefined : -1}
                        className="menu-link roll-host flex items-center justify-between rounded-control px-4 py-3 text-2xl"
                        style={{ "--i": i } as CSSProperties}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className={`size-1.5 rounded-full ${active ? "bg-accent" : "bg-transparent"}`}
                          />
                          <TextRoll>{item.label}</TextRoll>
                        </span>
                        <svg viewBox="0 0 16 16" className="menu-link-arrow size-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                          <path d="M2 8h12M9 3l5 5-5 5" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <a
              href={`mailto:${site.email}`}
              tabIndex={open ? undefined : -1}
              className="mt-2 flex items-center justify-between rounded-control bg-accent-strong px-4 py-3 text-sm font-medium tracking-wide uppercase"
            >
              Email me
              <span className="font-mono normal-case">{site.email}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
