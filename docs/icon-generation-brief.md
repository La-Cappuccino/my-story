# AllanOS Icon Generation Brief

> **Project:** AllanOS — AI-powered portfolio desktop OS
> **Route:** `/os` on Allan Kisuule's portfolio site
> **Built by:** Echo Algori Data (Norwegian AI Consultancy)
> **Date:** 2026-03-08
> **Status:** Ready for generation

---

## 1. Project Context

AllanOS is a dark-themed desktop operating system interface that serves as a creative portfolio experience. It lives at the `/os` route and presents Allan Kisuule's work, skills, and personality through a desktop metaphor — windows, a dock/taskbar, draggable icons, and a terminal easter egg.

The visual language inherits from Echo Algori Data's design system: dark glass morphism, liquid glass surfaces, and monochromatic orange accents on near-black backgrounds.

---

## 2. Design System Reference

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary (Echo Orange)** | `#FB6422` | Icon fill, strokes, accents |
| Hot | `#FF7A3D` | Hover states, highlights |
| Dim | `#E55A1F` | Pressed states, shadows |
| Background | `#0a0a0a` | OS desktop background |
| Surface | `#111111` | Window chrome, panels |
| Text | `#f2f2f2` | Labels, UI text |

### Opacity Scale for Depth

Use opacity variations of the primary orange to create depth and layering within each icon:

| Opacity | RGBA | Purpose |
|---------|------|---------|
| 100% | `rgba(251, 100, 34, 1.0)` | Primary strokes, foreground elements |
| 70% | `rgba(251, 100, 34, 0.7)` | Secondary elements, mid-ground |
| 50% | `rgba(251, 100, 34, 0.5)` | Background shapes, depth layers |
| 30% | `rgba(251, 100, 34, 0.3)` | Subtle fills, glow bases |
| 15% | `rgba(251, 100, 34, 0.15)` | Ghost elements, ambient shapes |

### Typography

- **Headings:** Sora (geometric sans-serif)
- **Body:** Manrope (humanist sans-serif)

### Style DNA

- Dark glass morphism, liquid glass
- Subtle orange glow effects
- The Echo Algori Data logo is a circuit-board pattern inside an orange circle — technical, geometric, clean
- Think: native macOS/iOS system icons recolored to monochromatic orange

---

## 3. Global Icon Style Rules

### Dimensions

Each icon must be delivered at multiple sizes. Design at 128x128 and ensure it reads cleanly when scaled down.

| Size | Use Case |
|------|----------|
| 24x24 | Taskbar / dock (smallest) |
| 36x36 | Desktop emoji / inline size |
| 64x64 | Desktop grid icons |
| 128x128 | App window headers, spotlight |

### Technical Specs

- **Format:** SVG (primary), PNG fallback at 64px and 128px
- **Background:** Transparent
- **Color:** Monochromatic `#FB6422` on transparent — same approach as the Echo Algori Data logo SVG
- **Stroke width:** 2px consistent across all icons
- **Corner radius:** 2-4px on rectangular/geometric shapes
- **Line cap:** Round
- **Line join:** Round
- **Viewbox:** `0 0 128 128` (for SVG)
- **Grid padding:** 8px inset from edges (active area is 112x112 within 128x128)

### Style Constraints

- Clean, geometric, slightly technical
- NOT cartoonish, NOT emoji-like, NOT skeuomorphic
- Consistent visual weight across the set
- Each icon should be immediately recognizable at 24x24
- No gradients — use flat orange with opacity variation for depth
- No drop shadows within the SVG (glow effects are applied via CSS in the app)

---

## 4. The 8 Icons

### 4.1 About Me

| Field | Value |
|-------|-------|
| **ID** | `about` |
| **Filename** | `about.svg`, `about-64.png`, `about-128.png` |
| **Concept** | Allan's personal story — identity, signal, presence |

**Design direction:** A person silhouette or head outline with subtle circuit-board traces or signal wave lines emanating from it. The circuit pattern references the Echo Algori Data logo DNA. Avoid a generic "user" circle — this should feel personal and technical. Consider a side profile with data-flow lines tracing through the head, or a frontal bust outline where the interior contains node-and-line patterns.

**Keywords:** identity, signal, circuit, personal, presence

---

### 4.2 Projects

| Field | Value |
|-------|-------|
| **ID** | `projects` |
| **Filename** | `projects.svg`, `projects-64.png`, `projects-128.png` |
| **Concept** | Portfolio of built work — creation, layers, code |

