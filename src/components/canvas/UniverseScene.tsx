"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Stars, Line } from "@react-three/drei";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────── */
/*  Types                                                          */
/* ─────────────────────────────────────────────────────────────── */

type NodeId = "genesis" | "berlin" | "oslo";

interface Project {
  id: number;
  title: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  gradient: string;
}

/* ─────────────────────────────────────────────────────────────── */
/*  Data                                                           */
/* ─────────────────────────────────────────────────────────────── */

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "afrobeats.no",
    description: "Norway's leading African music portal — 7 AI agents handling bookings, playlists & events.",
    stack: ["React", "LangGraph", "Supabase", "Gemini AI"],
    image: "/projects/afrobeats.png",
    liveUrl: "https://afrobeats.no",
    gradient: "from-amber-500 to-emerald-500",
  },
  {
    id: 2,
    title: "RNB Vault",
    description: "Curated R&B community with Soul Oracle AI, quiz engine, and DJ marketplace.",
    stack: ["Next.js 16", "Supabase", "Gemini 2.0", "Stripe"],
    image: "/projects/rnb-vault.png",
    liveUrl: "https://rnbvault.com",
    gradient: "from-violet-600 to-pink-600",
  },
  {
    id: 3,
    title: "Echorix",
    description: "AI market intelligence dashboard with real-time trend analysis and Framer Motion visualisations.",
    stack: ["Next.js 14", "TypeScript", "Framer Motion"],
    image: "/projects/echorix.png",
    githubUrl: "https://github.com/La-Cappuccino/echorix",
    gradient: "from-blue-600 to-violet-600",
  },
  {
    id: 4,
    title: "Gadgetikk",
    description: "Norwegian tech gadget e-commerce with snap-scrolling, Klarna & Vipps payments.",
    stack: ["WordPress", "WooCommerce", "Klarna", "Vipps"],
    image: "/projects/gadgetikk.png",
    liveUrl: "https://gadgetikk.no",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 5,
    title: "TickDid",
    description: "Privacy-first AI task manager with AES-256 encryption and AI-suggested subtasks.",
    stack: ["Next.js 14", "Zustand", "OpenAI", "TypeScript"],
    image: "/projects/tickdid.png",
    githubUrl: "https://github.com/La-Cappuccino/tickdid",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    id: 6,
    title: "Afrobeats Agents",
    description: "7-node LangGraph multi-agent system: DJ booking, events, playlist curation & analytics.",
    stack: ["LangGraph", "Gemini", "PyTorch", "Supabase"],
    image: "/projects/afrobeats-agents.png",
    githubUrl: "https://github.com/La-Cappuccino/afrobeats-agents",
    gradient: "from-amber-500 to-red-600",
  },
  {
    id: 7,
    title: "JobHunter",
    description: "Automated job scraping + AI matching + auto-apply for the Norwegian job market.",
    stack: ["Next.js", "Claude API", "Supabase", "Vercel Cron"],
    image: "/projects/jobhunter.png",
    gradient: "from-emerald-700 to-blue-800",
  },
  {
    id: 8,
    title: "SykkelPlus",
    description: "n8n workflow automation for a bicycle service: −40% admin time, +30% conversion.",
    stack: ["WordPress", "n8n", "Booking Automation"],
    image: "/projects/sykkelplus.png",
    gradient: "from-amber-800 to-emerald-700",
  },
  {
    id: 9,
    title: "ALG Dynamics",
    description: "AI content pipeline via Make & n8n: +60% content capacity, 15h/week saved.",
    stack: ["n8n", "Make", "AI Content Generation"],
    image: "/projects/alg-dynamics.png",
    gradient: "from-blue-800 to-violet-900",
  },
  {
    id: 10,
    title: "Bar & Beyond",
    description: "+40% organic traffic in 6 months. ROAS >4.0. Full WordPress + Google Ads stack.",
    stack: ["WordPress", "WooCommerce", "GA4", "Google Ads"],
    image: "/projects/bar-beyond.png",
    gradient: "from-red-900 to-amber-800",
  },
];

