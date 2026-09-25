"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { Info } from "./Icons";

type Props = {
  label: string;
  children: ReactNode;
};

/**
 * Accessible explanatory tooltip: a real button that reveals a
 * description on hover, focus or tap. Works with keyboard and touch.
 */
export function Tooltip({ label, children }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduce = useReducedMotion();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-3 transition-colors duration-300 hover:bg-paper-2 hover:text-ink"
      >
        <Info />
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: reduce ? 0 : 6, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 4, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-30 mt-2 w-72 -translate-x-1/2 rounded-xl border border-line bg-ink px-4 py-3 text-caption text-paper shadow-card-hover max-sm:left-auto max-sm:right-0 max-sm:translate-x-0"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
