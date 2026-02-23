"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & data                                                        */
/* ------------------------------------------------------------------ */

type Proficiency = "Expert" | "Advanced" | "Proficient";
type CategoryName =
  | "All"
  | "Frontend"
  | "Backend"
  | "AI/ML"
  | "DevOps"
  | "CMS/E-commerce"
  | "Automation"
  | "AI Tools";

interface Skill {
  name: string;
  level: Proficiency;
}

interface StackCategory {
  name: Exclude<CategoryName, "All">;
  skills: Skill[];
}

const STACK: StackCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React.js",        level: "Expert"     },
      { name: "Next.js 14/16",   level: "Expert"     },
      { name: "TypeScript",      level: "Expert"     },
      { name: "Tailwind CSS",    level: "Expert"     },
      { name: "Framer Motion",   level: "Advanced"   },
      { name: "Radix UI/Shadcn", level: "Advanced"   },
      { name: "Vite",            level: "Advanced"   },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js",           level: "Expert"   },
      { name: "Supabase/PostgreSQL",level: "Expert"  },
      { name: "Ruby on Rails",     level: "Advanced" },
      { name: "REST APIs",         level: "Expert"   },
      { name: "WebSockets",        level: "Advanced" },
    ],
  },
  {
    name: "AI/ML",
    skills: [
      { name: "Python",             level: "Expert"     },
      { name: "LangGraph",          level: "Advanced"   },
      { name: "RAG Systems",        level: "Advanced"   },
      { name: "TensorFlow/PyTorch", level: "Proficient" },
      { name: "scikit-learn",       level: "Proficient" },
      { name: "OpenAI API",         level: "Expert"     },
      { name: "Anthropic Claude API",level: "Expert"    },
      { name: "Gemini API",         level: "Expert"     },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Vercel",          level: "Expert"   },
      { name: "Git/GitHub",      level: "Expert"   },
      { name: "GitHub Actions",  level: "Advanced" },
      { name: "Supabase",        level: "Expert"   },
    ],
  },
  {
    name: "CMS/E-commerce",
    skills: [
      { name: "WordPress",    level: "Expert"   },
      { name: "WooCommerce",  level: "Expert"   },
      { name: "Stripe",       level: "Expert"   },
      { name: "Klarna/Vipps", level: "Advanced" },
    ],
  },
  {
    name: "Automation",
    skills: [
      { name: "n8n",          level: "Expert"   },
      { name: "Make",         level: "Advanced" },
      { name: "Vercel Cron",  level: "Advanced" },
    ],
  },
  {
    name: "AI Tools",
    skills: [
      { name: "Claude Code",       level: "Expert"     },
      { name: "Google Antigravity", level: "Expert"    },
      { name: "Cursor",            level: "Expert"     },
      { name: "Nano Banana Pro",   level: "Expert"     },
      { name: "Midjourney",        level: "Advanced"   },
      { name: "ElevenLabs",        level: "Proficient" },
    ],
  },
];

const CATEGORY_FILTERS: CategoryName[] = [
  "All",
  "Frontend",
  "Backend",
  "AI/ML",
  "DevOps",
  "CMS/E-commerce",
  "Automation",
  "AI Tools",
];

/* ------------------------------------------------------------------ */
/*  Proficiency colour helper                                           */
/* ------------------------------------------------------------------ */

const LEVEL_STYLES: Record<Proficiency, { bg: string; color: string; border: string }> = {
  Expert:     { bg: "rgba(217,119,6,0.12)",  color: "#F59E0B", border: "rgba(217,119,6,0.3)"  },
  Advanced:   { bg: "rgba(37,99,235,0.12)",  color: "#60A5FA", border: "rgba(37,99,235,0.3)"  },
  Proficient: { bg: "rgba(120,113,108,0.15)", color: "#A8A29E", border: "rgba(120,113,108,0.25)" },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function SkillPill({ skill }: { skill: Skill }) {
  const styles = LEVEL_STYLES[skill.level];
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm"
      style={{
        background: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
      }}
      title={skill.level}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: styles.color }}
      />
      {skill.name}
    </motion.span>
  );
}

function CategorySection({ category }: { category: StackCategory }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface p-6"
    >
      <h3 className="mb-4 font-mono text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {category.skills.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Workflow card                                                     */
/* ------------------------------------------------------------------ */

function AIWorkflowCard() {
  return (
    <div
      className="mb-10 overflow-hidden rounded-xl p-6 sm:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(217,119,6,0.1) 0%, rgba(37,99,235,0.1) 50%, rgba(5,150,105,0.08) 100%)",
        border: "1px solid rgba(217,119,6,0.25)",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.3)" }}
        >
          <Cpu size={22} style={{ color: "var(--color-gold)" }} />
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="font-semibold text-[var(--color-text-primary)]">
              My AI Workflow
            </h2>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-xs"
              style={{
                background: "rgba(217,119,6,0.2)",
                color: "var(--color-gold)",
                border: "1px solid rgba(217,119,6,0.3)",
              }}
            >
              How I build
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            I orchestrate{" "}
            <span style={{ color: "var(--color-gold)" }}>Claude Code</span>,{" "}
            <span style={{ color: "#60A5FA" }}>Google Antigravity</span>,{" "}
            <span style={{ color: "#60A5FA" }}>Cursor</span>, and{" "}
            <span style={{ color: "var(--color-emerald-light)" }}>Gemini</span>{" "}
            in parallel with{" "}
            <span style={{ color: "var(--color-text-primary)" }}>10+ MCP servers</span>{" "}
            — GitHub, Supabase, Playwright, Context7, Filesystem, Stripe, Mailtrap, and
            more. I use{" "}
            <span style={{ color: "#F59E0B" }}>Nano Banana Pro</span>{" "}
            (Google&apos;s Gemini 3 image model) to generate UI mockups before writing
            a line of code. Each agent handles a specialised layer simultaneously.
            The result: I ship at the speed of a small team, solo.{" "}
            <span style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
              Not just using AI — orchestrating it.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Proficiency legend                                                  */
/* ------------------------------------------------------------------ */

function Legend() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
        Proficiency:
      </span>
      {(["Expert", "Advanced", "Proficient"] as Proficiency[]).map((level) => {
        const s = LEVEL_STYLES[level];
        return (
          <span key={level} className="flex items-center gap-1.5 font-mono text-xs">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: s.color }}
            />
            <span style={{ color: s.color }}>{level}</span>
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function StackDisplay() {
  const [activeCategory, setActiveCategory] = useState<CategoryName>("All");

  const visibleCategories =
    activeCategory === "All"
      ? STACK
      : STACK.filter((c) => c.name === activeCategory);

  return (
    <div>
      <AIWorkflowCard />

      {/* Filter pills */}
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by technology category">
        {CATEGORY_FILTERS.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={isActive}
              className="rounded-full px-3.5 py-1.5 font-mono text-xs transition-all focus-visible:outline-none"
              style={{
                background: isActive ? "var(--color-gold)" : "var(--elevated)",
                color: isActive ? "#0C0A09" : "var(--color-text-muted)",
                border: isActive ? "none" : "1px solid var(--border)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <Legend />

      {/* Category grid */}
      <motion.div
        layout
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((category) => (
            <CategorySection key={category.name} category={category} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