/* ─────────────────────────────────────────────────────────────── */
/*  Camera Rig                                                     */
/* ─────────────────────────────────────────────────────────────── */

function CameraRig({ activeNode }: { activeNode: NodeId | null }) {
  const { controls } = useThree();
  useFrame((state) => {
    let targetPos = new THREE.Vector3(0, 0, 7);
    let lookTarget = new THREE.Vector3(0, 0, 0);
    if (activeNode === "oslo") {
      targetPos = new THREE.Vector3(0, -1.5, 3.5);
      lookTarget = new THREE.Vector3(0, -1, 1);
    } else if (activeNode === "berlin") {
      targetPos = new THREE.Vector3(2.5, 1, 2);
      lookTarget = new THREE.Vector3(1.5, 0.5, -1);
    } else if (activeNode === "genesis") {
      targetPos = new THREE.Vector3(-2.5, 1.5, 2);
      lookTarget = new THREE.Vector3(-1.5, 1, 0);
    }
    state.camera.position.lerp(targetPos, 0.05);
    if (controls) {
      // @ts-expect-error drei controls target
      controls.target.lerp(lookTarget, 0.05);
      // @ts-expect-error drei controls update
      controls.update();
    }
  });
  return null;
}

/* ─────────────────────────────────────────────────────────────── */
/*  3D Scene (canvas contents)                                     */
/* ─────────────────────────────────────────────────────────────── */

