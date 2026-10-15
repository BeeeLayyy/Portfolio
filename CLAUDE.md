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

Not used on this site: `animate-expo` (React Native), `write-swift` (Swift), `ask-sonner` (toasts).

### Rules for every tool

- Anything from 21st.dev, Motion or an animation skill gets restyled with our tokens and `DESIGN.md`. Extend `--ease-out-soft` and `--duration-*`; never add a parallel set of colors, fonts or easings.
- Every animation respects reduced motion.
- Installed skills come from `emilkowalski/skills` (pinned in `skills-lock.json`) and the Motion AI Kit (`npx motion-ai`). Update them with `npx skills update` and by re-running `npx motion-ai`.

## Decisions so far

D1 Next.js. D2 multi-page (Home, Projects, project detail, Experience, About, Now, Contact). D3 motion-heavy; palette "Banker's lamp" (dark ledger green, one amber accent, Newsreader serif for finance, IBM Plex Sans for data; a baby blue, white and red version was tried and dropped). Home hero leads with the finance-versus-data split. D4 sections: Hero, Now, Projects, Experience, Goals, Toolkit, Contact. D5 GitHub to Vercel, previews per branch. D6 public repo. D8 content as TypeScript files. D9 experience matches the public resume and LinkedIn, nothing beyond it. D10 feature Courtside only (https://courtside-ecru.vercel.app). Open: D7 custom domain (by Phase 4).

## Where things stand (Oct 15, 2026)

- Phase 0 and Phase 1 done. Phase 2 (content) in progress on branch `feat/page-skeleton`, not merged to `main` yet. Production still shows the starter page.
- Done in Phase 2: Courtside write-up, Experience from the resume, LinkedIn and email links, full toolkit.

## Next up

1. Ask Brandon: is naming Nike and Coca-Cola (SAP Product Analyst highlights) fine publicly, or use "Fortune 500 accounts"?
2. Resume download: the resume PDF has his phone number. Either get a version without it for `/public/resume.pdf`, or point the button at LinkedIn.
3. Write the bio (About), goals, and Now section with `design:ux-copy`. Remaining placeholders are marked TODO in `src/content/`.
4. Hero lines in `src/content/site.ts` still describe JPMorgan as current; update to past tense.
5. Finish Phase 2 (images and alt text, link and confidentiality check), merge to `main`, then Phase 3 polish.
6. After Courtside's Oct 28 public launch, add real numbers (weekly returning visitors) to its outcome.
