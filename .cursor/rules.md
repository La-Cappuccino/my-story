# Cursor Rules — my-story (Allan Kisuule)

## Project
Personal brand / portfolio site for Allan Kisuule.
- URL: https://allan.echoalgoridata.no
- Stack: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lenis · Three.js
- Owner: Allan Kisuule — Founder, Echo Algori Data (echoalgoridata.no & echoalgoridata.com)

---

## Code Style

### TypeScript
- Strict TypeScript everywhere — no `any`, no `as unknown`
- Prefer `interface` over `type` for object shapes
- Always type component props explicitly; no implicit `children: any`
- Use named exports for components; default export only for page-level files

### React / Next.js
- App Router only — no Pages Router patterns
- `"use client"` only when needed (interactivity / hooks); keep Server Components the default
- Use `next/image` for ALL images — never raw `<img>` except inline SVG
- Use `next/link` for internal navigation — never `<a href>` for same-origin links
- Data fetching: `fetch()` in Server Components with `cache:` options, not `useEffect`

### Tailwind CSS v4
- Config via `@theme` block in `globals.css` — NOT `tailwind.config.js`
- Import: `@import "tailwindcss"` — NOT `@tailwind base/components/utilities`
- Use CSS custom properties (`var(--color-gold)`, `var(--text)`) for brand colors — avoid hardcoded hex in className
- Utility-first: compose classes, don't write custom CSS for anything Tailwind covers
- Responsive: mobile-first (`sm:`, `md:`, `lg:`)

### Framer Motion
- Use `containerVariants` / `itemVariants` stagger pattern for list animations
- `whileInView` + `viewport={{ once: true }}` for scroll reveals
- `AnimatePresence mode="popLayout"` for filtered/sorted lists
- `LayoutGroup` wrapping filter + grid for smooth layout transitions

### GSAP
- Always integrate with Lenis via `gsap.ticker.add(time => lenis.raf(time * 1000))`
- Use `ScrollTrigger.create()` in `useEffect` with cleanup returning `() => trigger.kill()`
- Pin sections with `pin: true, scrub: 1`

---

## Design System

### Palette (from globals.css @theme)
- Gold: `#D97706` / light: `#F59E0B` / dim: `#92400E`
- Blue: `#2563EB` / light: `#3B82F6` / dim: `#1E3A8A`
- Emerald: `#059669` / light: `#10B981` / dim: `#064E3B`
- Dark BG: `#0C0A09` · Surface: `#141210` · Elevated: `#1C1917`
- Border: `#292524` · Muted: `#78716C` · Subtle: `#44403C`

### Semantic tokens (use these in components)
- Background: `var(--bg)` / `var(--surface)` / `var(--elevated)`
- Text: `var(--text)` / `var(--text-2)` / `var(--text-3)`
- Accent: `var(--accent)` (gold) / `var(--accent-2)` (emerald) / `var(--accent-3)` (blue)
- Border: `var(--border)`

### Utility classes (from globals.css)
- `.gradient-text` — gold→emerald gradient text
- `.gradient-text-blue` — blue→emerald gradient text
- `.section-container` — max-w-[1280px] centered with padding
- `.card-surface` — surface + border + hover gold glow
- `.aurora-glow` / `.aurora-glow-gold` / `.aurora-glow-blue` / `.aurora-glow-emerald`
- `.link-hover` — animated underline on hover
- `.noise` — film grain overlay via ::before pseudo

### Fonts
- Sans: `var(--font-geist-sans)` (Geist)
- Mono: `var(--font-geist-mono)` (Geist Mono)

---

## File Structure

```
src/
  app/
    layout.tsx          # Root layout — ThemeProvider, Nav, Footer, SmoothScrollProvider
    page.tsx            # Home — HeroSection + MetricsBar + StoryTeaser + FeaturedProjects + Testimonials + CTASection
    globals.css         # Tailwind v4 @theme + design tokens
    story/page.tsx      # Story page (GSAP ScrollTrigger timeline)
    projects/page.tsx   # Projects grid with filter
    stack/page.tsx      # Stack display with category filter
    contact/page.tsx    # Contact form
    api/contact/route.ts# Resend email API
  components/
    layout/
      Nav.tsx           # Scroll-aware nav + mobile drawer
      Footer.tsx        # Three-column footer
      SmoothScrollProvider.tsx  # Lenis + GSAP ticker
    sections/           # All page sections as standalone components
  lib/
    utils.ts            # cn(), formatDate(), truncate(), etc.
```

---

## Environment Variables

Required in `.env.local` (see `.env.local.example`):
- `RESEND_API_KEY` — contact form email (resend.com)
- `NEXT_PUBLIC_SUPABASE_URL` — for future guestbook / view counts
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase public key
- `NEXT_PUBLIC_SITE_URL` — canonical URL (https://allan.echoalgoridata.no)

---

## Adding Project Screenshots (Nano Banana Pro)

1. Generate images using prompts in `IMAGE_PROMPTS.md` via Google Antigravity / Nano Banana Pro
2. Save to `/public/project-images/<slug>.webp` at 1200×630
3. Add `image` + `imageAlt` props to the project entry in `src/components/sections/ProjectsGrid.tsx`

---

## Do Not
- Do NOT use `@tailwind` directives (v3 syntax) — this is Tailwind v4
- Do NOT add `tailwind.config.js` — config lives in CSS
- Do NOT use Pages Router (`pages/` directory)
- Do NOT hardcode hex colours that have a semantic token equivalent
- Do NOT import from `react` for `useState`, `useEffect` etc in RSCs — only in client components
- Do NOT use `console.log` in production code
