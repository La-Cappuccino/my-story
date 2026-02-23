'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ── GSAP registration ──────────────────────────────────── */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Types ──────────────────────────────────────────────── */
interface ChapterData {
  id: string;
  number: string;
  years: string;
  city: string;
  country: string;
  palette: {
    bg: string;
    accent: string;
    accentDim: string;
    text: string;
    textMuted: string;
  };
  content: {
    heading: string;
    body: string[];
    pullQuote: string;
    extra?: React.ReactNode;
  };
  stats?: { value: string; label: string }[];
}

/* ── Chapter definitions ────────────────────────────────── */
const CHAPTERS: ChapterData[] = [
  {
    id: 'kampala',
    number: '01',
    years: '1991 – 2019',
    city: 'Kampala',
    country: 'Uganda',
    palette: {
      bg: 'linear-gradient(160deg, #1a0f00 0%, #2d1a00 40%, #0f0a00 100%)',
      accent: '#D97706',
      accentDim: '#92400E',
      text: '#FEF3C7',
      textMuted: '#D97706aa',
    },
    content: {
      heading: 'Where the instinct was forged.',
      body: [
        'Born in Uganda in 1991. Studied Information Systems Technology at Uganda Technology and Management University (UTMU) from 2013 to 2016, earning a Bachelor\'s degree.',
        'Those years were spent in IT support and system administration — the unglamorous, real-world work that builds an instinct for how technology actually serves people. Keeping systems running. Diagnosing problems at 2am. Understanding that uptime is not a feature, it\'s a promise.',
        'But Kampala was a starting point, not a destination. Allan wanted to build things, not just keep them running. The distance between maintaining and creating was too wide to ignore.',
      ],
      pullQuote:
        'Kampala taught me that technology should serve people, not the other way around.',
    },
  },
  {
    id: 'berlin',
    number: '02',
    years: '2022',
    city: 'Berlin',
    country: 'Germany',
    palette: {
      bg: 'linear-gradient(160deg, #030712 0%, #0f172a 40%, #020617 100%)',
      accent: '#3B82F6',
      accentDim: '#1E3A8A',
      text: '#DBEAFE',
      textMuted: '#3B82F6aa',
    },
    content: {
      heading: 'The foundation. The vocabulary. The confidence.',
      body: [
        'In 2022 he made the leap to Berlin and enrolled in Le Wagon\'s 24-week full-stack web development bootcamp. Intensive by design: 400+ hours of Ruby on Rails, JavaScript, PostgreSQL, Git, Heroku, and team-based Agile delivery.',
        'Three projects shipped during the program: Paritize, a team collaboration tool; Drivicon, a driver-matching application; and AfroTorget v1 — an African marketplace prototype that planted the seed for everything that came later.',
        'Le Wagon gave him the technical foundation, the vocabulary of modern web development, and the conviction that he could ship real products under pressure. That conviction has never left.',
      ],
      pullQuote: '400+ hours. 3 projects. 1 idea that became everything.',
      extra: (
        <div
          className="rounded-xl p-4 font-mono text-xs leading-relaxed overflow-x-auto"
          style={{
            background: 'rgba(59,130,246,0.08)',
            border: '1px solid rgba(59,130,246,0.2)',
            color: '#93C5FD',
          }}
        >
          <p style={{ color: '#60A5FA', marginBottom: '0.25rem' }}># config/routes.rb</p>
          <p>Rails.application.routes.draw do</p>
          <p>&nbsp;&nbsp;root to: <span style={{ color: '#34D399' }}>"markets#index"</span></p>
          <p>&nbsp;&nbsp;resources <span style={{ color: '#FCD34D' }}>::markets</span> do</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;resources <span style={{ color: '#FCD34D' }}>::products</span></p>
          <p>&nbsp;&nbsp;end</p>
          <p>&nbsp;&nbsp;devise_for <span style={{ color: '#FCD34D' }}>::users</span></p>
          <p>end</p>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}># AfroTorget v1 — Le Wagon Berlin, 2022</p>
        </div>
      ),
    },
  },
  {
    id: 'oslo',
    number: '03',
    years: '2022 – Present',
    city: 'Oslo',
    country: 'Norway',
    palette: {
      bg: 'linear-gradient(160deg, #001a0f 0%, #003320 40%, #001a14 100%)',
      accent: '#10B981',
      accentDim: '#064E3B',
      text: '#D1FAE5',
      textMuted: '#10B981aa',
    },
    content: {
      heading: 'One person. Many agents. Shipping at team speed.',
      body: [
        '26+ WordPress websites for Norwegian small businesses — booking systems, Stripe, Vipps, Klarna, SEO, multilingual — the full stack of what a small business actually needs to exist online.',
        'In early 2024, registered Echo Algori Data as a formal AI consultancy. The core proposition: one person, augmented by AI agents, delivering at the capacity of a small agency. MVPs in 3–4 weeks. 0% equity taken.',
        'Enrolled at Noroff School of Technology for Applied Machine Learning (60 ECTS). Built a multi-agent AI workflow orchestrating Claude Code, OpenAI Codex, Cursor, Gemini, and 10+ MCP servers in parallel. Context engineering, not just prompt engineering.',
        'Three own products in production: afrobeats.no (Norway\'s African music portal), RNB Vault (R&B community platform), Gadgetikk.no (tech e-commerce). Real users. Real payments. Real infrastructure.',
      ],
      pullQuote: 'One person. Many agents. Shipping at team speed.',
    },
    stats: [
      { value: '26+', label: 'Sites Built' },
      { value: '6+',  label: 'Apps Shipped' },
      { value: '3',   label: 'Live Products' },
      { value: '36',  label: 'GitHub Repos' },
    ],
  },
];

