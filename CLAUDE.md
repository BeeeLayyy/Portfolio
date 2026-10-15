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
- Use installed skills by lane: `design:design-system` and `frontend-design` (frontend), `design:ux-copy` (copy), `design:accessibility-review` and `design:design-critique` (QA, before calling a phase done). AnimatedWebs skills for motion in Phase 3.
- Emil Kowalski skills are installed in `.claude/skills/` (from `emilkowalski/skills`, pinned in `skills-lock.json`). Use them for motion and polish:
  - `emil-design-eng`, `animate`, `animation-vocabulary`: build any animation or interaction (Phase 3 hero, page transitions, project-row hover image).
  - `find-animation-opportunities`, `improve-animations`: plan where motion should go before building it.
  - `review-animations`, `animation-performance`: QA gate for every motion change, alongside `design:accessibility-review`.
  - `break-ui`: stress-test components with long names, empty states and extreme content before a phase is done.
  - `mobile-native`: phone polish in Phase 3 (tap highlights, 100vh, notch).
  - `apple-design`, `pick-ui-library`, `prototype`: only when asked.
  - Not used here: `animate-expo` (React Native), `write-swift` (Swift), `ask-sonner` (no toasts on this site).
- 21st.dev component library is connected as an MCP server in `.mcp.json` (key read from the `API_KEY_21ST` environment variable; never commit the key). Use it to find or generate UI components, then restyle anything it returns with our tokens and `DESIGN.md` rules. Don't paste a component in with its own colors, fonts or easing.
- Motion rules from these skills must still use our tokens in `globals.css` (`--ease-out-soft`, `--duration-*`) and respect reduced motion. Extend the tokens; never add a parallel set.
- Narrate the "why" behind decisions at a level a smart beginner can follow. Keep replies brief and direct. Copy is concise and human, with no em dashes.
- Run `npx next typegen` before `npx tsc --noEmit` when routes change. Local builds can fail fetching Google Fonts offline; Vercel builds fine.

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
