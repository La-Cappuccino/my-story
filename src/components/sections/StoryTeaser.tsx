'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface Chapter {
  id: string;
  year: string;
  city: string;
  country: string;
  oneLiner: string;
  accent: string;
  accentDim: string;
  gradient: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'kampala',
    year: '1991 – 2019',
    city: 'Kampala',
    country: 'Uganda',
    oneLiner: 'An IT degree, a hunger to build, and the realization that keeping systems running wasn\'t the same as creating something.',
    accent: '#D97706',
    accentDim: '#92400E',
    gradient: 'linear-gradient(135deg, rgba(217,119,6,0.18) 0%, rgba(146,64,14,0.10) 50%, transparent 100%)',
  },
  {
    id: 'berlin',
    year: '2022',
    city: 'Berlin',
    country: 'Germany',
    oneLiner: '400+ hours. Ruby on Rails, JavaScript, PostgreSQL. Three projects shipped. One idea that became everything.',
    accent: '#3B82F6',
    accentDim: '#1E3A8A',
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(30,58,138,0.10) 50%, transparent 100%)',
  },
  {
    id: 'oslo',
    year: '2022 – Now',
    city: 'Oslo',
    country: 'Norway',
    oneLiner: '26+ sites. Echo Algori Data. Multi-agent AI workflows. One person shipping at team speed.',
    accent: '#10B981',
    accentDim: '#064E3B',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(6,78,59,0.10) 50%, transparent 100%)',
  },
];

/* ── Parallax chapter card ──────────────────────────────── */
function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface relative overflow-hidden group cursor-pointer flex flex-col gap-4 p-8"
      style={{ minHeight: 280 }}
    >
      {/* Background gradient layer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: chapter.gradient }}
      />

      {/* Parallax floating city label */}
      <motion.div style={{ y }} className="absolute top-4 right-6 pointer-events-none select-none">
        <span
          className="text-7xl font-black opacity-5 leading-none"
          style={{ color: chapter.accent }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Year pill */}
      <span
        className="self-start text-xs font-mono font-semibold px-3 py-1 rounded-full border"
        style={{
          borderColor: chapter.accentDim,
          color: chapter.accent,
          backgroundColor: `${chapter.accent}14`,
        }}
      >
        {chapter.year}
      </span>

      {/* City name */}
      <h3
        className="text-3xl font-bold tracking-tight"
        style={{ color: chapter.accent }}
      >
        {chapter.city}
        <span className="block text-sm font-normal mt-0.5" style={{ color: 'var(--text-3)' }}>
          {chapter.country}
        </span>
      </h3>

      {/* One-liner */}
      <p className="text-base leading-relaxed relative z-10" style={{ color: 'var(--text-2)' }}>
        {chapter.oneLiner}
      </p>

      {/* Read more arrow */}
      <div
        className="mt-auto flex items-center gap-2 text-sm font-medium transition-transform group-hover:translate-x-1 duration-300"
        style={{ color: chapter.accent }}
      >
        <span>Read chapter</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ── StoryTeaser ────────────────────────────────────────── */
export default function StoryTeaser() {
  return (
    <section className="section-container" id="story-teaser" aria-label="Story chapters">
      <div className="flex flex-col gap-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ color: 'var(--color-gold)' }}
            >
              The Journey
            </p>
            <h2 className="text-4xl font-bold tracking-tight">
              Three Cities.
              <br />
              <span className="gradient-text">One Through-Line.</span>
            </h2>
          </div>
          <Link
            href="/story"
            className="link-hover text-sm font-medium self-end sm:self-auto pb-0.5"
            style={{ color: 'var(--text-3)' }}
          >
            Full story →
          </Link>
        </motion.div>

        {/* Chapter cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHAPTERS.map((chapter, i) => (
            <Link href={`/story#${chapter.id}`} key={chapter.id} className="no-underline">
              <ChapterCard chapter={chapter} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
