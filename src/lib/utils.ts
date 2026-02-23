import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely, resolving conflicts via tailwind-merge.
 * Accepts any mix of strings, arrays, and conditional objects via clsx.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date value into a human-readable string.
 *
 * @param date - A Date object, ISO string, or timestamp number.
 * @param options - Optional Intl.DateTimeFormatOptions to override defaults.
 * @returns Formatted date string, e.g. "February 23, 2026".
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  }
): string {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", options).format(d);
}

/**
 * Format a date as a short relative label: "Jan 2026", "March 2025", etc.
 * Useful for work history / timeline displays.
 */
export function formatMonthYear(date: Date | string | number): string {
  return formatDate(date, { year: "numeric", month: "short" });
}

/**
 * Truncate a string to a maximum character length, appending an ellipsis.
 *
 * @param str - The string to truncate.
 * @param maxLength - Maximum number of characters before truncation (default 160).
 * @returns The truncated string with "…" appended if it exceeded maxLength.
 */
export function truncate(str: string, maxLength: number = 160): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Convert a plain string to a URL-safe slug.
 * e.g. "My Story" → "my-story"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Linearly interpolate between two numbers.
 * Useful for animation math.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp a number between a min and max value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map a value from one range to another.
 * e.g. mapRange(0.5, 0, 1, 0, 100) → 50
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
