'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  stack: string[];
  metric: string;
  metricLabel: string;
  accent: string;
  accentDim: string;
  size: 'large' | 'medium' | 'small';
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    id: 'afrobeats',
    name: 'afrobeats.no',
    tagline: "Norway's African Music Portal",
    description:
      'React + TypeScript + Supabase platform featuring a multi-agent AI system with 7 specialized agents for DJ booking, event discovery, playlist curation, and community management.',
    url: 'https://afrobeats.no',
    stack: ['React', 'TypeScript', 'Supabase', 'Multi-Agent AI', 'Claude'],
    metric: '7',
    metricLabel: 'AI Agents',
    accent: '#D97706',
    accentDim: '#92400E',
    size: 'large',
    gradient:
      'radial-gradient(ellipse 80% 80% at 0% 100%, rgba(217,119,6,0.18) 0%, transparent 70%)',
  },
  {
    id: 'rnbvault',
    name: 'RNB Vault',
    tagline: 'R&B Music Community Platform',
    description:
      'Next.js 16 + Supabase with Spotify API, Ticketmaster API, Google Gemini, and domain-aware architecture serving localized .no and global .com content.',
    url: 'https://rnbvault.com',
    stack: ['Next.js 16', 'Supabase', 'Spotify API', 'Gemini'],
    metric: '2',
    metricLabel: 'Domains',
    accent: '#3B82F6',
    accentDim: '#1E3A8A',
    size: 'medium',
    gradient:
      'radial-gradient(ellipse 80% 80% at 100% 0%, rgba(59,130,246,0.18) 0%, transparent 70%)',
  },
  {
    id: 'gadgetikk',
    name: 'Gadgetikk.no',
    tagline: 'Tech E-Commerce',
    description:
      'WordPress + WooCommerce with Klarna, Vipps, and automated product feeds. Full Norwegian payment stack with real users and real transactions.',
    url: 'https://gadgetikk.no',
    stack: ['WordPress', 'WooCommerce', 'Klarna', 'Vipps'],
    metric: 'Live',
    metricLabel: 'Production',
    accent: '#10B981',
    accentDim: '#064E3B',
    size: 'small',
    gradient:
      'radial-gradient(ellipse 80% 80% at 0% 0%, rgba(16,185,129,0.18) 0%, transparent 70%)',
  },
];

/* ── Stack pill ─────────────────────────────────────────── */
function StackPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="text-xs font-mono px-2.5 py-0.5 rounded-full border"
      style={{
        borderColor: `${accent}40`,
        color: accent,
        backgroundColor: `${accent}10`,
      }}
    >
      {label}
    </span>
  );
}

/* ── Project card ───────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLarge = project.size === 'large';

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`card-surface relative overflow-hidden group block p-6 md:p-8 ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      style={{ minHeight: isLarge ? 380 : 200 }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: project.gradient }}
      />

      {/* Decorative metric */}
      <div className="absolute top-5 right-6 text-right pointer-events-none select-none">
        <p
          className="text-4xl font-black leading-none"
          style={{ color: project.accent, opacity: 0.15 }}
        >
          {project.metric}
        </p>
        <p className="text-xs mt-0.5" style={{ color: project.accent, opacity: 0.3 }}>
          {project.metricLabel}
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-4 h-full">
        {/* Header */}
        <div>
          <p
            className="text-xs font-semibold tracking-[0.15em] uppercase mb-1"
            style={{ color: project.accent }}
          >
            {project.tagline}
          </p>
          <h3
            className="text-2xl font-bold tracking-tight"
            style={{ color: 'var(--text)' }}
          >
            {project.name}
          </h3>
        </div>

        {/* Description — only shown on large/medium */}
        {project.size !== 'small' && (
          <p
            className="text-sm leading-relaxed max-w-md"
            style={{ color: 'var(--text-2)' }}
          >
            {project.description}
          </p>
        )}

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.map((s) => (
            <StackPill key={s} label={s} accent={project.accent} />
          ))}
        </div>

        {/* Arrow */}
        <div
          className="flex items-center gap-1.5 text-sm font-medium mt-2 transition-transform group-hover:translate-x-1 duration-300"
          style={{ color: project.accent }}
        >
          <span>Visit site</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}

/* ── FeaturedProjects ───────────────────────────────────── */
export default function FeaturedProjects() {
  return (
    <section className="section-container" id="projects" aria-label="Featured projects">
      <div className="flex flex-col gap-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: 'var(--color-gold)' }}
          >
            Live Products
          </p>
          <h2 className="text-4xl font-bold tracking-tight">
            Not Portfolio Demos.
            <br />
            <span className="gradient-text">Real Stuff.</span>
          </h2>
          <p className="mt-3 max-w-xl text-base" style={{ color: 'var(--text-2)' }}>
            Real users. Real payments. Real infrastructure. Three products built and owned — not client work.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
