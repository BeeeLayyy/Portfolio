@AGENTS.md

# Brandon Le portfolio: handoff for Claude Code

Personal portfolio site for Brandon Le (Finance and MIS, Villanova). Next.js 16 App Router, TypeScript, Tailwind v4, deployed on Vercel.

## Sources of truth

- **Build plan** (roadmap, decisions log, plan board): https://claude.ai/code/artifact/9a5b69b3-d9fd-4d1b-9379-bb54ff546c88
- **Progress dashboard** (Portfolio build tracker): https://claude.ai/artifact/PHi7f9gPrJUaTkRPJtSYtb. It copies its data from the build plan.
- **Design system:** `DESIGN.md`, tokens in `src/app/globals.css`. Never hard-code a color, size or timing.
- **Content:** typed data in `src/content/`. Pages and components only read it.

After each finished task or decision, update the plan board and decisions log, then refresh the dashboard. If those tools aren't available in this session, list what changed so Brandon can sync it from claude.ai.

## How to work

- One branch per change. Every push gets a Vercel preview; only merges to `main` reach production.
- After every push, give Brandon the preview link. Stable link for the current branch: `https://portfolio-git-<branch>-brandonlcfs2023-2984s-projects.vercel.app` (needs a Vercel login).
- Narrate the "why" behind decisions at a level a smart beginner can follow. Keep replies brief and direct. Copy is concise and human, with no em dashes.
- Run `npx next typegen` before `npx tsc --noEmit` when routes change. Local builds can fail fetching Google Fonts offline; Vercel builds fine.

## Toolkit: skills and MCP servers

Use these instead of freehanding. Everything here is installed in this repo, so it loads automatically.

### MCP servers (`.mcp.json`)

| Server | What it gives you | Setup |
| --- | --- | --- |
| `21st` | 21st.dev component library: search, fetch and generate UI components | Needs `API_KEY_21ST` in the environment. Never commit the key |
| `motion` | Motion docs, examples, CSS spring generator | None, works signed out |
| `motion-plus` | Motion+ extras, including the MotionScore performance audit | Signs in to Motion+ on first use |

### Skills by lane

| Lane | Skill | Use it for |
| --- | --- | --- |
| Frontend | `design:design-system` | Changing or extending tokens in `globals.css` and `DESIGN.md` |
| Frontend | `frontend-design` | Layout and component design |
| Frontend | `motion` (Motion AI Kit) | Writing any code with the `motion` package (Motion for React) |
| Frontend | `emil-design-eng`, `animate`, `animation-vocabulary` | Building animations: Phase 3 hero, page transitions, project-row hover image |
| Frontend | `find-animation-opportunities`, `improve-animations` | Planning where motion goes before building it |
| Frontend | `mobile-native` | Phone polish: tap highlights, 100vh, the notch |
| Frontend | AnimatedWebs (`animatedwebs-hero`, `-backgrounds`, `-components`, `-style`) | Cinematic hero and backgrounds, if available in the session |
| Frontend | `apple-design`, `pick-ui-library`, `prototype` | Only when Brandon asks |
| Data | `design:ux-copy` | Every line of site copy, buttons, empty states, 404 |
| QA | `design:design-critique` | Visual review before a phase is called done |
| QA | `design:accessibility-review` | Contrast, keyboard, focus, reduced motion |
| QA | `review-animations`, `animation-performance` | Gate for every motion change |
| QA | `motion-reviewer` agent (`.claude/agents/`) | MotionScore audit across the whole site at the Phase 3 gate |
| QA | `break-ui` | Stress-test components with long names, empty states, extreme content |
| All | `impeccable` (`/impeccable <command> <target>`) | Design commands on a page or component: `critique` and `audit` (QA), `polish`, `typeset`, `layout`, `quieter`/`bolder`, `distill`, `harden`, `animate`, `delight` (frontend), `clarify` (copy). Example: `/impeccable critique src/app/page.tsx` |

`impeccable` reads our `DESIGN.md` for context. Use it for refinement only: it must keep the Horizon Night palette (D14), fonts and copy. Never let it "redesign" or rewrite `DESIGN.md` unless Brandon asks. Its launcher downloads a helper program once from the author's GitHub releases and checks its checksum before running it.

