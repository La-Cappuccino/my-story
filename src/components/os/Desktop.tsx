'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APPS } from './constants';
import { AppDefinition } from './types';
import { Icon } from './Icon';
import { Window } from './Window';
import { Taskbar } from './Taskbar';
import { GeneratedContent } from './GeneratedContent';

export function Desktop() {
  const [activeApp, setActiveApp] = useState<AppDefinition | null>(null);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => setBootComplete(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Clock
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const fetchContent = useCallback(async (
    app: AppDefinition,
    actionType: string,
    actionText: string,
    historyPath: string[]
  ) => {
    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setContent('');

    try {
      const res = await fetch('/api/os/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId: app.id,
          appName: app.name,
          appDescription: app.description,
          actionType,
          actionText,
          history: historyPath,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Failed');
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setContent(acc);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error(err);
        setContent('<p class="os-text os-error">Failed to load. Please try again.</p>');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openApp = useCallback((app: AppDefinition) => {
    setActiveApp(app);
    if (!openApps.includes(app.id)) {
      setOpenApps(prev => [...prev, app.id]);
    }
    setHistory([app.name]);
    fetchContent(app, 'app_open', app.name, []);
  }, [openApps, fetchContent]);

  const closeApp = useCallback(() => {
    abortRef.current?.abort();
    if (activeApp) {
      setOpenApps(prev => prev.filter(id => id !== activeApp.id));
    }
    setActiveApp(null);
    setContent('');
    setHistory([]);
  }, [activeApp]);

  const handleAction = useCallback((actionId: string, elementText: string) => {
    if (!activeApp) return;
    const newHistory = [...history, elementText];
    setHistory(newHistory);
    fetchContent(activeApp, 'button_click', elementText, newHistory);
  }, [activeApp, history, fetchContent]);

  const handleTaskbarClick = useCallback((app: AppDefinition) => {
    if (activeApp?.id === app.id) return;
    openApp(app);
  }, [activeApp, openApp]);

  return (
    <div className="os-root">
      {/* SVG filters for liquid glass refraction (Chromium progressive enhancement) */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="liquid-refraction" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="42" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="3" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Background layers */}
      <div className="os-bg">
        {/* Base dark */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Ambient radial glow — gives glass surfaces something to refract */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: [
            'radial-gradient(ellipse 40% 50% at 20% 80%, rgba(251, 100, 34, 0.06), transparent 60%)',
            'radial-gradient(ellipse 35% 40% at 75% 25%, rgba(100, 60, 220, 0.04), transparent 55%)',
            'radial-gradient(ellipse 50% 35% at 50% 50%, rgba(251, 100, 34, 0.03), transparent 50%)',
          ].join(', '),
        }} />

        {/* Noise texture */}
        <div className="os-noise" />

        {/* Spotlight glow — triple layer like EchoAlgoriData */}
        <div className="os-spotlight os-spotlight--base" />
        <div className="os-spotlight os-spotlight--mid" />
        <div className="os-spotlight os-spotlight--hot" />

        {/* Subtle grid pattern */}
        <div className="os-grid-pattern" />
      </div>

      {/* Desktop Icons */}
      <AnimatePresence>
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 p-8 pt-12 flex flex-wrap content-start gap-1 h-[calc(100vh-5rem)]"
            style={{ maxWidth: '560px' }}
          >
            {APPS.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Icon app={app} onOpen={() => openApp(app)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Window */}
      <AnimatePresence mode="wait">
        {activeApp && (
          <Window
            key={activeApp.id}
            app={activeApp}
            isLoading={isLoading}
            onClose={closeApp}
          >
            {content ? (
              <GeneratedContent
                html={content}
                onAction={handleAction}
                isStreaming={isLoading}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="os-loader mx-auto" />
                  <p className="text-white/40 text-sm font-[family-name:var(--font-manrope)]">
                    Loading {activeApp.name}...
                  </p>
                </div>
              </div>
            )}
          </Window>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      {bootComplete && (
        <Taskbar
          apps={APPS}
          openApps={openApps}
          activeApp={activeApp?.id || null}
          onAppClick={handleTaskbarClick}
          time={time}
        />
      )}

      {/* Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: bootComplete ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="fixed top-5 right-6 z-50 flex items-center gap-2"
      >
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FB6422]/40" />
        <span className="text-white/30 text-xs font-[family-name:var(--font-sora)] tracking-widest uppercase">
          AllanOS
        </span>
      </motion.div>
    </div>
  );
}
