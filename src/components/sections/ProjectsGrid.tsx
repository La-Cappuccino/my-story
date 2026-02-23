"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type Category = "All" | "Web Apps" | "AI/ML" | "Music Tech" | "Client Work";

interface Project {
  id: number;
  title: string;
  description: string;
  categories: Exclude<Category, "All">[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  /** Gradient stop colours for the screenshot placeholder */
  gradientFrom: string;
  gradientTo: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "afrobeats.no",
    description:
      "Norway's leading African music portal with AI-powered features and multi-agent system.",
    categories: ["Music Tech", "Web Apps"],
    stack: ["React", "TypeScript", "Vite", "Supabase", "LangGraph", "Gemini AI"],
    liveUrl: "https://afrobeats.no",
    gradientFrom: "#D97706",
    gradientTo: "#059669",
  },
  {
    id: 2,
    title: "RNB Vault",
    description:
      "Curated R&B community with Soul Oracle AI, quiz engine, and DJ marketplace.",
    categories: ["Music Tech", "Web Apps"],
    stack: ["Next.js 16", "Supabase", "Gemini 2.0", "Stripe"],
    liveUrl: "https://rnbvault.com",
    gradientFrom: "#7C3AED",
    gradientTo: "#DB2777",
  },
  {
    id: 3,
    title: "Gadgetikk",
    description: "Norwegian tech gadget e-commerce with snap-scrolling.",
    categories: ["Web Apps", "Client Work"],
    stack: ["WordPress", "WooCommerce", "Klarna", "Vipps"],
    liveUrl: "https://gadgetikk.no",
    gradientFrom: "#2563EB",
    gradientTo: "#0891B2",
  },
  {
    id: 4,
    title: "TickDid",
    description: "Privacy-first AI task manager with AES-256 encryption.",
    categories: ["Web Apps"],
    stack: ["Next.js 14", "Zustand", "OpenAI", "TypeScript"],
    githubUrl: "https://github.com/La-Cappuccino/tickdid",
    gradientFrom: "#059669",
    gradientTo: "#0891B2",
  },
  {
    id: 5,
    title: "Echorix",
    description: "AI market intelligence with real-time analysis.",
    categories: ["AI/ML", "Web Apps"],
    stack: ["Next.js 14", "TypeScript", "Framer Motion"],
    githubUrl: "https://github.com/La-Cappuccino/echorix",
    gradientFrom: "#1D4ED8",
    gradientTo: "#7C3AED",
  },
  {
    id: 6,
    title: "Afrobeats Agents",
    description: "7-agent LangGraph AI system for music community.",
    categories: ["AI/ML"],
    stack: ["LangGraph", "Gemini", "PyTorch", "Supabase"],
    githubUrl: "https://github.com/La-Cappuccino/afrobeats-agents",
    gradientFrom: "#D97706",
    gradientTo: "#DC2626",
  },
  {
    id: 7,
    title: "JobHunter",
    description:
      "Automated job scraping + AI matching + auto-apply for the Norwegian job market.",
    categories: ["AI/ML", "Web Apps"],
    stack: ["Next.js", "Claude Haiku/Sonnet", "Supabase", "Vercel Cron"],
    gradientFrom: "#065F46",
    gradientTo: "#1E3A8A",
  },
  {
    id: 8,
    title: "SykkelPlus",
    description:
      "Workflow automation: −40% admin time, +30% conversion.",
    categories: ["Client Work"],
    stack: ["WordPress", "n8n", "Booking Automation"],
    gradientFrom: "#92400E",
    gradientTo: "#065F46",
  },
  {
    id: 9,
    title: "ALG Dynamics",
    description:
      "Content AI pipeline: +60% capacity, 15 h/week saved.",
    categories: ["Client Work"],
    stack: ["n8n", "Make", "AI Content Generation"],
    gradientFrom: "#1E3A8A",
    gradientTo: "#4C1D95",
  },
  {
    id: 10,
    title: "Bar & Beyond",
    description:
      "+40% organic traffic in 6 months. ROAS >4.0.",
    categories: ["Client Work"],
    stack: ["WordPress", "WooCommerce", "GA4", "Google Ads"],
    gradientFrom: "#7F1D1D",
    gradientTo: "#92400E",
  },
];

const FILTERS: Category[] = ["All", "Web Apps", "AI/ML", "Music Tech", "Client Work"];

/* ------------------------------------------------------------------ */
/*  Tilt card                                                           */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shine: { x: 50, y: 50 } });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;
    setTilt({ rotateX, rotateY, shine: { x: shineX, y: shineY } });
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, shine: { x: 50, y: 50 } });
  }

  const displayStack = project.stack.slice(0, 4);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: isHovered ? "transform 0.1s linear" : "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
      className="card-surface group relative flex flex-col overflow-hidden"
    >
      {/* Screenshot placeholder */}
      <div
        className="relative h-44 w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom}33 0%, ${project.gradientTo}33 100%)`,
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Gradient orbs */}
        <div
          className="absolute -left-8 -top-8 h-32 w-32 rounded-full blur-2xl"
          style={{ background: project.gradientFrom, opacity: 0.35 }}
        />
        <div
          className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-2xl"
          style={{ background: project.gradientTo, opacity: 0.35 }}
        />
        {/* Category badge */}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {project.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-full px-2 py-0.5 font-mono text-xs"
              style={{
                background: "rgba(0,0,0,0.45)",
                color: "var(--color-text-secondary)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
        {/* Shine overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug text-[var(--color-text-primary)]">
            {project.title}
          </h3>
          <div className="flex shrink-0 items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className="rounded p-1 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)]"
              >
                <ExternalLink size={15} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub: ${project.title}`}
                className="rounded p-1 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {displayStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-2.5 py-0.5 font-mono text-xs"
              style={{
                background: "var(--elevated)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-xs"
              style={{
                background: "var(--elevated)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(activeFilter as Exclude<Category, "All">));

  return (
    <div>
      {/* Filter pills */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={isActive}
              className="relative rounded-full px-4 py-1.5 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
              style={{
                color: isActive ? "#0C0A09" : "var(--color-text-muted)",
                border: isActive ? "none" : "1px solid var(--border)",
                background: isActive ? "var(--color-gold)" : "transparent",
              }}
            >
              {filter}
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--color-gold)", zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {filtered.length === 0 && (
        <p className="py-24 text-center text-[var(--color-text-muted)]">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
