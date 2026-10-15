import Link from "next/link";
import type { ReactNode } from "react";

// Small building blocks shared by every page. All styling comes from the
// tokens in globals.css.

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>;
}

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <Container className="pt-20 pb-12 md:pt-28">
      <h1 className="font-serif text-3xl">{title}</h1>
      {intro && <p className="mt-6 max-w-prose text-lg text-ink-muted">{intro}</p>}
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
        <h2 className="font-serif text-2xl">{title}</h2>
        {href && linkLabel && (
          <Link href={href} className="inline-block py-1 text-sm text-ink-muted hover:text-accent">
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

export function ButtonLink({ href, children, variant = "primary" }: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-block select-none rounded-control px-5 py-3 font-medium transition-[color,background-color,border-color,scale] duration-(--duration-quick) ease-out-soft active:scale-[0.97] motion-reduce:active:scale-100";
  const styles =
    variant === "primary"
      ? "bg-accent-strong text-ink hover:bg-accent-strong-hover"
      : "border border-rule text-ink hover:border-accent";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
