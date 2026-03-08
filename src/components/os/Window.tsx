'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AppDefinition } from './types';

interface WindowProps {
  app: AppDefinition;
  children: React.ReactNode;
  isLoading?: boolean;
  onClose: () => void;
}

// Apple Liquid Glass spring config
const springConfig = {
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export function Window({ app, children, isLoading = false, onClose }: WindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Mouse position for liquid tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring values for liquid feel
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Transform mouse position to subtle rotation (liquid glass tilt)
  const rotateX = useTransform(springY, [-200, 200], [2, -2]);
  const rotateY = useTransform(springX, [-200, 200], [-2, 2]);

  // Keyboard shortcuts: Cmd+W / Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Center window on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPosition({
      x: Math.max(60, (window.innerWidth - 880) / 2),
      y: Math.max(30, (window.innerHeight - 640) / 2 - 20),
    });
  }, []);

  // Handle mouse move for liquid tilt
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!windowRef.current || isDragging) return;
    const rect = windowRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [isDragging, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const handleTitleMouseDown = useCallback((e: React.MouseEvent) => {
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
      const w = windowRef.current?.offsetWidth ?? 880;
      const h = windowRef.current?.offsetHeight ?? 640;
      setPosition({
        x: Math.max(-w + 100, Math.min(e.clientX - dragOffset.current.x, window.innerWidth - 100)),
        y: Math.max(0, Math.min(e.clientY - dragOffset.current.y, window.innerHeight - 80)),
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
      initial={{ 
        opacity: 0, 
        scale: 0.85, 
        y: 40,
        filter: 'blur(10px)',
      }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        filter: 'blur(0px)',
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.9, 
        y: 20,
        filter: 'blur(8px)',
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 35,
        mass: 0.8,
      }}
      style={{
        left: isMaximized ? 12 : position.x,
        top: isMaximized ? 12 : position.y,
        rotateX: isHovered && !isDragging ? rotateX : 0,
        rotateY: isHovered && !isDragging ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        os-liquid-window
        ${isMaximized ? 'os-liquid-window--max' : ''}
        ${isDragging ? 'cursor-grabbing' : ''}
        ${isHovered ? 'os-liquid-window--hovered' : ''}
      `}
    >
      {/* Liquid glass layers */}
      <div className="os-liquid-layer os-liquid-layer--glow" />
      <div className="os-liquid-layer os-liquid-layer--reflection" />
      <div className="os-liquid-layer os-liquid-layer--border" />
      
      {/* Title bar */}
      <div
        className={`os-liquid-titlebar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleTitleMouseDown}
      >
        {/* Traffic lights */}
        <div className="os-traffic-group">
          <button onClick={onClose} className="os-traffic os-traffic--close" aria-label="Close">
            <svg viewBox="0 0 8 8" className="os-traffic-icon">
              <path d="M1 1L7 7M7 1L1 7" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button className="os-traffic os-traffic--minimize" aria-label="Minimize">
            <svg viewBox="0 0 8 2" className="os-traffic-icon">
              <path d="M0 1H8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)} 
            className="os-traffic os-traffic--maximize" 
            aria-label="Maximize"
          >
            <svg viewBox="0 0 8 8" className="os-traffic-icon">
              <path d="M1 3L4 1L7 3V7H1V3Z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Title center */}
        <div className="os-liquid-title">
          <span className="os-liquid-title-icon">{app.icon}</span>
          <span className="os-liquid-title-text">{app.name}</span>
        </div>

        {/* Loading indicator */}
        <div className="os-liquid-titlebar-right">
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="os-liquid-spinner"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content area with inner shadow */}
      <div className="os-liquid-content">
        {children}
      </div>

      {/* Bottom resize handle (visual only for now) */}
      <div className="os-liquid-footer" />
    </motion.div>
  );
}