function Scene({
  hoveredNode,
  activeNode,
  onHover,
  onClick,
}: {
  hoveredNode: NodeId | null;
  activeNode: NodeId | null;
  onHover: (id: NodeId | null) => void;
  onClick: (id: NodeId) => void;
}) {
  const linePoints = [
    new THREE.Vector3(-1.5, 1, 0),
    new THREE.Vector3(1.5, 0.5, -1),
    new THREE.Vector3(0, -1, 1),
  ];

  const nodes: { id: NodeId; pos: [number, number, number]; radius: number; color: string; hoverColor: string; speed: number; distort: number }[] = [
    { id: "genesis", pos: [-1.5, 1, 0],  radius: 0.6, color: "#D97706", hoverColor: "#F59E0B", speed: 1.5, distort: 0.4 },
    { id: "berlin",  pos: [1.5, 0.5, -1], radius: 0.5, color: "#2563EB", hoverColor: "#60A5FA", speed: 2.0, distort: 0.5 },
    { id: "oslo",    pos: [0, -1, 1],    radius: 0.7, color: "#10B981", hoverColor: "#34D399", speed: 1.2, distort: 0.3 },
  ];

  return (
    <>
      <color attach="background" args={["#050510"]} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <Line points={linePoints} color="white" lineWidth={1} opacity={0.15} transparent />

      {nodes.map(({ id, pos, radius, color, hoverColor, speed, distort }) => {
        const isHovered = hoveredNode === id;
        const isActive  = activeNode  === id;
        return (
          <Float key={id} speed={speed} rotationIntensity={1} floatIntensity={1.2}>
            <Sphere
              args={[radius, 64, 64]}
              position={pos}
              scale={isHovered || isActive ? 1.2 : 1}
              onPointerOver={(e) => { e.stopPropagation(); onHover(id); }}
              onPointerOut={() => onHover(null)}
              onClick={(e) => { e.stopPropagation(); onClick(id); }}
            >
              <MeshDistortMaterial
                color={isHovered || isActive ? hoverColor : color}
                distort={distort}
                speed={2.5}
                roughness={0.15}
                metalness={0.7}
                emissive={color}
                emissiveIntensity={isHovered || isActive ? 0.9 : 0.25}
              />
            </Sphere>
          </Float>
        );
      })}

      <OrbitControls
        makeDefault
        enableZoom={!activeNode}
        enablePan={!activeNode}
        rotateSpeed={0.8}
        autoRotate={!hoveredNode && !activeNode}
        autoRotateSpeed={0.4}
        minDistance={3}
        maxDistance={14}
      />
      <CameraRig activeNode={activeNode} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Node label HUD (always visible, outside canvas)               */
/* ─────────────────────────────────────────────────────────────── */

function NodeLabels({ active }: { active: NodeId | null }) {
  if (active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      {/* Genesis hint */}
      <div className="absolute left-[20%] top-[25%] text-center">
        <div className="inline-flex flex-col items-center gap-1">
          <span className="h-px w-8 bg-amber-500/60" />
          <span className="font-mono text-[10px] tracking-widest text-amber-400/70 uppercase">Genesis · Kampala</span>
        </div>
      </div>
      {/* Berlin hint */}
      <div className="absolute right-[18%] top-[35%] text-center">
        <div className="inline-flex flex-col items-center gap-1">
          <span className="h-px w-8 bg-blue-500/60" />
          <span className="font-mono text-[10px] tracking-widest text-blue-400/70 uppercase">Crucible · Berlin</span>
        </div>
      </div>
      {/* Oslo hint */}
      <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 text-center">
        <div className="inline-flex flex-col items-center gap-1">
          <span className="font-mono text-[10px] tracking-widest text-emerald-400/70 uppercase">The Real World · Oslo</span>
          <span className="h-px w-8 bg-emerald-500/60" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Overlay shell                                                  */
/* ─────────────────────────────────────────────────────────────── */

function OverlayPanel({
  children,
  onClose,
  wide = false,
}: {
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(5, 5, 16, 0.75)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${wide ? "max-w-6xl" : "max-w-2xl"} max-h-[88vh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/90 p-6 md:p-8 text-white shadow-2xl`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Genesis Overlay — The Origin                                   */
/* ─────────────────────────────────────────────────────────────── */

function GenesisOverlay({ onClose }: { onClose: () => void }) {
  const timeline = [
    { year: "1991", label: "Born in Kampala, Uganda", sub: "A city of builders and dreamers" },
    { year: "2013", label: "CS at Makerere University", sub: "3 years of computer science fundamentals" },
    { year: "2016", label: "First dev roles", sub: "Web projects, client work, early freelancing" },
    { year: "2019", label: "Moved to Oslo, Norway", sub: "New continent, bigger ambitions" },
    { year: "2022", label: "Le Wagon Berlin", sub: "400+ hours of intensive bootcamp" },
    { year: "2024", label: "Founded Echo Algori Data", sub: "AI consultancy — Oslo & international" },
    { year: "NOW",  label: "10+ projects shipped", sub: "Fullstack · AI · Multi-agent systems" },
  ];

  return (
    <OverlayPanel onClose={onClose}>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_12px_#D97706]" />
        <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">Node 01 · Genesis</span>
      </div>
      <h2 className="mb-1 text-3xl font-semibold tracking-tight">The Origin</h2>
      <p className="mb-8 text-neutral-400">Kampala → Oslo — the spark that became a career.</p>

      {/* Timeline */}
      <div className="relative border-l border-amber-500/30 pl-6 space-y-6">
        {timeline.map(({ year, label, sub }) => (
          <div key={year} className="relative">
            <span className="absolute -left-[25px] flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/50">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            </span>
            <div className="font-mono text-xs text-amber-400/70 mb-0.5">{year}</div>
            <div className="font-medium text-white">{label}</div>
            <div className="text-sm text-neutral-400">{sub}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          { value: "3", label: "Continents" },
          { value: "10+", label: "Years Building" },
          { value: "2", label: "Companies Founded" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center"
          >
            <div className="text-2xl font-bold text-amber-400">{value}</div>
            <div className="mt-0.5 text-xs text-neutral-400">{label}</div>
          </div>
        ))}
      </div>
    </OverlayPanel>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Berlin Overlay — The Crucible                                  */
/* ─────────────────────────────────────────────────────────────── */

function BerlinOverlay({ onClose }: { onClose: () => void }) {
  const skills = [
    "Ruby on Rails", "PostgreSQL", "HTML/CSS/JS", "Git & GitHub",
    "REST APIs", "Heroku", "MVC Architecture", "Pair Programming",
    "Agile/Scrum", "Product Thinking",
  ];

  return (
    <OverlayPanel onClose={onClose}>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_#2563EB]" />
        <span className="font-mono text-xs tracking-widest text-blue-400 uppercase">Node 02 · Crucible</span>
      </div>
      <h2 className="mb-1 text-3xl font-semibold tracking-tight">Le Wagon Berlin</h2>
      <p className="mb-8 text-neutral-400">
        January–March 2022. 400+ hours of intensive full-stack development training. The crucible
        that transformed a self-taught builder into a professional engineer.
      </p>

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        {[
          { value: "400+", label: "Coding Hours" },
          { value: "2022", label: "Year" },
          { value: "#1", label: "EU Bootcamp" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center"
          >
            <div className="text-2xl font-bold text-blue-400">{value}</div>
            <div className="mt-0.5 text-xs text-neutral-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h3 className="mb-3 font-mono text-xs tracking-widest text-neutral-500 uppercase">Skills Forged</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="mt-8 border-l-2 border-blue-500/40 pl-4 italic text-neutral-400">
        &ldquo;400 hours in a room with 30 engineers who all wanted it as badly as you did.
        That's where the theory stops and the real building starts.&rdquo;
      </blockquote>
    </OverlayPanel>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Oslo Overlay — The Real World (all 10 projects)               */
/* ─────────────────────────────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-white/8 bg-neutral-900/60 transition-all duration-300 hover:border-emerald-500/30 hover:bg-neutral-900">
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = "none";
            const parent = t.parentElement;
            if (parent) {
              parent.style.background = `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
        {/* Links */}
        <div className="absolute right-2 top-2 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono text-white backdrop-blur hover:bg-emerald-600"
            >
              ↗ Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono text-white backdrop-blur hover:bg-neutral-600"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
      {/* Body */}
      <div className="p-4">
        <h4 className="font-semibold text-white">{project.title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-neutral-400">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {project.stack.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-neutral-400">
              {t}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-neutral-500">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function OsloOverlay({ onClose }: { onClose: () => void }) {
  return (
    <OverlayPanel onClose={onClose} wide>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10B981]" />
        <span className="font-mono text-xs tracking-widest text-emerald-400 uppercase">Node 03 · Oslo</span>
      </div>
      <div className="mb-2 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">The Real World</h2>
          <p className="mt-1 text-neutral-400">10 shipped products across AI, music tech, e-commerce &amp; automation.</p>
        </div>
        <div className="flex gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-400">10</div>
            <div className="text-xs text-neutral-500">Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">26+</div>
            <div className="text-xs text-neutral-500">Sites</div>
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex gap-3">
        <a
          href="mailto:allan@echoalgoridata.no"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Work with me →
        </a>
        <a
          href="https://allan.echoalgoridata.no"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Full Portfolio ↗
        </a>
      </div>
    </OverlayPanel>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Main HeroScene export                                          */
/* ─────────────────────────────────────────────────────────────── */

export default function UniverseScene() {
  const [hoveredNode, setHoveredNode] = useState<NodeId | null>(null);
  const [activeNode, setActiveNode]   = useState<NodeId | null>(null);

  function handleClick(id: NodeId) {
    setActiveNode((prev) => (prev === id ? null : id));
  }

  function handleClose() {
    setActiveNode(null);
  }

  return (
    <>
      {/* 3D Canvas */}
      <div
        className={`absolute inset-0 z-0 w-full h-full bg-[#050510] ${
          activeNode ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <Scene
            hoveredNode={hoveredNode}
            activeNode={activeNode}
            onHover={setHoveredNode}
            onClick={handleClick}
          />
        </Canvas>
      </div>

      {/* Node label hints */}
      <NodeLabels active={activeNode} />

      {/* Return button */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto absolute top-6 right-6 z-30"
          >
            <button
              onClick={handleClose}
              className="rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/15"
            >
              ← Return to Universe
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content overlays */}
      <AnimatePresence>
        {activeNode === "genesis" && <GenesisOverlay onClose={handleClose} />}
        {activeNode === "berlin"  && <BerlinOverlay  onClose={handleClose} />}
        {activeNode === "oslo"    && <OsloOverlay    onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
}
