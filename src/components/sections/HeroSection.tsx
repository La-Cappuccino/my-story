'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

/* ── Typewriter strings ─────────────────────────────────── */
const TYPEWRITER_STRINGS = [
  'I build with React & Next.js',
  'I orchestrate AI agents',
  'I ship 3–4 week MVPs',
  'I DJ as DJ Demure',
];

/* ── Framer Motion variants ─────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Magnetic Button ────────────────────────────────────── */
function MagneticButton({
  children,
  className,
  href,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', transition: 'transform 0.15s ease', ...style }}
    >
      {children}
    </a>
  );
}

/* ── Usefulness globe SVG placeholder ──────────────────── */
function GlobePlaceholder() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[420px] mx-auto"
      aria-label="Map: Kampala, Berlin, Oslo"
    >
      {/* Outer glow ring */}
      <circle cx="160" cy="160" r="148" stroke="#D97706" strokeOpacity="0.12" strokeWidth="1" />
      <circle cx="160" cy="160" r="130" stroke="#D97706" strokeOpacity="0.07" strokeWidth="1" strokeDasharray="4 6" />

      {/* Grid lines */}
      {[40, 80, 120, 160, 200, 240, 280].map((y) => (
        <line key={`h${y}`} x1="12" y1={y} x2="308" y2={y} stroke="#292524" strokeWidth="0.5" />
      ))}
      {[40, 80, 120, 160, 200, 240, 280].map((x) => (
        <line key={`v${x}`} x1={x} y1="12" x2={x} y2="308" stroke="#292524" strokeWidth="0.5" />
      ))}

      {/* Curved path: Kampala → Berlin → Oslo */}
      <path
        d="M 210 240 Q 160 120 130 80 Q 115 55 120 45"
        stroke="url(#pathGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="4 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="200"
          to="0"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* Kampala dot */}
      <g>
        <circle cx="210" cy="240" r="10" fill="#D97706" fillOpacity="0.15" />
        <circle cx="210" cy="240" r="5" fill="#D97706" />
        <circle cx="210" cy="240" r="10" stroke="#D97706" strokeWidth="1" strokeOpacity="0.5">
          <animate attributeName="r" values="6;14;6" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text x="222" y="244" fill="#D97706" fontSize="10" fontFamily="var(--font-geist-sans)" letterSpacing="0.05em">
          Kampala
        </text>
      </g>

      {/* Berlin dot */}
      <g>
        <circle cx="130" cy="80" r="10" fill="#3B82F6" fillOpacity="0.15" />
        <circle cx="130" cy="80" r="5" fill="#3B82F6" />
        <circle cx="130" cy="80" r="10" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.5">
          <animate attributeName="r" values="6;14;6" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
        </circle>
        <text x="142" y="84" fill="#3B82F6" fontSize="10" fontFamily="var(--font-geist-sans)" letterSpacing="0.05em">
          Berlin
        </text>
      </g>

      {/* Oslo dot */}
      <g>
        <circle cx="120" cy="45" r="10" fill="#10B981" fillOpacity="0.15" />
        <circle cx="120" cy="45" r="5" fill="#10B981" />
        <circle cx="120" cy="45" r="10" stroke="#10B981" strokeWidth="1" strokeOpacity="0.5">
          <animate attributeName="r" values="6;14;6" dur="2.5s" begin="1.6s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.5s" begin="1.6s" repeatCount="indefinite" />
        </circle>
        <text x="132" y="49" fill="#10B981" fontSize="10" fontFamily="var(--font-geist-sans)" letterSpacing="0.05em">
          Oslo
        </text>
      </g>

      <defs>
        <linearGradient id="pathGrad" x1="210" y1="240" x2="120" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Typewriter hook ────────────────────────────────────── */
function useTypewriter(strings: string[], intervalMs = 3000) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing');

  useEffect(() => {
    const target = strings[index];

    if (phase === 'typing') {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('pause'), intervalMs);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('erasing'), 400);
      return () => clearTimeout(t);
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 25);
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % strings.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, index, strings, intervalMs]);

  return displayed;
}

/* ── HeroSection ────────────────────────────────────────── */
export default function HeroSection() {
  const typewriter = useTypewriter(TYPEWRITER_STRINGS);
  const headlineWords = ['Allan', 'Kisuule'];

  return (
    <section
      className="relative min-h-dvh flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated gradient mesh background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(217,119,6,0.13) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 60% 80% at 80% 20%, rgba(37,99,235,0.10) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 50% 50% at 60% 90%, rgba(5,150,105,0.08) 0%, transparent 60%), ' +
            'var(--bg)',
          animation: 'meshShift 12s ease-in-out infinite alternate',
        }}
      />

      {/* Noise texture */}
      <div className="noise absolute inset-0 -z-9 pointer-events-none" />

      {/* CSS keyframes for mesh */}
      <style>{`
        @keyframes meshShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="section-container w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        {/* ── Left column (60%) ── */}
        <motion.div
          className="flex-1 lg:w-3/5 flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Overline */}
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-gold)', fontVariant: 'small-caps' }}
          >
            Fullstack Developer &amp; AI Engineer
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={containerVariants}
            className="flex flex-wrap gap-x-4 font-bold leading-[1.0] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 6rem)' }}
          >
            {headlineWords.map((word) => (
              <motion.span key={word} variants={itemVariants} className="block">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            variants={itemVariants}
            className="h-8 flex items-center"
            aria-live="polite"
          >
            <span
              className="text-lg md:text-xl font-mono"
              style={{ color: 'var(--text-2)' }}
            >
              {typewriter}
              <span
                className="inline-block w-[2px] h-[1.1em] align-middle ml-0.5 bg-current"
                style={{
                  animation: 'cursorBlink 1s step-end infinite',
                  color: 'var(--color-gold)',
                  backgroundColor: 'var(--color-gold)',
                }}
              />
            </span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
            <MagneticButton
              href="#projects"
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: '#0C0A09',
              } as React.CSSProperties}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              href="/story"
              className="px-6 py-3 rounded-full font-semibold text-sm border transition-all duration-200 hover:bg-white/5"
              style={{
                borderColor: 'var(--color-gold)',
                color: 'var(--color-gold)',
              } as React.CSSProperties}
            >
              Read My Story
            </MagneticButton>
          </motion.div>

          {/* Availability badge */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: '#10B981' }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: '#10B981' }}
              />
            </span>
            <span className="text-sm" style={{ color: 'var(--text-3)' }}>
              Available for new projects
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right column (40%) — hidden on mobile ── */}
        <motion.div
          className="hidden lg:flex lg:w-2/5 items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-globe-placeholder w-full flex items-center justify-center">
            <GlobePlaceholder />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
