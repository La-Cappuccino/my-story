'use client';

/**
 * Liquid Glass UI Component
 *
 * Apple iOS 26-inspired liquid glass effect with:
 * - Real-time frosted glass with backdrop blur
 * - Dynamic lighting and refraction simulation
 * - Mouse-responsive interactions (follow cursor)
 * - Inner shadows and tint layers
 * - Chromatic aberration effect
 * - Smooth spring animations
 *
 * Based on: Apple's Liquid Glass Design System
 * Inspired by: archisvaze/liquid-glass, liquid-glass-js
 */

import { useRef, useState, useCallback, useEffect, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

type GlassVariant = 'default' | 'frosted' | 'clear' | 'tinted' | 'vibrant';
type GlassSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface LiquidGlassProps {
  children: ReactNode;
  variant?: GlassVariant;
  size?: GlassSize;
  className?: string;
  // Glass customization
  blur?: number;         // Backdrop blur amount (px)
  tint?: string;         // Tint color (hex or rgba)
  tintOpacity?: number;  // Tint opacity (0-1)
  saturation?: number;   // Color saturation (0-200)
  brightness?: number;   // Brightness (0-200)
  // Effects
  innerShadow?: boolean;
  outerGlow?: boolean;
  refraction?: boolean;  // Enable light refraction effect
  chromatic?: boolean;   // Chromatic aberration
  noise?: boolean;       // Subtle noise texture
  // Interaction
  interactive?: boolean; // Mouse follow effect
  hoverScale?: number;   // Scale on hover (default: 1.02)
  pressScale?: number;   // Scale on press (default: 0.98)
  // Border
  borderWidth?: number;
  borderOpacity?: number;
  borderRadius?: number | string;
  // Callbacks
  onClick?: () => void;
  onHover?: (isHovering: boolean) => void;
}

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

const VARIANT_PRESETS: Record<GlassVariant, Partial<LiquidGlassProps>> = {
  default: {
    blur: 24,
    tint: '#ffffff',
    tintOpacity: 0.15,
    saturation: 120,
    brightness: 105,
    innerShadow: true,
    borderOpacity: 0.2,
  },
  frosted: {
    blur: 40,
    tint: '#ffffff',
    tintOpacity: 0.25,
    saturation: 100,
    brightness: 100,
    innerShadow: true,
    noise: true,
    borderOpacity: 0.15,
  },
  clear: {
    blur: 12,
    tint: '#ffffff',
    tintOpacity: 0.05,
    saturation: 110,
    brightness: 102,
    innerShadow: false,
    borderOpacity: 0.3,
  },
  tinted: {
    blur: 28,
    tint: '#FB6422', // Echo orange
    tintOpacity: 0.12,
    saturation: 130,
    brightness: 105,
    innerShadow: true,
    borderOpacity: 0.25,
  },
  vibrant: {
    blur: 32,
    tint: '#E55A1F', // Echo orange variant
    tintOpacity: 0.08,
    saturation: 150,
    brightness: 110,
    innerShadow: true,
    chromatic: true,
    borderOpacity: 0.2,
  },
};

const SIZE_PRESETS: Record<GlassSize, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  full: 'p-0',
};

// ============================================================================
// LIQUID GLASS COMPONENT
// ============================================================================

