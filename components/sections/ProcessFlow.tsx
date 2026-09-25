"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Document, Grid, Mail, Person, Reply } from "@/components/ui/Icons";

const NODES = [
  {
    icon: Mail,
    title: "Eingang",
    text: "E-Mail, PDF oder Scan",
  },
  {
    icon: Document,
    title: "Verstehen",
    text: "Anliegen und Inhalt werden erkannt",
  },
  {
    icon: Grid,
    title: "Strukturieren",
    text: "Daten werden dem Vorgang zugeordnet",
  },
  {
    icon: Person,
    title: "Prüfen",
    text: "Ihr Team greift ein, wo es nötig ist",
  },
  {
    icon: Reply,
    title: "Antworten",
    text: "Antwort oder nächster Schritt",
  },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * How the system works, in five plain steps. The connecting line draws
 * itself and each node activates as the line reaches it.
 */
export function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const stepDelay = reduce ? 0 : 0.42;

  return (
    <div ref={ref} className="relative">
      {/* Connecting line – vertical on small screens, horizontal on large. */}
      <motion.div
        aria-hidden
        className="absolute left-[1.35rem] top-6 bottom-6 w-px origin-top bg-accent/60 lg:hidden"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : undefined}
        transition={{ duration: reduce ? 0.2 : 2.1, ease: EASE }}
      />
      <motion.div
        aria-hidden
        className="absolute hidden lg:left-8 lg:right-8 lg:top-[1.35rem] lg:block lg:h-px lg:origin-left lg:bg-accent/60"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: reduce ? 0.2 : 2.1, ease: EASE }}
      />

      <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
        {NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.li
              key={node.title}
              className="flex gap-5 lg:flex-col lg:gap-5"
              initial={{ opacity: reduce ? 1 : 0.35 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6, delay: i * stepDelay, ease: EASE }}
            >
              <motion.span
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-card lg:ml-2.5"
                initial={{ scale: reduce ? 1 : 0.85, borderColor: "rgb(23 24 26 / 0.1)" }}
                animate={
                  inView
                    ? { scale: 1, borderColor: "rgb(31 75 87 / 0.7)" }
                    : undefined
                }
                transition={{ duration: 0.7, delay: i * stepDelay, ease: EASE }}
              >
                <Icon size={18} />
              </motion.span>
              <div className="pt-1.5 lg:pl-0.5">
                <p className="text-caption num text-ink-4">0{i + 1}</p>
                <h4 className="mt-0.5 text-body font-medium text-ink">{node.title}</h4>
                <p className="mt-1 text-small text-ink-3">{node.text}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
