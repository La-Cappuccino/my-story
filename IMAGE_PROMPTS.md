# Nano Banana Pro — Project Image Prompts

Use these prompts in **Google Antigravity** (Nano Banana Pro / Gemini 3 Pro Image) to generate
photorealistic UI screenshots for each project card on the portfolio.

After generating, save images to `/public/project-images/<slug>.webp` (1200×630 recommended)
and add `image: "/project-images/<slug>.webp"` + `imageAlt: "..."` to the matching entry in
`src/components/sections/ProjectsGrid.tsx`.

---

## 1 · afrobeats.no

```
Photorealistic browser screenshot of a modern African music portal website called "afrobeats.no".
Dark near-black background (#0C0A09). Hero section with bold African rhythmic geometric patterns
as background art. Gold (#D97706) and emerald green accent colors. Large heading reads "Norway's
African Music Portal" in white. DJ booking cards arranged in a grid with event posters showing
vibrant Afrobeats/Afropop artwork. AI-powered recommendation chips labeled "7 AI Agents".
Norwegian and African flags subtly integrated. Ultra-realistic, 4K, clean UI, minimal yet
culturally rich. No text artifacts. Shot on 14-inch MacBook display.
```

---

## 2 · RNB Vault

```
Photorealistic browser screenshot of a premium R&B music community platform called "RNB Vault".
Deep purple-to-black gradient background. Glossy vault door motif as hero artwork. Artist cards
showing R&B album cover art with smooth hover states. "Soul Oracle AI" chatbot interface panel
on the right. Spotify-style listening stats. Gemini 2.0 AI badge. Domain toggle showing "rnbvault.no"
and "rnbvault.com". Rose gold and violet accent colors. Sleek, luxurious aesthetic reminiscent of
Apple Music. Ultra-realistic, 4K.
```

---

## 3 · Gadgetikk

```
Photorealistic browser screenshot of a Norwegian tech gadget e-commerce store called "Gadgetikk.no".
Clean white-and-dark product listing page. Product cards showing smartphones, headphones, and
smart home devices with Norwegian Klarna and Vipps payment badges. Blue (#2563EB) call-to-action
buttons. Snap-scrolling product category bar at top. Norwegian text "Neste dag levering" (next-day
delivery). WooCommerce-powered product grid with 4 columns. Ultra-realistic, 4K, professional
e-commerce aesthetic.
```

---

## 4 · TickDid

```
Photorealistic browser screenshot of a minimalist AI task manager app called "TickDid".
Dark charcoal background with soft green accent lights. Task list with AI-suggested subtasks
expanding below each item. AES-256 encryption badge subtly visible in the header. Clean sidebar
with priority labels. AI model selector dropdown. TypeScript/Next.js stack badges. Privacy-first
branding with a lock icon logo. Ultra-clean, focused productivity aesthetic. 4K.
```

---

## 5 · Echorix

```
Photorealistic browser screenshot of a real-time AI market intelligence dashboard called "Echorix".
Deep navy and electric blue color scheme. Multiple animated line charts showing market trend
analysis. AI insight cards with short natural-language summaries. Framer Motion animated data
visualizations. Globe showing global market heatmap. Header reads "Echorix — Market Intelligence".
Compact, data-dense but readable layout. Indigo and blue glow effects. Ultra-realistic, 4K.
```

---

## 6 · Afrobeats Agents

```
Photorealistic technical diagram / terminal screenshot showing a 7-agent LangGraph AI system
for an Afrobeats music community. Dark terminal background. Colorful node graph showing 7
interconnected AI agents labeled: "DJ Booking Agent", "Event Discovery", "Playlist Curator",
"Community Manager", "Analytics Agent", "Recommendation Engine", "Content Moderator". Python
LangGraph code visible in an editor panel. Gemini AI and PyTorch logos. Gold data flow lines
between nodes. Ultra-realistic, 4K, developer aesthetic.
```

---

## 7 · JobHunter

```
Photorealistic browser screenshot of an AI-powered job hunting automation dashboard called
"JobHunter". Dark background with emerald and gold accents. Stats cards showing "47 Jobs Scraped
Today", "12 AI Matches (70%+)", "3 Auto-Applied". Job listing feed with match score badges
(85%, 92%, 78%). AI cover letter preview panel. Vercel Cron schedule showing "7am scrape,
8am match, 9am apply". Norwegian job market branding (arbeidsplassen.nav.no logo). Ultra-realistic,
clean SaaS dashboard aesthetic, 4K.
```

---

## 8 · SykkelPlus

```
Photorealistic browser screenshot of a Norwegian bicycle service and e-commerce website called
"SykkelPlus". Clean white background with a green (#059669) brand color. Booking system interface
showing repair appointment scheduling. n8n workflow automation diagram visible in an admin panel
sidebar. Stats badges showing "−40% Admin Time" and "+30% Conversion". Norwegian text throughout.
Professional service business aesthetic. WordPress-powered. 4K, ultra-realistic.
```

---

## 9 · ALG Dynamics

```
Photorealistic browser screenshot of a B2B marketing agency dashboard for "ALG Dynamics".
Dark professional background. AI content pipeline visualization showing automated blog posts,
social media drafts, and email sequences flowing through Make/n8n workflows. Stats showing
"+60% Content Capacity" and "15h/week saved". Content calendar with AI-generated post previews.
Sleek agency branding. Blue and dark tones. Ultra-realistic, 4K.
```

---

## 10 · Bar & Beyond

```
Photorealistic browser screenshot of a Norwegian bar and nightlife venue website for "Bar & Beyond".
Moody dark atmosphere with warm amber lighting. Hero shows a cocktail bar interior photo.
WooCommerce event ticket purchasing flow. Google Analytics 4 dashboard panel inset showing
"+40% organic traffic". Google Ads ROAS badge showing "ROAS > 4.0". Vibrant nightlife photography
integrated into the design. Norwegian event listings. Ultra-realistic, 4K.
```

---

## Tips for Best Results

1. Open **Google Antigravity** → Manager View → spawn a Nano Banana Pro agent
2. Paste prompt as-is — the model handles photorealistic rendering natively
3. Request **1200×630** resolution for optimal card display (same as OG image standard)
4. Ask for **WebP format** to minimize file size
5. Iterate with: "Make the text sharper", "Increase contrast on the background", "Make it look more premium"

## Once Images Are Ready

Add to each project in `ProjectsGrid.tsx`:
```tsx
image: "/project-images/afrobeats.webp",
imageAlt: "afrobeats.no — Norway's African Music Portal",
```
