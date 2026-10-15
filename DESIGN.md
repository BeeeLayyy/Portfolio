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
| `--hero-follow` | 200ms | When the hero card starts, after the title's words |
| `--duration-reveal` | 900ms | Words rising out of their line as a section scrolls in |
| `--duration-intro` | 2200ms | First-visit intro (count, name, diagonal wipe) |
| `--intro-offset` | 1800ms | When the hero entrance starts under the intro's wipe |
| `ease-out-soft` | cubic-bezier(0.16, 1, 0.3, 1) | Things arriving |
| `ease-in-out-soft` | cubic-bezier(0.65, 0, 0.35, 1) | Things moving across |

Rules (D16, Lusion-style motion): one orchestrated moment per visit (the intro, then the hero); everything else moves only in answer to the visitor (hover, scroll, click). Reduced-motion settings turn every animation into an instant change, with no delay (handled globally in `globals.css`).

In use (D16, modeled on lusion.co):

- **Intro**, first page of a visit only, never with reduced motion: a blue screen counts 000 to 100 on rolling odometer digits while a bar fills, the name rolls up, then the screen splits on its diagonal and slides off to the corners. Pure CSS, click-through.
- **Hero**: a one-sentence title whose words rise with a slight tilt, the 3D card (D15), and a "Scroll to explore" row of + marks whose label rolls on a loop.
- **Header**: fixed, frosted once scrolled. "Let's talk" pill (dot shrinks, label slides, arrow slides in) and a Menu pill (label rolls to "Close", dots turn) that opens a card of links with a soft bubble, rolling label and arrow on hover. Both pills pop in.
- **Scroll reveals**: titles rise word by word out of their lines; paragraphs brighten word by word; cards scale in; rows rise in, staggered.
- **Pill buttons**: on hover a dot swells to fill the pill, the label slides over, an arrow slides in. 97% scale while pressed.
- **Showcase**: the featured project's screenshot grows from a thumbnail to full width as it scrolls in (scroll-driven CSS); its name rolls letter by letter on hover.
- **Ribbon**: a blue line draws itself down the Home page with scroll.
- **Project rows**: an arrow slides in before the title and the stack line re-types itself (text decode) on hover; the screenshot follows the cursor; it morphs into the project page (view transition).
- **End section**, every page but Contact: the page warms from navy to blue, "Let's work together!" rises in and its rules draw from the left, "Keep scrolling" rolls.
- **Scroll to next page**: at the bottom, a bar fills; keep scrolling with a mouse and the next page opens. Always a plain link too.
- **Smooth scroll** (Lenis, mouse only) with a scroll indicator on the right edge that stretches with speed, and a soft blue **cursor trail** (mouse only).
- Page changes fade in over 280ms; footer links underline from the left; Back to top rolls its arrow.