Not used on this site: `animate-expo` (React Native), `write-swift` (Swift), `ask-sonner` (toasts).

### Rules for every tool

- Anything from 21st.dev, Motion or an animation skill gets restyled with our tokens and `DESIGN.md`. Extend `--ease-out-soft` and `--duration-*`; never add a parallel set of colors, fonts or easings.
- Every animation respects reduced motion.
- Installed skills come from `emilkowalski/skills` (pinned in `skills-lock.json`) and the Motion AI Kit (`npx motion-ai`), and `pbakaus/impeccable` (pinned in `skills-lock.json`). Update them with `npx skills update` and by re-running `npx motion-ai`.

## Decisions so far

D1 Next.js. D2 multi-page (Home, Projects, project detail, Experience, About, Now, Contact). D3 motion-heavy; palette "Banker's lamp" (dark ledger green, one amber accent, Newsreader serif for finance, IBM Plex Sans for data; a baby blue, white and red version was tried and dropped). Home hero leads with the finance-versus-data split. D4 sections: Hero, Now, Projects, Experience, Goals, Toolkit, Contact. D5 GitHub to Vercel, previews per branch. D6 public repo. D8 content as TypeScript files. D9 experience matches the public resume and LinkedIn, nothing beyond it. D10 feature Courtside only (https://courtside-ecru.vercel.app). D11 name Nike and Coca-Cola publicly. D12 resume button links to LinkedIn (the PDF has a phone number). D7 custom domain brandonle.site (bought through Vercel Oct 15; set as `site.url` and `metadataBase`). D13 keep Newsreader optical sizes, load the italic after first paint. D14 palette "Horizon Night" replaces Banker's lamp (near-black navy, one blue accent near but not equal to SAP blue, data colors only in charts; IBM Plex Mono for numbers, dates and tags). D15 Home hero becomes a 3D data scene inspired by lusion.co: loads after the text, still image on phones and with reduced motion. D16 site-wide motion and Home layout modeled on lusion.co: first-visit intro, Lusion hero layout, fixed header with pills and menu, word reveals, pill buttons, growing showcase, ribbon, end section, scroll to next page and smooth scroll (all listed in `DESIGN.md`, Motion). D17 the 3D hero is personal and Lusion-sized: dollar signs, coins, charts, a graduation cap and a basketball in vivid scene-only colors, a full-width card, and a cursor warp (see `DESIGN.md`, 3D hero scene). D18 hero title "Brandon Le's portfolio, fully diversified." with an inline headshot, a portrait in the next section, and a living background (drifting blue light and a dot grid) on every page.

## Where things stand (Oct 15, 2026)

- All five phases (0 to 4) done. The site is live at https://brandonle.site (www redirects to it), with Vercel Analytics and Speed Insights on. Live Lighthouse mobile before D14 to D17: Home 98 to 99, Courtside 96.
- Phase 3 covered: hero entrance, page-change fade, button press, project-row hover preview, hero split hover; phone polish; page descriptions, share image and icons; review-animations, WCAG 2.2 AA review and design critique, each with fixes; Lighthouse mobile 93 to 97 performance and 100 for accessibility, best practices and SEO.
- `/projects/[slug]` sets `instant = false` on purpose: streaming it behind Suspense turned unknown-slug 404s into 200s. See the comment in that file.
- D14 to D17 (Horizon Night, 3D hero, Lusion motion, personal scene with cursor warp) merged to `main` and live Oct 15. Live Lighthouse: phone 95 to 96, desktop 97; 100 for accessibility, best practices and SEO. Local `next start` runs score phones lower (about 82 to 86) because there's no CDN; trust the live numbers.
- Fonts: Newsreader italic is a separate, non-preloaded font (`font-serif-italic`), and the hero's `rise-in` starts at 1% opacity, not 0, so Largest Contentful Paint counts at first paint. Both are deliberate; see the comments in `layout.tsx` and `globals.css`.

## Next up

1. After Courtside's Oct 28 public launch: add real numbers (weekly returning visitors) to its outcome, update the Courtside item in Now, and retake the screenshot (desktop and the phone row both use it).
2. Keep Now current (it says "Updated October 2026") and add projects as they ship; each new project needs an image for the hover preview and phone row.
3. brandonle.site renews at $27 a year in October 2027.
