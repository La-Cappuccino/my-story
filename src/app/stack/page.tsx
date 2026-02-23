import type { Metadata } from "next";
import StackDisplay from "@/components/sections/StackDisplay";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "The tools, languages, and frameworks Allan Kisuule uses to build production software — React, Next.js, TypeScript, Python, LangGraph, and a multi-agent AI workflow.",
  openGraph: {
    title: "Stack | Allan Kisuule",
    description:
      "React, Next.js, TypeScript, Python, LangGraph, and a multi-agent AI workflow that ships at the speed of a small team.",
    url: "https://allankisuule.no/stack",
  },
  twitter: {
    title: "Stack | Allan Kisuule",
    description:
      "React, Next.js, TypeScript, Python, LangGraph, and a multi-agent AI workflow.",
  },
};

export default function StackPage() {
  return (
    <section className="section-container">
      <div className="mb-16">
        <p
          className="mb-3 font-mono text-sm tracking-widest uppercase"
          style={{ color: "var(--color-gold)" }}
        >
          Tools & technologies
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
          My stack
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
          7 programming languages, 10+ frontend frameworks, 6 AI/ML frameworks,
          and an orchestrated multi-agent workflow. Not just using AI — building
          with it.
        </p>
      </div>
      <StackDisplay />
    </section>
  );
}
