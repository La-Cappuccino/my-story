# AGENTS.md — my-story (OpenAI Codex / Agent Context)

> Standard AGENTS.md for OpenAI Codex, GPT-based agents, and any agent that reads root-level AGENTS.md.
> Canonical agent config: `.claude/CLAUDE.md` (Claude Code) | `.cursor/rules.md` (Cursor) | `.antigravity/AGENTS.md` (Google Antigravity)

---

## Project

Personal portfolio and brand site for **Allan Kisuule**.

- **Owner**: Allan Kisuule — Fullstack Developer, AI Engineer, Founder @ Echo Algori Data
- **Email**: allan@echoalgoridata.no
- **Live site**: https://allan.echoalgoridata.no
- **GitHub**: https://github.com/La-Cappuccino/my-story
- **Companies**: echoalgoridata.no · echoalgoridata.com (same org, two TLDs)

---

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript 5 strict
- **Tailwind CSS v4** — `@import "tailwindcss"` + `@theme {}` in `globals.css`
- **Framer Motion 12** — page/scroll animations
- **GSAP 3 + ScrollTrigger** — story timeline, pinned sections
- **Lenis** — smooth scroll (integrated with GSAP ticker)
- **Three.js / R3F** — optional 3D elements
- **next-themes** — dark/light theme (dark default)
- **Resend** — transactional email (contact form)
- **Vercel** — hosting + edge deployment

---

## Commands

```bash
npm run dev       # Dev server — http://localhost:3000
npm run build     # Build for production
npm run lint      # Lint with ESLint
```

---

## Source Map

```
src/app/                      Next.js App Router pages
  layout.tsx                  Root layout (ThemeProvider, Nav, Footer, Lenis)
  page.tsx                    Homepage
  globals.css                 ALL design tokens (Tailwind v4 @theme)
  story/ | projects/ | stack/ | contact/    Routes
  api/contact/route.ts        POST endpoint → Resend email

src/components/
  layout/                     Nav, Footer, SmoothScrollProvider
  sections/                   All page sections (HeroSection, ProjectsGrid, StackDisplay, etc.)

src/lib/utils.ts              cn(), formatDate(), truncate(), slugify()

public/project-images/        Project screenshots (generate via IMAGE_PROMPTS.md)
IMAGE_PROMPTS.md              Nano Banana Pro prompts for all 10 project screenshots
.env.local.example            Required env vars template
```

---

## Key Design Tokens (from globals.css)

```
--color-gold:    #D97706   Primary CTA, highlights
--color-blue:    #2563EB   Secondary accent
--color-emerald: #059669   Tertiary accent
--bg:            var(--color-dark-bg)    → #0C0A09
--surface:       var(--color-dark-surface)
--text:          var(--color-text-primary)
--border:        var(--color-dark-border)
```

---

## Agent Task Examples

### "Add a project to the portfolio"
1. Open `src/components/sections/ProjectsGrid.tsx`
2. Add entry to the `PROJECTS` array with: `id`, `title`, `description`, `categories`, `stack`, `liveUrl?`, `githubUrl?`, `gradientFrom`, `gradientTo`
3. For screenshots: see `IMAGE_PROMPTS.md` for Nano Banana Pro generation prompts

### "Update the hero tagline"
- Edit `TYPEWRITER_STRINGS` in `src/components/sections/HeroSection.tsx`

### "Add a new skill to the stack"
- Edit `STACK` array in `src/components/sections/StackDisplay.tsx`

### "Deploy changes"
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx vercel --prod --yes
```

---

## Non-Negotiable Rules

| Rule | Reason |
|------|--------|
| Use `@import "tailwindcss"` not `@tailwind` | This is Tailwind v4 |
| Use `next/image` not `<img>` | Optimization + LCP |
| `"use client"` only when needed | Maximize RSCs for perf |
| `var(--token)` not hardcoded hex | Theme consistency |
| TypeScript strict — no `any` | Owner requirement |
| App Router only — no `pages/` | Next.js 16 architecture |

---

## Owner Contact

For questions about the project content (bio, projects, skills):
**Allan Kisuule** — allan@echoalgoridata.no — Oslo, Norway
