# Google Antigravity — Agent Configuration
# my-story · Allan Kisuule's Personal Brand Site

## Project Context

Personal portfolio and brand site for **Allan Kisuule**, Fullstack Developer, AI Engineer,
and Founder of **Echo Algori Data** (echoalgoridata.no & echoalgoridata.com).

- **Live URL**: https://allan.echoalgoridata.no
- **GitHub**: https://github.com/La-Cappuccino/my-story
- **Stack**: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Three.js · Lenis

---

## Recommended Multi-Agent Task Split

Use Antigravity's **Manager View** to spawn parallel agents:

| Agent | Task | Focus Files |
|-------|------|-------------|
| Agent A (UI) | Visual components, animations | `src/components/sections/` |
| Agent B (Layout) | Nav, Footer, routing | `src/components/layout/`, `src/app/layout.tsx` |
| Agent C (Data) | Content updates, project data | `ProjectsGrid.tsx`, `FeaturedProjects.tsx`, `StackDisplay.tsx` |
| Agent D (Images) | Generate screenshots via Nano Banana Pro | `IMAGE_PROMPTS.md`, `/public/project-images/` |
| Agent E (API) | Contact form, backend routes | `src/app/api/` |

---

## Nano Banana Pro — Image Generation Workflow

This project has dedicated prompts for generating project screenshots.

**How to use inside Antigravity:**
1. Open Manager View → spawn a Nano Banana Pro image agent
2. Load `IMAGE_PROMPTS.md` as context
3. Request: "Generate the screenshot for project [name] using the prompt in IMAGE_PROMPTS.md"
4. Save output to `/public/project-images/<slug>.webp` at 1200×630px
5. Update the project entry in `src/components/sections/ProjectsGrid.tsx`:
   ```tsx
   image: "/project-images/afrobeats.webp",
   imageAlt: "afrobeats.no — Norway's African Music Portal",
   ```

**Visual Design Language (for Nano Banana prompts):**
- Dark near-black background (#0C0A09)
- Gold (#D97706) primary accent
- Emerald (#059669) secondary accent
- Norwegian Blue (#2563EB) tertiary
- Geist Sans/Mono fonts
- Clean, minimal, data-dense UI aesthetic
- "Afro-Nordic Futurism" — Uganda heritage + Norwegian precision + AI-forward

---

## Design Token Reference

For any UI mockup generation, the brand palette:
```
Gold:    #D97706 (primary CTA, headings)
Blue:    #2563EB (links, secondary)
Emerald: #059669 (success states, accents)
BG:      #0C0A09 (main background)
Surface: #141210 (cards)
Border:  #292524 (card borders)
Text:    #FAFAF9 (primary) · #D6D3D1 (secondary) · #A8A29E (muted)
```

---

## Build & Dev Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

**Deploy:**
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx vercel --prod --yes
```

---

## Critical Rules for Agents

1. **Tailwind v4**: Use `@import "tailwindcss"` and `@theme {}` — NOT `@tailwind` directives
2. **App Router**: No `pages/` directory — all routing via `src/app/`
3. **Images**: Always use `next/image` — never raw `<img>` tags
4. **Semantic tokens**: Use `var(--text)`, `var(--bg)` etc — never hardcode hex in JSX className
5. **"use client"**: Only on interactive components that use hooks or browser APIs
6. **TypeScript**: Strict mode — no `any`, no `ts-ignore`

---

## Owner Info (for PR descriptions, commit messages)

- **Allan Kisuule** — Fullstack Developer & AI Engineer
- **Email**: allan@echoalgoridata.no
- **GitHub**: La-Cappuccino
- **Company**: Echo Algori Data (echoalgoridata.no · echoalgoridata.com)
- **Location**: Oslo, Norway
