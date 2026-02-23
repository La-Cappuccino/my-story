import { Metadata } from "next";
import Link from "next/link";
import UniverseClient from "@/components/canvas/UniverseClient";

export const metadata: Metadata = {
  title: "The Universe — Allan Kisuule",
  description:
    "An interactive 3D journey through Allan Kisuule's story — from Kampala to Oslo, building the future with AI.",
};

export default function UniversePage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050510]">
      {/* 3D experience */}
      <UniverseClient />

      {/* Foreground HUD — text passes through, buttons interactive */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center max-w-3xl text-center pointer-events-none">
          <div className="mb-4">
            <span className="inline-block py-1 px-3 rounded-full bg-neutral-800/50 border border-neutral-700/60 backdrop-blur-md text-sm font-mono text-neutral-300">
              allan.brain v2.0 // Active
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 mb-5">
            The Living Architecture
          </h1>

          <p className="text-base md:text-xl text-neutral-400 mb-10 max-w-xl font-light">
            Click a node to enter its world. Genesis · Berlin · Oslo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              View All Projects
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-6 py-3 text-sm font-medium text-neutral-50 backdrop-blur-sm transition-colors hover:bg-neutral-800"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
