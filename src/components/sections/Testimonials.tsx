'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  accent: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Echo Algori Data automatiserte booking og innlevering. Vi reduserte administrasjonen merkbart og leverer raskere.',
    name: 'SykkelPlus Team',
    role: 'Service Management',
    company: 'SykkelPlus',
    metric: '-40%',
    metricLabel: 'Admin time',
    accent: '#D97706',
  },
  {
    quote:
      'Agent-basert automatisering gjorde innholdsproduksjon raskere, mer konsistent og enklere å skalere. Vi sparer over 15 timer i uken.',
    name: 'Agatha',
    role: 'B2B Marketing Director',
    company: 'ALG Dynamics',
    metric: '+60%',
    metricLabel: 'Content capacity',
    accent: '#10B981',
  },
  {
    quote:
      'KI-drevet personalisering og automatisert kundekommunikasjon har transformert nettbutikken vår. Konverteringen har økt merkbart.',
    name: 'Bedo',
    role: 'CEO',
    company: 'Bar & Beyond',
    metric: '+30%',
    metricLabel: 'Conversion',
    accent: '#3B82F6',
  },
];

/* ── TestimonialCard ────────────────────────────────────── */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="card-surface flex-shrink-0 w-80 md:w-96 p-6 flex flex-col gap-4 mx-3"
      style={{ background: 'var(--elevated)' }}
    >
      {/* Metric badge */}
      <div className="self-start flex items-center gap-2">
        <span
          className="text-2xl font-black tabular-nums"
          style={{ color: t.accent }}
        >
          {t.metric}
        </span>
        <span
          className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
          style={{
            color: t.accent,
            backgroundColor: `${t.accent}14`,
            border: `1px solid ${t.accent}30`,
          }}
        >
          {t.metricLabel}
        </span>
      </div>

      {/* Quote */}
      <blockquote
        className="text-sm leading-relaxed italic flex-1"
        style={{ color: 'var(--text-2)' }}
      >
        <span
          className="text-2xl font-serif leading-none mr-1 not-italic"
          style={{ color: t.accent, opacity: 0.6 }}
          aria-hidden
        >
          "
        </span>
        {t.quote}
        <span
          className="text-2xl font-serif leading-none ml-1 not-italic"
          style={{ color: t.accent, opacity: 0.6 }}
          aria-hidden
        >
          "
        </span>
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
        {/* Avatar monogram */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: `${t.accent}20`, color: t.accent }}
        >
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>
            {t.name}
          </p>
          <p className="text-xs leading-tight" style={{ color: 'var(--text-3)' }}>
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Marquee track ──────────────────────────────────────── */
function MarqueeTrack({ reversed = false }: { reversed?: boolean }) {
  const duplicated = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="flex overflow-hidden relative">
      {/* Fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />

      <div
        className="flex"
        style={{
          animation: reversed
            ? 'marqueeReverse 40s linear infinite'
            : 'marquee 40s linear infinite',
          willChange: 'transform',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')
        }
      >
        {duplicated.map((t, i) => (
          <TestimonialCard key={`${t.company}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

/* ── Testimonials ───────────────────────────────────────── */
export default function Testimonials() {
  return (
    <section className="section-container" aria-label="Client testimonials">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
          style={{ color: 'var(--color-gold)' }}
        >
          Client Results
        </p>
        <h2 className="text-4xl font-bold tracking-tight">
          The Work Speaks.
        </h2>
        <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: 'var(--text-2)' }}>
          Real outcomes for real Norwegian businesses — not agency fluff.
        </p>
      </motion.div>

      {/* Marquee */}
      <div className="flex flex-col gap-4 -mx-[var(--section-padding-x)]">
        <MarqueeTrack />
      </div>
    </section>
  );
}
