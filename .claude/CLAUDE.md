# CLAUDE.md — my-story (Allan Kisuule)

> This file is loaded automatically by Claude Code. Keep it updated when the codebase changes.

## Project

Personal brand, portfolio, and mini-wiki for **Allan Kisuule** — Fullstack Developer, AI Engineer,
and Founder of **Echo Algori Data** (echoalgoridata.no & echoalgoridata.com).

- **Live URL**: https://allan.echoalgoridata.no
- **GitHub**: https://github.com/La-Cappuccino/my-story
- **Owner email**: allan@echoalgoridata.no

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (`@theme` in CSS, NOT `tailwind.config.js`) |
| Animation | Framer Motion 12, GSAP 3 + ScrollTrigger |
| Scroll | Lenis 1.3 (smooth scroll, integrated with GSAP ticker) |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Theme | next-themes (dark default, class-based) |
| Analytics | Vercel Analytics |
| Email | Resend (contact form API route) |
| Fonts | Geist Sans + Geist Mono |
| Deploy | Vercel (auto-deploy from GitHub main) |

---

## Dev Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # Production build — always run before deploy
npm run lint     # ESLint (Next.js config)
```

**Deploy to production:**
```bash
# macOS with cert issues:
NODE_TLS_REJECT_UNAUTHORIZED=0 npx vercel --prod --yes

# Normal (Linux/CI):
npx vercel --prod --yes
```

---

## File Structure

```
src/
  app/
    layout.tsx              ← Root layout: ThemeProvider, Nav, Footer, SmoothScrollProvider
    page.tsx                ← Home: Hero + MetricsBar + StoryTeaser + FeaturedProjects + Testimonials + CTA
    globals.css             ← Tailwind v4 @theme block + ALL design tokens + base resets
    story/page.tsx          ← GSAP ScrollTrigger timeline chapters
    projects/page.tsx       ← ProjectsGrid with filter pills
    stack/page.tsx          ← StackDisplay with category filter
    contact/page.tsx        ← ContactForm (4 states: idle/loading/success/error)
    api/contact/route.ts    ← Resend email handler (POST only, validated)
  components/
    layout/
      Nav.tsx               ← Scroll-aware sticky nav + mobile drawer
      Footer.tsx            ← 3-column: identity | nav | social links
      SmoothScrollProvider.tsx ← Lenis init + GSAP ticker integration
    sections/               ← All page sections as standalone components
      HeroSection.tsx       ← Typewriter + magnetic CTAs + SVG globe (Kampala/Berlin/Oslo)
      MetricsBar.tsx        ← Count-up numbers on scroll
      StoryTeaser.tsx       ← 3-chapter cards linking to /story
      FeaturedProjects.tsx  ← Bento grid: afrobeats.no, RNB Vault, Gadgetikk
      ProjectsGrid.tsx      ← Full grid with category filter + tilt cards + image support
      StackDisplay.tsx      ← Skill pills by category + AI Workflow card
      Testimonials.tsx      ← CSS marquee testimonials
      CTASection.tsx        ← Available Now CTA block
      ContactForm.tsx       ← Animated form with confetti on success
      StoryTimeline.tsx     ← GSAP-pinned scroll chapters
  lib/
    utils.ts                ← cn(), formatDate(), truncate(), slugify(), lerp(), clamp()
public/
  project-images/           ← Project screenshots (generate via Nano Banana Pro prompts in IMAGE_PROMPTS.md)
IMAGE_PROMPTS.md            ← Nano Banana Pro prompts for all 10 project screenshots
```

---

## Design System

### Tailwind v4 Critical Notes
- **Import**: `@import "tailwindcss"` — NOT `@tailwind base/components/utilities`
- **Config**: `@theme {}` block inside `globals.css` — NOT `tailwind.config.js`
- All brand tokens live in `globals.css` — read it before touching colors

### Brand Palette
```
Gold:    #D97706 · light: #F59E0B · dim: #92400E
Blue:    #2563EB · light: #3B82F6 · dim: #1E3A8A
Emerald: #059669 · light: #10B981 · dim: #064E3B
```

### Semantic CSS Variables (use these in JSX `style={}` and CSS)
```
--bg / --surface / --elevated    Background layers
--border                         Card / divider borders
--text / --text-2 / --text-3     Text hierarchy
--accent (gold) / --accent-2 (emerald) / --accent-3 (blue)
--muted / --subtle               Subdued text/ui
```

### Utility Classes (defined in globals.css)
- `.section-container` — max-w-[1280px] + responsive padding
- `.card-surface` — surface bg + border + hover gold glow
- `.gradient-text` — gold→emerald gradient
- `.gradient-text-blue` — blue→emerald gradient
- `.link-hover` — animated underline
- `.noise` — film grain texture via `::before`
- `.aurora-glow[-gold/-blue/-emerald]` — blurred radial glow orbs

---

## Component Patterns

### Animation (Framer Motion)
```tsx
// Stagger list items
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

// Scroll reveal
<motion.div whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

// Filter animation
<LayoutGroup><AnimatePresence mode="popLayout">{items.map(...)}</AnimatePresence></LayoutGroup>
```

### GSAP ScrollTrigger
```tsx
useEffect(() => {
  const trigger = ScrollTrigger.create({ trigger: ref.current, pin: true, scrub: 1, ... });
  return () => trigger.kill();
}, []);
```

### Adding a Project Screenshot
1. Generate image using prompt from `IMAGE_PROMPTS.md` (Nano Banana Pro)
2. Save to `/public/project-images/<slug>.webp` (1200×630)
3. In `ProjectsGrid.tsx`, add to the project object:
   ```ts
   image: "/project-images/afrobeats.webp",
   imageAlt: "afrobeats.no — Norway's African Music Portal",
   ```

---

## Environment Variables

Copy `.env.local.example` → `.env.local` and fill in:

```env
RESEND_API_KEY=re_...                     # Resend.com API key (contact form)
NEXT_PUBLIC_SUPABASE_URL=...              # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=...         # Supabase anon key
NEXT_PUBLIC_SITE_URL=https://allan.echoalgoridata.no
SPOTIFY_CLIENT_ID=                        # Optional: Now Playing widget
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

---

## Strict Rules (never break these)

1. **Tailwind v4** — `@import "tailwindcss"` + `@theme {}` only. Zero `@tailwind` directives.
2. **App Router** — no `pages/` directory. All routes under `src/app/`.
3. **Images** — always `next/image`. Never raw `<img>` except inline SVG.
4. **"use client"** — only when the component uses hooks, event handlers, or browser APIs.
5. **No hardcoded colors** — use `var(--token)` or Tailwind `text-[var(--token)]`.
6. **TypeScript strict** — no `any`, no `@ts-ignore`, no implicit returns.
7. **Server Components first** — default to RSC; add `"use client"` only when required.

---

## Common Tasks

### Add a new page section
1. Create `src/components/sections/MySection.tsx` (client component if animated)
2. Import and add to `src/app/page.tsx`
3. Use `.section-container` wrapper class

### Add a new project to the grid
Edit `PROJECTS` array in `src/components/sections/ProjectsGrid.tsx`

### Add a new skill
Edit `STACK` array in `src/components/sections/StackDisplay.tsx`

### Update owner info / bio copy
- `src/components/sections/HeroSection.tsx` — overline + typewriter strings
- `src/components/sections/CTASection.tsx` — availability blurb
- `src/components/layout/Footer.tsx` — identity column

### Deploy
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx vercel --prod --yes
# Aliases automatically to: https://allan.echoalgoridata.no
```