/* ── Pull quote component ───────────────────────────────── */
function PullQuote({ text, accent }: { text: string; accent: string }) {
  return (
    <blockquote
      className="border-l-4 pl-6 py-1 my-6 text-xl md:text-2xl font-semibold leading-snug italic"
      style={{ borderColor: accent, color: accent }}
    >
      "{text}"
    </blockquote>
  );
}

/* ── Stats bar ──────────────────────────────────────────── */
function StatsBar({
  stats,
  accent,
}: {
  stats: { value: string; label: string }[];
  accent: string;
}) {
  return (
    <div className="flex flex-wrap gap-6 mt-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-0.5">
          <span className="text-3xl font-black tabular-nums" style={{ color: accent }}>
            {s.value}
          </span>
          <span className="text-xs tracking-widest uppercase" style={{ color: `${accent}99` }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Mobile chapter card (fallback) ────────────────────── */
function MobileChapter({ chapter, index }: { chapter: ChapterData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      id={chapter.id}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen flex flex-col justify-center px-6 py-20"
      style={{ background: chapter.palette.bg }}
    >
      {/* Chapter number watermark */}
      <span
        className="absolute top-8 right-6 text-8xl font-black opacity-5 leading-none select-none pointer-events-none"
        style={{ color: chapter.palette.accent }}
      >
        {chapter.number}
      </span>

      <div className="max-w-lg mx-auto w-full flex flex-col gap-4">
        {/* Year / city labels */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-mono font-semibold px-3 py-1 rounded-full border"
            style={{
              borderColor: chapter.palette.accentDim,
              color: chapter.palette.accent,
              backgroundColor: `${chapter.palette.accent}14`,
            }}
          >
            {chapter.years}
          </span>
        </div>

        <h2
          className="text-5xl font-black leading-none tracking-tight"
          style={{ color: chapter.palette.accent }}
        >
          {chapter.city}
          <span
            className="block text-base font-normal mt-1"
            style={{ color: chapter.palette.textMuted }}
          >
            {chapter.country}
          </span>
        </h2>

        <h3
          className="text-xl font-semibold mt-2"
          style={{ color: chapter.palette.text }}
        >
          {chapter.content.heading}
        </h3>

        {chapter.content.body.map((para, i) => (
          <p
            key={i}
            className="text-base leading-relaxed"
            style={{ color: `${chapter.palette.text}cc` }}
          >
            {para}
          </p>
        ))}

        <PullQuote text={chapter.content.pullQuote} accent={chapter.palette.accent} />

        {chapter.content.extra && <div className="mt-2">{chapter.content.extra}</div>}

        {chapter.stats && (
          <StatsBar stats={chapter.stats} accent={chapter.palette.accent} />
        )}
      </div>
    </motion.article>
  );
}

/* ── Desktop pinned chapter (GSAP ScrollTrigger) ───────── */
function DesktopChapters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      CHAPTERS.forEach((chapter, i) => {
        const el = chapterRefs.current[i];
        if (!el) return;

        // Fade in the content when chapter scrolls into view
        const content = el.querySelector('.chapter-content');
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'top 30%',
                scrub: false,
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Watermark number parallax
        const watermark = el.querySelector('.chapter-watermark');
        if (watermark) {
          gsap.fromTo(
            watermark,
            { y: 60 },
            {
              y: -60,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {CHAPTERS.map((chapter, i) => (
        <section
          key={chapter.id}
          id={chapter.id}
          ref={(el) => { chapterRefs.current[i] = el; }}
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: chapter.palette.bg }}
        >
          {/* Chapter number watermark */}
          <span
            className="chapter-watermark absolute right-0 top-1/2 -translate-y-1/2 text-[22vw] font-black leading-none select-none pointer-events-none"
            style={{ color: chapter.palette.accent, opacity: 0.04 }}
          >
            {chapter.number}
          </span>

          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 40% 60% at 10% 50%, ${chapter.palette.accent}18 0%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div
            className="chapter-content section-container w-full grid grid-cols-2 gap-16 items-center"
            style={{ opacity: 0 }}
          >
            {/* Left: labels + headline */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-mono font-semibold px-3 py-1 rounded-full border"
                  style={{
                    borderColor: chapter.palette.accentDim,
                    color: chapter.palette.accent,
                    backgroundColor: `${chapter.palette.accent}14`,
                  }}
                >
                  {chapter.years}
                </span>
                <span
                  className="text-xs tracking-widest uppercase font-semibold"
                  style={{ color: chapter.palette.textMuted }}
                >
                  {chapter.country}
                </span>
              </div>

              <h2
                className="text-7xl xl:text-8xl font-black leading-none tracking-tight"
                style={{ color: chapter.palette.accent }}
              >
                {chapter.city}
              </h2>

              <h3
                className="text-2xl font-semibold mt-2 leading-snug max-w-sm"
                style={{ color: chapter.palette.text }}
              >
                {chapter.content.heading}
              </h3>

              {chapter.stats && (
                <StatsBar stats={chapter.stats} accent={chapter.palette.accent} />
              )}
            </div>

            {/* Right: body + pull quote */}
            <div className="flex flex-col gap-4">
              {chapter.content.body.map((para, j) => (
                <p
                  key={j}
                  className="text-base leading-relaxed"
                  style={{ color: `${chapter.palette.text}cc` }}
                >
                  {para}
                </p>
              ))}

              <PullQuote
                text={chapter.content.pullQuote}
                accent={chapter.palette.accent}
              />

              {chapter.content.extra && (
                <div className="mt-2">{chapter.content.extra}</div>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/* ── Navigation dots ────────────────────────────────────── */
function NavDots() {
  return (
    <nav
      aria-label="Story chapters"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
    >
      {CHAPTERS.map((ch) => (
        <a
          key={ch.id}
          href={`#${ch.id}`}
          title={ch.city}
          className="w-2 h-2 rounded-full transition-all duration-300 hover:scale-150"
          style={{ backgroundColor: ch.palette.accent, opacity: 0.5 }}
          aria-label={`Go to ${ch.city} chapter`}
        />
      ))}
    </nav>
  );
}

/* ── Page header ────────────────────────────────────────── */
function StoryHeader() {
  return (
    <header
      className="section-container flex flex-col gap-4 border-b"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--bg)',
        paddingBlock: '5rem',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: 'var(--color-gold)' }}
      >
        The Full Story
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl md:text-7xl font-black tracking-tight leading-none"
      >
        Kampala.
        <br />
        <span className="gradient-text-blue">Berlin.</span>
        <br />
        <span className="gradient-text">Oslo.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-xl text-lg mt-2"
        style={{ color: 'var(--text-2)' }}
      >
        Not a story of reinvention. A story of accumulation. Each chapter added skills, context,
        and conviction. The through-line has always been the same: build useful things, ship them,
        and keep moving.
      </motion.p>
    </header>
  );
}

/* ── StoryTimeline ──────────────────────────────────────── */
export default function StoryTimeline() {
  return (
    <>
      <StoryHeader />
      <NavDots />

      {/* Desktop: full GSAP scroll experience */}
      <div className="hidden lg:block">
        <DesktopChapters />
      </div>

      {/* Mobile: standard vertical scroll with chapter cards */}
      <div className="lg:hidden">
        {CHAPTERS.map((chapter, i) => (
          <MobileChapter key={chapter.id} chapter={chapter} index={i} />
        ))}
      </div>

      {/* Epilogue */}
      <section
        className="section-container text-center flex flex-col items-center gap-6"
        style={{
          background: 'var(--bg)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl flex flex-col items-center gap-6"
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            Now
          </p>
          <p
            className="text-xl md:text-2xl leading-relaxed font-medium"
            style={{ color: 'var(--text-2)' }}
          >
            Allan is based in Oslo, immediately available, and building through Echo Algori Data.
            The DJ sets drop every week on{' '}
            <a
              href="https://www.youtube.com/@DropDemand"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover"
              style={{ color: 'var(--color-gold)' }}
            >
              Drop Demand
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:allan@echoalgoridata.no"
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--color-gold)', color: '#0C0A09' }}
            >
              Get in touch
            </a>
            <a
              href="/"
              className="px-6 py-3 rounded-full font-semibold text-sm border transition-all hover:bg-white/5"
              style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
            >
              Back to home
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
