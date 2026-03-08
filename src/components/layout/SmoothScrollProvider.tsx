"use client";

import { createContext, useContext, type ReactNode } from "react";

interface ScrollContextValue {
  // Placeholder for future scroll features
  scrollTo?: (target: string | HTMLElement) => void;
}

const ScrollContext = createContext<ScrollContextValue>({});

export function useScroll(): ScrollContextValue {
  return useContext(ScrollContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

// Simplified scroll provider - no external dependencies
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const scrollTo = (target: string | HTMLElement) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}
