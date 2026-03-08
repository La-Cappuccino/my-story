'use client';

import { motion } from 'framer-motion';
import { AppDefinition } from './types';

interface TaskbarProps {
  apps: AppDefinition[];
  openApps: string[];
  activeApp: string | null;
  onAppClick: (app: AppDefinition) => void;
  time: string;
}

export function Taskbar({ apps, openApps, activeApp, onAppClick, time }: TaskbarProps) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="os-taskbar-wrap"
    >
      <div className="os-taskbar">
        {/* App icons */}
        <div className="flex items-center gap-1">
          {apps.map((app) => {
            const isOpen = openApps.includes(app.id);
            const isActive = activeApp === app.id;

            return (
              <button
                key={app.id}
                onClick={() => onAppClick(app)}
                className={`os-taskbar-btn ${isActive ? 'os-taskbar-btn--active' : ''}`}
                title={app.name}
              >
                <span className="text-xl leading-none">{app.icon}</span>
                {isOpen && (
                  <span className={`os-taskbar-dot ${isActive ? 'os-taskbar-dot--active' : ''}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="os-taskbar-divider" />

        {/* Clock + branding */}
        <div className="flex items-center gap-3">
          <span className="os-taskbar-time">{time}</span>
          <div className="os-taskbar-brand">
            <div className="os-taskbar-brand-dot" />
            <span>Echo</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
