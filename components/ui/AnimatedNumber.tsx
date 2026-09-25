"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatEuro, formatNumber } from "@/lib/pricing";

type Format = "number" | "euro";

const FORMATTERS: Record<Format, (value: number) => string> = {
  number: (v) => formatNumber(v),
  euro: (v) => formatEuro(Math.round(v)),
};

type Props = {
  value: number;
  /** How the value is rendered – kept as a string so server components can pass it. */
  format: Format;
  className?: string;
  duration?: number;
  delay?: number;
};

/**
 * Counts from 0 to `value` once the element scrolls into view.
 * The final formatted value is rendered on the server so the number is
 * correct without JavaScript and never causes hydration mismatches.
 */
export function AnimatedNumber({
  value,
  format,
  className,
  duration = 1.6,
  delay = 0.1,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const fmt = FORMATTERS[format];
  const [display, setDisplay] = useState(() => fmt(value));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(fmt(latest)),
      onComplete: () => setDisplay(fmt(value)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, delay, fmt]);

  return (
    <span ref={ref} className={`num ${className ?? ""}`}>
      {display}
    </span>
  );
}
