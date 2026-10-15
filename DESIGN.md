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
- **Smooth scroll** (Lenis, mouse only) with a scroll indicator on the right edge that stretches with speed.
- Page changes fade in over 280ms; footer links underline from the left; Back to top rolls its arrow.

## 3D hero scene (D15, made personal in D17)

The Home card is Brandon's world as glossy 3D objects: dollar signs, gold coins and coin stacks (finance), bar and pie charts, a percent sign and an up arrow (data), curly braces (MIS), a graduation cap (Villanova) and a basketball (Courtside). The `$`, `%` and `{ }` are IBM Plex Sans Bold glyphs, extruded (`src/components/hero-scene/glyphs.ts`). About 40 pieces, large and packed toward the middle so they overlap and fill the card edge to edge, with the background barely showing, as on lusion.co.

| Token | Value | Use |
| --- | --- | --- |
| `--color-scene-cobalt` | #2448ff | Rubbery blue pieces |
| `--color-scene-gold` | #f4b63d | Coins, cap tassel |
| `--color-scene-orange` | #f26b1d | The basketball |

Scene colors are paint for 3D objects only, never text or interface; white, black and the green arrow reuse `--color-ink`, `--color-canvas` and `--color-gain`. Neutral tone mapping keeps them as bright as Lusion's.

Cursor warp ("screen paint"): moving the mouse over the card leaves a fluid trail that bends the picture and splits its colors like a lens; it fades in about a second. There is no page-wide trail: it ran on every mouse move for little gain (review-animations, Oct 15). The pieces bounce off the cursor: it hits them with its own speed, they fly, spin and knock into each other, then drift home.

Phones, touch screens and reduced motion get a still instead: `public/images/hero-scene-v2.webp` (wide) and `hero-scene-phone-v2.webp` (tall), captured from the live scene. Recapture both whenever the scene changes, and bump the `-v` number in the file names: image optimizers cache by file name, so a changed image under the old name can be served stale.

## Living background (D18)

Behind every page: two soft pools of blue light (`--color-accent`, `--color-scene-cobalt`, `--color-accent-strong` at 14 to 18%) drift on long loops (`--duration-ambient`, 46s) and slide up as you scroll, over a faint dot grid (ink at 9%) that creeps one tile per loop. Only transforms animate, so it doesn't repaint the page; reduced motion holds it still. Glows stay faint enough that muted text keeps over 7:1 contrast. Component: `src/components/motion/backdrop.tsx`.

## Home hero title and intro section (D18)

The hero title is just "Brandon Le's portfolio", large, in Newsreader. The next section is two columns: on the left the "Finance, built on data" title, a short intro, four quick facts (Now, Before, Building, Graduating: mono labels over a ruled grid, like a ledger) and the About link; on the right Brandon's portrait, which zooms slightly on hover. The facts live in `site.approach.facts`.

## Inner pages (D19)

Every inner page opens the same way (`PageHeader`): a mono eyebrow, a big Newsreader title whose words rise in, and an intro that brightens word by word.

- **Experience:** "By the numbers" (figures from the resume highlights, in `experienceStats`) count up as they scroll in (`CountUp`, `--duration-count`), then a timeline whose line draws itself with scroll; each role is a card with its dates and company pinned on the left on desktop.
- **About:** the bio beside a pinned portrait, goals as numbered cards, and the toolkit grouped by use (`site.toolkit` groups).
- **Now:** a numbered list in big type.
- **Contact:** the email in huge type with a Copy email button (announced to screen readers), then each profile as a big row with an arrow.

## Search and sharing (D19)

The link preview (`src/app/opengraph-image.jpg`, 1200 by 630) shows the title, "Finance and MIS · Villanova", the domain and the 3D scene. Recompose it when the hero changes. Home carries schema.org Person data (name, URL, headshot, Villanova, toolkit, profiles) so search engines know who the site is about.

