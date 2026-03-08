'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
        'Those years were spent in IT support and system administration — the unglamorous, real-world work that builds an instinct for how technology actually serves people.',
        'But Kampala was a starting point, not a destination. Allan wanted to build things, not just keep them running.',
      ],
      pullQuote: 'Kampala taught me that technology should serve people, not the other way around.',
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
        'In 2022 he made the leap to Berlin and enrolled in Le Wagon\'s 24-week full-stack web development bootcamp. 400+ hours of Ruby on Rails, JavaScript, PostgreSQL, Git, and team-based Agile delivery.',
        'Three projects shipped during the program. Le Wagon gave him the technical foundation, the vocabulary of modern web development, and the conviction that he could ship real products under pressure.',
      ],
      pullQuote: '400+ hours. 3 projects. 1 idea that became everything.',
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
        '26+ WordPress websites for Norwegian small businesses. In early 2024, registered Echo Algori Data as a formal AI consultancy.',
        'Built a multi-agent AI workflow orchestrating Claude Code, OpenAI Codex, Cursor, Gemini, and 10+ MCP servers in parallel.',
        'Three own products in production: afrobeats.no, RNB Vault, and Gadgetikk.no. Real users. Real payments. Real infrastructure.',
      ],
      pullQuote: 'One person. Many agents. Shipping at team speed.',
    },
    stats: [
      { value: '26+', label: 'Sites Built' },
      { value: '6+', label: 'Apps Shipped' },
      { value: '3', label: 'Live Products' },
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
      &ldquo;{text}&rdquo;
    </blockquote>
  );
}

/* ── Stats bar ──────────────────────────────────────────── */
function StatsBar({ stats, accent }: { stats: { value: string; label: string }[]; accent: string }) {
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

/* ── Chapter card ───────────────────────────────────────── */
function ChapterCard({ chapter }: { chapter: ChapterData }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      id={chapter.id}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen flex items-center px-6 py-20 lg:px-12"
      style={{ background: chapter.palette.bg }}
    >
      {/* Chapter number watermark */}
      <span
        className="absolute top-8 right-6 lg:right-12 text-8xl lg:text-[12rem] font-black opacity-5 leading-none select-none pointer-events-none"
        style={{ color: chapter.palette.accent }}
      >
        {chapter.number}
      </span>

      <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-16">
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
            className="text-5xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight"
            style={{ color: chapter.palette.accent }}
          >
            {chapter.city}
          </h2>

          <h3
            className="text-xl lg:text-2xl font-semibold mt-2 leading-snug max-w-sm"
            style={{ color: chapter.palette.text }}
          >
            {chapter.content.heading}
          </h3>

          {chapter.stats && <StatsBar stats={chapter.stats} accent={chapter.palette.accent} />}
        </div>

        {/* Right: body + pull quote */}
        <div className="flex flex-col gap-4">
          {chapter.content.body.map((para, j) => (
            <p key={j} className="text-base leading-relaxed" style={{ color: `${chapter.palette.text}cc` }}>
              {para}
            </p>
          ))}

          <PullQuote text={chapter.content.pullQuote} accent={chapter.palette.accent} />

          {chapter.content.extra && <div className="mt-2">{chapter.content.extra}</div>}
        </div>
      </div>
    </motion.article>
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
        and conviction.
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

      {CHAPTERS.map((chapter) => (
        <ChapterCard key={chapter.id} chapter={chapter} />
      ))}

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
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--color-gold)' }}>
            Now
          </p>
          <p className="text-xl md:text-2xl leading-relaxed font-medium" style={{ color: 'var(--text-2)' }}>
            Allan is based in Oslo, immediately available, and building through Echo Algori Data.
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
