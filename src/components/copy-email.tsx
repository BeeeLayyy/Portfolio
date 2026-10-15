"use client";

import { useState } from "react";

// Contact page (D19): the email in huge type. Clicking it opens the mail app
// as usual; the small button beside it copies the address instead and says
// so (announced to screen readers too).
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the mailto link still works.
    }
  }

  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <a
        href={`mailto:${email}`}
        className="roll-host block font-serif text-[clamp(2.25rem,7.5vw,6.5rem)] leading-none tracking-tight break-all hover:text-accent"
      >
        {email}
      </a>
      <button type="button" onClick={copy} className="pill pill-secondary cursor-pointer">
        <span className="pill-dot" aria-hidden />
        <span className="pill-text">{copied ? "Copied" : "Copy email"}</span>
      </button>
      <span className="sr-only" role="status">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