**Design direction:** Layered browser windows with depth (offset stacking), or code brackets `</>` with dimensional depth. The key idea is "things that were built." A stack of 2-3 rectangular window frames with the front one showing a code bracket or layout grid communicates both web development and portfolio. Use opacity variation for the background windows.

**Keywords:** build, layers, code, windows, portfolio, creation

---

### 4.3 Skills

| Field | Value |
|-------|-------|
| **ID** | `skills` |
| **Filename** | `skills.svg`, `skills-64.png`, `skills-128.png` |
| **Concept** | Tech stack — interconnected, structured, technical |

**Design direction:** An interconnected node graph (3-5 nodes connected by lines) or a hexagonal grid arrangement. This represents a technical skill map or circuit diagram. Nodes should be small circles (4-6px radius) connected by 2px lines. Alternatively, a set of 3 interlocking hexagons with dots at vertices. Avoid a simple "brain" or "lightbulb" — keep it structural and data-oriented.

**Keywords:** nodes, connections, graph, hexagon, circuit, stack

---

### 4.4 Resume

| Field | Value |
|-------|-------|
| **ID** | `resume` |
| **Filename** | `resume.svg`, `resume-64.png`, `resume-128.png` |
| **Concept** | CV, career timeline — document, data, professional |

**Design direction:** A document outline (rounded rectangle, portrait orientation) with horizontal lines representing text, but instead of plain lines, use subtle data visualization elements — a mini timeline with dots, or a small bar chart/sparkline in the upper portion. The bottom half can have standard text-placeholder lines. This blends "document" with "data story." Keep the document shape clean with 4px corner radius.

**Keywords:** document, timeline, data, career, professional, clean

---

### 4.5 Contact

| Field | Value |
|-------|-------|
| **ID** | `contact` |
| **Filename** | `contact.svg`, `contact-64.png`, `contact-128.png` |
| **Concept** | Communication — reach out, connect, signal |

**Design direction:** An envelope shape that transitions into or incorporates signal waves or connected dots on one side. The left half could be a recognizable envelope corner/flap, while the right half dissolves into radiating signal arcs or a network of connected points. This conveys "message sent" and "connection made" simultaneously. Alternatively, a chat bubble with a signal/pulse line inside it.

**Keywords:** envelope, signal, connection, message, communication, wave

---

### 4.6 DJ Demure

| Field | Value |
|-------|-------|
| **ID** | `dj` |
| **Filename** | `dj.svg`, `dj-64.png`, `dj-128.png` |
| **Concept** | Music, DJ culture — vinyl, waveform, R&B/Afrobeats |

**Design direction:** A vinyl record (concentric circles) with a waveform/audio visualization replacing the label area or cutting across the record. Or: over-ear headphones silhouette with sound wave lines flowing between the ear cups. This icon represents Allan's DJ Demure identity — R&B and Afrobeats energy. It should feel rhythmic and alive but still geometric. The record + waveform hybrid is the strongest concept: outer circle, groove lines, and a horizontal audio waveform through the center.

**Keywords:** vinyl, record, waveform, headphones, audio, music, rhythm

---

### 4.7 Terminal

| Field | Value |
|-------|-------|
| **ID** | `terminal` |
| **Filename** | `terminal.svg`, `terminal-64.png`, `terminal-128.png` |
| **Concept** | CLI easter egg — hacker, command line, monospace |

**Design direction:** A terminal window frame (rounded rectangle with a top bar containing 3 small circles for window controls) with a command prompt `>_` or `$_` inside. The cursor should suggest a blinking state (a vertical bar or underscore). Keep it minimal — the window frame + prompt symbol is enough. Optional: a single line of "code" above the prompt as a faint 30% opacity element. This should feel like the most "hacker" icon in the set.

**Keywords:** terminal, CLI, prompt, cursor, hacker, monospace, command

---

### 4.8 Settings

| Field | Value |
|-------|-------|
| **ID** | `settings` |
| **Filename** | `settings.svg`, `settings-64.png`, `settings-128.png` |
| **Concept** | OS configuration — system, control, mechanical |

**Design direction:** A gear/cog with circuit traces extending from some of the teeth, or: a set of 3 horizontal slider controls (lines with circular handles at different positions). The gear approach is more immediately recognizable. If using a gear, give it 8 teeth and embed a small circuit-node pattern in the center (echoing the Echo Algori Data logo). If using sliders, space them vertically and vary the handle positions to create visual interest.

**Keywords:** gear, cog, circuit, sliders, controls, system, config

---

## 5. Output File Structure

