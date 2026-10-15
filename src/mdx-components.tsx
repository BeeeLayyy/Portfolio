import type { MDXComponents } from "mdx/types";

// How Markdown in a note (src/content/notes/*.mdx) is styled: the site's
// type scale, colors and link style, so a post reads like the rest of the
// site without any classes in the post itself.
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 font-serif text-2xl" {...props} />,
  h3: (props) => <h3 className="mt-10 text-lg font-medium" {...props} />,
  p: (props) => <p className="mt-6" {...props} />,
  a: (props) => (
    <a className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" {...props} />
  ),
  ul: (props) => <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-ink-muted" {...props} />,
  ol: (props) => <ol className="mt-6 list-decimal space-y-2 pl-6 marker:text-ink-muted" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 border-l-2 border-accent pl-6 font-serif text-xl text-ink" {...props} />
  ),
  code: (props) => <code className="rounded-tag bg-surface px-1.5 py-0.5 font-mono text-sm" {...props} />,
  hr: () => <hr className="my-12 border-rule" />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
