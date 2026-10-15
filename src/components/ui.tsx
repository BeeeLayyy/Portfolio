import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { RevealText } from "./motion/reveal-text";

// Small building blocks shared by every page. All styling comes from the
// tokens in globals.css.

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>;
}

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <Container className="pt-20 pb-12 md:pt-28">
      {/* Words rise in on load, like the Home hero (no scroll trigger: it's
          the top of the page, and the title is often its largest text). */}
      <h1 className="font-serif text-3xl">
        {title.split(" ").map((word, i, all) => (
          <span key={i}>
            <span className="title-word" style={{ "--i": i } as CSSProperties}>
              {word}
            </span>
            {i < all.length - 1 && " "}
          </span>
        ))}
      </h1>
      {intro && (
        <RevealText as="p" mode="fade-words" text={intro} className="mt-6 max-w-prose text-lg text-ink-muted" />
      )}
    </Container>
  );
}

export function Section({ title, children, href, linkLabel }: {
  title: string;
  children: ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <Container className="py-20">
      <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
        <RevealText as="h2" text={title} className="font-serif text-2xl" />
        {href && linkLabel && (
          <Link href={href} className="underline-draw inline-block py-1 text-sm text-ink-muted hover:text-accent">
            {linkLabel}
          </Link>
        )}
      </div>
      <div className="mt-8">{children}</div>
    </Container>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-tag bg-surface px-2 py-1 font-mono text-sm text-ink-muted">{children}</span>
  );
}

// Lusion's pill button (D16): on hover a dot swells to fill the pill, the
// label slides over and an arrow slides in. Primary is light on the navy
// page; secondary is a raised navy pill.
export function ButtonLink({ href, children, variant = "primary" }: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a href={href} className={`pill ${variant === "primary" ? "pill-primary" : "pill-secondary"}`}>
      <span className="pill-dot" aria-hidden />
      <span className="pill-text">{children}</span>
      <svg viewBox="0 0 16 16" className="pill-arrow" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M2 8h12M9 3l5 5-5 5" />
      </svg>
    </a>
  );
}