export default function LiquidGlass({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  blur,
  tint,
  tintOpacity,
  saturation,
  brightness,
  innerShadow,
  outerGlow = false,
  refraction = false,
  chromatic,
  noise,
  interactive = true,
  hoverScale = 1.02,
  pressScale = 0.98,
  borderWidth = 1,
  borderOpacity,
  borderRadius = 24,
  onClick,
  onHover,
}: LiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Merge variant presets with custom props
  const preset = VARIANT_PRESETS[variant];
  const config = {
    blur: blur ?? preset.blur ?? 24,
    tint: tint ?? preset.tint ?? '#ffffff',
    tintOpacity: tintOpacity ?? preset.tintOpacity ?? 0.15,
    saturation: saturation ?? preset.saturation ?? 120,
    brightness: brightness ?? preset.brightness ?? 105,
    innerShadow: innerShadow ?? preset.innerShadow ?? true,
    chromatic: chromatic ?? preset.chromatic ?? false,
    noise: noise ?? preset.noise ?? false,
    borderOpacity: borderOpacity ?? preset.borderOpacity ?? 0.2,
  };

  // Mouse position tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse tracking
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position to gradient position
  const gradientX = useTransform(smoothMouseX, [0, 1], ['30%', '70%']);
  const gradientY = useTransform(smoothMouseY, [0, 1], ['30%', '70%']);

  // Handle mouse move for interactive light effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
    },
    [interactive, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    onHover?.(true);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    onHover?.(false);
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [onHover, mouseX, mouseY]);

  // Initialize mouse position to center
  useEffect(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const tintColor = hexToRgba(config.tint, config.tintOpacity);
  const borderColor = hexToRgba('#ffffff', config.borderOpacity);

  return (
    <motion.div
      ref={containerRef}
      className={`
        relative overflow-hidden
        ${SIZE_PRESETS[size]}
        ${className}
      `}
      style={{
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={interactive ? { scale: hoverScale } : undefined}
      whileTap={interactive && onClick ? { scale: pressScale } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Background Blur Layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backdropFilter: `
            blur(${config.blur}px)
            saturate(${config.saturation}%)
            brightness(${config.brightness}%)
          `,
          WebkitBackdropFilter: `
            blur(${config.blur}px)
            saturate(${config.saturation}%)
            brightness(${config.brightness}%)
          `,
          borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        }}
      />

      {/* Tint Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: tintColor,
          borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        }}
      />

      {/* Dynamic Light Refraction Effect */}
      {refraction && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(255, 255, 255, 0.4) 0%,
              transparent 50%
            )`,
            borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
            // @ts-ignore - CSS custom properties
            '--mouse-x': gradientX,
            '--mouse-y': gradientY,
          }}
        />
      )}

      {/* Interactive Light Highlight */}
      {interactive && isHovering && (
        <motion.div
          className="absolute inset-0 -z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(
              ellipse 80% 80% at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(255, 255, 255, 0.15) 0%,
              transparent 60%
            )`,
            borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
          }}
        />
      )}

      {/* Inner Shadow */}
      {config.innerShadow && (
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.3),
              inset 0 -1px 1px rgba(0, 0, 0, 0.05),
              inset 1px 0 1px rgba(255, 255, 255, 0.1),
              inset -1px 0 1px rgba(0, 0, 0, 0.05)
            `,
            borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
          }}
        />
      )}

      {/* Chromatic Aberration Effect */}
      {config.chromatic && (
        <>
          <div
            className="absolute inset-0 -z-10 pointer-events-none mix-blend-screen opacity-[0.03]"
            style={{
              background: 'linear-gradient(135deg, #ff0000 0%, transparent 50%)',
              transform: 'translate(-1px, -1px)',
              borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
            }}
          />
          <div
            className="absolute inset-0 -z-10 pointer-events-none mix-blend-screen opacity-[0.03]"
            style={{
              background: 'linear-gradient(315deg, #0000ff 0%, transparent 50%)',
              transform: 'translate(1px, 1px)',
              borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
            }}
          />
        </>
      )}

      {/* Noise Texture */}
      {config.noise && (
        <div
          className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
          }}
        />
      )}

      {/* Border */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          border: `${borderWidth}px solid ${borderColor}`,
          borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        }}
      />

      {/* Outer Glow */}
      {outerGlow && (
        <div
          className="absolute -inset-1 -z-20 pointer-events-none blur-xl opacity-50"
          style={{
            background: `linear-gradient(135deg, ${config.tint}20, transparent)`,
            borderRadius: typeof borderRadius === 'number' ? `${borderRadius + 4}px` : borderRadius,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// ============================================================================
// ADDITIONAL COMPONENTS
// ============================================================================

/**
 * Liquid Glass Card - Pre-configured card component
 */
export function LiquidGlassCard({
  children,
  className = '',
  ...props
}: Omit<LiquidGlassProps, 'size'> & { className?: string }) {
  return (
    <LiquidGlass
      variant="frosted"
      size="lg"
      innerShadow
      className={`shadow-lg ${className}`}
      {...props}
    >
      {children}
    </LiquidGlass>
  );
}

/**
 * Liquid Glass Button - Interactive button with glass effect
 */
interface LiquidGlassButtonProps extends Omit<LiquidGlassProps, 'children'> {
  children: ReactNode;
  disabled?: boolean;
}

export function LiquidGlassButton({
  children,
  disabled = false,
  onClick,
  className = '',
  ...props
}: LiquidGlassButtonProps) {
  return (
    <LiquidGlass
      variant="tinted"
      size="sm"
      interactive={!disabled}
      onClick={disabled ? undefined : onClick}
      className={`
        cursor-pointer select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      borderRadius={12}
      {...props}
    >
      <span className="font-medium text-white/90">{children}</span>
    </LiquidGlass>
  );
}

/**
 * Liquid Glass Panel - Large content panel
 */
export function LiquidGlassPanel({
  children,
  className = '',
  ...props
}: LiquidGlassProps) {
  return (
    <LiquidGlass
      variant="default"
      size="xl"
      innerShadow
      refraction
      className={`shadow-2xl ${className}`}
      borderRadius={32}
      {...props}
    >
      {children}
    </LiquidGlass>
  );
}

/**
 * Liquid Glass Pill - Small badge/tag component
 */
export function LiquidGlassPill({
  children,
  color = '#FB6422',
  className = '',
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <LiquidGlass
      variant="clear"
      size="sm"
      tint={color}
      tintOpacity={0.15}
      borderRadius={9999}
      interactive={false}
      className={`inline-flex items-center px-3 py-1 ${className}`}
    >
      <span className="text-sm font-medium" style={{ color }}>
        {children}
      </span>
    </LiquidGlass>
  );
}

// Export types
export type { LiquidGlassProps, GlassVariant, GlassSize };
