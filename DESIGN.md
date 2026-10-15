# Design system: Horizon Night

A near-black navy room lit by one blue light (D14, Oct 15, 2026; it replaced the green and amber "Banker's lamp"). The color comes from one glowing light source on a dark base, not from many flat accents. The home hero splits Brandon's story in two: finance on the left in a serif, data and technology on the right in a grotesk. The two typefaces *are* the two halves of the story, so the split reads even before anyone reads a word.

All tokens live in `src/app/globals.css` under `@theme`. Never hard-code a color, size, or timing in a component; use the token.

## Color

| Token | Hex | Use | Contrast on canvas |
| --- | --- | --- | --- |
| `canvas` | #070D18 | Page background | — |
| `surface` | #0F1B2D | Cards, raised surfaces | — |
| `rule` | #1D2D3E | Dividers and borders (decorative only) | 1.4:1 |
| `ink` | #EAF1FA | Main text | 17.1:1 |
| `ink-muted` | #9AAEC4 | Secondary text | 8.5:1 (7.6:1 on surface) |
| `accent` | #5AACFF | The one accent: links, active nav, hover lines, focus rings, the hero glow | 8.1:1 |
| `accent-strong` | #1A5FD6 | Primary button fill (text is `ink`, 5.1:1) | — |
| `accent-strong-hover` | #2563EB | Primary button hover (text is `ink`, 4.5:1) | — |
| `gain` | #3FCB7A | Data only: up, positive | 9.3:1 |
| `loss` | #FF6B6B | Data only: down, errors | 7.0:1 |
| `critical` | #FF9A3D | Data only: warnings | 9.2:1 |
| `flat` | #788FA6 | Data only: unchanged, baseline | 5.8:1 |

Rules: `accent` is the only accent in the interface; use it for at most one thing per screen that should pull the eye. The four data colors appear only in charts, numbers and project visuals, never as decoration, and `loss` only for real losses or errors. The blues are deliberately close to, but not, SAP's brand blues (#0070F2, #4DA3FF), so the site reads as Brandon's own.

## Type

| Family | Token | Role |
| --- | --- | --- |
| Newsreader (serif, optical sizes) | `font-serif` | Finance side, headings, the moving name |
| Newsreader italic | `font-serif-italic` | "Finance" in the hero only; its own file, loaded after first paint (D13) |
| IBM Plex Sans | `font-sans` | Data side, body text, UI |
| IBM Plex Mono | `font-mono` | Numbers, dates, years and tags; not preloaded |

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
| `--duration-morph` | 400ms | An element moving between pages (project screenshot) |
| `--stagger` | 60ms | Gap between items entering in sequence |
| `--hero-follow` | 200ms | When the hero halves start, after the name |
| `ease-out-soft` | cubic-bezier(0.16, 1, 0.3, 1) | Things arriving |
| `ease-in-out-soft` | cubic-bezier(0.65, 0, 0.35, 1) | Things moving across |

Rules: one orchestrated moment per page; everything else moves only in answer to the visitor (hover, scroll, click). Reduced-motion settings turn every animation into an instant change, with no delay (handled globally in `globals.css`).

In use: the home hero entrance (name rises in word by word, halves rise in after it, once per session), a 280ms fade and 8px rise when a new page opens from a link (not on first load, nothing on exit), buttons shrink to 97% while pressed, the project screenshot morphs from its Projects row into the project page (view transition, 400ms), and text links ease their hover color over 140ms.
