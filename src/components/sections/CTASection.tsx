'use client';

import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section
      className="section-container"
      aria-label="Call to action"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center flex flex-col items-center gap-6"
        style={{
          background:
            'linear-gradient(135deg, rgba(217,119,6,0.12) 0%, rgba(5,150,105,0.10) 50%, rgba(37,99,235,0.08) 100%)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Aurora glow decorations */}
        <div
          className="aurora-glow aurora-glow-gold"
          style={{ width: 300, height: 300, top: '-80px', left: '-60px' }}
        />
        <div
          className="aurora-glow aurora-glow-emerald"
          style={{ width: 200, height: 200, bottom: '-60px', right: '10%' }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1 rounded-full border"
            style={{
              color: 'var(--color-gold)',
              borderColor: 'var(--color-gold-dim)',
              backgroundColor: 'rgba(217,119,6,0.08)',
            }}
          >
            Available Now
          </span>

          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
          >
            One person.
            <br />
            <span className="gradient-text">Many agents.</span>
            <br />
            Shipping at team speed.
          </h2>

          <p className="text-base max-w-lg" style={{ color: 'var(--text-2)' }}>
            Whether you need a production MVP in 3–4 weeks, an AI automation layer, or a frontend
            engineer to join your team — I'm immediately available in Oslo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:allan@echoalgoridata.no"
              className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: 'var(--color-gold)', color: '#0C0A09' }}
            >
              Get in touch
            </a>
            <a
              href="/story"
              className="px-8 py-3.5 rounded-full font-semibold text-sm border transition-all duration-200 hover:bg-white/5"
              style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
            >
              Read the full story
            </a>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <a
              href="https://echoalgoridata.no"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-xs"
              style={{ color: 'var(--text-3)' }}
            >
              echoalgoridata.no
            </a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a
              href="https://github.com/La-Cappuccino"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-xs"
              style={{ color: 'var(--text-3)' }}
            >
              GitHub
            </a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a
              href="https://www.youtube.com/@DropDemand"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-xs"
              style={{ color: 'var(--text-3)' }}
            >
              Drop Demand
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