```
/Users/echo/Projects/active/my-story/public/os-icons/
  about.svg
  about-64.png
  about-128.png
  projects.svg
  projects-64.png
  projects-128.png
  skills.svg
  skills-64.png
  skills-128.png
  resume.svg
  resume-64.png
  resume-128.png
  contact.svg
  contact-64.png
  contact-128.png
  dj.svg
  dj-64.png
  dj-128.png
  terminal.svg
  terminal-64.png
  terminal-128.png
  settings.svg
  settings-64.png
  settings-128.png
```

Total: 8 SVGs + 16 PNGs = 24 files.

---

## 6. Generation Methods

Try each method below. Use whichever produces the best results — likely a combination.

### Method 1: Manual SVG Craft

Write SVGs by hand or with code. Best for geometric icons like terminal, settings, and skills where precision matters.

**Template structure:**
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <!-- Active area: 8px padding = draw within 8,8 to 120,120 -->
  <g stroke="#FB6422" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- Icon geometry here -->
  </g>
</svg>
```

### Method 2: Canva MCP

Use the Canva MCP tools to generate or find assets:
- `generate-design` with detailed prompts per icon
- `get-assets` to search for base shapes to customize
- Export as SVG or high-res PNG

**Prompt template for Canva:**
> "Minimal geometric icon, monochromatic orange #FB6422 on transparent background, 2px stroke, no fill, clean technical style similar to macOS system icons. Subject: [DESCRIPTION]. Style: dark UI icon set, geometric, circuit-board influenced."

### Method 3: Gemini API (Image Generation)

Use Gemini's image generation with detailed per-icon prompts. Post-process to ensure monochromatic orange and transparent background.

**Prompt template for Gemini:**
> "Generate a minimal, geometric app icon for a dark-themed desktop OS. The icon represents [CONCEPT]. Style: monochromatic outline in orange (#FB6422) on transparent background, 2px consistent stroke weight, rounded line caps, clean and technical like macOS system icons. No gradients, no shadows, no background shape. The icon should be immediately recognizable at 24x24 pixels. Geometric and slightly technical aesthetic with subtle circuit-board influence."

### Method 4: AI Design Tools (Cursor, v0, etc.)

Feed this entire brief (or the individual icon section) to an AI design tool and iterate.

---

## 7. Quality Checklist

Before accepting any icon, verify:

- [ ] Transparent background (no white/dark rectangle behind it)
- [ ] Uses only `#FB6422` and its opacity variants (no other colors)
- [ ] Stroke width is 2px (consistent with the set)
- [ ] Recognizable at 24x24 — squint test
- [ ] No clipping at edges (respects 8px padding within 128x128)
- [ ] SVG viewBox is `0 0 128 128`
- [ ] SVG has no embedded raster images
- [ ] PNG exports are crisp (not upscaled from smaller)
- [ ] All 8 icons feel like they belong to the same family
- [ ] Style matches the Echo Algori Data brand (technical, geometric, clean)
- [ ] No cartoonish or emoji-style elements
- [ ] Round line caps and joins

---

## 8. Implementation Reference

Once icons are generated, they will be used in the AllanOS component like this:

```tsx
// Example usage in the OS desktop grid
const apps = [
  { id: 'about', label: 'About Me', icon: '/os-icons/about.svg' },
  { id: 'projects', label: 'Projects', icon: '/os-icons/projects.svg' },
  { id: 'skills', label: 'Skills', icon: '/os-icons/skills.svg' },
  { id: 'resume', label: 'Resume', icon: '/os-icons/resume.svg' },
  { id: 'contact', label: 'Contact', icon: '/os-icons/contact.svg' },
  { id: 'dj', label: 'DJ Demure', icon: '/os-icons/dj.svg' },
  { id: 'terminal', label: 'Terminal', icon: '/os-icons/terminal.svg' },
  { id: 'settings', label: 'Settings', icon: '/os-icons/settings.svg' },
];
```

CSS glow effect applied on hover (handled in app code, not in the SVG):

```css
.os-icon:hover {
  filter: drop-shadow(0 0 8px rgba(251, 100, 34, 0.6));
}
```

---

## 9. Reference Material

- **Echo Algori Data logo:** Circuit-board pattern inside an orange circle — the north star for style
- **macOS Sonoma icons:** Reference for proportions and clarity at small sizes
- **SF Symbols (Apple):** Reference for stroke consistency and geometric simplicity
- **Phosphor Icons:** Open-source set with similar geometric/clean approach

---

*Brief prepared for handoff to any AI tool, designer, or agent. All context needed for generation is contained in this document.*
