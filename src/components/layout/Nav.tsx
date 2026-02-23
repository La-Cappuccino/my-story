"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Story",    href: "/#story" },
  { label: "Projects", href: "/#projects" },
  { label: "Stack",    href: "/#stack" },
  { label: "Music",    href: "/#music" },
  { label: "Blog",     href: "/blog" },
] as const;

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-3)]"
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center",
        "text-[var(--text-3)] hover:text-[var(--text)]",
        "hover:bg-[var(--surface)] transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{ scale: 0.9, rotate: isDark ? 30 : -30 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            className={cn(
              "fixed top-0 right-0 bottom-0 z-50 w-72",
              "bg-[var(--elevated)] border-l border-[var(--border)]",
              "flex flex-col p-6 gap-6 shadow-2xl"
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={onClose}
                className="text-lg font-bold text-[var(--accent)]"
                aria-label="Allan Kisuule — home"
              >
                AK
              </Link>
              <button
                onClick={onClose}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center",
                  "text-[var(--text-3)] hover:text-[var(--text)]",
                  "hover:bg-[var(--surface)] transition-colors duration-200"
                )}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "block py-3 px-4 rounded-lg text-base font-medium",
                      "text-[var(--text-2)] hover:text-[var(--text)]",
                      "hover:bg-[var(--surface)] transition-colors duration-200"
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <div className="mt-auto">
              <Link
                href="/#contact"
                onClick={onClose}
                className={cn(
                  "flex items-center justify-center gap-2 w-full",
                  "px-5 py-3 rounded-full text-sm font-semibold",
                  "bg-[var(--accent)] text-[#0C0A09]",
                  "hover:bg-[var(--color-gold-light)] transition-colors duration-200"
                )}
              >
                Let&apos;s talk
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <motion.header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-30",
          "transition-[background,border-color,backdrop-filter] duration-300"
        )}
        animate={{
          backgroundColor: scrolled
            ? "var(--elevated)"
            : "transparent",
          borderBottomColor: scrolled
            ? "var(--border)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
        }}
        style={{
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "flex items-center justify-between",
            "max-w-7xl mx-auto px-6 h-16",
            "sm:h-[70px]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "relative text-xl font-bold tracking-tight",
              "text-[var(--accent)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
            )}
            aria-label="Allan Kisuule — home"
          >
            AK
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  "text-[var(--text-3)] hover:text-[var(--text)]",
                  "hover:bg-[var(--surface)] transition-colors duration-200"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* CTA — desktop only */}
            <Link
              href="/#contact"
              className={cn(
                "hidden md:flex items-center gap-1.5",
                "px-4 py-2 rounded-full text-sm font-semibold",
                "bg-[var(--accent)] text-[#0C0A09]",
                "hover:bg-[var(--color-gold-light)] transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                "focus-visible:ring-[var(--accent)]"
              )}
            >
              Let&apos;s talk
              <ArrowUpRight size={13} />
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "md:hidden w-9 h-9 rounded-full flex items-center justify-center",
                "text-[var(--text-3)] hover:text-[var(--text)]",
                "hover:bg-[var(--surface)] transition-colors duration-200"
              )}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
