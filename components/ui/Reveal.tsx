"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "p" | "figure" | "header";
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Quiet scroll reveal – a short vertical drift plus a fade.
 * Renders its `initial` state into the SSR HTML, so the `no-js` CSS
 * fallback in globals.css keeps the content visible without JavaScript.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
  once = true,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Staggers direct children that are themselves `RevealItem`s. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "p";
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0.2 : 0.85, ease: EASE },
        },
      }}
    >
      {children}
    </Component>
  );
}
