'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AppDefinition } from './types';

interface WindowProps {
  app: AppDefinition;
  children: React.ReactNode;
  isLoading?: boolean;
  onClose: () => void;
}

export function Window({ app, children, isLoading = false, onClose }: WindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Center window on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPosition({
      x: Math.max(60, (window.innerWidth - 860) / 2),
      y: Math.max(30, (window.innerHeight - 620) / 2 - 20),
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [isMaximized, position]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: Math.max(0, e.clientY - dragOffset.current.y),
      });
    };
    const onUp = () => setIsDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`
        os-window
        ${isMaximized ? 'os-window--max' : ''}
        ${isDragging ? 'cursor-grabbing' : ''}
      `}
      style={isMaximized ? {} : { left: position.x, top: position.y }}
    >
      {/* Orange glow behind window */}
      <div className="os-window-glow" />

      {/* Title bar */}
      <div
        className={`os-titlebar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[7px]">
          <button
            onClick={onClose}
            className="os-traffic os-traffic--close group"
            aria-label="Close"
          >
            <svg className="w-[6px] h-[6px] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none">
              <path d="M0.5 0.5L5.5 5.5M5.5 0.5L0.5 5.5" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            onClick={() => {}}
            className="os-traffic os-traffic--minimize group"
            aria-label="Minimize"
          >
            <svg className="w-[6px] h-[1px] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 6 1" fill="none">
              <path d="M0 0.5H6" stroke="rgba(0,0,0,0.6)" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="os-traffic os-traffic--maximize group"
            aria-label="Maximize"
          >
            <svg className="w-[6px] h-[6px] opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none">
              <path d="M0.5 2L3 0.5L5.5 2V5.5H0.5V2Z" stroke="rgba(0,0,0,0.6)" strokeWidth="1" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div className="os-titlebar-center">
          <span className="text-base">{app.icon}</span>
          <span className="os-titlebar-text">{app.name}</span>
        </div>

        {/* Loading spinner */}
        <div className="w-[52px] flex justify-end">
          {isLoading && <div className="os-spinner" />}
        </div>
      </div>

      {/* Content */}
      <div className="os-window-content">
        {children}
      </div>
    </motion.div>
  );
}
