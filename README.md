# Brandon Le · Portfolio

Personal site: who I am, my work, my goals, and what I'm working on now.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy flow

- Every branch and pull request gets its own Vercel preview URL.
- Only merges to `main` go to production.

## How it's built

Built with Claude Code, organized like a small product team: three lanes (content, frontend, QA), a roadmap with phase gates, and a decisions log. See `CLAUDE.md` for the full working setup.

**AI tooling in this repo**

- **MCP servers** (`.mcp.json`): [21st.dev](https://21st.dev) for UI components, and [Motion](https://motion.dev)'s hosted servers for animation docs and performance audits.
- **Skills** (`.claude/skills/`): [Emil Kowalski's design engineering skills](https://github.com/emilkowalski/skills) for animation craft, UI stress tests and mobile polish, plus the [Motion AI Kit](https://github.com/motiondivision/ai-kit).
- **Agents** (`.claude/agents/`): `motion-reviewer`, which scores animation performance before release.
- **Design system:** `DESIGN.md`. Every color, size and timing comes from tokens in `src/app/globals.css`.
