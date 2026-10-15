# Design system: Throwback

Baby blue, white and red, like a classic throwback jersey. The home hero is a baby blue field split in two by a red stripe: finance on the left in a serif, data and technology on the right in a grotesk. The name sits on top in jersey-number style, white with a red outline.

All tokens live in `src/app/globals.css` under `@theme`. Never hard-code a color, size, or timing in a component; use the token.

## Color

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| `sky` | #4A96D6 | Hero and feature surfaces | white on sky 3.2:1 (large text only), ink on sky 4.6:1 |
| `mist` | #EAF3FB | Alternate section background | ink on mist 13:1 |
| `white` | #FFFFFF | Page background; big type on sky | ink on white 14.6:1 |
| `red` | #D21F2F | The accent: buttons, stripes, outlines, focus rings | white on red 5.3:1, red on white 5.3:1 |
| `ink` | #0E2A47 | Body text everywhere | see above |
| `ink-muted` | #4A6178 | Secondary text on white or mist | 6.4:1 on white |
| `rule` | #C9DCEE | Dividers (decorative only) | — |

Rules:

- Body text is always `ink`. White text on `sky` is only for very large type (the name, 40px and up), because at small sizes it is too faint to read.
- Never put `red` text on `sky` (1.95:1, unreadable). On `sky`, red is used as a stripe or an outline, the way it sits on the jersey.
- `red` is the one accent: use it for the single thing per screen that should pull the eye.
- The palette is inspired by a throwback jersey; no team names, logos or marks are used.

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
| `ease-out-soft` | cubic-bezier(0.16, 1, 0.3, 1) | Things arriving |
| `ease-in-out-soft` | cubic-bezier(0.65, 0, 0.35, 1) | Things moving across |

Rules: one orchestrated moment per page; everything else moves only in answer to the visitor (hover, scroll, click). Reduced-motion settings turn every animation into an instant change (handled globally in `globals.css`).
