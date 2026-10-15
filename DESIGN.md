# Design system: Banker's lamp

A dark ledger-green room lit by one amber lamp. The home hero splits Brandon's story in two: finance on the left in a serif, data and technology on the right in a grotesk. The two typefaces *are* the two halves of the story, so the split reads even before anyone reads a word.

All tokens live in `src/app/globals.css` under `@theme`. Never hard-code a color, size, or timing in a component; use the token.

## Color

| Token | Hex | Use | Contrast on ledger |
| --- | --- | --- | --- |
| `ledger` | #0F1F1A | Page background | — |
| `ledger-raised` | #172C25 | Cards, raised surfaces | — |
| `rule` | #2C4A40 | Dividers and borders (decorative only) | 1.75:1 |
| `paper` | #EDE6D6 | Main text | 13.7:1 |
| `paper-muted` | #9FB3AA | Secondary text | 7.7:1 |
| `lamp` | #F2A93B | The one accent: primary buttons, focus rings, active states | 8.5:1 |

Rules: `lamp` is the only accent. Use it for at most one thing per screen that should pull the eye. Text on a `lamp` background is `ledger` (8.5:1).

## Type

| Family | Token | Role |
| --- | --- | --- |
| Newsreader (serif, optical sizes) | `font-serif` | Finance side, headings, the moving name |
| IBM Plex Sans | `font-sans` | Data side, body text, numbers, UI |

Scale is a 1.25 ratio from a 17px body: `text-sm` 13px, `text-base` 17px, `text-lg` 21px, `text-xl` 27px, `text-2xl` 33px, `text-3xl` 40 to 64px (grows with screen), `text-display` 64 to 208px (the name only). Numbers are tabular site-wide so figures line up like a ledger. Body lines stay under about 70 characters (`max-w-prose`).

Avoid: all-caps labels, numbered markers on things that are not a sequence, coloring one word in a headline.

## Spacing

4px base (`--spacing: 0.25rem`). Use Tailwind steps: 4, 6, 8, 12, 16, 24 (16px to 96px) for most layout. Sections are separated by `py-24` on mobile and up.

## Radius

Radius follows role, not one value everywhere: `rounded-tag` 2px (skill tags), `rounded-control` 6px (buttons, inputs), `rounded-media` 12px (images, project cards).

## Motion

| Token | Value | Use |
| --- | --- | --- |
| `--duration-quick` | 140ms | Hover and focus |
| `--duration-base` | 280ms | Menus, toggles |
| `--duration-slow` | 600ms | Section reveals |
| `--duration-hero` | 1100ms | The one orchestrated hero moment |
| `--stagger` | 60ms | Gap between items entering in sequence |
| `--hero-follow` | 200ms | When the hero halves start, after the name |
| `ease-out-soft` | cubic-bezier(0.16, 1, 0.3, 1) | Things arriving |
| `ease-in-out-soft` | cubic-bezier(0.65, 0, 0.35, 1) | Things moving across |

Rules: one orchestrated moment per page; everything else moves only in answer to the visitor (hover, scroll, click). Reduced-motion settings turn every animation into an instant change, with no delay (handled globally in `globals.css`).

In use: the home hero entrance (name rises in word by word, halves fade in, once per session), a 280ms fade and 8px rise when a new page opens from a link (not on first load, nothing on exit), and buttons shrink to 97% while pressed.
