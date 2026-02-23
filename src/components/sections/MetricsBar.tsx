'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Metric {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  accent: string;
}

const METRICS: Metric[] = [
  { value: 26, suffix: '+', prefix: '', label: 'Websites Built',     accent: '#D97706' },
  { value: 6,  suffix: '+', prefix: '', label: 'Apps Shipped',       accent: '#3B82F6' },
  { value: 3,  suffix: '',  prefix: '', label: 'Owned Products',     accent: '#10B981' },
  { value: 4,  suffix: '.0+', prefix: '', label: 'ROAS Achieved',    accent: '#F59E0B' },
  { value: 15, suffix: 'h+', prefix: '', label: 'Saved / Week',      accent: '#059669' },
];

/* ── useCountUp ─────────────────────────────────────────── */
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    startTime.current = null;

    function step(timestamp: number) {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    }

    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, trigger]);

  return count;
}

/* ── MetricItem ─────────────────────────────────────────── */
function MetricItem({
  metric,
  index,
  triggered,
}: {
  metric: Metric;
  index: number;
  triggered: boolean;
}) {
  const count = useCountUp(metric.value, 1400 + index * 150, triggered);

  return (
    <motion.div
      className="flex flex-col items-center gap-1 px-6 py-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={triggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <p
        className="text-4xl md:text-5xl font-black leading-none tabular-nums"
        style={{ color: metric.accent, fontVariantNumeric: 'tabular-nums' }}
      >
        {metric.prefix}
        {count}
        {metric.suffix}
      </p>
      <p
        className="text-xs font-semibold tracking-[0.12em] uppercase mt-1"
        style={{ color: 'var(--text-3)' }}
      >
        {metric.label}
      </p>
    </motion.div>
  );
}

/* ── Separator dot ──────────────────────────────────────── */
function Dot() {
  return (
    <span
      className="hidden md:block w-1 h-1 rounded-full flex-shrink-0 self-center"
      style={{ backgroundColor: 'var(--border)' }}
    />
  );
}

/* ── MetricsBar ─────────────────────────────────────────── */
export default function MetricsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Key metrics"
      className="w-full"
      style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="section-container !py-0"
        style={{ paddingBlock: 0 }}
      >
        <div className="flex flex-wrap md:flex-nowrap items-stretch justify-center md:justify-between divide-y md:divide-y-0 md:divide-x w-full"
          style={{ borderColor: 'var(--border)' }}
        >
          {METRICS.map((metric, i) => (
            <div key={metric.label} className="flex items-center flex-1">
              <MetricItem metric={metric} index={i} triggered={triggered} />
              {i < METRICS.length - 1 && <Dot />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
