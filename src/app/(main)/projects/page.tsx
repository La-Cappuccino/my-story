import type { Metadata } from "next";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production apps, open source tools, AI systems, and client work by Allan Kisuule — Oslo-based fullstack developer and AI engineer.",
  openGraph: {
    title: "Projects | Allan Kisuule",
    description:
      "Production apps, open source tools, AI systems, and client work by Allan Kisuule.",
    url: "https://allankisuule.no/projects",
  },
  twitter: {
    title: "Projects | Allan Kisuule",
    description:
      "Production apps, open source tools, AI systems, and client work by Allan Kisuule.",
  },
};

export default function ProjectsPage() {
  return (
    <section className="section-container">
      <div className="mb-16">
        <p
          className="mb-3 font-mono text-sm tracking-widest uppercase"
          style={{ color: "var(--color-gold)" }}
        >
          Selected work
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
          Things I&apos;ve built
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
          6+ production apps, 26+ client sites, AI systems, and tools that
          solve real problems. Each project shipped to production using a
          multi-agent AI workflow.
        </p>
      </div>
      <ProjectsGrid />
    </section>
  );
}
