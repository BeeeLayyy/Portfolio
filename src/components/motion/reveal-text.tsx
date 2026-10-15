import type { CSSProperties, ElementType, ReactNode } from "react";

// Lusion's text reveal (D16): the text is split into words, each in its own
// clipped window, and the words rise out of their lines one after another
// when the block scrolls in. RevealObserver (in the layout) sets data-in.
//
// "words" is for titles (rise with a tilt); "fade-words" is for paragraphs
// (each word brightens). The full text stays in the DOM for screen readers
// and search; only the motion is split.
export function RevealText({
  as: Tag = "span",
  text,
  lines,
  mode = "words",
  className,
}: {
  as?: ElementType;
  /** One run of text. Use lines instead to force line breaks. */
  text?: string;
  lines?: string[];
  mode?: "words" | "fade-words";
  className?: string;
}) {
  const rows = lines ?? [text ?? ""];
  let w = 0;
  return (
    <Tag className={className} data-reveal={mode}>
      {rows.map((row, r) => (
        <span key={r} className={lines ? "block" : undefined}>
          {row.split(" ").map((word, i, all) => (
            <Word key={i} index={w++} last={i === all.length - 1}>
              {word}
            </Word>
          ))}
        </span>
      ))}
    </Tag>
  );
}

function Word({ index, last, children }: { index: number; last: boolean; children: ReactNode }) {
  return (
    <>
      <span className="rw">
        <span className="rw-i" style={{ "--w": index } as CSSProperties}>
          {children}
        </span>
      </span>
      {!last && " "}
    </>
  );
}

// A label with a copy stacked under it; on hover of the nearest .roll-host
// the copy rolls up into place. The copy is hidden from screen readers.
export function TextRoll({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`roll ${className}`}>
      <span className="roll-text">{children}</span>
      <span className="roll-clone" aria-hidden>
        {children}
      </span>
    </span>
  );
}

// The same roll, letter by letter with a small stagger (the showcase title).
export function LetterRoll({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`letter-roll ${className}`}>
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {children.split("").map((ch, i) => (
          <span key={i} className="roll" style={{ "--l": i } as CSSProperties}>
            <span className="roll-text">{ch === " " ? "\u00a0" : ch}</span>
            <span className="roll-clone">{ch === " " ? "\u00a0" : ch}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
